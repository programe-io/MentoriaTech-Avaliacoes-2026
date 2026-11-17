
function tocarMusica(nome) {

    const mensagem = document.getElementById("mensagem-musica");

    mensagem.innerText =
        "🎵 Você selecionou a faixa: " + nome;

    mensagem.style.color = "#c084fc";

    mensagem.style.fontSize = "20px";
}
