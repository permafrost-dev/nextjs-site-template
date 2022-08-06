// enables basic auth for the website
export const BASIC_AUTH_ENABLED = !true;

export interface AppConfiguration {
    basicAuth: {
        enabled: boolean;
        username: string | undefined;
        password: string | undefined;
    };
}

export const appConfig: AppConfiguration = {
    basicAuth: {
        enabled: BASIC_AUTH_ENABLED,
        username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
        password: process.env.REACT_APP_BASIC_AUTH_PASSWORD,
    },
};

export default appConfig;
