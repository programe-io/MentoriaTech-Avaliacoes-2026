// Mensagem ao carregar o site
window.onload = function() {
    alert("Bem-vindo ao site da Raimunda Neta! 💖");
}

// Função para mostrar mensagem aleatória
function mostrarMensagem() {
    const mensagens = [
        "Eu amo cozinhar 🍳",
        "Dormir é meu hobby favorito 😴",
        "Festejar é tudo! 🎉",
        "A vida é melhor com comida 😋"
    ];

    const aleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];
    document.getElementById("mensagem").innerText = aleatoria;
}