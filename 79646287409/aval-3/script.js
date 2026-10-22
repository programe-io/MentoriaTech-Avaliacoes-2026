// Selecionar os elementos da página
const carro = document.querySelector(".carro");
const carro2 = document.querySelector(".carro2");
const botao = document.querySelector("button");
const pista = document.querySelector(".pista");

let corridaAtiva = false;
let posicao1 = 0;
let posicao2 = 0;
let velocidade1 = 0;
let velocidade2 = 0;
let animacao;

// Iniciar a corrida
botao.addEventListener("click", function () {
    if (corridaAtiva) return;

    corridaAtiva = true;
    posicao1 = 0;
    posicao2 = 0;

    velocidade1 = Math.random() * 3 + 2;
    velocidade2 = Math.random() * 3 + 2;

    carro.style.top = "10px";
    carro2.style.top = "10px";

    botao.textContent = "CORRIDA EM ANDAMENTO!";

    moverCarros();
});

// Movimentar os carros
function moverCarros() {
    const limite = pista.clientHeight - 75;

    function atualizar() {
        posicao1 += velocidade1;
        posicao2 += velocidade2;

        carro.style.top = posicao1 + "px";
        carro2.style.top = posicao2 + "px";

        if (posicao1 >= limite || posicao2 >= limite) {
            corridaAtiva = false;
            cancelAnimationFrame(animacao);

            if (posicao1 >= limite && posicao2 >= limite) {
                alert("Empate!");
            } else if (posicao1 >= limite) {
                alert("🏆 O carro vermelho venceu!");
            } else {
                alert("🏆 O segundo carro venceu!");
            }

            botao.textContent = "CORRER NOVAMENTE";
            return;
        }

        animacao = requestAnimationFrame(atualizar);
    }

    atualizar();
}