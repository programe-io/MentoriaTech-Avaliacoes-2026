// Recupera as atividades salvas no navegador
let atividades = JSON.parse(localStorage.getItem("atividades")) || [];

const form = document.getElementById("formAtividade");
const lista = document.getElementById("listaAtividades");
const mensagemVazia = document.getElementById("mensagemVazia");

const total = document.getElementById("total");
const concluidas = document.getElementById("concluidas");
const pendentes = document.getElementById("pendentes");

const porcentagem = document.getElementById("porcentagem");
const barraProgresso = document.getElementById("barraProgresso");

const limparConcluidas =
    document.getElementById("limparConcluidas");


// ADICIONAR ATIVIDADE

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("atividade").value;
    const materia = document.getElementById("materia").value;
    const horario = document.getElementById("horario").value;
    const observacao = document.getElementById("observacao").value;

    const novaAtividade = {
        id: Date.now(),
        nome: nome,
        materia: materia,
        horario: horario,
        observacao: observacao,
        concluida: false
    };

    atividades.push(novaAtividade);

    salvarAtividades();
    mostrarAtividades();

    form.reset();
});


// MOSTRAR ATIVIDADES

function mostrarAtividades() {

    lista.innerHTML = "";

    if (atividades.length === 0) {
        mensagemVazia.style.display = "block";
    } else {
        mensagemVazia.style.display = "none";
    }

    atividades.forEach(function(atividade) {

        const item = document.createElement("div");

        item.classList.add("atividade");

        if (atividade.concluida) {
            item.classList.add("concluida");
        }

        item.innerHTML = `

            <input
                type="checkbox"
                class="checkbox"
                ${atividade.concluida ? "checked" : ""}
                onchange="alternarAtividade(${atividade.id})"
            >

            <div class="info">

                <h3>${escaparHTML(atividade.nome)}</h3>

                <p>
                    <span class="materia">
                        ${escaparHTML(atividade.materia)}
                    </span>
                </p>

                ${
                    atividade.horario
                    ? `<small>🕐 ${atividade.horario}</small>`
                    : ""
                }

                ${
                    atividade.observacao
                    ? `<p>💬 ${escaparHTML(atividade.observacao)}</p>`
                    : ""
                }

            </div>

            <button
                class="btn-excluir"
                onclick="excluirAtividade(${atividade.id})"
            >
                🗑️
            </button>
        `;

        lista.appendChild(item);
    });

    atualizarResumo();
}


// MARCAR COMO CONCLUÍDA

function alternarAtividade(id) {

    atividades = atividades.map(function(atividade) {

        if (atividade.id === id) {
            atividade.concluida = !atividade.concluida;
        }

        return atividade;
    });

    salvarAtividades();
    mostrarAtividades();
}


// EXCLUIR ATIVIDADE

function excluirAtividade(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta atividade?"
    );

    if (!confirmar) {
        return;
    }

    atividades = atividades.filter(function(atividade) {
        return atividade.id !== id;
    });

    salvarAtividades();
    mostrarAtividades();
}


// LIMPAR ATIVIDADES CONCLUÍDAS

limparConcluidas.addEventListener("click", function() {

    const existeConcluida = atividades.some(function(atividade) {
        return atividade.concluida;
    });

    if (!existeConcluida) {
        alert("Não existem atividades concluídas.");
        return;
    }

    const confirmar = confirm(
        "Deseja remover todas as atividades concluídas?"
    );

    if (!confirmar) {
        return;
    }

    atividades = atividades.filter(function(atividade) {
        return !atividade.concluida;
    });

    salvarAtividades();
    mostrarAtividades();
});


// ATUALIZAR RESUMO

function atualizarResumo() {

    const quantidadeTotal = atividades.length;

    const quantidadeConcluidas = atividades.filter(
        function(atividade) {
            return atividade.concluida;
        }
    ).length;

    const quantidadePendentes =
        quantidadeTotal - quantidadeConcluidas;

    total.textContent = quantidadeTotal;
    concluidas.textContent = quantidadeConcluidas;
    pendentes.textContent = quantidadePendentes;

    let progresso = 0;

    if (quantidadeTotal > 0) {
        progresso = Math.round(
            (quantidadeConcluidas / quantidadeTotal) * 100
        );
    }

    porcentagem.textContent = progresso + "%";
    barraProgresso.style.width = progresso + "%";
}


// SALVAR NO LOCALSTORAGE

function salvarAtividades() {

    localStorage.setItem(
        "atividades",
        JSON.stringify(atividades)
    );
}


// EVITAR HTML INJETADO NOS CAMPOS

function escaparHTML(texto) {

    const div = document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;
}


// INICIAR SITE

mostrarAtividades();
