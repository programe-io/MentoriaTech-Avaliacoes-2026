function mostrarMensagem() {
    alert("Olá! Você clicou no botão.");

    const titulo = document.querySelector("h1");
    titulo.textContent = "Obrigado por clicar!";

    const paragrafo = document.querySelector("p");
    paragrafo.textContent = "O conteúdo da página foi atualizado com JavaScript.";

    document.body.style.backgroundColor = "#d4edda";
}