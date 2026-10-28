
const botao = document.querySelector("#botao");
const mensagem = document.querySelector("#mensagem");

const frases = [
    "Vanessa, você é maravilhosa! 💗",
    "Que seu dia seja cheio de alegria! 🎀",
    "Nunca deixe de brilhar! ✨",
    "Você merece um mundo de coisas boas! 🌸",
    "Espalhe amor por onde passar! 💕"
];

botao.addEventListener("click", function() {
    const indice = Math.floor(Math.random() * frases.length);
    mensagem.textContent = frases[indice];
});
