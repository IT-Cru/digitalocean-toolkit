import * as $ from 'jquery';

let htmlAppAbout = `
<h1>About DigitalOcean ToolKit</h1>
<p>With the DigitalOcean ToolKit browser extension it is possible to manage your DigitalOcean resources via APIv2 of DigitalOcean.</p>
<p>This extension provides currently following features:</p>
<ul>
  <li>List and manage your droplets</li>
  <li>List and manage your billings</li>
  <li>Display current balance state</li>
  <li>Display current account limits</li>
</ul>
<p>More features are in planning. Please visit support page to get more information.</p>
<p>&copy; Copyright 2020 by <a href="https://it-cru.de/?utm_source=do_toolkit&utm_medium=copyright" title="Click here to go to website of IT-Cru.de - Das IT-Gewächs" target="_blank">IT-Cru.de</a></p>
<p class="small text-muted">All brand names, product names, abbreviations and logos used on these pages are the property of the companies / groups concerned and are recognized as protected.</p>
`;

export const getAppAbout = async () => {
    let appAboutContainer = $('#appAboutContainer');
    appAboutContainer.empty();

    let aboutContent= $.templates(htmlAppAbout);
    let about = aboutContent.render();
    appAboutContainer.append(about);
};
