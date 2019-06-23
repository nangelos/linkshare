// browser.webNavigation.onHistoryStateUpdated.addListener(
//   details => {
//     broser.tabs.executeScript(null, { file: 'pagetotelegram.js' });
//   }
// );

// const openPage = () => {
//   browser.tabs.create({
//     url: `http://www.espn.com`,
//   });
// };
console.log('In the background.js script');

const sendLink = () => {
  let linkUrl;
  const querying = browser.tabs.query({
    active: true,
  });
  // querying.then(tabs => {
  //   for (tab in tabs) {
  //     console.log(tabs[tab]);
  //   }
  // });
  querying.then(res => {
    linkUrl = res[0].url;
    console.log(linkUrl);
    //now need to send along the linkUrl to Telegram
  });
};

browser.browserAction.onClicked.addListener(sendLink);

// const handleMessage = (message, sender, sendResponse) => {
//   if (message.url) {
//     sendToTelegram(message.url, sendResponse);
//     return true;
//   }
// };
// browser.runtime.onMessage.addListener(handleMessage);

// const sendToTelegram = (url, sendResponse) => {
//   let xhr = new XMLHttpRequest();
//   if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//     sendResponse();
//   }
// };
// xhr.open('GET', `https://getpocket.com/save?url=${url}`, true);
// xhr.send();
