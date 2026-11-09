
const botaoSeguir = document.getElementById("seguir");
const botaoMensagem = document.getElementById("mensagem");

let seguindo = false;
let seguidores = 15200;

botaoSeguir.addEventListener("click", function() {

    seguindo = !seguindo;

    if (seguindo) {
        botaoSeguir.textContent = "Seguindo";
        botaoSeguir.style.backgroundColor = "#777";
        seguidores++;
    } else {
        botaoSeguir.textContent = "Seguir";
        botaoSeguir.style.backgroundColor = "#2875c7";
        seguidores--;
    }

});

botaoMensagem.addEventListener("click", function() {
    alert("Olá! Bem-vindo ao Universo da Turma da Mônica! ❤️");
});

// Clique nas publicações
const publicacoes = document.querySelectorAll(".publicacoes img");

publicacoes.forEach(function(post) {

    post.addEventListener("click", function() {
        alert("Você selecionou uma publicação da Turma da Mônica!");
    });

});
