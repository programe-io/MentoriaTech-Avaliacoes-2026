
// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Bem-vindo ao EcoVida!");
});

// BOTÃO DE MENSAGEM
function mostrarMensagem() {
    alert("🌎 Cuide do planeta! O futuro depende das nossas atitudes.");
}

// MODO ESCURO
function alternarTema() {
    document.body.classList.toggle("modo-escuro");
}

// DICAS AMBIENTAIS
const dicas = [
    "💧 Economize água todos os dias!",
    "🌳 Plante árvores e preserve as florestas!",
    "♻️ Separe o lixo para reciclagem!",
    "💡 Apague as luzes quando não estiver usando!",
    "🚯 Nunca jogue lixo nos rios e nas ruas!",
    "🐾 Proteja os animais e a natureza!"
];

let indice = 0;

function mostrarDica() {
    document.getElementById("dica").textContent =
        dicas[indice];

    indice++;

    if (indice >= dicas.length) {
        indice = 0;
    }
}

// CONTADOR DE VISITAS
let visitas = Number(localStorage.getItem("visitas")) || 0;

visitas++;

localStorage.setItem("visitas", visitas);

const contador = document.getElementById("visitas");

if (contador) {
    contador.textContent = visitas;
}

// MENSAGEM NO CONSOLE
console.log("EcoVida: pequenas atitudes transformam o mundo!");
