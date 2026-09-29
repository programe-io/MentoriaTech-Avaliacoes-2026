// Mensagem do botão da página inicial

function mostrarMensagem() {

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent =
        "Bem-vindo ao meu blog! 🖤 Espero que você goste de conhecer um pouco sobre mim! ✨";

}


// Efeito simples quando as imagens são clicadas

const imagens = document.querySelectorAll(".imagem-card img");

imagens.forEach(function(imagem) {

    imagem.addEventListener("click", function() {

        imagem.classList.toggle("selecionada");

    });

});