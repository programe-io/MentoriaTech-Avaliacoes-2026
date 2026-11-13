
/* =================================
   BLOG PESSOAL - A BELA E A FERA
================================= */

// Eloá Virgínia
const meuNome = "Eloá Virgínia";

// MOSTRAR NOME NO BLOG
const nomeElementos = document.querySelectorAll(".meu-nome");

nomeElementos.forEach(elemento => {
    elemento.textContent = meuNome;
});

// MENSAGEM DE BOAS-VINDAS
function boasVindas() {
    alert(
        "Seja bem-vindo(a) ao meu mundo encantado, " +
        meuNome + "! 🌹"
    );
}

// BOTÃO DE BOAS-VINDAS
const botaoInicio = document.getElementById("boas-vindas");

if (botaoInicio) {
    botaoInicio.addEventListener("click", boasVindas);
}

// RELÓGIO
function atualizarRelogio() {
    const relogio = document.getElementById("relogio");

    if (!relogio) return;

    const agora = new Date();

    relogio.textContent = agora.toLocaleTimeString("pt-BR");
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();

// DATA ATUAL
const dataElement = document.getElementById("data");

if (dataElement) {
    dataElement.textContent =
        new Date().toLocaleDateString("pt-BR");
}

// FRASES ENCANTADAS
const frases = [
    "A beleza está no interior. 🌹",
    "O amor verdadeiro transforma tudo. ❤️",
    "Nunca deixe de acreditar na magia. ✨",
    "Cada coração tem sua própria história. 💛",
    "A magia começa quando acreditamos nos sonhos."
];

let indiceFrase = 0;

const botaoFrase = document.getElementById("nova-frase");
const fraseElement = document.getElementById("frase");

if (botaoFrase && fraseElement) {
    botaoFrase.addEventListener("click", () => {
        indiceFrase = (indiceFrase + 1) % frases.length;
        fraseElement.textContent = frases[indiceFrase];
    });
}

// TEMA CLARO E ESCURO
const botaoTema = document.getElementById("tema");

if (botaoTema) {
    botaoTema.addEventListener("click", () => {
        document.body.classList.toggle("tema-claro");

        botaoTema.textContent =
            document.body.classList.contains("tema-claro")
            ? "🌙 Tema escuro"
            : "☀️ Tema claro";
    });
}

// ROSA ENCANTADA
const rosa = document.getElementById("rosa");

if (rosa) {
    rosa.addEventListener("click", () => {
        rosa.classList.toggle("rosa-magica");

        alert("Que a magia do amor esteja sempre presente! 🌹");
    });
}

// MENSAGEM NO CONSOLE
console.log("Bem-vindo ao blog de " + meuNome);
console.log("Um mundo cheio de magia e amor! 🌹");
