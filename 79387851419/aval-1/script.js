// ALTERAR O TEMA DO BLOG

const botaoTema =
    document.getElementById("botaoTema");


botaoTema.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "modo-escuro"
        );

    }
);



// MOSTRAR UMA MENSAGEM

const botaoMensagem =
    document.getElementById(
        "botaoMensagem"
    );


const mensagem =
    document.getElementById(
        "mensagem"
    );


botaoMensagem.addEventListener(
    "click",
    function() {

        mensagem.textContent =
            "Olá! Obrigada por visitar o blog da Gabriela!";

    }
);



// COLOCAR O ANO ATUAL NO RODAPÉ

const anoAtual =
    document.getElementById(
        "anoAtual"
    );


anoAtual.textContent =
    new Date().getFullYear();