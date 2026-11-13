
"use strict";

// Recuperar tarefas salvas
let tarefas = [];

try {
    const dados = localStorage.getItem("minhasTarefas");

    if (dados) {
        const recuperadas = JSON.parse(dados);

        if (Array.isArray(recuperadas)) {
            tarefas = recuperadas.filter(function(t) {
                return t &&
                    typeof t.id === "string" &&
                    typeof t.titulo === "string" &&
                    typeof t.descricao === "string" &&
                    typeof t.prioridade === "string" &&
                    typeof t.concluida === "boolean";
            });
        }
    }
} catch (erro) {
    console.error("Erro ao recuperar tarefas:", erro);
}

// Elementos da página
const formulario = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");
const pesquisa = document.getElementById("pesquisa");
const filtro = document.getElementById("filtro");

// Salvar tarefas
function salvarTarefas() {
    try {
        localStorage.setItem(
            "minhasTarefas",
            JSON.stringify(tarefas)
        );
        return true;
    } catch (erro) {
        alert("Não foi possível salvar as tarefas.");
        return false;
    }
}

// Adicionar tarefa
formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const prioridade = document.getElementById("prioridade").value;
    const prazo = document.getElementById("prazo").value;

    if (titulo === "") {
        alert("Digite o título da tarefa!");
        return;
    }

    const novaTarefa = {
        id: gerarId(),
        titulo: titulo,
        descricao: descricao,
        prioridade: prioridade,
        prazo: prazo,
        concluida: false
    };

    tarefas.push(novaTarefa);

    if (salvarTarefas()) {
        formulario.reset();
        listarTarefas();
        alert("Tarefa cadastrada com sucesso!");
    } else {
        tarefas.pop();
    }
});

// Gerar identificador único
function gerarId() {
    return Date.now().toString() +
        Math.random().toString(36).slice(2);
}

// Formatar prazo
function formatarPrazo(prazo) {
    if (!prazo) return "Sem prazo";

    const partes = prazo.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}

// Criar elemento de texto
function criarElemento(tag, texto, classe) {
    const elemento = document.createElement(tag);
    elemento.textContent = texto;

    if (classe) {
        elemento.className = classe;
    }

    return elemento;
}

// Listar tarefas
function listarTarefas() {

    lista.innerHTML = "";

    const termo = pesquisa.value.toLowerCase().trim();
    const situacao = filtro.value;

    const encontradas = tarefas.filter(function(tarefa) {

        const correspondePesquisa =
            tarefa.titulo.toLowerCase().includes(termo) ||
            tarefa.descricao.toLowerCase().includes(termo);

        const correspondeFiltro =
            situacao === "Todas" ||
            (situacao === "Pendente" && !tarefa.concluida) ||
            (situacao === "Concluída" && tarefa.concluida);

        return correspondePesquisa && correspondeFiltro;
    });

    encontradas.forEach(function(tarefa) {

        const card = document.createElement("article");

        card.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        const titulo = criarElemento("h3", tarefa.titulo);
        const descricao = criarElemento(
            "p",
            tarefa.descricao || "Sem descrição."
        );

        const informacoes = document.createElement("div");
        informacoes.className = "informacoes";

        const classePrioridade = {
            "Baixa": "baixa",
            "Média": "media",
            "Alta": "alta"
        }[tarefa.prioridade] || "media";

        const prioridade = criarElemento(
            "span",
            "Prioridade: " + tarefa.prioridade,
            "prioridade " + classePrioridade
        );

        const prazo = criarElemento(
            "span",
            "Prazo: " + formatarPrazo(tarefa.prazo)
        );

        const situacao = criarElemento(
            "span",
            tarefa.concluida ? "Concluída" : "Pendente"
        );

        informacoes.append(prioridade, prazo, situacao);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const btnConcluir = document.createElement("button");
        btnConcluir.className = "btn-concluir";
        btnConcluir.textContent = tarefa.concluida
            ? "Reabrir"
            : "Concluir";

        btnConcluir.addEventListener("click", function() {
            alternarConclusao(tarefa.id);
        });

        const btnEditar = document.createElement("button");
        btnEditar.className = "btn-editar";
        btnEditar.textContent = "Editar";

        btnEditar.addEventListener("click", function() {
            editarTarefa(tarefa.id);
        });

        const btnExcluir = document.createElement("button");
        btnExcluir.className = "btn-excluir";
        btnExcluir.textContent = "Excluir";

        btnExcluir.addEventListener("click", function() {
            excluirTarefa(tarefa.id);
        });

        acoes.append(btnConcluir, btnEditar, btnExcluir);

        card.append(titulo, descricao, informacoes, acoes);

        lista.appendChild(card);
    });

    document.getElementById("mensagemVazia").style.display =
        encontradas.length === 0 ? "block" : "none";

    atualizarResumo();
}

// Alternar conclusão
function alternarConclusao(id) {

    const tarefa = tarefas.find(function(t) {
        return t.id === id;
    });

    if (!tarefa) return;

    tarefa.concluida = !tarefa.concluida;

    if (salvarTarefas()) {
        listarTarefas();
    } else {
        tarefa.concluida = !tarefa.concluida;
    }
}

// Editar tarefa
function editarTarefa(id) {

    const tarefa = tarefas.find(function(t) {
        return t.id === id;
    });

    if (!tarefa) return;

    const novoTitulo = prompt(
        "Digite o novo título:",
        tarefa.titulo
    );

    if (novoTitulo === null) return;

    if (novoTitulo.trim() === "") {
        alert("O título não pode ficar vazio!");
        return;
    }

    const novaDescricao = prompt(
        "Digite a nova descrição:",
        tarefa.descricao
    );

    if (novaDescricao === null) return;

    const novaPrioridade = prompt(
        "Digite a prioridade: Baixa, Média ou Alta",
        tarefa.prioridade
    );

    if (novaPrioridade === null) return;

    const prioridade = novaPrioridade.trim().toLowerCase();

    const prioridadesValidas = {
        "baixa": "Baixa",
        "média": "Média",
        "media": "Média",
        "alta": "Alta"
    };

    if (!prioridadesValidas[prioridade]) {
        alert("Prioridade inválida!");
        return;
    }

    const novoPrazo = prompt(
        "Digite o prazo no formato AAAA-MM-DD. Deixe vazio para remover:",
        tarefa.prazo
    );

    if (novoPrazo === null) return;

    if (novoPrazo !== "" &&
        !/^\d{4}-\d{2}-\d{2}$/.test(novoPrazo)) {
        alert("Data inválida!");
        return;
    }

    const dadosAntigos = { ...tarefa };

    tarefa.titulo = novoTitulo.trim();
    tarefa.descricao = novaDescricao.trim();
    tarefa.prioridade = prioridadesValidas[prioridade];
    tarefa.prazo = novoPrazo;

    if (salvarTarefas()) {
        listarTarefas();
        alert("Tarefa editada com sucesso!");
    } else {
        Object.assign(tarefa, dadosAntigos);
    }
}

// Excluir tarefa
function excluirTarefa(id) {

    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmar) return;

    const indice = tarefas.findIndex(function(t) {
        return t.id === id;
    });

    if (indice === -1) return;

    const removida = tarefas.splice(indice, 1)[0];

    if (salvarTarefas()) {
        listarTarefas();
        alert("Tarefa excluída com sucesso!");
    } else {
        tarefas.splice(indice, 0, removida);
    }
}

// Atualizar os cartões
function atualizarResumo() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(function(t) {
        return t.concluida;
    }).length;

    const pendentes = total - concluidas;

    document.getElementById("totalTarefas").textContent = total;

    document.getElementById("tarefasPendentes").textContent =
        pendentes;

    document.getElementById("tarefasConcluidas").textContent =
        concluidas;
}

// Pesquisa e filtros
pesquisa.addEventListener("input", listarTarefas);
filtro.addEventListener("change", listarTarefas);

// Iniciar sistema
listarTarefas();
