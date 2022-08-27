/**
 * configures the project created from a template repository.
 */

const { basename } = require('path');
const cp = require('child_process');
const fs = require('fs');
const readline = require('readline');
const util = require('util');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = util.promisify(rl.question).bind(rl);

const basePath = __dirname;

const projectInfo = {
    name: '',
    description: '',
    domain: '',
    site: {
        googleAnalyticsId: '',
    },
    author: {
        email: '',
        name: '',
    },
    vendor: {
        name: '',
    }
};

const runCommand = str => {
    cp.execSync(str, { cwd: __dirname, encoding: 'utf-8', stdio: 'inherit' });
};

const gitCommand = command => {
    return cp.execSync(`git ${command}`, { env: process.env, cwd: __dirname, encoding: 'utf-8', stdio: 'pipe' }) || '';
};

const installDependencies = () => {
    cp.execSync('npm install', { cwd: __dirname, encoding: 'utf-8', stdio: 'inherit' });
};

const askQuestion = async (prompt, defaultValue = '') => {
    let result = '';

    try {
        result = await question(`${prompt} ${defaultValue.length ? '(' + defaultValue + ') ' : ''}`);
    } catch (err) {
        result = false;
    }

    return new Promise(resolve => {
        if (!result || result.trim().length === 0) {
            result = defaultValue;
        }

        resolve(result);
    });
};

function rescue(func, defaultValue = null) {
    try {
        return func();
    } catch (e) {
        return defaultValue;
    }
}

function is_dir(path) {
    try {
        const stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        return false;
    }
}

function is_file(path) {
    return rescue(() => fs.lstatSync(path).isFile(), false);
}

const replaceVariablesInFile = (filename, projectInfo) => {
    let content = fs.readFileSync(filename, { encoding: 'utf-8' }).toString();
    const originalContent = content.slice();

    content = content
        .replace(/nextjs-site-template/g, projectInfo.name)
        .replace(/mydomain\.example/g, projectInfo.domain)
        .replace(/\{\{project\.name\}\}/g, projectInfo.name)
        .replace(/\{\{project\.description\}\}/g, projectInfo.description)
        .replace(/\{\{author\.name\}\}/g, projectInfo.author.name)
        .replace(/\{\{author\.email\}\}/g, projectInfo.author.email)
        .replaceAll('{{project.site.googleAnalyticsId}}', projectInfo.site.googleAnalyticsId)
        .replace(/\{\{date\.year\}\}/g, new Date().getFullYear());

    if (originalContent != content) {
        fs.writeFileSync(filename, content, { encoding: 'utf-8' });
    }
};

const processFiles = (directory, packageInfo) => {
    const files = fs.readdirSync(directory).filter(f => {
        return ![
            '.',
            '..',
            '.editorconfig',
            '.eslintignore',
            '.eslintrc.js',
            '.git',
            '.gitattributes',
            '.github',
            '.gitignore',
            '.next',
            '.prettierignore',
            '.prettierrc',
            'configure-project.js',
            'node_modules',
            'package-lock.json',
            'prettier.config.js',
            'yarn.lock',
        ].includes(basename(f));
    });

    files.forEach(fn => {
        const fqName = `${directory}/${fn}`;
        const relativeName = fqName.replace(basePath + '/', '');
        const isPath = is_dir(fqName);
        const kind = isPath ? 'directory' : 'file';

        console.log(`processing ${kind} ./${relativeName}`);

        if (isPath) {
            processFiles(fqName, packageInfo);
            return;
        }

        if (is_file(fqName)) {
            try {
                replaceVariablesInFile(fqName, packageInfo);
            } catch (err) {
                console.log(`error processing file ${relativeName}`);
            }
        }
    });
};

const conditionalAsk = async (obj, propName, onlyEmpty, prompt, allowEmpty = false, alwaysAsk = true) => {
    const value = obj[propName];

    if (!onlyEmpty || !value.length || alwaysAsk) {
        while (obj[propName].length === 0 || alwaysAsk) {
            obj[propName] = await askQuestion(prompt, value);

            if (allowEmpty && obj[propName].length === 0) {
                break;
            }

            if (obj[propName].length > 0) {
                break;
            }
        }
    }

    return new Promise(resolve => resolve());
};

const populatePackageInfo = async (onlyEmpty = false) => {
    console.log();

    projectInfo.name = basename(__dirname);
    projectInfo.author.name = gitCommand('config user.name').trim();
    projectInfo.author.email = gitCommand('config user.email').trim();
    projectInfo.vendor.name = projectInfo.author.name;

    await conditionalAsk(projectInfo, 'name', onlyEmpty, 'project name?', false);
    await conditionalAsk(projectInfo, 'description', onlyEmpty, 'project description?');
    await conditionalAsk(projectInfo, 'domain', onlyEmpty, 'project domain name?');
    await conditionalAsk(projectInfo.site, 'googleAnalyticsId', onlyEmpty, 'Google Analytics ID?');
    await conditionalAsk(projectInfo.author, 'name', onlyEmpty, 'author name?');
    await conditionalAsk(projectInfo.author, 'email', onlyEmpty, 'author email?');

    projectInfo.domain = projectInfo.domain.replace(/^https?:\/\//i, '').replace('www.', '');
    projectInfo.site.googleAnalyticsId = projectInfo.site.googleAnalyticsId.replace(/^UA-/i, '');
};

const safeUnlink = path => fs.existsSync(path) && fs.unlinkSync(path);
const getWorkflowFilename = name => `${__dirname}/.github/workflows/${name}.yml`;
const getGithubConfigFilename = name => `${__dirname}/.github/${name}.yml`;

class Features {
    dependabot = {
        name: 'dependabot',
        prompt: 'Use Dependabot?',
        enabled: true,
        default: true,
        dependsOn: [],
        disable: () => {
            safeUnlink(getGithubConfigFilename('dependabot'));
            this.automerge.disable();
        },
    };

    automerge = {
        name: 'automerge',
        prompt: 'Automerge Dependabot PRs?',
        enabled: true,
        default: true,
        dependsOn: ['dependabot'],
        disable: () => {
            safeUnlink(getWorkflowFilename('dependabot-auto-merge'));
        },
    };

    features = [this.dependabot, this.automerge];

    async run() {
        const state = {};

        for (let feature of this.features) {
            if (feature.dependsOn.length > 0) {
                const dependencies = feature.dependsOn.map(dep => state[dep]);

                feature.enabled = dependencies.every(dep => dep);
            }

            if (feature.enabled) {
                feature.enabled = await askBooleanQuestion(feature.prompt, feature.default);
            }

            state[feature.name] = feature.enabled;

            if (!feature.enabled) {
                feature.disable();
            }
        }
    }
}

/**
 * Removes the template README text from the README.md file
 */
function removeTemplateReadmeText() {
    const END_BLOCK_STR = '<!-- ==END TEMPLATE README== -->';
    const START_BLOCK_STR = '<!-- ==START TEMPLATE README== -->';

    const content = fs.readFileSync(`${__dirname}/README.md`).toString();

    if (content.includes(START_BLOCK_STR) && content.includes(END_BLOCK_STR)) {
        const startBlockPos = content.indexOf(START_BLOCK_STR);
        const endBlockPos = content.lastIndexOf(END_BLOCK_STR);

        const newContent = content.replace(content.substring(startBlockPos, endBlockPos + END_BLOCK_STR.length), '');

        if (newContent.length) {
            fs.writeFileSync('./README.md', newContent);
        }
    }
}

function removeAssetsDirectory() {
    try {
        if (!fs.existsSync(`${__dirname}/assets`)) {
            return;
        }

        for (const fn of fs.readdirSync(`${__dirname}/assets`)) {
            fs.unlinkSync(`${__dirname}/assets/${fn}`);
        }

        fs.rmdirSync(`${__dirname}/assets`);
    } catch (e) {
        //
    }
}

const askBooleanQuestion = async str => {
    const resultStr = await askQuestion(`${str} `);
    const result = resultStr.toString().toLowerCase().replace(/ /g, '').replace(/[^yn]/g, '').slice(0, 1);

    return result === 'y';
};

const run = async function () {
    await populatePackageInfo();
    await new Features().run();

    const confirm = (await askQuestion('Process files (this will modify files)? '))
        .toString()
        .toLowerCase()
        .replace(/ /g, '')
        .replace(/[^yn]/g, '')
        .slice(0, 1);

    if (confirm !== 'y') {
        console.log('Not processing files: action canceled.  Exiting.');
        rl.close();
        return;
    }

    try {
        removeTemplateReadmeText();
        removeAssetsDirectory();
        processFiles(__dirname, projectInfo);
        installDependencies();
    } catch (err) {
        //
    }

    rl.close();

    console.log('Done, removing this script.');
    fs.unlinkSync(__filename);

    runCommand('git add .');
    runCommand('git commit -m"commit configured project files"');
};

run();
