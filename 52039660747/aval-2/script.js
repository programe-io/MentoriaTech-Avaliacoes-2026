let tarefas = [];
let proximoCodigo = 1;

const form = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

// Cadastrar tarefa
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    // Validar título
    if (titulo.length < 5) {
        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres.",
            "red"
        );
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        mostrarMensagem(
            "A prioridade deve ser 1, 2 ou 3.",
            "red"
        );
        return;
    }

    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    form.reset();
    campoPrioridade.value = "2";

    mostrarMensagem("Tarefa cadastrada com sucesso!", "green");
    listarTarefas();
});

// Exibir mensagens
function mostrarMensagem(texto, cor) {
    mensagem.textContent = texto;
    mensagem.style.color = cor;
}

// Listar tarefas
function listarTarefas() {
    listaTarefas.replaceChildren();

    if (tarefas.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Nenhuma tarefa cadastrada.";
        listaTarefas.appendChild(aviso);
        return;
    }

    tarefas.forEach(function(tarefa) {
        const item = document.createElement("div");
        item.className = "tarefa";

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");
        prioridade.textContent =
            "Prioridade: " +
            tarefa.prioridade +
            " - " +
            obterNomePrioridade(tarefa.prioridade);

        const status = document.createElement("p");
        status.textContent = tarefa.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        // Botão para concluir
        const btnConcluir = document.createElement("button");
        btnConcluir.textContent = tarefa.concluida
            ? "Tarefa concluída"
            : "Marcar como concluída";
        btnConcluir.className = "btn-concluir";
        btnConcluir.disabled = tarefa.concluida;

        btnConcluir.addEventListener("click", function() {
            concluirTarefa(tarefa.codigo);
        });

        // Botão para alterar prioridade
        const btnPrioridade = document.createElement("button");
        btnPrioridade.textContent = "Alterar prioridade";
        btnPrioridade.className = "btn-prioridade";

        btnPrioridade.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo);
        });

        acoes.append(btnConcluir, btnPrioridade);
        item.append(titulo, codigo, prioridade, status, acoes);
        listaTarefas.appendChild(item);
    });
}

// Obter o nome da prioridade
function obterNomePrioridade(prioridade) {
    const nomes = {
        1: "Alta",
        2: "Média",
        3: "Baixa"
    };

    return nomes[prioridade];
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        mostrarMensagem("Tarefa não encontrada.", "red");
        return;
    }

    tarefa.concluida = true;

    mostrarMensagem("Tarefa concluída com sucesso!", "green");
    listarTarefas();
}

// Alterar prioridade
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        mostrarMensagem("Tarefa não encontrada.", "red");
        return;
    }

    const resposta = prompt(
        "Digite a nova prioridade:\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );

    if (resposta === null || resposta.trim() === "") {
        return;
    }

    const novaPrioridade = Number(resposta);

    if (![1, 2, 3].includes(novaPrioridade)) {
        mostrarMensagem(
            "Prioridade inválida! Digite 1, 2 ou 3.",
            "red"
        );
        return;
    }

    tarefa.prioridade = novaPrioridade;

    mostrarMensagem("Prioridade alterada com sucesso!", "green");
    listarTarefas();
}

// Exibir lista inicial
listarTarefas();