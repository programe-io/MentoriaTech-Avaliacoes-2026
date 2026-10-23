
"use strict";

let tarefas = [];
let proximoCodigo = 1;

// Elementos HTML
const formTarefa = document.getElementById("form-tarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const mensagem = document.getElementById("mensagem");

const listaTarefas = document.getElementById("lista-tarefas");
const listaVazia = document.getElementById("lista-vazia");
const containerTabela = document.getElementById("container-tabela");

const totalTarefas = document.getElementById("total-tarefas");
const tarefasPendentes = document.getElementById("tarefas-pendentes");
const tarefasConcluidas = document.getElementById("tarefas-concluidas");

const btnAtualizar = document.getElementById("btn-atualizar");

// Exibir mensagens
function exibirMensagem(texto, tipo = "sucesso") {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}
 
// Validar tarefa 
function validarTarefa(titulo, prioridade) { 
    if (typeof titulo !== "string" || titulo.trim().length < 5 ) {
        throw new Error( 
            "O título deve possuir no mínimo 5 caracteres." 
        );
    }

    if (!["1", "2", "3"].includes(String(prioridade))) {
        throw new Error("Selecione uma prioridade válida.");
    }
}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarTarefa(titulo, prioridade);

    const novaTarefa = {
        codigo: proximoCodigo++,
        titulo: titulo.trim(),
        prioridade: Number(prioridade),
        concluida: false
    };

    tarefas.push(novaTarefa);
    listarTarefas();

    return novaTarefa;
}

// Obter nome da prioridade
function obterTextoPrioridade(prioridade) {
    const prioridades = {
        1: "Alta",
        2: "Média",
        3: "Baixa",
       4: " mais avansado"
    };

    return prioridades[prioridade];
}

// Buscar tarefa pelo código
function buscarTarefaPorCodigo(codigo) {
    return tarefas.find(tarefa => tarefa.codigo === codigo);
}

// Criar célula da tabela
function criarCelula(texto) {
    const celula = document.createElement("td");
    celula.textContent = texto;
    return celula;
}

// Criar etiqueta visual
function criarBadge(texto, classe) {
    const badge = document.createElement("span");
    badge.className = `badge ${classe}`;
    badge.textContent = texto;
    return badge;
}

// Atualizar os números do resumo
function atualizarResumo() {
    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;

    totalTarefas.textContent = total;
    tarefasPendentes.textContent = pendentes;
    tarefasConcluidas.textContent = concluidas;
}

// Listar tarefas
function listarTarefas() {
    listaTarefas.replaceChildren();

    listaVazia.hidden = tarefas.length > 0;
    containerTabela.hidden = tarefas.length === 0;

    tarefas.forEach(tarefa => {
        const linha = document.createElement("tr");

        if (tarefa.concluida) {
            linha.classList.add("tarefa-concluida");
        }

        // Código
        linha.appendChild(criarCelula(tarefa.codigo));

        // Título
        linha.appendChild(criarCelula(tarefa.titulo));

        // Prioridade
        const celulaPrioridade = document.createElement("td");

        celulaPrioridade.appendChild(
            criarBadge(
                obterTextoPrioridade(tarefa.prioridade),
                `prioridade-${tarefa.prioridade}`
            )
        );

        linha.appendChild(celulaPrioridade);

        // Status
        const celulaStatus = document.createElement("td");

        celulaStatus.appendChild(
            criarBadge(
                tarefa.concluida ? "Concluída" : "Em andamento",
                tarefa.concluida
                    ? "status-concluida"
                    : "status-pendente"
            )
        );

        linha.appendChild(celulaStatus);

        // Botões de ação
        const celulaAcoes = document.createElement("td");
        const divAcoes = document.createElement("div");

        divAcoes.className = "acoes";

        const btnConcluir = document.createElement("button");
        btnConcluir.type = "button";
        btnConcluir.className = "btn btn-concluir";
        btnConcluir.textContent = tarefa.concluida
            ? "Reabrir"
            : "Concluir";

        btnConcluir.addEventListener("click", function() {
            alternarStatus(tarefa.codigo);
        });

        const btnExcluir = document.createElement("button");
        btnExcluir.type = "button";
        btnExcluir.className = "btn btn-excluir";
        btnExcluir.textContent = "Excluir";

        btnExcluir.addEventListener("click", function() {
            excluirTarefa(tarefa.codigo);
        });

        divAcoes.append(btnConcluir, btnExcluir);
        celulaAcoes.appendChild(divAcoes);
        linha.appendChild(celulaAcoes);

        listaTarefas.appendChild(linha);
    });

    atualizarResumo();
}

// Concluir ou reabrir tarefa
function alternarStatus(codigo) {
    const tarefa = buscarTarefaPorCodigo(codigo);

    if (!tarefa) {
        exibirMensagem("Tarefa não encontrada.", "erro");
        return;
    }

    tarefa.concluida = !tarefa.concluida;

    listarTarefas();

    exibirMensagem(
        tarefa.concluida
            ? "Tarefa concluída com sucesso!"
            : "Tarefa reaberta com sucesso!"
    );
}

// Excluir tarefa
function excluirTarefa(codigo) {
    const tarefa = buscarTarefaPorCodigo(codigo);

    if (!tarefa) {
        exibirMensagem("Tarefa não encontrada.", "erro");
        return;
    }

    const confirmar = confirm(
        `Deseja excluir a tarefa "${tarefa.titulo}"?`
    );

    if (!confirmar) {
        return;
    }

    tarefas = tarefas.filter(
        item => item.codigo !== codigo
    );

    listarTarefas();

    exibirMensagem("Tarefa excluída com sucesso!");
}

// Evento de cadastro
formTarefa.addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        const titulo = campoTitulo.value;
        const prioridade = campoPrioridade.value;

        const tarefa = cadastrarTarefa(titulo, prioridade);

        exibirMensagem(
            `Tarefa "${tarefa.titulo}" cadastrada com sucesso!`
        );

        formTarefa.reset();
        campoTitulo.focus();

    } catch (erro) {
        exibirMensagem(erro.message, "erro");
    }
});

// Atualizar lista
btnAtualizar.addEventListener("click", function() {
    listarTarefas();
    exibirMensagem("Lista de tarefas atualizada.");
});

// Inicializar página
listarTarefas();
