// Mensagem de boas-vindas
window.addEventListener("load", function () {
    alert("Olá! Seja bem-vindo(a) à página da Fernanda 💙");
});


// Botão para mostrar uma mensagem
function mostrarMensagem() {
    const mensagem = document.getElementById("mensagem");

    mensagem.innerHTML =
        "Acredito que com dedicação, esforço e persistência, posso alcançar meu sonho de cursar Medicina! 🩺💙";

    mensagem.style.display = "block";
}


// Efeito de digitação no título
const texto = "Olá, eu sou a Fernanda! 💙";
const titulo = document.querySelector("header h1");

let indice = 0;

titulo.innerHTML = "";

function escreverTexto() {
    if (indice < texto.length) {
        titulo.innerHTML += texto.charAt(indice);
        indice++;

        setTimeout(escreverTexto, 80);
    }
}

escreverTexto();


// Mensagem no console
console.log("Página da Fernanda carregada com sucesso!");
console.log("17 anos | 2º ano do Ensino Médio | Sonho: Medicina 🩺");
