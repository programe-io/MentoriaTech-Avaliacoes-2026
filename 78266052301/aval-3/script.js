// TURBO RACING - JAVASCRIPT

const carro1 = document.querySelector(".carro");
const carro2 = document.querySelector(".carro2");
const pista = document.querySelector(".pista");
const botao = document.querySelector("button");

let corridaAtiva = false;
let animacao;
let posicao1 = 10;
let posicao2 = 10;
let velocidade1 = 0;
let velocidade2 = 0;

// Iniciar a corrida
botao.addEventListener("click", iniciarCorrida);

function iniciarCorrida() {
    if (corridaAtiva) return;

    corridaAtiva = true;

    posicao1 = 10;
    posicao2 = 10;

    velocidade1 = Math.random() * 2 + 2;
    velocidade2 = Math.random() * 2 + 2;

    carro1.style.top = posicao1 + "px";
    carro2.style.top = posicao2 + "px";

    botao.textContent = "🏁 CORRIDA EM ANDAMENTO";

    moverCarros();
}

// Movimentar os carros
function moverCarros() {
    const limite = pista.clientHeight - carro1.offsetHeight - 10;

    function atualizar() {
        if (!corridaAtiva) return;

        posicao1 += velocidade1;
        posicao2 += velocidade2;

        carro1.style.top = posicao1 + "px";
        carro2.style.top = posicao2 + "px";

        // Verificar quem chegou primeiro
        if (posicao1 >= limite || posicao2 >= limite) {
            corridaAtiva = false;
            cancelAnimationFrame(animacao);

            if (posicao1 >= limite && posicao2 >= limite) {
                alert("🏆 A corrida terminou em empate!");
            } else if (posicao1 >= limite) {
                alert("🏆 O carro 1 venceu a corrida!");
            } else {
                alert("🏆 O carro 2 venceu a corrida!");
            }

            botao.textContent = "🔄 CORRER NOVAMENTE";
            return;
        }

        animacao = requestAnimationFrame(atualizar);
    }

    atualizar();
}