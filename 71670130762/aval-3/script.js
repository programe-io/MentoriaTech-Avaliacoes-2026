
    const resultado = document.getElementById("resultado");

    resultado.textContent =
        "Obrigado, " + nome +
        "! Sua mensagem foi recebida.";

    formulario.reset();

});

// Efeito nos cards de produtos
const produtos = document.querySelectorAll(".produto");

produtos.forEach(produto => {

    produto.addEventListener("mouseenter", function() {
        this.style.transition = "0.3s";
    });
    const resultado = document.getElementById("resultado");

    resultado.textContent =
        "Obrigado, " + nome +
        "! Sua mensagem foi recebida.";

    formulario.reset();

});

// Efeito nos cards de produtos
const produtos = document.querySelectorAll(".produto");

produtos.forEach(produto => {

    produto.addEventListener("mouseenter", function() {
        this.style.transition = "0.3s";
    });