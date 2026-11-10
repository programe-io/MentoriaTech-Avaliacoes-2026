
// MENSAGEM DE BOAS-VINDAS
function mensagem() {
    alert("Seja bem-vindo ao nosso site!");
}

// CADASTRO
function cadastrar(event) {
    event.preventDefault();

    // Pegar os valores dos campos
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;

    // Verificar os dados
    if (nome.trim() === "" || email.trim() === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // Mostrar resultado
    document.getElementById("resultado").textContent =
        "Parabéns, " + nome + "! Cadastro realizado com sucesso.";

    // Limpar formulário
    document.querySelector("form").reset();
}

// EFEITO DE MODO ESCURO
function modoEscuro() {
    document.body.classList.toggle("escuro");
}

// MOSTRAR DATA E HORA
function mostrarData() {
    let agora = new Date();

    alert(agora.toLocaleString("pt-BR"));
}

// CONTADOR DE CLIQUES
let contador = 0;

function contarCliques() {
    contador++;

    alert("Você clicou " + contador + " vezes!");
}

// MENSAGEM AO CARREGAR A PÁGINA
window.addEventListener("load", function() {
    console.log("Site carregado com sucesso!");
});
