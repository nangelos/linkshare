browser.webNavigation.onHistoryStateUpdated.addListener(
  details => {
    broser.tabs.executeScript(null, { file: 'pagetotelegram.js' });
  } /*, {
  url: [{originAndPathMatches: '^.+://dev.to/.+/.+$'}]
}*/
);

const handleMessage = (message, sender, sendResponse) => {
  if (message.url) {
    sendToTelegram(message.url, sendResponse);
    return true;
  }
};
browser.runtime.onMessage.addListener(handleMessage);

const sendToTelegram = (url, sendResponse) => {
  let xhr = new XMLHttpRequest();
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    sendResponse();
  }
};
xhr.open('GET', `https://getpocket.com/save?url=${url}`, true);
xhr.send();
