import * as $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.js';
import * as jsrender from 'jsrender';
import './manage/droplets';
import './account/billing';
import './account/limits';

let count = 0;

$(function() {

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
