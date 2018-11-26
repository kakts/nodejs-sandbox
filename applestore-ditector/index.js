'use strict';

const https = require('https');
const parse5 = require('parse5');
const puppe = require('puppeteer');

const lib = require('./lib');
(async() => {
  try {
    const browser = await puppe.launch();
    const page = await browser.newPage();

    const test = await lib.fetch(page, 'https://itunes.apple.com/jp/app/%E3%83%94%E3%82%B0%E3%83%91%E3%83%BC%E3%83%86%E3%82%A3/id966099615?mt=8');
    browser.close();
  } catch (e) {
    console.error(e);
  }
})();

module.exports = lib;