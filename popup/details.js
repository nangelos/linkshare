const getCurrentWindowTabs = () => {
  // return browser.tabs.query({ currentWindow: true });
  return browser.tabs.query({ active: true })
}

const listTabs = () => {
  getCurrentWindowTabs().then(tab => {
    const currentTabs = document.createDocumentFragment()
    const activeTab = tab[0]
    const tabsList = document.getElementById('tabs-list')
    const tabTitle = document.createElement('h4')
    tabTitle.textContent = activeTab.title || activeTab.id

    const options = browser.storage.sync.get('chats')
    const chatName = document.querySelector('#chats')

    const makeOptions = arr => {
      const { chats } = arr
      const existingChats = Array.isArray(chats) ? chats : []
      existingChats.map(opt => {
        let option = document.createElement('option')
        option.appendChild(document.createTextNode(opt.text))
        option.value = opt.value
        chatName.appendChild(option)
      })
    }

    options.then(makeOptions)

    //Url to send along
    let textUrl = document.createElement('p')
    textUrl.textContent = activeTab.url
    currentTabs.appendChild(tabTitle)
    currentTabs.appendChild(textUrl)

    tabsList.appendChild(currentTabs)
  })
}

async function postLink(e) {
  e.preventDefault()
  const activeTab = await browser.tabs.query({ active: true })
  const telegramURL = await browser.storage.sync.get('telegramURL')
  const chat = document.querySelector('#myChats').value
  const linkText = activeTab[0].url
  const linkDesc = document.querySelector('#linkDesc').value

  const data = {
    message: {
      text: `${linkText}\n${linkDesc}`,
      chat: {
        id: chat,
      },
    },
  }
  console.log(data)

  fetch(telegramURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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
  document.querySelector('#editChat').style.display = 'none'
  document.querySelector('#chatId').value = ''
  document.querySelector('#chatName').value = ''
}

document.addEventListener('DOMContentLoaded', listTabs)
document.querySelector('#editChat').addEventListener('submit', saveChat)
document.querySelector('#clear').addEventListener('click', clearChats)
document.querySelector('#sendForm').addEventListener('submit', postLink)
document.querySelector('#editButton').addEventListener('click', () => {
  const editForm = document.querySelector('#editChat')
  editForm.style.display = 'flex'
})
