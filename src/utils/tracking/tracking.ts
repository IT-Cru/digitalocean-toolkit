let analytics = require('universal-ga');

let options = {
    cookieDomain: 'dotoolkit.it-cru.de',
    debug: process.env.NODE_ENV == 'development',
};

analytics.initialize('UA-67059303-4', options);
analytics.set('anonymizeIp', true);
analytics.set('checkProtocolTask', null);
analytics.custom('dimension01', process.env.NODE_ENV);

export const tracking = analytics;
