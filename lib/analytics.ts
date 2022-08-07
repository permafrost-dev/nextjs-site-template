import ReactGA from 'react-ga';

// @ts-ignore
export const hasAnalytics = '{{project.site.googleAnalyticsId}}' !== '';

export const initGA = () => {
    if (hasAnalytics) {
        ReactGA.initialize('UA-{{project.site.googleAnalyticsId}}');
    }
};

export const logPageView = () => {
    if (hasAnalytics) {
        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname);
    }
};

export const logEvent = (category = '', action = '') => {
    if (hasAnalytics && category && action) {
        ReactGA.event({ category, action });
    }
};
