
let tarefas = [];

// Cadastrar uma nova tarefa
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
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    // Validar código
    if (!Number.isInteger(codigo) || codigo <= 0) {
        alert("Digite um código válido!");
        return;
    }

    // Verificar código duplicado
    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Já existe uma tarefa com esse código!");
        return;
    }

    let tarefa = {
        codigo: codigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

    listarTarefas();
}

// Listar tarefas cadastradas
function listarTarefas() {
    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function(tarefa) {
        lista.innerHTML += `
            <div class="tarefa">
                <strong>Código:</strong> ${tarefa.codigo}<br>
                <strong>Título:</strong> ${tarefa.titulo}<br>
                <strong>Prioridade:</strong> ${tarefa.prioridade}
                - ${obterPrioridade(tarefa.prioridade)}<br>
                <strong>Status:</strong>
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </div>
        `;
    });
}

// Identificar prioridade
function obterPrioridade(prioridade) {
    if (prioridade === 1) {
        return "Alta";
    } else if (prioridade === 2) {
        return "Média";
    } else {
        return "Baixa";
    }
}

// Marcar tarefa como concluída
function concluirTarefa() {
    let codigo = Number(document.getElementById("codigoAlterar").value);

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    alert("Tarefa marcada como concluída!");

    listarTarefas();
}

// Alterar prioridade
function alterarPrioridade() {
    let codigo = Number(document.getElementById("codigoAlterar").value);
    let prioridade = Number(document.getElementById("novaPrioridade").value);

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        alert("Digite uma prioridade válida: 1, 2 ou 3!");
        return;
    }

    tarefa.prioridade = prioridade;

    alert("Prioridade alterada com sucesso!");

    listarTarefas();
}
