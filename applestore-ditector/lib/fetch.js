module.exports = async function(page, url) {
  console.log("t", url)
  await page.goto(url);

  let appElm = await page.$eval('.product-header__title', (_node) => {

    const titleData = _node.innerText;
    const splittedTitleData = titleData.split(' ');
    const obj = {
      title: splittedTitleData[0],
      badge: splittedTitleData[1]
    }
    return obj;
  });
  console.log(appElm)

  let versionElm = await page.$eval('.version-history__items', (dd) => {
    const nodeList = document.querySelectorAll('.version-history__item');
    const list = [];
    const obj = {
      latestVersion: '',
      versions: []
    };
    nodeList.forEach(_node => {
      let versionNode = _node.querySelector('.version-history__item__version-number');
      const version = versionNode.innerText;
      if (!obj.latestVersion) {
        obj.latestVersion = version
      }
      obj.versions.push(version);
    });
    return obj;
  });

  return {
    versionInfo: versionElm,
    appInfo: appElm
  };
}
