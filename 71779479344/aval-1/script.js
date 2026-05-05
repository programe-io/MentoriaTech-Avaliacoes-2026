// contador de cliques
let contador = 0;

// função chamada ao clicar no botão
function clicarBotao() {
    contador++;

    // atualiza o texto na tela
    document.getElementById("contador").innerText = 
        "Você clicou " + contador + " vezes";

    // mensagem dinâmica
    let mensagem = document.getElementById("mensagem");

    if (contador === 5) {
        mensagem.innerText = "🔥 Tá viciado em clicar hein!";
    } else if (contador === 10) {
        mensagem.innerText = "🚀 Caramba, 10 cliques!";
    } else if (contador >= 20) {
        mensagem.innerText = "💀 Já pode parar kkkkk";
    }
}