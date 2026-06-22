// ================= GERADOR DE RECOMENDAÇÃO ALEATÓRIA =================
const bancoDeJogos = [
    "The Witcher 3: Wild Hunt (RPG)",
    "Valorant (Ação/FPS)",
    "Age of Empires IV (Estratégia)",
    "Hades (Ação/Roguelike)",
    "Baldur's Gate 3 (RPG)",
    "Minecraft (Sandbox)"
];

function recomendarJogo() {
    const indiceAleatorio = Math.floor(Math.random() * bancoDeJogos.length);
    const jogoSugerido = bancoDeJogos[indiceAleatorio];
    document.getElementById('resultado-recomendacao').innerText = `🎯 Sugestão: Você deveria jogar: ${jogoSugerido}!`;
}

// ================= MINIJOGO ARCADE (CLICKER) =================
let pontos = 0;
let tempo = 10;
let jogoAtivo = false;
let recorde = 0;

function iniciarJogo() {
    pontos = 0;
    tempo = 10;
    jogoAtivo = true;
    
    document.getElementById('txt-pontos').innerText = pontos;
    document.getElementById('txt-tempo').innerText = tempo;
    document.getElementById('btn-clicker').disabled = false;
    document.getElementById('btn-clicker').innerText = "CLIQUE!";
    document.getElementById('btn-start-game').style.display = "none";

    const cronometro = setInterval(() => {
        tempo--;
        document.getElementById('txt-tempo').innerText = tempo;

        if (tempo <= 0) {
            clearInterval(cronometro);
            finalizarJogo();
        }
    }, 1000);
}

function contarClique() {
    if (jogoAtivo) {
        pontos++;
        document.getElementById('txt-pontos').innerText = pontos;
    }
}

function finalizarJogo() {
    jogoAtivo = false;
    document.getElementById('btn-clicker').disabled = true;
    document.getElementById('btn-clicker').innerText = "Fim!";
    document.getElementById('btn-start-game').style.display = "inline-block";
    document.getElementById('btn-start-game').innerText = "Jogar Novamente";

    if (pontos > recorde) {
        recorde = pontos;
        document.getElementById('msg-highscore').innerText = `🏆 Novo Recorde do Portal: ${recorde} cliques!`;
    }
}

// ================= COMUNIDADE (CHAT ENVIO REAL) =================
function enviarMensagem() {
    const campoTexto = document.getElementById('input-chat');
    const mensagem = campoTexto.value.trim();

    if (mensagem !== "") {
        const caixaMensagens = document.getElementById('caixa-mensagens');
        
        const novaLinhaMsg = document.createElement('div');
        novaLinhaMsg.classList.add('msg');
        novaLinhaMsg.innerHTML = `<span class="user">@Você:</span> ${mensagem}`;
        
        caixaMensagens.appendChild(novaLinhaMsg);
        campoTexto.value = "";
        caixaMensagens.scrollTop = caixaMensagens.scrollHeight;
    }
}
