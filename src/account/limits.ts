import * as $ from 'jquery';
import {createApiClient} from "dots-wrapper";
import {tracking} from '../utils/tracking/tracking';

let dots = undefined;

let htmlAlertMessage = `
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>{{:title}}</strong> {{:text}} {{:error}}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true"><i class="fas fa-times-circle"></i></span>
    </button>
</div>
`;

let htmlAccountLimits = `
<h1>Account limits</h1>
<div class="card p-3 mb-3">
  <h2>Droplet limit: {{:droplet_limit}}</h2>
</div>
<div class="card p-3 mb-3">
  <h2>Floating IP limit: {{:floating_ip_limit}}</h2>
</div>
<div class="card p-3">
  <h2>Volume limit: {{:volume_limit}}</h2>
</div>
`;

const getAccountLimits = async () => {
    try {
        const {data:{account}} = await dots.account.getAccount();
        let accountLimitsContainer = $('#accountLimitsContainer');
        accountLimitsContainer.empty();

        let accountLimitsContent= $.templates(htmlAccountLimits);
        let billingBalanceStatus = accountLimitsContent.render(account);
        accountLimitsContainer.append(billingBalanceStatus);
    } catch (error) {
        let messageContent = $('#messageContent');
        let alertMessage = $.templates(htmlAlertMessage);
        let msg = {
            title: 'Command getAccount failed!',
            text: 'Please check you DigitalOcean API key.',
            error: error
        };
        tracking.exception(msg['title']);
        messageContent.append(alertMessage.render(msg));
    }
};

$(function() {

    chrome.storage.sync.get('apiAccessToken', function(obj) {
        dots = createApiClient({token: obj['apiAccessToken']});
    });

    $('#accountLimitsTab').on('click', function(){
        tracking.set('page', '/account/limits');
        tracking.set('title', 'Limits');
        tracking.pageview();
        getAccountLimits();
    });

});
