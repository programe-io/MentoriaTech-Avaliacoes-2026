const botoes = document.querySelectorAll("button");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        alert("Pacote reservado com sucesso! Nossa equipe entrará em contato.");
    });
});