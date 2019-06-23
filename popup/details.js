const getCurrentWindowTabs = () => {
  // return browser.tabs.query({ currentWindow: true });
  return browser.tabs.query({ active: true })
}
const listTabs = () => {
  getCurrentWindowTabs().then(tab => {
    console.log('here is the tab: ', tab)
    const activeTab = tab[0]
    let tabsList = document.getElementById('tabs-list')
    let currentTabs = document.createDocumentFragment()

    tabsList.textContent = ''

    //Tab title
    const tabTitle = document.createElement('h4')
    tabTitle.textContent = activeTab.title || activeTab.id

    //Input box
    const textInput = document.createElement('textarea')
    textInput.className = 'detail-box'
    textInput.name = 'message'
    textInput.rows = '4'
    textInput.placeholder = 'Add description (optional)'

    const chatName = document.createElement('select')
    chatName.id = 'chat-name'

    const options = browser.storage.sync.get('chats')
    const makeOptions = arr => {
      const { chats } = arr
      const existingChats = Array.isArray(chats) ? chats : []
      console.log(existingChats)
      existingChats.map(opt => {
        let option = document.createElement('option')
        option.appendChild(document.createTextNode(opt.text))
        option.value = opt.value
        chatName.appendChild(option)
      })
    }
    options.then(makeOptions)

    //Send Button
    const sendButton = document.createElement('input')
    sendButton.className = 'button send'
    sendButton.type = 'submit'
    sendButton.value = 'Send URL'

    const chatButton = document.createElement('input')
    chatButton.className = 'button chat'
    chatButton.type = 'button'
    chatButton.value = 'Edit Chats'
    chatButton.addEventListener('click', () => {
      const form = document.querySelector('form')
      form.style.display = 'flex'
    })
    //Url to send along
    let textUrl = document.createElement('p')
    textUrl.textContent = activeTab.url

    currentTabs.appendChild(tabTitle)
    currentTabs.appendChild(textUrl)
    currentTabs.appendChild(chatName)
    currentTabs.appendChild(textInput)
    currentTabs.appendChild(sendButton)
    currentTabs.appendChild(chatButton)

    tabsList.appendChild(currentTabs)
  })
}

function saveChat(e) {
  e.preventDefault()
  const chatId = document.querySelector('#chatId')
  const chatName = document.querySelector('#chatName')
  const options = browser.storage.sync.get('chats')
  options.then(appendChats)

  function appendChats(result) {
    const { chats } = result
    const existingChats = Array.isArray(chats) ? chats : []
    browser.storage.sync
      .set({
        chats: [
          ...existingChats,
          { text: chatName.value, value: chatId.value },
        ],
      })
      .then(listTabs)
      .then(hideForm)
  }
}

function clearChats(e) {
  e.preventDefault()
  browser.storage.sync
    .clear()
    .then(listTabs)
    .then(hideForm)
}

function hideForm() {
  document.querySelector('form').style.display = 'none'
  document.querySelector('#chatId').value = ''
  document.querySelector('#chatName').value = ''
}

document.addEventListener('DOMContentLoaded', listTabs)
document.querySelector('form').addEventListener('submit', saveChat)
document.querySelector('#clear').addEventListener('click', clearChats)
