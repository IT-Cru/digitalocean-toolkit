let analytics = require('universal-ga');

let options = {
    debug: true,
    anonymizeIP: true
};

analytics.initialize('UA-67059303-4', options);
analytics.set('checkProtocolTask', null);

export const tracking = analytics;
