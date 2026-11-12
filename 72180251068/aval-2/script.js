
let tarefas = [];

// 1. CADASTRAR NOVA TAREFA
function cadastrarTarefa() {

    let codigo = Number(document.getElementById("codigo").value);
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    // Validar código
    if (!Number.isInteger(codigo) || codigo <= 0) {
        alert("Digite um código válido!");
        return;
    }

    // Validar título
    if (titulo.trim().length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (!Number.isInteger(prioridade) || prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    // Verificar código duplicado
    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    // Criar tarefa
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


// 2. LISTAR TAREFAS
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function(tarefa) {

        lista.innerHTML += `
            <div>
                <p><strong>Código:</strong> ${tarefa.codigo}</p>

                <p><strong>Título:</strong> ${tarefa.titulo}</p>

                <p><strong>Prioridade:</strong>
                ${tarefa.prioridade === 1 ? "Alta" :
                  tarefa.prioridade === 2 ? "Média" : "Baixa"}</p>

                <p><strong>Status:</strong>
                ${tarefa.concluida ? "Concluída" : "Pendente"}</p>

                <hr>
            </div>
        `;

    });
}


// 3. MARCAR TAREFA COMO CONCLUÍDA
function concluirTarefa() {

    let codigo = Number(document.getElementById("codigoConcluir").value);

    let tarefa = tarefas.find(t => t.codigo === codigo);

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

    document.getElementById("codigoConcluir").value = "";

    listarTarefas();
}


// 4. ALTERAR PRIORIDADE
function alterarPrioridade() {

    let codigo = Number(document.getElementById("codigoAlterar").value);

    let novaPrioridade = Number(document.getElementById("novaPrioridade").value);

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (!Number.isInteger(novaPrioridade) ||
        novaPrioridade < 1 || novaPrioridade > 3) {

        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    alert("Prioridade alterada com sucesso!");

    document.getElementById("codigoAlterar").value = "";
    document.getElementById("novaPrioridade").value = "";

    listarTarefas();
}
