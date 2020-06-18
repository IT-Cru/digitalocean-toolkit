import * as $ from 'jquery';
import * as moment from 'moment';
import {createApiClient} from "dots-wrapper";
import {currencyFormatter} from "../utils/formatter/currency";
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

let htmlBillingUsage = `
<a id="accountUsage" class="nav-link small px-2 py-0" title="Estimated costs for this billing period" data-toggle="tab" data-target="#accountBilling" role="tab" href="#accountBilling">
  <div>Usage</div>
  <div>{{:month_to_date_usage}}</div>
</a>
`

let htmlBillingBalance = `
<div class="card p-3 mb-3">
  <h2>Remaining account credits</h2>
  <p class="h1">{{:month_to_date_balance}}</p>
</div>
<div class="card p-3">
  <h2>Estimated costs for this billing period</h2>
  <p>This is the current costs for your usage this billing period.</p>
  <p class="h1">{{:month_to_date_usage}}</p>
</div>
`;

let htmlBillingHistory = `
<tr class="billing-item">
    <td class="date">{{:date}}</td>
    <td class="description">{{:description}}</td>
    <td class="amount text-right">{{:amount}}</td>
    <td class="download text-right">{{:download}}</td>
</tr>
`;

export const getBillingBalance = async () => {
    try {
        const {data:balance} = await dots.customer.getBalance();

        balance.month_to_date_balance = currencyFormatter.format(Number(balance.month_to_date_balance) * -1);
        balance.month_to_date_usage = currencyFormatter.format(Number(balance.month_to_date_usage));

        let billingUsageContainer = $('#billingUsageContainer');
        billingUsageContainer.empty();

        let billingUsageContent= $.templates(htmlBillingUsage);
        let billingUsageStatus = billingUsageContent.render(balance);
        billingUsageContainer.append(billingUsageStatus);

        let billingBalance = $('#billingBalance');
        billingBalance.empty();

        let billingBalanceContent= $.templates(htmlBillingBalance);
        let billingBalanceStatus = billingBalanceContent.render(balance);
        billingBalance.append(billingBalanceStatus);

        let billingAccountUsageButton = $('#accountUsage');
        billingAccountUsageButton.each(function( index, accountUsage ){
            accountUsage.addEventListener('click', function(event){
                tracking.set('page', '/account/billing');
                tracking.set('title', 'Billing');
                tracking.pageview();
                getBillingHistory();
            });
        });
    } catch (error) {
        let messageContent = $('#messageContent');
        let alertMessage = $.templates(htmlAlertMessage);
        let msg = {
            title: 'Command getBalance failed!',
            text: 'Please check you DigitalOcean API key.',
            error: error
        };
        tracking.exception(msg['title']);
        messageContent.append(alertMessage.render(msg));
    }
};

export const getBillingHistory = async () => {
    try {
        const input = {
            per_page: 10,
        };
        const {data:{billing_history}} = await dots.customer.listBillingHistory(input);

        // TODO: Rewrite to jsViews helper.
        billing_history.forEach(prepareBillingData);
        function prepareBillingData(item) {
            item.date = moment(item.date).format('MMM DD, YYYY');
            item.amount = currencyFormatter.format(Number(item.amount));
            item.download = '';
            if (item.type == 'Invoice') {
                item.description = '<a href="https://cloud.digitalocean.com/account/billing/' + item.invoice_id + '" target="_blank">' + item.description + '</a>';
                item.download = '<a rel="noopener noreferrer" target="_blank" href="https://cloud.digitalocean.com/billing/' + item.invoice_id + '.pdf">PDF</a> • <a rel="noopener noreferrer" target="_blank" href="https://cloud.digitalocean.com/billing/' + item.invoice_id + '.csv">CSV</a>';
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
        tracking.exception(msg['title']);
        messageContent.append(alertMessage.render(msg));
    }
};

$(function() {

    chrome.storage.sync.get('apiAccessToken', function(obj) {
        dots = createApiClient({token: obj['apiAccessToken']});
    });

});
