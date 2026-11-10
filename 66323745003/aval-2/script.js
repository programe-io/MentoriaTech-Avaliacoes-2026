
// Lista para armazenar as tarefas
let tarefas = [];


// Cadastrar uma nova tarefa
function cadastrarTarefa() {

    let codigo = Number(document.getElementById("codigo").value);

    let titulo = document.getElementById("titulo").value.trim();

    let prioridade = Number(document.getElementById("prioridade").value);

    // Validar título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // Validar código
    if (!Number.isInteger(codigo) || codigo <= 0 ||
        document.getElementById("codigo").value === "") {
        alert("Informe um código válido!");
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    // Verificar se o código já existe
    let existe = tarefas.find(t => t.codigo === codigo);

    if (existe) {
        alert("Já existe uma tarefa com esse código!");
        return;
    }

    // Criar objeto da tarefa
    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    // Adicionar tarefa à lista
    tarefas.push(tarefa);

    alert("Tarefa cadastrada com sucesso!");

    limparCampos();

    listarTarefas();
}


// Listar as tarefas cadastradas
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(tarefa => {

        let status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        let prioridadeTexto = "";

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "Alta";
        } else if (tarefa.prioridade === 2) {
            prioridadeTexto = "Média";
        } else {
            prioridadeTexto = "Baixa";
        }

        let classePrioridade = [
            "",
            "prioridade-alta",
            "prioridade-media",
            "prioridade-baixa"
        ][tarefa.prioridade];

        lista.innerHTML += `
            <div class="tarefa ${tarefa.concluida ? 'concluida' : ''}">

                <p><strong>Código:</strong> ${tarefa.codigo}</p>

                <p><strong>Título:</strong> ${tarefa.titulo}</p>

                <p>
                    <strong>Prioridade:</strong>
                    <span class="${classePrioridade}">
                        ${prioridadeTexto}
                    </span>
                </p>

                <p class="status">
                    <strong>Status:</strong> ${status}
                </p>

            </div>
        `;

    });
}


// Marcar tarefa como concluída
function concluirTarefa() {

    let codigo = Number(document.getElementById("codigoAlterar").value);

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

    alert("Tarefa marcada como concluída!");

    listarTarefas();
}


// Alterar prioridade da tarefa
function alterarPrioridade() {

    let codigo = Number(document.getElementById("codigoAlterar").value);

    let novaPrioridade = Number(document.getElementById("novaPrioridade").value);

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Selecione uma prioridade válida!");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    alert("Prioridade alterada com sucesso!");

    listarTarefas();
}


// Limpar campos do cadastro
function limparCampos() {

    document.getElementById("codigo").value = "";

    document.getElementById("titulo").value = "";

    document.getElementById("prioridade").value = "";

}
