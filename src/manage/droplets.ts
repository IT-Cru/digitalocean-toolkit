import * as $ from 'jquery';
import * as moment from 'moment';
import {createApiClient} from "dots-wrapper";


$(function() {

    let dots = undefined;

    let htmlAlertMessage = `
<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>{{:title}}</strong> {{:text}} {{:error}}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true"><i class="fas fa-times-circle"></i></span>
    </button>
</div>
    `;

    let htmlDropletList = `
<tr class="droplet" id="{{:id}}">
    <td class="name align-middle">
        <div>{{:name}}</div>
        <div class="small text-muted">{{:vcpus}} CPUs / {{:memory}} GB / {{:disk}} GB Disk</div>
    </td>
    <td class="ip-address align-middle">{{:networks.v4[0].ip_address}}</td>
    <td class="created align-middle">{{:created_at}}</td>
    <td class="tags align-middle">{{:tags}}</td>
    <td class="actions align-middle">
        <div class="btn-group dropleft">
            <button class="btn small" id="dropdownMenuButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-tools small"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item small" href="https://cloud.digitalocean.com/droplets/{{:id}}" target="_blank">Open Dashboard</a>
                <div class="dropdown-divider"></div>
                <a class="droplet-reboot dropdown-item small" href="#" role="button" data-droplet-id="{{:id}}"><i class="fas fa-sync"></i> Reboot</a>
                <a class="dropdown-item small" href="#"><i class="fas fa-power-off"></i> Shutdown</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item small" href="#"><i class="fas fa-exclamation-triangle"></i> Power CYCLE</a>
                <a class="dropdown-item small" href="#"><i class="fas fa-exclamation-triangle"></i> Power OFF</a>
                <a class="dropdown-item small" href="#"><i class="fas fa-exclamation-triangle"></i> Power ON</a>
            </div>
        </div>
    </td>
</tr>
    `;

    const dropletsList = async () => {
        try {
            const input = {
                per_page: 20, // number
            };
            const {data:{droplets}} = await dots.droplet.listDroplets(input);

            // TODO: Rewrite to jsViews helper.
            droplets.forEach(prepareDropletData);
            function prepareDropletData(item) {
                item.created_at = moment(item.created_at).fromNow();
                item.memory = item.memory / 1024;
                item.tags = item.tags.join(", ");
            }

            // TODO: Add region.toString().toUpperCase() from region = droplet.region["slug"].
            let dropletsTable = $('#tableDroplets');
            dropletsTable.empty();

            let dropletRow = $.templates(htmlDropletList);
            let dropletsRows = dropletRow.render(droplets);
            dropletsTable.append(dropletsRows);
        } catch (error) {
            let messageContent = $('#messageContent');
            let alertMessage = $.templates(htmlAlertMessage);
            let msg = {
                title: 'Command listDroplets failed!',
                text: 'Please check you DigitalOcean API key.',
                error: error
            };
            messageContent.append(alertMessage.render(msg));
        }
    };

    const dropletReboot = async (dropletID) => {
        try {
            const input = {
                droplet_id: parseInt(dropletID),
            };
            const {data:{action}} = await dots.droplet.rebootDroplet(input);
            console.log(action);
        } catch (error) {
            let messageContent = $('#messageContent');
            let alertMessage = $.templates(htmlAlertMessage);
            let msg = {
                title: 'Command rebootDroplet failed!',
                text: 'Please check you DigitalOcean API key.',
                error: error
            };
            messageContent.append(alertMessage.render(msg));
        }
    };

    chrome.storage.sync.get('apiAccessToken', function(obj) {
        dots = createApiClient({token: obj['apiAccessToken']});
    });

    $('#droplets-tab').on('click', function(){
        dropletsList();
    });

    $('.droplet-reboot').on('click', function(){
        console.log('CLICK REBOOT');
        let dropletID = parseInt($(this).data('droplet-id'));
        console.log(dropletID);
        dropletReboot(dropletID);
    });

});