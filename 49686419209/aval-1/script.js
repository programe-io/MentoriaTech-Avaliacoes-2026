const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function() {
    mensagem.innerHTML =
        "🎮 Bem-vindo ao GameBlog! O próximo lançamento pode ser o seu jogo favorito!";
});