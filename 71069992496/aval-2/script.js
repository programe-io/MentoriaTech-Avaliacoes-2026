
// Lista para armazenar as tarefas
let tarefas = [];

// Cadastrar nova tarefa
document.getElementById("formTarefa").addEventListener("submit", function(event) {

    event.preventDefault();

    let codigo = Number(document.getElementById("codigo").value);
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar prioridade
    if (prioridade < 1 || prioridade > 3) {
        alert("A prioridade deve ser entre 1 e 3!");
        return;
    }

    // Verificar código duplicado
    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    // Criar tarefa
    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        status: false
    };

    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    document.getElementById("formTarefa").reset();

    listarTarefas();
});

// Listar tarefas
function listarTarefas() {

    let tabela = document.getElementById("listaTarefas");

    tabela.innerHTML = "";

    if (tarefas.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="4">Nenhuma tarefa cadastrada.</td>
            </tr>
        `;
        return;
    }

    tarefas.forEach(function(tarefa) {

        tabela.innerHTML += `
            <tr>
                <td>${tarefa.codigo}</td>
                <td>${tarefa.titulo}</td>
                <td>${tarefa.prioridade}</td>
                <td class="${tarefa.status ? 'concluida' : 'pendente'}">
                    ${tarefa.status ? 'Concluída' : 'Pendente'}
                </td>
            </tr>
        `;

    });
}

// Marcar tarefa como concluída
function concluirTarefa() {

    let codigo = Number(document.getElementById("codigoAlterar").value);

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {

        tarefa.status = true;

        alert("Tarefa marcada como concluída!");

        listarTarefas();

    } else {

        alert("Tarefa não encontrada!");

    }
}

// Alterar prioridade da tarefa
function alterarPrioridade() {

    let codigo = Number(document.getElementById("codigoAlterar").value);

    let prioridade = Number(document.getElementById("novaPrioridade").value);

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (prioridade < 1 || prioridade > 3 ||
        document.getElementById("novaPrioridade").value === "") {

        alert("Escolha uma prioridade entre 1 e 3!");
        return;
    }

    tarefa.prioridade = prioridade;

    alert("Prioridade alterada com sucesso!");

    listarTarefas();
}
