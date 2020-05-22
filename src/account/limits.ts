import * as $ from 'jquery';
import {createApiClient} from "dots-wrapper";

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
<h2>Droplet limit</h2>
<p>{{:droplet_limit}}</p>
<h2>Floating IP limit</h2>
<p>{{:floating_ip_limit}}</p>    
<h2>Volume limit</h2>
<p>{{:volume_limit}}</p>    
`;

const getAccountLimits = async () => {
    try {
        const {data:{account}} = await dots.account.getAccount();
        let accountLimitsContainer = $('#accountLimitsContainer');
        accountLimitsContainer.empty();

        let accountLimitsContent= $.templates(htmlAccountLimits);
        let nillingBalanceStatus = accountLimitsContent.render(account);
        accountLimitsContainer.append(nillingBalanceStatus);
    } catch (error) {
        let messageContent = $('#messageContent');
        let alertMessage = $.templates(htmlAlertMessage);
        let msg = {
            title: 'Command getAccount failed!',
            text: 'Please check you DigitalOcean API key.',
            error: error
        };
        messageContent.append(alertMessage.render(msg));
    }
};

$(function() {

    chrome.storage.sync.get('apiAccessToken', function(obj) {
        dots = createApiClient({token: obj['apiAccessToken']});
    });

    $('#account-limits-tab').on('click', getAccountLimits);

});
