import * as $ from 'jquery';

let htmlAppHelp = `
<h1>Help for DigitalOcean ToolKit</h1>
<h2>Create DigitalOcean acount</h2>
<p>To use DigitalOcean ToolKit browser extension you need a DigitalOcean account. If you already have an account, you can directly go to next step "Prepare ToolKit...".</p>
<ol>
  <li>Create your own DigitalOcean account.</li>
  <li>Verify your new created account.</li>
</ol>
<p>Get your own DigitalOcean account <a href="https://m.do.co/c/1439b3e5bf3a" target="_blank">here</a>.</p>
<h2>Prepare ToolKit for using DigitalOcean API</h2>
<p>To use DigitalOcean ToolKit browser extension you need a personal access token with read and write permissions.</p>
<ol>
  <li>Create your personal access token for example named as "ToolKit".</li>
  <li>Copy "ToolKit" personal access token.</li>
  <li>Open option dialog of DigitalOcean ToolKit browser extension.</li>
  <li>Paste copied personal access token into <em>API access token</em> field.</li>
  <li>Save your settings.</li>
</ol>
<p>Get your personal access token for DigitalOcean API <a href="https://cloud.digitalocean.com/settings/api/tokens" target="_blank">here</a>.</p>
`;

export const getAppHelp = async () => {
    let appHelpContainer = $('#appHelpContainer');
    appHelpContainer.empty();

    let helpContent= $.templates(htmlAppHelp);
    let help = helpContent.render();
    appHelpContainer.append(help);
};
