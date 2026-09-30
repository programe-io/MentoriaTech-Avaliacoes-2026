/* =========================
   TROCA DE ABAS
========================= */

function mostrarAba(nome) {

    const abas = document.querySelectorAll(".aba");

    abas.forEach(function(aba) {

        aba.classList.remove("ativa");

    });


    const abaSelecionada =
        document.getElementById(nome);

    if (abaSelecionada) {

        abaSelecionada.classList.add("ativa");

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    document
        .getElementById("menu")
        .classList.remove("aberto");
}


/* =========================
   MENU MOBILE
========================= */

function abrirMenu() {

    const menu =
        document.getElementById("menu");

    menu.classList.toggle("aberto");
}


/* =========================
   MODAL PERSONAGEM
========================= */

function abrirPersonagem(
    nome,
    cargo,
    grupo,
    descricao
) {

    document.getElementById(
        "modalNome"
    ).textContent = nome;


    document.getElementById(
        "modalCargo"
    ).textContent = cargo;


    document.getElementById(
        "modalGrupo"
    ).textContent =
        "Grupo: " + grupo;


    document.getElementById(
        "modalDescricao"
    ).textContent = descricao;


    document.getElementById(
        "modalPersonagem"
    ).classList.add("aberto");
}


function fecharModal() {

    document
        .getElementById("modalPersonagem")
        .classList.remove("aberto");
}


/* =========================
   MODAL UNIVERSOS
========================= */

function mostrarInfo(
    titulo,
    texto
) {

    document.getElementById(
        "infoTitulo"
    ).textContent = titulo;


    document.getElementById(
        "infoTexto"
    ).textContent = texto;


    document
        .getElementById("modalInfo")
        .classList.add("aberto");
}


function fecharInfo() {

    document
        .getElementById("modalInfo")
        .classList.remove("aberto");
}


/* =========================
   FECHAR MODAIS CLICANDO FORA
========================= */

window.onclick = function(event) {

    const modalPersonagem =
        document.getElementById(
            "modalPersonagem"
        );

    const modalInfo =
        document.getElementById(
            "modalInfo"
        );


    if (event.target === modalPersonagem) {

        fecharModal();

    }


    if (event.target === modalInfo) {

        fecharInfo();

    }

};


/* =========================
   FILTRO PERSONAGENS
========================= */

function filtrar(categoria) {

    const personagens =
        document.querySelectorAll(
            ".personagem"
        );


    personagens.forEach(function(personagem) {

        if (categoria === "todos") {

            personagem.style.display =
                "flex";

        }

        else if (
            personagem.classList.contains(
                categoria
            )
        ) {

            personagem.style.display =
                "flex";

        }

        else {

            personagem.style.display =
                "none";

        }

    });

}


/* =========================
   PESQUISA
========================= */

function pesquisarPersonagens() {

    const pesquisa =
        document
            .getElementById("pesquisa")
            .value
            .toLowerCase();


    const personagens =
        document.querySelectorAll(
            ".personagem"
        );


    personagens.forEach(function(personagem) {

        const nome =
            personagem
                .getAttribute("data-nome")
                .toLowerCase();


        if (nome.includes(pesquisa)) {

            personagem.style.display =
                "flex";

        }

        else {

            personagem.style.display =
                "none";

        }

    });

}


/* =========================
   CURIOSIDADES
========================= */

function revelar(elemento) {

    elemento.classList.toggle(
        "revelado"
    );


    const titulo =
        elemento.querySelector("h3");


    if (
        elemento.classList.contains(
            "revelado"
        )
    ) {

        titulo.textContent =
            "Informação revelada!";

    }

    else {

        titulo.textContent =
            "Clique para revelar";

    }

}


/* =========================
   QUIZ
========================= */

let perguntaAtual = 0;

let pontos = 0;


const perguntas = [

    {
        pergunta:
            "Quem interpreta Victor von Doom?",

        respostas: [
            "Chris Hemsworth",
            "Robert Downey Jr.",
            "Pedro Pascal",
            "Paul Rudd"
        ],

        correta: 1
    },


    {
        pergunta:
            "Quem dirige Avengers: Doomsday?",

        respostas: [
            "James Gunn",
            "Jon Favreau",
            "Anthony e Joe Russo",
            "Ryan Coogler"
        ],

        correta: 2
    },


    {
        pergunta:
            "Quando está prevista a estreia?",

        respostas: [
            "18 de dezembro de 2026",
            "7 de maio de 2027",
            "25 de julho de 2026",
            "1 de maio de 2025"
        ],

        correta: 0
    },


    {
        pergunta:
            "Qual personagem é conhecido como Doutor Destino?",

        respostas: [
            "Victor von Doom",
            "Steve Rogers",
            "Reed Richards",
            "Erik Lehnsherr"
        ],

        correta: 0
    },


    {
        pergunta:
            "Qual grupo está relacionado a Professor X?",

        respostas: [
            "Avengers",
            "Thunderbolts",
            "X-Men",
            "Guardians"
        ],

        correta: 2
    }

];


function carregarPergunta() {

    const pergunta =
        perguntas[perguntaAtual];


    document.getElementById(
        "pergunta"
    ).textContent =
        pergunta.pergunta;


    const botoes =
        document.querySelectorAll(
            ".quiz-box > button:not(.btn)"
        );


    botoes.forEach(
        function(botao, indice) {

            botao.textContent =
                String.fromCharCode(
                    65 + indice
                ) +
                ") " +
                pergunta.respostas[indice];

        }
    );


    document.getElementById(
        "resultado"
    ).textContent = "";

}


function responder(opcao) {

    const pergunta =
        perguntas[perguntaAtual];


    const resultado =
        document.getElementById(
            "resultado"
        );


    if (
        opcao === pergunta.correta
    ) {

        resultado.textContent =
            "✅ Resposta correta!";

        pontos++;

    }

    else {

        resultado.textContent =
            "❌ Resposta incorreta.";

    }

}


function proximaPergunta() {

    perguntaAtual++;


    if (
        perguntaAtual >=
        perguntas.length
    ) {

        document.getElementById(
            "pergunta"
        ).textContent =
            "Quiz finalizado!";


        document.getElementById(
            "resultado"
        ).textContent =
            "Você acertou " +
            pontos +
            " de " +
            perguntas.length +
            " perguntas.";


        document
            .querySelectorAll(
                ".quiz-box > button:not(.btn)"
            )
            .forEach(function(botao) {

                botao.style.display =
                    "none";

            });


        return;

    }


    carregarPergunta();

}


/* =========================
   VOLTAR AO TOPO
========================= */

function voltarTopo() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================
   INICIAR QUIZ
========================= */

carregarPergunta();