function mostrarMensagem() {
    alert("Olá! Você clicou no botão.");
}

let nome = prompt("Digite seu nome:");

if (nome) {
    console.log("Bem-vindo(a), " + nome + "!");
}