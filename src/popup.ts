import * as $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './css/app.css';
import * as jsrender from 'jsrender';
import './manage/droplets';
import './account/billing';
import './account/limits';
import {getAppAbout} from './app/about';
import {getAppHelp} from "./app/help";
import {getAppSupport} from './app/support';
import {tracking} from './utils/tracking/tracking';

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

  let aboutTab = $('#appAboutTab');
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
  });

  getAppAbout();
  (aboutTab as any).tab('show');

});
