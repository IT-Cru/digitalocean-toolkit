import * as $ from 'jquery';

let htmlAppSupport = `
<h1>Support DigitalOcean ToolKit</h1>
<p>If you like the DigitalOcean ToolKit browser extension and want more features you can support in different ways.</p>
<ul>
  <li>Use my <a href="https://m.do.co/c/1439b3e5bf3a" target="_blank">DigitalOcean referral link</a> to create new DigitalOcean accounts.</li>
  <li>Use <a href="https://paypal.me/ITCru" title="go to Paypal.me of IT-Cru" target="_blank">paypal.me</a> to donate for further development of DigitalOcean ToolKit.</li>
  <li>Leave a positive rating or review in browser extension store.</li>
  <li>Blog about the DigitalOcean ToolKit browser extension on your website.</li>
  <li>Share the DigitalOcean ToolKit extension with other DigitalOcean users you know.</li>
</ul>
<h2>Bug reports and feature requests</h2>
<p>Bug reports and feature requests are handled on Github. Before you create a new issue please take a look in current issue queue.<br>
Current issues: <a href="https://github.com/IT-Cru/digitalocean-toolkit/issues" target="_blank">https://github.com/IT-Cru/digitalocean-toolkit/issues</a></p>
<p>Please use following link to create a new bug report or feature request:<br>
Create new issue: <a href="https://github.com/IT-Cru/digitalocean-toolkit/issues/new" target="_blank">https://github.com/IT-Cru/digitalocean-toolkit/issues/new</a></p>
`;

export const getAppSupport = async () => {
    let appSupportContainer = $('#appSupportContainer');
    appSupportContainer.empty();

    let supportContent= $.templates(htmlAppSupport);
    let support = supportContent.render();
    appSupportContainer.append(support);
};
