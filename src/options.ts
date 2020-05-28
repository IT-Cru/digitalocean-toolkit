import * as $ from 'jquery';
import {tracking} from './utils/tracking/tracking';

// Saves options to chrome.storage.sync.
function save_options() {
  tracking.event('Options', 'Click', { eventLabel: 'Save options' });

  let apiAccessToken = $('#api_access_token').val();
  chrome.storage.sync.set({
    apiAccessToken: apiAccessToken
  }, function() {

    // Update status to let user know options were saved.
    let status = $('#status');
    status.text('Options saved.');
    setTimeout(function() {
      status.text('');
    }, 1500);
  });
}

// Saves options from chrome.storage.sync.
function restore_options() {
  chrome.storage.sync.get({
    apiAccessToken: ''
  }, function(items: {apiAccessToken}) {
    $('#api_access_token').val(items.apiAccessToken);
  });
}

tracking.pageview('/options');

$('#save').on('click', save_options);
$(restore_options); // document.addEventListener('DOMContentLoaded', restore_options);
