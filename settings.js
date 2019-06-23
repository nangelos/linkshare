function saveURL(e) {
  e.preventDefault()
  browser.storage.sync.set({
    telegramURL: document.querySelector('#url').value,
  })
}

function restoreOptions() {
  const getURL = browser.storage.sync.get('telegramURL')
  getURL.then(setCurrentChoice)

  function setCurrentChoice(result) {
    document.querySelector('#url').value = result.telegramURL || ''
  }
}

document.addEventListener('DOMContentLoaded', restoreOptions)
document.querySelector('form').addEventListener('submit', saveURL)
