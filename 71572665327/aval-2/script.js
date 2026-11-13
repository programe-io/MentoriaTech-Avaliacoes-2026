
let tarefas = [];

// Cadastrar tarefa
function cadastrarTarefa() {

    let codigo = Number(document.getElementById("codigo").value);
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    // Validar título
    if (titulo.trim().length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    // Verificar código
    if (!codigo || tarefas.some(t => t.codigo === codigo)) {
        alert("Digite um código válido e não repetido!");
        return;
    }

    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        status: "Pendente"
    });

    alert("Tarefa cadastrada com sucesso!");

    listarTarefas();
}

// Listar tarefas
function listarTarefas() {

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {

        lista.innerHTML += `
            <p>
                Código: ${tarefa.codigo}<br>
                Título: ${tarefa.titulo}<br>
                Prioridade: ${tarefa.prioridade}<br>
                Status: ${tarefa.status}
                <hr>
            </p>
        `;
    });
}

// Alterar prioridade
function alterarPrioridade() {

    let codigo = Number(document.getElementById("codigoAlterar").value);
    let prioridade = Number(document.getElementById("novaPrioridade").value);

    if (![1, 2, 3].includes(prioridade)) {
        alert("Escolha uma prioridade entre 1 e 3!");
        return;
    }

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.prioridade = prioridade;

        alert("Prioridade alterada com sucesso!");

        listarTarefas();

    } else {
        alert("Tarefa não encontrada!");
    }
}

// Marcar tarefa como concluída
function concluirTarefa() {

    let codigo = Number(document.getElementById("codigoAlterar").value);

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {

        tarefa.status = "Concluída";

        alert("Tarefa concluída com sucesso!");

        listarTarefas();

    } else {
        alert("Tarefa não encontrada!");
    }
}
