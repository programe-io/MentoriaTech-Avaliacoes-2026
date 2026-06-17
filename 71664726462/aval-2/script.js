const botao = document.getElementById("btnMostrar");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", () => {
    mensagem.innerHTML =
        "Você está visualizando uma galeria criada com HTML, CSS e JavaScript!";
});