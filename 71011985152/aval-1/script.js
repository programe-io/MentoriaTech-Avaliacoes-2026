```javascript
// script.js
let curtidas = 0;

function mudarMensagem() {
    const mensagens = [
        "🌿 Preserve o meio ambiente!",
        "🚮 Lixo no lixo, escola limpa!",
        "🌍 Pequenas atitudes fazem grande diferença!",
        "♻️ Recicle e ajude o planeta!",
        "🌳 Cuide da natureza hoje!"
    ];

    let aleatorio = Math.floor(Math.random() * mensagens.length);
    document.getElementById("mensagem").innerText = mensagens[aleatorio];
}

function curtir() {
    curtidas++;
    document.getElementById("contador").innerText = "Curtidas: " + curtidas;
}

function desafio() {
    const desafios = [
        "🏫 Sua turma consegue ficar 1 dia sem jogar lixo no chão?",
        "🧹 Desafio: recolha 3 lixos que não são seus!",
        "♻️ Separe o lixo reciclável hoje!",
        "👥 Convide um amigo para cuidar do ambiente!",
        "🌱 Faça sua parte hoje!"
    ];

    let aleatorio = Math.floor(Math.random() * desafios.length);
    document.getElementById("desafioTexto").innerText = desafios[aleatorio];
}
```
