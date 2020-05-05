import * as $ from 'jquery';

// Saves options to chrome.storage.sync.
function save_options() {
  var color = $('#color').val();
  var likesColor = $('#like').prop('checked');
  var apiAccessToken = $('#api_access_token').val();
  chrome.storage.sync.set({
    favoriteColor: color,
    likesColor: likesColor,
    apiAccessToken: apiAccessToken
  }, function() {
    // Update status to let user know options were saved.
    var status = $('#status');
    status.text('Options saved.');
    setTimeout(function() {
      status.text('');
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    favoriteColor: 'red',
    likesColor: true,
    apiAccessToken: ''
  }, function(items: {favoriteColor, likesColor, apiAccessToken}) {
    $('#color').val(items.favoriteColor);
    $('#like').prop('checked', items.likesColor);
    $('#api_access_token').val(items.apiAccessToken);
  });
}

$('#save').click(save_options);
$(restore_options); // document.addEventListener('DOMContentLoaded', restore_options);
