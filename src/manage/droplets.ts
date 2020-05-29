import * as $ from 'jquery';
import * as moment from 'moment';
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
                <a class="droplet-dashboard dropdown-item small" href="https://cloud.digitalocean.com/droplets/{{:id}}" target="_blank">Open Dashboard</a>
                <div class="dropdown-divider"></div>
                <button class="droplet-reboot dropdown-item small" type="button" data-droplet-id="{{:id}}"><i class="fas fa-sync"></i> Reboot</button>
                <button class="droplet-shutdown dropdown-item small" type="button" data-droplet-id="{{:id}}"><i class="fas fa-power-off"></i> Shutdown</button>
                <div class="dropdown-divider"></div>
                <button class="droplet-power-cycle dropdown-item small" type="button" data-droplet-id="{{:id}}"><i class="fas fa-exclamation-triangle"></i> Power CYCLE</button>
                <button class="droplet-power-off dropdown-item small" type="button" data-droplet-id="{{:id}}"><i class="fas fa-exclamation-triangle"></i> Power OFF</button>
                <button class="droplet-power-on dropdown-item small" type="button" data-droplet-id="{{:id}}"><i class="fas fa-exclamation-triangle"></i> Power ON</button>
            </div>
        </div>
    </td>
</tr>
`;

const getDropletList = async () => {
    try {
        const input = {
            per_page: 20,
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

        // TODO: Find a better way to do this on one function.
        let powerCycleButtons = $('.droplet-power-cycle');
        powerCycleButtons.each(function( index, powerCycleButton ){
            powerCycleButton.addEventListener('click', function(event){
                let dropletID = parseInt($(event.target).data('droplet-id'));
                powerCycleDroplet(dropletID);
            });
        });
        let powerOffButtons = $('.droplet-power-off');
        powerOffButtons.each(function( index, powerOffButton ){
            powerOffButton.addEventListener('click', function(event){
                let dropletID = parseInt($(event.target).data('droplet-id'));
                powerOffDroplet(dropletID);
            });
        });
        let powerOnButtons = $('.droplet-power-on');
        powerOnButtons.each(function( index, powerOnButton ){
            powerOnButton.addEventListener('click', function(event){
                let dropletID = parseInt($(event.target).data('droplet-id'));
                powerOnDroplet(dropletID);
            });
        });
        let rebootButtons = $('.droplet-reboot');
        rebootButtons.each(function( index, rebootButton ){
            rebootButton.addEventListener('click', function(event){
                let dropletID = parseInt($(event.target).data('droplet-id'));
                rebootDroplet(dropletID);
            });
        });
        let shutdownButtons = $('.droplet-shutdown');
        shutdownButtons.each(function( index, shutdownButton ){
            shutdownButton.addEventListener('click', function(event){
                let dropletID = parseInt($(event.target).data('droplet-id'));
                shutdownDroplet(dropletID);
            });
        });
    } catch (error) {
        let messageContent = $('#messageContent');
        let alertMessage = $.templates(htmlAlertMessage);
        let msg = {
            title: 'Command listDroplets failed!',
            text: 'Please check you DigitalOcean API key.',
            error: error
        };
        tracking.exception(msg['title']);
        messageContent.append(alertMessage.render(msg));
    }
};

const powerCycleDroplet = async (dropletID) => {
    tracking.event('Droplets', 'Click', { eventLabel: 'Power cycle droplet' });
    try {
        const input = {
            droplet_id: parseInt(dropletID),
        };
        const {data:{action}} = await dots.droplet.powerCycleDroplet(input);
    } catch (error) {
        let messageContent = $('#messageContent');
        let alertMessage = $.templates(htmlAlertMessage);
        let msg = {
            title: 'Command powerCycleDroplet failed!',
            text: 'Please check you DigitalOcean API key.',
            error: error
        };
        tracking.exception(msg['title']);
        messageContent.append(alertMessage.render(msg));
    }
};

const powerOffDroplet = async (dropletID) => {
    tracking.event('Droplets', 'Click', { eventLabel: 'Power off droplet' });
    try {
        const input = {
            droplet_id: parseInt(dropletID),
        };
        const {data:{action}} = await dots.droplet.powerOffDroplet(input);
    } catch (error) {
        let messageContent = $('#messageContent');
        let alertMessage = $.templates(htmlAlertMessage);
        let msg = {
            title: 'Command powerOffDroplet failed!',
            text: 'Please check you DigitalOcean API key.',
            error: error
        };
        tracking.exception(msg['title']);
        messageContent.append(alertMessage.render(msg));
    }
};

const powerOnDroplet = async (dropletID) => {
    tracking.event('Droplets', 'Click', { eventLabel: 'Power on droplet' });
    try {
        const input = {
            droplet_id: parseInt(dropletID),
        };
        const {data:{action}} = await dots.droplet.powerOnDroplet(input);
    } catch (error) {
        let messageContent = $('#messageContent');
        let alertMessage = $.templates(htmlAlertMessage);
        let msg = {
            title: 'Command powerOnDroplet failed!',
            text: 'Please check you DigitalOcean API key.',
            error: error
        };
        tracking.exception(msg['title']);
        messageContent.append(alertMessage.render(msg));
    }
};

const rebootDroplet = async (dropletID) => {
    tracking.event('Droplets', 'Click', { eventLabel: 'Reboot droplet' });
    try {
        const input = {
            droplet_id: parseInt(dropletID),
        };
        const {data:{action}} = await dots.droplet.rebootDroplet(input);
    } catch (error) {
        let messageContent = $('#messageContent');
        let alertMessage = $.templates(htmlAlertMessage);
        let msg = {
            title: 'Command rebootDroplet failed!',
            text: 'Please check you DigitalOcean API key.',
            error: error
        };
        tracking.exception(msg['title']);
        messageContent.append(alertMessage.render(msg));
    }
};

const shutdownDroplet = async (dropletID) => {
    tracking.event('Droplets', 'Click', { eventLabel: 'Shutdown droplet' });
    try {
        const input = {
            droplet_id: parseInt(dropletID),
        };
        const {data:{action}} = await dots.droplet.shutdownDroplet(input);
    } catch (error) {
        let messageContent = $('#messageContent');
        let alertMessage = $.templates(htmlAlertMessage);
        let msg = {
            title: 'Command shutdownDroplet failed!',
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

    $('#droplets-tab').on('click', function(){
        tracking.set('page', '/manage/droplets');
        tracking.set('title', 'Droplets');
        tracking.pageview();
        getDropletList();
    });

});
