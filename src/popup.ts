import * as $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.js';
import * as jsrender from 'jsrender';
import './droplets/droplets';

let count = 0;

$(function() {
  // const queryInfo = {
  //   active: true,
  //   currentWindow: true
  // };

  // chrome.tabs.query(queryInfo, function(tabs) {
  //   $('#url').text(tabs[0].url);
  //   $('#time').text(moment().format('YYYY-MM-DD HH:mm:ss'));
  // });

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
