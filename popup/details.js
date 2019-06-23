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
    let tabTitle = document.createElement('h4')
    tabTitle.textContent = activeTab.title || activeTab.id

    //Input box
    let textInput = document.createElement('textarea')
    textInput.className = 'detail-box'
    textInput.name = 'message'
    textInput.rows = '4'
    textInput.placeholder = 'Add description (optional)'

    let chatId = document.createElement('input')
    chatId.type = 'text'
    chatId.id = 'chat-id'
    chatId.name = 'chatId'
    chatId.placeholder = 'Enter Chat ID'

    let chatName = document.createElement('select')
    chatName.id = 'chat-name'
    let options = [
      { text: 'Option 1', value: 'option1' },
      { text: 'Option 2', value: 'option2' },
    ]
    const makeOptions = arr => {
      arr.map(opt => {
        let option = document.createElement('option')
        option.appendChild(document.createTextNode(opt.text))
        option.value = opt.value
        chatName.appendChild(option)
      })
    }
    makeOptions(options)

    //Send Button
    let sendButton = document.createElement('input')
    sendButton.className = 'send-button'
    sendButton.type = 'submit'
    sendButton.value = 'Send URL'

    const chatButton = document.createElement('input')
    chatButton.className = 'chat-button'
    chatButton.type = 'button'
    chatButton.value = 'Add Chat'
    //Url to send along
    let textUrl = document.createElement('p')
    textUrl.textContent = activeTab.url

    currentTabs.appendChild(tabTitle)
    currentTabs.appendChild(textUrl)
    currentTabs.appendChild(chatId)
    currentTabs.appendChild(chatName)
    currentTabs.appendChild(textInput)
    currentTabs.appendChild(sendButton)
    currentTabs.appendChild(chatButton)

    tabsList.appendChild(currentTabs)
  })
}

document.addEventListener('DOMContentLoaded', listTabs)
