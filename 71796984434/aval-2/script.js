let tarefas = [];
let proximoCodigo = 0;

// Validar os dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }

    if (![1, 2, 3].includes(prioridade)) {
        throw new Error("A prioridade deve ser entre 1 e 3.");
    }
}

// Buscar uma tarefa pelo código
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// Cadastrar uma nova tarefa
function cadastrarTarefa() {
    try {
        const titulo = document.getElementById("titulo").value.trim();
        const prioridade = Number(document.getElementById("prioridade").value);

        validarDadosDaTarefa(titulo, prioridade);

        proximoCodigo++;

        const novaTarefa = {
            codigo: proximoCodigo,
            titulo: titulo,
            prioridade: prioridade,
            status: true
        };

        tarefas.push(novaTarefa);

        document.getElementById("titulo").value = "";

        mostrarMensagem("Tarefa cadastrada com sucesso!");
        listarTarefas();

    } catch (erro) {
        mostrarMensagem(erro.message);
    }
}

// Listar as tarefas cadastradas
function listarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function(tarefa) {
        const status = tarefa.status ? "Em andamento" : "Concluída";

        const div = document.createElement("div");
        div.className = tarefa.status ? "tarefa" : "tarefa concluida";

        div.innerHTML = `
            <strong>Código:</strong> ${tarefa.codigo}<br>
            <strong>Título:</strong> ${tarefa.titulo}<br>
            <strong>Prioridade:</strong> ${tarefa.prioridade}<br>
            <strong>Status:</strong> ${status}
        `;

        lista.appendChild(div);
    });
}

// Marcar uma tarefa como concluída
function concluirTarefa() {
    try {
        const codigo = Number(document.getElementById("codigoConcluir").value);

        if (!Number.isInteger(codigo) || codigo <= 0) {
            throw new Error("Digite um código válido.");
        }

        const tarefa = buscarTarefa(codigo);

        if (tarefa.status === false) {
            throw new Error("Essa tarefa já está concluída.");
        }

        tarefa.status = false;

        document.getElementById("codigoConcluir").value = "";

        mostrarMensagem("Tarefa concluída com sucesso!");
        listarTarefas();

    } catch (erro) {
        mostrarMensagem(erro.message);
    }
}

// Alterar a prioridade de uma tarefa
function alterarPrioridade() {
    try {
        const codigo = Number(document.getElementById("codigoAlterar").value);
        const novaPrioridade = Number(document.getElementById("novaPrioridade").value);

        if (!Number.isInteger(codigo) || codigo <= 0) {
            throw new Error("Digite um código válido.");
        }

        const tarefa = buscarTarefa(codigo);

        validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

        tarefa.prioridade = novaPrioridade;

        document.getElementById("codigoAlterar").value = "";

        mostrarMensagem("Prioridade alterada com sucesso!");
        listarTarefas();

    } catch (erro) {
        mostrarMensagem(erro.message);
    }
}

// Exibir mensagens na tela
function mostrarMensagem(texto) {
    document.getElementById("mensagem").textContent = texto;
}