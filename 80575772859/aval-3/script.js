
/* ==========================
   GUARDIÕES DOS BIOMAS
   SISTEMA PRINCIPAL DO JOGO
========================== */

let pontos = 0;
let biomaAtual = "";
let missaoConcluida = false;

const concluidos = new Set();

/* ==========================
   BANCO DE MISSÕES
========================== */

const missoes = {

    "Amazonia": {
        animal: "🐆",
        titulo: "Salve a floresta!",
        descricao: "Áreas da floresta estão sendo desmatadas. Como você pode ajudar?",
        pergunta: "Qual atitude ajuda a proteger a Amazônia?",
        opcoes: [
            "Derrubar mais árvores",
            "Combater o desmatamento e plantar árvores",
            "Poluir os rios"
        ],
        correta: 1
    },

    "Cerrado": {
        animal: "🐺",
        titulo: "Proteja o lobo-guará!",
        descricao: "O Cerrado está perdendo sua vegetação natural.",
        pergunta: "O que devemos fazer para proteger o Cerrado?",
        opcoes: [
            "Destruir a vegetação",
            "Caçar animais",
            "Preservar a vegetação e evitar queimadas"
        ],
        correta: 2
    },

    "Pantanal": {
        animal: "🐊",
        titulo: "Salve os animais!",
        descricao: "Os incêndios ameaçam a vida dos animais do Pantanal.",
        pergunta: "Qual é a melhor atitude diante de uma queimada?",
        opcoes: [
            "Avisar as autoridades e equipes responsáveis",
            "Ignorar o incêndio",
            "Colocar fogo em outras áreas"
        ],
        correta: 0
    },

    "Mata Atlântica": {
        animal: "🦜",
        titulo: "Recupere a floresta!",
        descricao: "A Mata Atlântica precisa de áreas verdes recuperadas.",
        pergunta: "Como podemos ajudar esse bioma?",
        opcoes: [
            "Jogar lixo na floresta",
            "Plantar espécies nativas e proteger a vegetação",
            "Cortar árvores"
        ],
        correta: 1
    },

    "Caatinga": {
        animal: "🌵",
        titulo: "Proteja a água!",
        descricao: "A água é muito importante para os seres vivos da Caatinga.",
        pergunta: "Como podemos economizar água?",
        opcoes: [
            "Deixar torneiras abertas",
            "Desperdiçar água",
            "Evitar desperdícios e preservar as nascentes"
        ],
        correta: 2
    },

    "Pampa": {
        animal: "🦌",
        titulo: "Proteja os campos!",
        descricao: "Os campos naturais do Pampa precisam de conservação.",
        pergunta: "O que ajuda a preservar o Pampa?",
        opcoes: [
            "Conservar os campos naturais e a biodiversidade",
            "Destruir a vegetação nativa",
            "Poluir o solo"
        ],
        correta: 0
    }

};

/* ==========================
   TROCAR DE TELA
========================== */

function trocarTela(id) {

    document.querySelectorAll(".tela").forEach(tela => {
        tela.classList.remove("ativa");
    });

    document.getElementById(id).classList.add("ativa");
}

/* ==========================
   INICIAR JOGO
========================== */

function iniciarJogo() {

    trocarTela("mapa");

    atualizarBiomas();

}

/* ==========================
   VOLTAR PARA O INÍCIO
========================== */

function voltarInicio() {
    trocarTela("inicio");
}

/* ==========================
   ABRIR MAPA
========================== */

function voltarMapa() {

    if (concluidos.size === 6) {
        finalizarJogo();
        return;
    }

    trocarTela("mapa");
    atualizarBiomas();

}

/* ==========================
   ATUALIZAR BIOMAS
========================== */

function atualizarBiomas() {

    document.querySelectorAll(".bioma").forEach(botao => {

        const nome = botao.dataset.bioma;

        const finalizado = concluidos.has(nome);

        botao.disabled = finalizado;

        if (finalizado) {
            botao.style.background = "#cde8d0";
            botao.querySelector("small").innerText = "✓ Protegido!";
        } else {
            botao.style.background = "white";
            botao.querySelector("small").innerText =
                missoes[nome].titulo;
        }

    });

}

/* ==========================
   SELECIONAR UM BIOMA
========================== */

document.querySelectorAll(".bioma").forEach(botao => {

    botao.addEventListener("click", () => {

        const nome = botao.dataset.bioma;

        if (concluidos.has(nome)) return;

        abrirMissao(nome);

    });

});

/* ==========================
   ABRIR MISSÃO
========================== */

function abrirMissao(nome) {

    biomaAtual = nome;
    missaoConcluida = false;

    const missao = missoes[nome];

    document.getElementById("nomeBioma").innerText =
        "🌎 " + nome;

    document.getElementById("animal").innerText =
        missao.animal;

    document.getElementById("tituloMissao").innerText =
        missao.titulo;

    document.getElementById("descricao").innerText =
        missao.descricao;

    document.getElementById("pergunta").innerText =
        missao.pergunta;

    document.getElementById("mensagem").innerText = "";

    document.getElementById("proxima").hidden = true;

    const opcoes = document.getElementById("opcoes");

    opcoes.innerHTML = "";

    missao.opcoes.forEach((opcao, indice) => {

        const botao = document.createElement("button");

        botao.innerText = opcao;

        botao.addEventListener("click", () => {
            verificarResposta(indice);
        });

        opcoes.appendChild(botao);

    });

    trocarTela("missao");

}

/* ==========================
   VERIFICAR RESPOSTA
========================== */

function verificarResposta(resposta) {

    if (missaoConcluida) return;

    const missao = missoes[biomaAtual];

    const mensagem = document.getElementById("mensagem");

    if (resposta === missao.correta) {

        missaoConcluida = true;

        pontos += 100;

        concluidos.add(biomaAtual);

        document.getElementById("pontos").innerText =
            pontos;

        mensagem.innerText =
            "🎉 Muito bem! Você protegeu este bioma! +100 pontos";

        mensagem.style.color = "#218343";

        document.querySelectorAll("#opcoes button").forEach(botao => {
            botao.disabled = true;
        });

        document.getElementById("proxima").hidden = false;

        if (concluidos.size === 6) {
            document.getElementById("proxima").innerText =
                "Ver resultado final 🏆";
        } else {
            document.getElementById("proxima").innerText =
                "Continuar aventura ➜";
        }

    } else {

        mensagem.innerText =
            "❌ Resposta incorreta! Tente novamente, Guardião!";

        mensagem.style.color = "#d34b4b";

    }

}

/* ==========================
   PRÓXIMA MISSÃO
========================== */

function proximaMissao() {

    if (!missaoConcluida) return;

    if (concluidos.size === 6) {
        finalizarJogo();
    } else {
        trocarTela("mapa");
        atualizarBiomas();
    }

}

/* ==========================
   FINALIZAR JOGO
========================== */

function finalizarJogo() {

    document.getElementById("pontosFinal").innerText =
        pontos;

    trocarTela("final");

}

/* ==========================
   REINICIAR JOGO
========================== */

function reiniciarJogo() {

    pontos = 0;

    biomaAtual = "";

    missaoConcluida = false;

    concluidos.clear();

    document.getElementById("pontos").innerText = 0;

    document.getElementById("pontosFinal").innerText = 0;

    atualizarBiomas();

    trocarTela("inicio");

}

