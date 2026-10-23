
const botoesDetalhes = document.querySelectorAll(".detalhes");

botoesDetalhes.forEach((botao) => {
    botao.addEventListener("click", () => {
        const nomeCarro = botao.dataset.carro;

        alert(
            "Você escolheu: " + nomeCarro +
            "\n\nExplore esse estilo de carro rebaixado na Surbe Carros!"
        );
    });
});

const botaoSom = document.getElementById("botaoSom");

botaoSom.addEventListener("click", () => {
    alert(
        "🔊 SOM AUTOMOTIVO!\n\n" +
        "Subwoofers, amplificadores, caixas personalizadas " +
        "e muito grave para os amantes de som!"
    );
});

const botaoContato = document.getElementById("botaoContato");

botaoContato.addEventListener("click", () => {
    alert(
        "🚗 Bem-vindo à Surbe Carros!\n\n" +
        "Obrigado por visitar nosso site de carros rebaixados " +
        "e som automotivo."
    );
});

console.log("Surbe Carros carregado com sucesso!");
