const casas = document.querySelectorAll(".casa");
const mensagem = document.getElementById("mensagem");

let jogador = "X";
let jogoAtivo = true;

const vitorias = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

casas.forEach(casa => {
    casa.addEventListener("click", jogar);
});

function jogar(e){

    const casa = e.target;

    if(casa.textContent != "" || !jogoAtivo)
        return;

    casa.textContent = jogador;

    if(verificarVitoria()){
        mensagem.textContent = "🎉 Jogador " + jogador + " venceu!";
        jogoAtivo = false;
        return;
    }

    if([...casas].every(c => c.textContent != "")){
        mensagem.textContent = "Empate!";
        jogoAtivo = false;
        return;
    }

    jogador = jogador == "X" ? "O" : "X";
    mensagem.textContent = "Vez do jogador " + jogador;
}

function verificarVitoria(){

    return vitorias.some(combinacao => {

        return combinacao.every(indice =>
            casas[indice].textContent == jogador
        );

    });

}

function reiniciar(){

    casas.forEach(casa => casa.textContent = "");

    jogador = "X";
    jogoAtivo = true;

    mensagem.textContent = "Vez do jogador X";

}