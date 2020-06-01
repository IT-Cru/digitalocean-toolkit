import * as $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.js';
import * as jsrender from 'jsrender';
import './manage/droplets';
import './account/billing';
import './account/limits';
import {tracking} from './utils/tracking/tracking';

let count = 0;

$(function() {

  tracking.pageview('/');

  // Migrate old API key to new one.
  chrome.storage.sync.get('do_manager_personal_access_token', function(obj) {
    if (obj['do_manager_personal_access_token'] !== undefined) {
      chrome.storage.sync.set({apiAccessToken: obj['do_manager_personal_access_token']});
      chrome.storage.sync.remove('do_manager_personal_access_token');
    }
  });

  // TODO: Find a better way to integrate jsRender.
  jsrender($);

});
