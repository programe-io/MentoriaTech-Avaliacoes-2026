
// Lista de tarefas
let tarefas = [];

// Cadastrar tarefa
function cadastrarTarefa() {

    const codigo = Number(document.getElementById("codigo").value);
    const titulo = document.getElementById("titulo").value.trim();
    const campoPrioridade = document.getElementById("prioridade");
    const prioridade = Number(campoPrioridade.value);

    // Validar código
    if (!Number.isInteger(codigo) || codigo <= 0) {
        alert("Digite um código válido!");
        return;
    }

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (!["1", "2", "3"].includes(campoPrioridade.value)) {
        alert("Escolha uma prioridade entre 1 e 3!");
        return;
    }

    // Verificar código repetido
    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    // Salvar tarefa
    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    alert("Tarefa cadastrada com sucesso!");

    // Limpar campos
    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    campoPrioridade.value = "";

    listarTarefas();
}


// Listar tarefas
function listarTarefas() {

    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
        lista.className = "mensagem-vazia";
        return;
    }

    lista.className = "";

    tarefas.forEach(t => {

        const div = document.createElement("div");
        div.className = "tarefa";

        if (t.concluida) {
            div.classList.add("concluida");
        }

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + t.codigo;

        const titulo = document.createElement("p");
        titulo.textContent = "Título: " + t.titulo;

        const prioridade = document.createElement("p");

        let nomePrioridade;

        if (t.prioridade === 1) {
            nomePrioridade = "Alta";
        } else if (t.prioridade === 2) {
            nomePrioridade = "Média";
        } else {
            nomePrioridade = "Baixa";
        }

        prioridade.textContent =
            "Prioridade: " + t.prioridade + " - " + nomePrioridade;

        const status = document.createElement("p");

        status.textContent = t.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        status.className = t.concluida
            ? "status-concluida"
            : "status-pendente";

        div.appendChild(codigo);
        div.appendChild(titulo);
        div.appendChild(prioridade);
        div.appendChild(status);

        lista.appendChild(div);

    });
}


// Marcar tarefa como concluída
function concluirTarefa() {

    const campoCodigo = document.getElementById("codigoAlterar");
    const codigo = Number(campoCodigo.value);

    if (!campoCodigo.value || !Number.isInteger(codigo) || codigo <= 0) {
        alert("Digite um código válido!");
        return;
    }

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (tarefa.concluida) {
        alert("Essa tarefa já está concluída!");
        return;
    }

    tarefa.concluida = true;

    alert("Tarefa concluída com sucesso!");

    campoCodigo.value = "";

    listarTarefas();
}


// Alterar prioridade
function alterarPrioridade() {

    const campoCodigo = document.getElementById("codigoAlterar");
    const campoPrioridade = document.getElementById("novaPrioridade");

    const codigo = Number(campoCodigo.value);
    const prioridade = Number(campoPrioridade.value);

    if (!campoCodigo.value || !Number.isInteger(codigo) || codigo <= 0) {
        alert("Digite um código válido!");
        return;
    }

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (!["1", "2", "3"].includes(campoPrioridade.value)) {
        alert("Selecione uma prioridade entre 1 e 3!");
        return;
    }

    tarefa.prioridade = prioridade;

    alert("Prioridade alterada com sucesso!");

    campoCodigo.value = "";
    campoPrioridade.value = "";

    listarTarefas();
}
