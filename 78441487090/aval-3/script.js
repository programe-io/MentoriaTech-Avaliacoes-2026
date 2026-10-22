
const carro = document.querySelector(".carro");
const botao = document.querySelector(".botao");

let velocidade = 0;
let posicao = 5;
let correndo = false;
let animacao;

botao.textContent = "Começar corrida";

botao.addEventListener("click", function(event) {
    event.preventDefault();

    if (!correndo) {
        correndo = true;
        velocidade = 1;
        botao.textContent = "Acelerar! 🏎️";

        animacao = setInterval(() => {
            posicao += velocidade;

            if (posicao >= 80) {
                posicao = 5;
            }

            carro.style.left = posicao + "%";
        }, 100);
    } else {
        velocidade += 1;

        if (velocidade > 5) {
            velocidade = 1;
        }

        botao.textContent = "Acelerar! Velocidade " + velocidade;
    }
});
