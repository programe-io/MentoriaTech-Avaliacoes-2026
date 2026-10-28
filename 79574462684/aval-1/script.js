
const botao = document.querySelector("#botao");
const mensagem = document.querySelector("#mensagem");

const frases = [
    "Rana, você é incrível! 💖",
    "Nunca desista dos seus sonhos! 🎀",
    "Seu brilho é único! ✨",
    "Você pode conquistar o mundo! 💗",
    "Acredite no seu potencial, princesa! 👑"
];

botao.addEventListener("click", function() {
    const indice = Math.floor(Math.random() * frases.length);
    mensagem.textContent = frases[indice];
});
