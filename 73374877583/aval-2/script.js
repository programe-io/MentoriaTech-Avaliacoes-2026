
let tarefas = [];
let geradorDeCodigo = 0;

// Função para validar os dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        mostrarMensagem("O título deve ter no mínimo 5 caracteres!", "red");
        return false;
    }

    if (!Number.isInteger(prioridade) ||
        prioridade < 1 || prioridade > 3) {
        mostrarMensagem("A prioridade deve ser entre 1 e 3!", "red");
        return false;
    }

    return true;
}

// Função para cadastrar tarefa
function cadastrarTarefa() {

    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    if (document.getElementById("prioridade").value === "" ||
        !validarDadosDaTarefa(titulo, prioridade)) {
        return;
    }

    let tarefa = {
        codigo: ++geradorDeCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: false
    };

    tarefas.push(tarefa);

    listarTarefas();

    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

    mostrarMensagem("Tarefa cadastrada com sucesso!", "green");
}

// Função para listar tarefas
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    for (let i = 0; i < tarefas.length; i++) {

        let status = tarefas[i].status
            ? "Concluída"
            : "Pendente";

        let classeStatus = tarefas[i].status
            ? "concluida"
            : "pendente";

        let prioridadeTexto = "";

        if (tarefas[i].prioridade === 1) {
            prioridadeTexto = "Alta";
        } else if (tarefas[i].prioridade === 2) {
            prioridadeTexto = "Média";
        } else {
            prioridadeTexto = "Baixa";
        }

        lista.innerHTML += `
            <tr>
                <td>${tarefas[i].codigo}</td>
                <td>${tarefas[i].titulo}</td>
                <td>${prioridadeTexto}</td>
                <td class="${classeStatus}">${status}</td>
                <td>
                    <button onclick="concluirTarefa(${tarefas[i].codigo})">
                        Concluir
                    </button>

                    <button onclick="alterarPrioridade(${tarefas[i].codigo})">
                        Alterar prioridade
                    </button>
                </td>
            </tr>
        `;
    }
}

// Função para buscar tarefa pelo código
function buscarTarefa(codigo) {

    return tarefas.find(tarefa => tarefa.codigo === codigo);

}

// Função para concluir tarefa
function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (tarefa === undefined) {
        mostrarMensagem("Tarefa não encontrada!", "red");
        return;
    }

    tarefa.status = true;

    listarTarefas();

    mostrarMensagem("Tarefa concluída com sucesso!", "green");
}

// Função para alterar prioridade
function alterarPrioridade(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (tarefa === undefined) {
        mostrarMensagem("Tarefa não encontrada!", "red");
        return;
    }

    let novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (novaPrioridade === null || novaPrioridade.trim() === "") {
        return;
    }

    novaPrioridade = Number(novaPrioridade);

    if (!validarDadosDaTarefa(tarefa.titulo, novaPrioridade)) {
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();

    mostrarMensagem("Prioridade alterada com sucesso!", "green");
}

// Função para mostrar mensagens
function mostrarMensagem(texto, cor) {

    let mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.style.color = cor;

}
