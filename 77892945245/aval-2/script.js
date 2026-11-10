// Função para Curtir / Descurtir posts
function toggleLike(icon) {
    const post = icon.closest('.post');
    const likesCountEl = post.querySelector('.post-likes span');
    let currentLikes = parseInt(likesCountEl.innerText.replace(/\./g, ''));

    if (icon.classList.contains('fa-regular')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid', 'fa-heart');
        currentLikes += 1;
    } else {
        icon.classList.remove('fa-solid', 'fa-heart');
        icon.classList.add('fa-regular');
        currentLikes -= 1;
    }
    likesCountEl.innerText = currentLikes.toLocaleString('pt-BR');
}

// Função para Seguir / Seguindo
function toggleFollow(button) {
    if (button.innerText === 'Seguir') {
        button.innerText = 'Seguindo';
        button.classList.add('following');
        button.style.color = '#8e8e8e';
    } else {
        button.innerText = 'Seguir';
        button.classList.remove('following');
        button.style.color = '#0095f6';
    }
}

// Funções do Direct / Mensagens
function abrirMensagens() {
    document.getElementById('modalMessages').style.display = 'flex';
}

function fecharMensagens() {
    document.getElementById('modalMessages').style.display = 'none';
}

function enviarMensagem() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    if (text === '') return;

    const chatBody = document.getElementById('chatBody');
    
    // Cria a bolha de mensagem enviada
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble sent';
    bubble.innerText = text;
    chatBody.appendChild(bubble);

    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Simula resposta automática após 1 segundo
    setTimeout(() => {
        const reply = document.createElement('div');
        reply.className = 'chat-bubble received';
        reply.innerText = 'Mensagem recebida com sucesso! 🚀';
        chatBody.appendChild(reply);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

function verificarEnter(event) {
    if (event.key === 'Enter') {
        enviarMensagem();
    }
}