
// Lista de tarefas
let tarefas = [];
let geradorcodigo = 0;

// Função para validar os dados da tarefa
function validarDadosTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("Informe uma prioridade entre 1 e 3");
    }
}

// Função para cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {

    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: ++geradorcodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

}

// Função para listar tarefas
function listarTarefas() {
    return tarefas;
}

// Função para buscar tarefa pelo código
function buscarTarefa(codigo) {

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada");
    }

    return tarefa;
}

// Função para concluir tarefa
function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Tarefa já estava como concluída");
    }

    tarefa.status = false;
}

// Função para alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {

    let tarefa = buscarTarefa(codigo);

    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

// Mostrar tarefas na tela
function mostrarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {

        lista.innerHTML += `
            <div class="tarefa">
                <p><strong>Código:</strong> ${tarefa.codigo}</p>

                <p><strong>Título:</strong> ${tarefa.titulo}</p>

                <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>

                <p><strong>Status:</strong> 
                    ${tarefa.status ? "Pendente" : "Concluída"}
                </p>
            </div>
        `;

    });
}

// Cadastrar tarefa pelo HTML
function cadastrarTarefaHTML() {

    try {

        let titulo = document.getElementById("titulo").value.trim();

        let prioridade = Number(
            document.getElementById("prioridade").value
        );

        cadastrarTarefa(titulo, prioridade);

        alert("Tarefa cadastrada com sucesso!");

        mostrarTarefas();

        document.getElementById("titulo").value = "";

    } catch (erro) {

        alert(erro.message);

    }
}

// Listar tarefas pelo HTML
function listarTarefasHTML() {

    if (tarefas.length === 0) {
        alert("Nenhuma tarefa cadastrada!");
        return;
    }

    mostrarTarefas();

}

// Concluir tarefa pelo HTML
function concluirTarefaHTML() {

    try {

        let codigo = Number(
            document.getElementById("codigo").value
        );

        concluirTarefa(codigo);

        alert("Tarefa concluída com sucesso!");

        mostrarTarefas();

    } catch (erro) {

        alert(erro.message);

    }
}

// Alterar prioridade pelo HTML
function alterarPrioridadeHTML() {

    try {

        let codigo = Number(
            document.getElementById("codigo").value
        );

        let novaPrioridade = Number(
            document.getElementById("novaPrioridade").value
        );

        alterarPrioridade(codigo, novaPrioridade);

        alert("Prioridade alterada com sucesso!");

        mostrarTarefas();

    } catch (erro) {

        alert(erro.message);

    }
}
