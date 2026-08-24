// Array que armazena as tarefas
let tarefas = [];


// Identifica qual filtro está selecionado
let filtroAtual = "todas";


// Elementos do HTML
const form = document.getElementById("formTarefa");

const campoTarefa =
    document.getElementById("tarefa");

const campoPrioridade =
    document.getElementById("prioridade");

const listaTarefas =
    document.getElementById("listaTarefas");

const mensagemVazia =
    document.getElementById("mensagemVazia");


// Elementos do resumo
const totalTarefas =
    document.getElementById("totalTarefas");

const tarefasPendentes =
    document.getElementById("tarefasPendentes");

const tarefasConcluidas =
    document.getElementById("tarefasConcluidas");


// Botões de filtro
const botoesFiltro =
    document.querySelectorAll(".filtro");


// =====================================
// ADICIONAR TAREFA
// =====================================

form.addEventListener("submit", function(event) {

    event.preventDefault();


    const texto =
        campoTarefa.value.trim();

    const prioridade =
        campoPrioridade.value;


    // Validação
    if (texto.length < 3) {

        alert(
            "A tarefa deve ter pelo menos 3 caracteres."
        );

        return;
    }


    // Cria uma nova tarefa
    const novaTarefa = {

        id: Date.now(),

        titulo: texto,

        prioridade: prioridade,

        concluida: false

    };


    // Adiciona ao array
    tarefas.push(novaTarefa);


    // Limpa o formulário
    form.reset();


    // Volta a prioridade para média
    campoPrioridade.value = "media";


    // Atualiza a tela
    mostrarTarefas();

});


// =====================================
// MOSTRAR TAREFAS
// =====================================

function mostrarTarefas() {

    listaTarefas.innerHTML = "";


    // Filtra as tarefas
    let tarefasFiltradas;


    if (filtroAtual === "pendentes") {

        tarefasFiltradas =
            tarefas.filter(
                tarefa => !tarefa.concluida
            );

    } else if (filtroAtual === "concluidas") {

        tarefasFiltradas =
            tarefas.filter(
                tarefa => tarefa.concluida
            );

    } else {

        tarefasFiltradas = tarefas;

    }


    // Verifica se existem tarefas
    if (tarefasFiltradas.length === 0) {

        mensagemVazia.style.display =
            "block";

    } else {

        mensagemVazia.style.display =
            "none";
    }


    // Cria cada tarefa
    tarefasFiltradas.forEach(function(tarefa) {

        const elemento =
            document.createElement("div");


        elemento.classList.add("tarefa");


        if (tarefa.concluida) {

            elemento.classList.add("concluida");

        }


        elemento.innerHTML = `

            <div class="info">

                <input
                    type="checkbox"
                    class="checkbox"
                    ${tarefa.concluida ? "checked" : ""}
                    onchange="alternarTarefa(${tarefa.id})"
                >

                <div>

                    <div class="titulo">
                        ${tarefa.titulo}
                    </div>

                    <span
                        class="prioridade ${tarefa.prioridade}">
                        ${nomePrioridade(tarefa.prioridade)}
                    </span>

                </div>

            </div>


            <div class="acoes">

                <button
                    class="btn-editar"
                    onclick="editarTarefa(${tarefa.id})">
                    Editar
                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirTarefa(${tarefa.id})">
                    Excluir
                </button>

            </div>

        `;


        listaTarefas.appendChild(elemento);

    });


    atualizarResumo();

}


// =====================================
// CONCLUIR TAREFA
// =====================================

function alternarTarefa(id) {

    const tarefa =
        tarefas.find(
            tarefa => tarefa.id === id
        );


    if (!tarefa) {
        return;
    }


    tarefa.concluida =
        !tarefa.concluida;


    mostrarTarefas();

}


// =====================================
// EDITAR TAREFA
// =====================================

function editarTarefa(id) {

    const tarefa =
        tarefas.find(
            tarefa => tarefa.id === id
        );


    if (!tarefa) {
        return;
    }


    const novoTexto =
        prompt(
            "Digite o novo nome da tarefa:",
            tarefa.titulo
        );


    if (novoTexto === null) {
        return;
    }


    const texto =
        novoTexto.trim();


    if (texto.length < 3) {

        alert(
            "A tarefa deve ter pelo menos 3 caracteres."
        );

        return;
    }


    tarefa.titulo = texto;


    mostrarTarefas();

}


// =====================================
// EXCLUIR TAREFA
// =====================================

function excluirTarefa(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir esta tarefa?"
        );


    if (!confirmar) {
        return;
    }


    tarefas =
        tarefas.filter(
            tarefa => tarefa.id !== id
        );


    mostrarTarefas();

}


// =====================================
// FILTROS
// =====================================

botoesFiltro.forEach(function(botao) {

    botao.addEventListener(
        "click",
        function() {

            // Remove o ativo dos botões
            botoesFiltro.forEach(
                botao =>
                    botao.classList.remove("ativo")
            );


            // Ativa o botão selecionado
            botao.classList.add("ativo");


            // Atualiza o filtro
            filtroAtual =
                botao.dataset.filtro;


            mostrarTarefas();

        }
    );

});


// =====================================
// ATUALIZAR RESUMO
// =====================================

function atualizarResumo() {

    const total =
        tarefas.length;


    const concluidas =
        tarefas.filter(
            tarefa => tarefa.concluida
        ).length;


    const pendentes =
        total - concluidas;


    totalTarefas.textContent =
        total;


    tarefasPendentes.textContent =
        pendentes;


    tarefasConcluidas.textContent =
        concluidas;

}


// =====================================
// NOME DA PRIORIDADE
// =====================================

function nomePrioridade(prioridade) {

    if (prioridade === "baixa") {
        return "Baixa";
    }

    if (prioridade === "media") {
        return "Média";
    }

    return "Alta";
}


// =====================================
// INICIALIZAÇÃO
// =====================================

mostrarTarefas();