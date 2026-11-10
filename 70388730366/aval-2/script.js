
let tarefas = [];

// CADASTRAR TAREFA
function cadastrarTarefa() {

    let codigo = document.getElementById("codigo").value;
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = document.getElementById("prioridade").value;

    if (codigo === "" || titulo === "" || prioridade === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: Number(prioridade),
        concluida: false
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

    listarTarefas();
}


// LISTAR TAREFAS
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = '<p class="vazia">Nenhuma tarefa cadastrada.</p>';
        return;
    }

    tarefas.forEach(function(tarefa) {

        let div = document.createElement("div");

        div.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        let status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        let nivel = "";

        if (tarefa.prioridade === 1) {
            nivel = "Alta";
        } else if (tarefa.prioridade === 2) {
            nivel = "Média";
        } else {
            nivel = "Baixa";
        }

        div.innerHTML = `
            <p><strong>Código:</strong> ${tarefa.codigo}</p>
            <p><strong>Título:</strong> ${tarefa.titulo}</p>
            <p><strong>Prioridade:</strong> ${nivel}</p>
            <p><strong>Status:</strong> ${status}</p>
        `;

        lista.appendChild(div);
    });
}


// MARCAR COMO CONCLUÍDA
function concluirTarefa() {

    let codigo = document.getElementById("codigoAlterar").value;

    if (codigo === "") {
        alert("Digite o código da tarefa!");
        return;
    }

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (tarefa.concluida) {
        alert("Esta tarefa já está concluída!");
        return;
    }

    tarefa.concluida = true;

    alert("Tarefa marcada como concluída!");

    listarTarefas();
}


// ALTERAR PRIORIDADE
function alterarPrioridade() {

    let codigo = document.getElementById("codigoAlterar").value;
    let prioridade = document.getElementById("novaPrioridade").value;

    if (codigo === "" || prioridade === "") {
        alert("Informe o código e a nova prioridade!");
        return;
    }

    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.prioridade = Number(prioridade);

    alert("Prioridade alterada com sucesso!");

    document.getElementById("novaPrioridade").value = "";

    listarTarefas();
}


// CONECTAR OS BOTÕES
document.getElementById("btnCadastrar")
    .addEventListener("click", cadastrarTarefa);

document.getElementById("btnConcluir")
    .addEventListener("click", concluirTarefa);

document.getElementById("btnPrioridade")
    .addEventListener("click", alterarPrioridade);

document.getElementById("btnListar")
    .addEventListener("click", listarTarefas);
