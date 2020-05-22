import * as $ from 'jquery';
import {createApiClient} from 'dots-wrapper';
import * as moment from 'moment';

let dots = undefined;

let htmlAlertMessage = `
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>{{:title}}</strong> {{:text}} {{:error}}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true"><i class="fas fa-times-circle"></i></span>
    </button>
</div>
`;

let htmlBillingBalance = `
<h2>Remaining account credits</h2>
<p>{{:month_to_date_balance}}</p>
<h2>Estimated costs for this billing period</h2>
<p>{{:month_to_date_usage}}</p>    
`;

let htmlBillingHistory = `
<tr class="billing-item">
    <td class="date">{{:date}}</td>
    <td class="description">{{:description}}</td>
    <td class="amount text-right">{{:amount}}</td>
    <td class="download text-right">{{:download}}</td>
</tr>
`;

const getBillingBalance = async () => {
    try {
        const {data:balance} = await dots.customer.getBalance();

        let billingBallance = $('#billing-balance');
        billingBallance.empty();

        let billingBallanceContent= $.templates(htmlBillingBalance);
        let nillingBalanceStatus = billingBallanceContent.render(balance);
        billingBallance.append(nillingBalanceStatus);
    } catch (error) {
        let messageContent = $('#messageContent');
        let alertMessage = $.templates(htmlAlertMessage);
        let msg = {
            title: 'Command getBalance failed!',
            text: 'Please check you DigitalOcean API key.',
            error: error
        };
        messageContent.append(alertMessage.render(msg));
    }
};

const getBillingHistory = async () => {
    try {
        const input = {
            per_page: 10,
        };
        const {data:{billing_history}} = await dots.customer.listBillingHistory(input);

        // TODO: Rewrite to jsViews helper.
        billing_history.forEach(prepareBillingData);
        function prepareBillingData(item) {
            item.date = moment(item.date).format('MMM DD, YYYY');
            if (item.amount < 0) {
                item.amount = '-$' + (item.amount * -1);
            }
            else {
                item.amount = '$' + item.amount;
            }
            item.download = '';
            if (item.type == 'Invoice') {
                item.description = '<a href="https://cloud.digitalocean.com/account/billing/' + item.invoice_id + '" target="_blank">' + item.description + '</a>';
                item.download = 'Download: <a rel="noopener noreferrer" target="_blank" href="https://cloud.digitalocean.com/billing/' + item.invoice_id + '.pdf">PDF</a> • <a rel="noopener noreferrer" target="_blank" href="https://cloud.digitalocean.com/billing/' + item.invoice_id + '.csv">CSV</a>';
            }
        }

        let billingHistoryTable = $('#tableBillingHistory');
        billingHistoryTable.empty();

        let billingHistoryRow = $.templates(htmlBillingHistory);
        let billingHistoryRows = billingHistoryRow.render(billing_history);
        billingHistoryTable.append(billingHistoryRows);
    } catch (error) {
        let messageContent = $('#messageContent');
        let alertMessage = $.templates(htmlAlertMessage);
        let msg = {
            title: 'Command listBillingHistory failed!',
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

    $('#account-billing-tab').on('click', function(){
        getBillingBalance();
        getBillingHistory();
    });

});
