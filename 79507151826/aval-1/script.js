// Mensagem no console
console.log("Bem-vindo ao meu site!");

// Função de saudação
function saudacao() {
    alert("Olá! Seja bem-vindo! 🚀");
}

// Contador de cliques
let cliques = 0;

function contarCliques() {
    cliques++;

    document.getElementById("contador").innerText =
        "Cliques: " + cliques;
}

// Mudar a cor de fundo
function mudarCor() {
    const cores = ["#000000", "#190061", "#240046", "#003049", "#14213d"];

    const cor = cores[Math.floor(Math.random() * cores.length)];

    document.body.style.background = cor;
}

// Mostrar data e hora
function mostrarHora() {
    const agora = new Date();

    alert(agora.toLocaleString("pt-BR"));
}