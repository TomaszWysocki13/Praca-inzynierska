const puppeteer = require('puppeteer');

async function crawlScript(params) {
  let browser;
  let page;
  let exists = false;

  const uri = params && params.uri ? params.uri : process.argv.slice(2)[0] || '';
  const sid = params && params.sid ? params.sid : process.argv.slice(3)[0] || '';

  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });
  } catch (e) {
    console.log(`Error to launch puppeteer: ${e.message}`);
  }

  try {
    page = await browser.newPage();
  } catch (e) {
    console.log(`Error to open new puppeteer tab: ${e.message}`);
  }

  try {
    await page.goto(uri);
  } catch (e) {
    console.log(`Error on go to page: ${e.message}`);
  }

  // eslint-disable-next-line no-undef
  const body = await page.evaluate(() => document.body.innerHTML);

  if (body.indexOf(`/track/${sid}`) !== -1) {
    exists = true;
  }

  browser.close();

  return { exists };
}

export default crawlScript;
