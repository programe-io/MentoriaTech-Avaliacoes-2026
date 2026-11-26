
// Array que armazena as tarefas
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Gerador automático de códigos
let proximoCodigo = Number(
    localStorage.getItem("proximoCodigo")
) || 1;

// Filtro atual
let filtroAtual = "todas";

// Elementos HTML
const formTarefa = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");

// Salvar dados no navegador
function salvarDados() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

    localStorage.setItem(
        "proximoCodigo",
        proximoCodigo
    );

}

// Validar dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        throw new Error(
            "O título deve possuir no mínimo cinco caracteres."
        );
    }

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }

}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    const novaTarefa = {

        codigo: proximoCodigo++,

        titulo: titulo.trim(),

        prioridade: prioridade,

        status: true

    };

    tarefas.push(novaTarefa);

    salvarDados();

    listarTarefas();

    alert("Tarefa cadastrada com sucesso!");

}

// Listar tarefas
function listarTarefas() {

    listaTarefas.innerHTML = "";

    let tarefasExibidas = tarefas;

    if (filtroAtual === "pendentes") {

        tarefasExibidas = tarefas.filter(
            tarefa => tarefa.status === true
        );

    }

    if (filtroAtual === "concluidas") {

        tarefasExibidas = tarefas.filter(
            tarefa => tarefa.status === false
        );

    }

    document.getElementById("mensagemVazia").style.display =
        tarefasExibidas.length === 0 ? "block" : "none";

    tarefasExibidas.forEach(tarefa => {

        const elemento = document.createElement("div");

        elemento.className = "tarefa";

        if (!tarefa.status) {
            elemento.classList.add("concluida");
        }

        // Informações da tarefa
        const informacoes = document.createElement("div");

        informacoes.className = "tarefa-info";

        const titulo = document.createElement("h3");

        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");

        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("span");

        prioridade.className = "prioridade";

        if (tarefa.prioridade === 1) {

            prioridade.classList.add("alta");
            prioridade.textContent = "Prioridade alta";

        } else if (tarefa.prioridade === 2) {

            prioridade.classList.add("media");
            prioridade.textContent = "Prioridade média";

        } else {

            prioridade.classList.add("baixa");
            prioridade.textContent = "Prioridade baixa";

        }

        const status = document.createElement("p");

        status.textContent = tarefa.status
            ? "Status: Pendente"
            : "Status: Concluída";

        informacoes.append(
            titulo,
            codigo,
            prioridade,
            status
        );

        // Área dos botões
        const acoes = document.createElement("div");

        acoes.className = "acoes";

        // Botão concluir
        const btnConcluir = document.createElement("button");

        btnConcluir.textContent = "Concluir";

        btnConcluir.className = "btn-concluir";

        btnConcluir.disabled = !tarefa.status;

        btnConcluir.addEventListener("click", () => {

            concluirTarefa(tarefa.codigo);

        });

        // Botão alterar prioridade
        const btnPrioridade = document.createElement("button");

        btnPrioridade.textContent = "Prioridade";

        btnPrioridade.className = "btn-prioridade";

        btnPrioridade.addEventListener("click", () => {

            alterarPrioridade(tarefa.codigo);

        });

        // Botão excluir
        const btnExcluir = document.createElement("button");

        btnExcluir.textContent = "Excluir";

        btnExcluir.className = "btn-excluir";

        btnExcluir.addEventListener("click", () => {

            excluirTarefa(tarefa.codigo);

        });

        acoes.append(
            btnConcluir,
            btnPrioridade,
            btnExcluir
        );

        elemento.append(
            informacoes,
            acoes
        );

        listaTarefas.appendChild(elemento);

    });

    atualizarResumo();

}

// Buscar tarefa pelo código
function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {

        throw new Error("Tarefa não encontrada!");

    }

    return tarefa;

}

// Concluir tarefa
function concluirTarefa(codigo) {

    try {

        const tarefa = buscarTarefa(codigo);

        if (!tarefa.status) {

            throw new Error("Esta tarefa já está concluída!");

        }

        tarefa.status = false;

        salvarDados();

        listarTarefas();

        alert("Tarefa concluída com sucesso!");

    } catch (erro) {

        alert(erro.message);

    }

}

// Alterar prioridade
function alterarPrioridade(codigo) {

    try {

        const tarefa = buscarTarefa(codigo);

        const novaPrioridade = prompt(
            "Digite a nova prioridade:\n\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        );

        if (novaPrioridade === null || novaPrioridade.trim() === "") {
            return;
        }

        const prioridade = Number(novaPrioridade);

        validarDadosDaTarefa(
            tarefa.titulo,
            prioridade
        );

        tarefa.prioridade = prioridade;

        salvarDados();

        listarTarefas();

        alert("Prioridade alterada com sucesso!");

    } catch (erro) {

        alert(erro.message);

    }

}

// Excluir tarefa
function excluirTarefa(codigo) {

    try {

        buscarTarefa(codigo);

        const confirmar = confirm(
            "Deseja realmente excluir esta tarefa?"
        );

        if (!confirmar) {
            return;
        }

        tarefas = tarefas.filter(
            tarefa => tarefa.codigo !== codigo
        );

        salvarDados();

        listarTarefas();

        alert("Tarefa excluída com sucesso!");

    } catch (erro) {

        alert(erro.message);

    }

}

// Atualizar resumo
function atualizarResumo() {

    const total = tarefas.length;

    const pendentes = tarefas.filter(
        tarefa => tarefa.status === true
    ).length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.status === false
    ).length;

    document.getElementById("totalTarefas").textContent =
        total;

    document.getElementById("totalPendentes").textContent =
        pendentes;

    document.getElementById("totalConcluidas").textContent =
        concluidas;

}

// Evento de cadastro
formTarefa.addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = document.getElementById("titulo").value;

    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    try {

        cadastrarTarefa(titulo, prioridade);

        formTarefa.reset();

    } catch (erro) {

        alert(erro.message);

    }

});

// Eventos dos filtros
document.querySelectorAll(".filtro").forEach(botao => {

    botao.addEventListener("click", function() {

        document.querySelectorAll(".filtro").forEach(item => {
            item.classList.remove("ativo");
        });

        this.classList.add("ativo");

        filtroAtual = this.dataset.filtro;

        listarTarefas();

    });

});

// Exibir tarefas ao abrir a página
listarTarefas();
