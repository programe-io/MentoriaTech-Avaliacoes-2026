// BOTÃO DA SEÇÃO PRINCIPAL

const botaoMensagem = document.getElementById("botaoMensagem");

const mensagem = document.getElementById("mensagem");

botaoMensagem.addEventListener("click", function () {

    mensagem.textContent =
        "🎮 Divirta-se explorando o mundo dos jogos!";

});


// BOTÕES DOS JOGOS

const botoesJogos = document.querySelectorAll(".botao-jogo");

botoesJogos.forEach(function (botao) {

    botao.addEventListener("click", function () {

        alert("Você selecionou um jogo!");

    });

});


// BOTÃO DE CONTATO

const botaoContato = document.getElementById("botaoContato");

botaoContato.addEventListener("click", function () {

    alert(
        "Obrigado pelo contato! Em breve teremos um formulário aqui."
    );

});