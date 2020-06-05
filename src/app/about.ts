import * as $ from 'jquery';

let htmlAppAbout = `
<h1>About DigitalOcean ToolKit</h1>
<p>With the DigitalOcean ToolKit browser extension it is currently possible to manage your droplets via APIv2 of DigitalOcean.</p>
<h2>Initial development</h2>
<p>Initial development was done by github user <a href="https://github.com/jasonswan" tagret="_blank">jasonswan</a> under project name <a href="https://github.com/jasonswan/digitalocean-toolbox" target="_blank">digitalocean-toolbox</a>. The old DigitalOcean Toolbox only supports APIv1.</p>
<p class="text-muted">&copy; Copyright 2020 by <a href="https://it-cru.de/?utm_source=do_toolkit&utm_medium=copyright" title="Click here to go to website of IT-Cru.de - Das IT-Gewächs" target="_blank">IT-Cru.de</a></p>
<p class="small text-muted">All brand names, product names, abbreviations and logos used on these pages are the property of the companies / groups concerned and are recognized as protected.</p>
`;

export const getAppAbout = async () => {
    let appAboutContainer = $('#appAboutContainer');
    appAboutContainer.empty();

    let aboutContent= $.templates(htmlAppAbout);
    let about = aboutContent.render();
    appAboutContainer.append(about);
};
