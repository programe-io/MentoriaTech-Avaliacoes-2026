
let tarefas = [];
let geradorCodigo = 1;

// Validar dados da tarefa
function validarDadosTarefa(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("Informe uma prioridade entre 1 e 3.");
    }
}

// Buscar tarefa
function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        t => t.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada!");
    }

    return tarefa;
}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {

    validarDadosTarefa(titulo, prioridade);

    const tarefa = {
        codigo: geradorCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    listarTarefas();
}

// Listar tarefas
function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {

        const div = document.createElement("div");

        div.className = tarefa.status
            ? "tarefa"
            : "tarefa concluida";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");
        prioridade.textContent = "Prioridade: " + tarefa.prioridade;

        const status = document.createElement("p");
        status.textContent = tarefa.status
            ? "Status: Pendente"
            : "Status: Concluída";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const btnConcluir = document.createElement("button");
        btnConcluir.textContent = "Concluir";
        btnConcluir.className = "btn-concluir";
        btnConcluir.disabled = !tarefa.status;
        btnConcluir.onclick = () => concluirTarefa(tarefa.codigo);

        const btnAlterar = document.createElement("button");
        btnAlterar.textContent = "Alterar prioridade";
        btnAlterar.className = "btn-alterar";
        btnAlterar.onclick = () => alterarPrioridade(tarefa.codigo);

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";
        btnExcluir.onclick = () => excluirTarefa(tarefa.codigo);

        acoes.append(btnConcluir, btnAlterar, btnExcluir);

        div.append(titulo, codigo, prioridade, status, acoes);

        lista.appendChild(div);
    });
}

// Concluir tarefa
function concluirTarefa(codigo) {

    try {

        const tarefa = buscarTarefa(codigo);

        if (!tarefa.status) {
            throw new Error("A tarefa já está concluída!");
        }

        tarefa.status = false;

        listarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
}

// Alterar prioridade
function alterarPrioridade(codigo) {

    try {

        const tarefa = buscarTarefa(codigo);

        const novaPrioridade = Number(
            prompt("Digite a nova prioridade (1, 2 ou 3):")
        );

        if (!Number.isInteger(novaPrioridade) ||
            novaPrioridade < 1 ||
            novaPrioridade > 3) {

            throw new Error("Informe uma prioridade entre 1 e 3.");
        }

        tarefa.prioridade = novaPrioridade;

        listarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
}

// Excluir tarefa
function excluirTarefa(codigo) {

    tarefas = tarefas.filter(
        tarefa => tarefa.codigo !== codigo
    );

    listarTarefas();
}

// Evento de cadastro
document.getElementById("formTarefa")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        try {

            const titulo = document.getElementById("titulo").value;

            const prioridade = Number(
                document.getElementById("prioridade").value
            );

            cadastrarTarefa(titulo, prioridade);

            this.reset();

        } catch (erro) {
            alert(erro.message);
        }

    });
