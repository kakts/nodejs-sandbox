const fetch = require('./fetch.js');
const puppeteer = require('puppeteer');
class appleStore {

  constructor(url) {
    if (!url) {
      throw new Error("Url is empty.");
    }
    this.url = url;
  }

  async fetch() {
    let browser;
    if (!this.page) {
      browser = await puppeteer.launch();
      this.page = await browser.newPage();
    } 
    console.log(this);
    this.versionInfo = await fetch(this.page, this.url);
    browser && browser.close();
  }

  getVersionInfo() {
    if (this.versionInfo) {
      return this.versionInfo;
    }
    console.log(this.url)
    this.versionInfo = fetch.getTest(this.page, this.url);
  }
}

(async() => {
  
  try {
    var a = new appleStore('https://itunes.apple.com/jp/app/%E3%83%94%E3%82%B0%E3%83%91%E3%83%BC%E3%83%86%E3%82%A3/id966099615?mt=8');

    var b = await a.fetch();
  } catch(e) {
    console.log(e);
  }
  return;
})();
