const findupSync = require('findup-sync');
const { existsSync } = require('fs');

const DOT_ENV_FILENAME = findupSync(['.env', '.env.local']);

const aliases = {
    '@': __dirname,
    '@components': `${__dirname}/components`,
    '@lib': `${__dirname}/lib`,
    '@pages': `${__dirname}/pages`,
};

/** @type {import('next').NextConfig} */
const nextConfig = {
    cleanDistDir: true,
    eslint: { ignoreDuringBuilds: true },
    swcMinify: true,
    optimizeFonts: true,
    reactStrictMode: true,
    //eslint-disable-next-line
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        if (existsSync(DOT_ENV_FILENAME)) {
            if (DOT_ENV_FILENAME) {
                const { parsed: myEnv } = require('dotenv').config({ path: DOT_ENV_FILENAME });

                config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
            }
        }

        config.optimization.minimize = true;

        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            ...aliases,
        };

        return config;
    },
};

module.exports = nextConfig;
