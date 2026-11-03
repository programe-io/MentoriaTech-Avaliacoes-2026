const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const clearChatBtn = document.getElementById('clear-chat');

// Banco de respostas simuladas da IA para tornar a experiência interativa
const respostasIA = [
    "Essa é uma excelente pergunta! Do ponto de vista técnico, envolve conceitos fundamentais de lógica e desenvolvimento.",
    "Compreendi o seu questionamento. Para resolver isso, recomendo estruturar o problema em etapas menores.",
    "Interessante! A inteligência artificial processa esse tipo de dado analisando padrões e contextos.",
    "Com certeza! Posso te ajudar a aprofundar esse assunto. Quer exemplos práticos?",
    "Essa é uma dúvida comum. A resposta curta é: sim, dependendo de como você aplica a regra no código.",
    "Estou processando sua solicitação... Em resumo, a prática constante é o melhor caminho para dominar esse tema."
];

// Função para adicionar uma mensagem ao chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');

    let avatarIcon = sender === 'user' ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-robot"></i>';

    messageDiv.innerHTML = `
        <div class="message-avatar">${avatarIcon}</div>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;

    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // Rolar para o final
}

// Função para simular a resposta da IA após um breve delay
function gerarRespostaIA(perguntaDoUsuario) {
    // Adiciona um indicador visual de "pensando..." (opcional)
    setTimeout(() => {
        // Escolhe uma resposta aleatória da lista ou personaliza se encontrar palavras-chave
        let resposta = "";
        const perguntaLower = perguntaDoUsuario.toLowerCase();

        if (perguntaLower.includes("olá") || perguntaLower.includes("oi")) {
            resposta = "Olá! Como posso ajudar nos seus estudos ou projetos hoje?";
        } else if (perguntaLower.includes("seu nome")) {
            resposta = "Eu sou o NexusAI, seu assistente virtual integrado.";
        } else if (perguntaLower.includes("javascript") || perguntaLower.includes("html") || perguntaLower.includes("css")) {
            resposta = "Programação web é fascinante! HTML estrutura, CSS estiliza e JavaScript dá comportamento dinâmico à página.";
        } else {
            // Escolhe aleatoriamente do array
            const randomIndex = Math.floor(Math.random() * respostasIA.length);
            resposta = respostasIA[randomIndex];
        }

        addMessage(resposta, 'ai');
    }, 800); // 0.8 segundos de atraso simulando processamento
}

// Evento de envio por clique no botão
sendBtn.addEventListener('click', () => {
    const texto = userInput.value.trim();
    if (texto !== "") {
        addMessage(texto, 'user');
        userInput.value = "";
        gerarRespostaIA(texto);
    }
});

// Evento de envio por tecla Enter
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

// Botão para limpar o chat
clearChatBtn.addEventListener('click', () => {
    chatBody.innerHTML = `
        <div class="message ai-message">
            <div class="message-avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="message-content">
                <p>Conversa reiniciada. O que mais você gostaria de perguntar?</p>
            </div>
        </div>
    `;
});