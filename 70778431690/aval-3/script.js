// 1. Criando uma variável (guardando uma informação)
let nomeUsuario = "Visitante";

// 2. Criando uma função (um bloco de código que faz uma ação)
function darBoasVindas() {
    alert("Olá, " + nomeUsuario + "! Bem-vindo ao meu site interativo.");
}

// 3. Modificando o HTML dinamicamente através do JavaScript
document.querySelector("h1").innerText = "Texto alterado pelo JS!";