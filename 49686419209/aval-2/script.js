// JavaScript para o Blog de Antonio Victor

// Mensagem de boas-vindas
window.onload = function () {
    alert("Bem-vindo ao Blog de Antonio Victor!");
};

// Função para exibir uma mensagem motivacional
function mostrarMensagem() {
    const mensagens = [
        "Antonio Victor acredita que a tecnologia transforma o mundo.",
        "Continue estudando e desenvolvendo novas habilidades!",
        "A programação abre portas para grandes oportunidades.",
        "A inovação começa com a curiosidade."
    ];

    const indice = Math.floor(Math.random() * mensagens.length);

    document.getElementById("mensagem").innerHTML = mensagens[indice];
}

// Função para exibir a data atual
function mostrarData() {
    const data = new Date();

    const textoData =
        data.getDate() + "/" +
        (data.getMonth() + 1) + "/" +
        data.getFullYear();

    document.getElementById("data").innerHTML =
        "Data de hoje: " + textoData;
}

// Contador de visitas simulado
let visitas = 0;

function contarVisita() {
    visitas++;
    document.getElementById("visitas").innerHTML =
        "Número de visitas: " + visitas;
}

// Executa as funções ao carregar a página
mostrarData();
contarVisita();
