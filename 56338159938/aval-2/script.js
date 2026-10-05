// Alternar entre modo escuro e modo claro

const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("click", function () {
    document.body.classList.toggle("modo-claro");

    if (document.body.classList.contains("modo-claro")) {
        botaoTema.textContent = "Modo Escuro";
    } else {
        botaoTema.textContent = "Modo Claro";
    }
});

// Escolher carros ou supermotos

const botaoCarro = document.getElementById("carro");
const botaoMoto = document.getElementById("moto");
const resultado = document.getElementById("resultado");

botaoCarro.addEventListener("click", function () {
    resultado.textContent =
        "Você escolheu carros esportivos! Potência e velocidade!";
});

botaoMoto.addEventListener("click", function () {
    resultado.textContent =
        "Você escolheu supermotos! Adrenalina sobre duas rodas!";
});