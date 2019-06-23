console.log('In pagetotelegram.js');
const sendBackgroundToTelegram = () => {
  browser.runtime.sendMessage({ url: window.location.href }).then(function() {
    document
      .getElementById('telegram-share-btn')
      .insertAdjacentHTML(
        'afterend',
        "<div id='pagetotelegram_notification' style='text-align: center;padding: 10px 0px 28px;'>This article has been sent to Telegram!</div>"
      );
    setTimeout(() => {
      document.getElementById('pagetotelegram_notification').remove();
    }, 2000);
  });
};

document.getElementById('telegram-share-btn').addEventListener('click'),
  () => {
    document
      .getElementById('telegram-share-btn')
      .insertAdjacentHTML(
        'afterend',
        "<div id='link-description'> <textarea>Add description of link!</textarea> </div>"
      );
    if (window.confirm('Do you want to send this to Telegram?')) {
      sendBackgroundToTelegram();
    }
  };
