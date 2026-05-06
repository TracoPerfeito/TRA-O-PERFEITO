function openChat(contactName) {
    document.querySelector('.chat-container-principal').classList.remove('show-chat-list');
    document.getElementById('chat-with').textContent = contactName;
}

function toggleChatList() {
    document.querySelector('.chat-container-principal').classList.toggle('show-chat-list');
}

function toggleChatList() {
const chatContainer = document.querySelector('.chat-container-principal');
chatContainer.classList.toggle('show-chat-list'); // Alterna a classe para mostrar ou esconder
}
