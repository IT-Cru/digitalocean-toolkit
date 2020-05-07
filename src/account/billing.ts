import * as $ from 'jquery';
import {createApiClient} from "dots-wrapper";
import * as moment from "moment";

$(function() {

    let dots = undefined;

    let htmlAlertMessage = `
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Command listDroplets failed!</strong> Please check you DigitalOcean API key. {{:error}}
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
    <td class="date align-middle">{{:date}}</td>
    <td class="description align-middle">{{:description}}</td>
    <td class="amount align-middle">{{:amount}}</td>
    <td class="actions align-middle">
    </td>
</tr>
    `;

    const billingBalance = async () => {
        try {
            const {data:balance} = await dots.customer.getBalance();

            let billingBallance = $('#billing-balance');
            billingBallance.empty();

            let billingBallanceContent= $.templates(htmlBillingBalance);
            let nillingBalanceStatus = billingBallanceContent.render(balance);
            billingBallance.append(nillingBalanceStatus);
        } catch (error) {
            let alertContent = $('#alertContent');
            let alertMessage = $.templates(htmlAlertMessage);
            let alertMessages = alertMessage.render({error: error});
            alertContent.append(alertMessages);
        }
    };

    const billingHistory = async () => {
        try {
            const input = {
                per_page: 10, // number
            };
            const {data:{billing_history}} = await dots.customer.listBillingHistory(input);

            // TODO: Rewrite to jsViews helper.
            billing_history.forEach(prepareBillingHistroy);
            function prepareBillingHistroy(item) {
                item.date = moment(item.date).format('MMM DD, YYYY');
            }

            let billingHistoryTable = $('#tableBillingHistory');
            billingHistoryTable.empty();

            let billingHistoryRow = $.templates(htmlBillingHistory);
            let billingHistoryRows = billingHistoryRow.render(billing_history);
            billingHistoryTable.append(billingHistoryRows);
        } catch (error) {
            let alertContent = $('#alertContent');
            let alertMessage = $.templates(htmlAlertMessage);
            let alertMessages = alertMessage.render({error: error});
            alertContent.append(alertMessages);
        }
    };

    chrome.storage.sync.get('apiAccessToken', function(obj) {
        dots = createApiClient({token: obj['apiAccessToken']});
    });

    $('#account-billing-tab').on('click', function(){
        billingBalance();
        billingHistory();
    });

});
