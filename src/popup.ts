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

  // TODO: Find a better way to integrate jsRender.
  jsrender($);

  chrome.browserAction.setBadgeText({text: count.toString()});
  $('#countUp').click(()=>{
    chrome.browserAction.setBadgeText({text: (++count).toString()});
  });

  $('#countReset').click(()=>{
    count = 0;
    chrome.browserAction.setBadgeText({text: (count).toString()});
  });

});
