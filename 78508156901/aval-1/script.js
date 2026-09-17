const mensagens = [
    "Você é importante e sua vida tem valor. 💛",
    "Cuide de você com carinho todos os dias. 🌻",
    "Uma caminhada pode ser um pequeno passo para cuidar do seu bem-estar. 🚶",
    "Não tenha medo de pedir ajuda quando precisar. 🤝",
    "Você não precisa enfrentar tudo sozinho(a). 💛",
    "Reserve um momento do dia para cuidar de você. 🌿",
    "Cada pequeno passo também é uma conquista! 🏃",
    "Falar sobre o que sentimos pode ajudar. 💬"
];

function mostrarMensagem() {
    const mensagem = document.getElementById("mensagem");
    const numero = Math.floor(Math.random() * mensagens.length);

    mensagem.textContent = mensagens[numero];
}