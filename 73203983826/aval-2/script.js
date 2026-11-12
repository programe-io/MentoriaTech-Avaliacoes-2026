
let tarefas = [];
let proximoCodigo = 1;

const formulario = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");

// Cadastrar tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (!Number.isInteger(prioridade) ||
        prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    formulario.reset();

    listarTarefas();
});

// Listar tarefas
function listarTarefas() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        listaTarefas.innerHTML =
            '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
        return;
    }

    tarefas.forEach(function(tarefa) {
        const div = document.createElement("div");

        div.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        const info = document.createElement("div");
        info.className = "info";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");
        prioridade.textContent =
            "Prioridade: " +
            (tarefa.prioridade === 1 ? "Alta" :
             tarefa.prioridade === 2 ? "Média" : "Baixa");

        const status = document.createElement("p");
        status.textContent =
            "Status: " +
            (tarefa.concluida ? "Concluída" : "Pendente");

        info.append(titulo, codigo, prioridade, status);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        // Botão concluir
        const btnConcluir = document.createElement("button");
        btnConcluir.className = "concluir";
        btnConcluir.textContent = tarefa.concluida
            ? "Concluída"
            : "Concluir";
        btnConcluir.disabled = tarefa.concluida;
        btnConcluir.addEventListener("click", function() {
            concluirTarefa(tarefa.codigo);
        });

        // Botão alterar prioridade
        const btnAlterar = document.createElement("button");
        btnAlterar.className = "alterar";
        btnAlterar.textContent = "Prioridade";
        btnAlterar.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo);
        });

        // Botão excluir
        const btnExcluir = document.createElement("button");
        btnExcluir.className = "excluir";
        btnExcluir.textContent = "Excluir";
        btnExcluir.addEventListener("click", function() {
            excluirTarefa(tarefa.codigo);
        });

        acoes.append(btnConcluir, btnAlterar, btnExcluir);
        div.append(info, acoes);

        listaTarefas.appendChild(div);
    });
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;
    listarTarefas();
}

// Alterar prioridade
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    const novaPrioridade = Number(
        prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
    );

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;
    listarTarefas();
}

// Excluir tarefa
function excluirTarefa(codigo) {
    tarefas = tarefas.filter(t => t.codigo !== codigo);
    listarTarefas();
}
