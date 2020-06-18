import * as $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './css/app.css';
import * as jsrender from 'jsrender';
import './manage/droplets';
import {getBillingBalance} from "./account/billing";
import {getBillingHistory} from "./account/billing";
import './account/limits';
import {getAppAbout} from './app/about';
import {getAppHelp} from "./app/help";
import {getAppSupport} from './app/support';
import {tracking} from './utils/tracking/tracking';

$(function() {

  let apiAccessToken = undefined;

  function getAccessToken() {
    chrome.storage.sync.get('apiAccessToken', storageData => {
      apiAccessToken = storageData
    });
  }

  console.log(apiAccessToken);
  getAccessToken();
  console.log(apiAccessToken);

  tracking.pageview('/');

  // Migrate old API key to new one.
  chrome.storage.local.get('do_manager_personal_access_token', function(obj) {
    if (obj['do_manager_personal_access_token'] !== undefined) {
      chrome.storage.sync.set({apiAccessToken: obj['do_manager_personal_access_token']});
      chrome.storage.local.remove('do_manager_personal_access_token');
    }
  });

  // TODO: Find a better way to integrate jsRender.
  jsrender($);

  let aboutTab = $('#appAboutTab');
  $('#accountBillingTab').on('click', function(){
    tracking.set('page', '/account/billing');
    tracking.set('title', 'Billing');
    tracking.pageview();
    getBillingHistory();
  });
  aboutTab.on('click', function(){
    tracking.set('page', '/app/about');
    tracking.set('title', 'About');
    tracking.pageview();
    getAppAbout();
  });
  $('#appHelpTab').on('click', function(){
    tracking.set('page', '/app/help');
    tracking.set('title', 'Help');
    tracking.pageview();
    getAppHelp();
  });
  $('#appSupportTab').on('click', function(){
    tracking.set('page', '/app/support');
    tracking.set('title', 'Support');
    tracking.pageview();
    getAppSupport();
  });

  $('.collapse').on('hide.bs.collapse', function () {
    $('.submenu .active').removeClass('active');
    $('#accountUsage.active').removeClass('active');
  });

  $(function() {
    getBillingBalance();
    getAppAbout();
    (aboutTab as any).tab('show');
  });

});
