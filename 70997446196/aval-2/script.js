
let tarefas = [];
let geradorCodigo = 1;

// Validar dados da tarefa
function validarDadosTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("Informe uma prioridade entre 1 e 3.");
    }
}

// Buscar tarefa
function buscarTarefa(codigoTarefa) {
    const tarefaBuscada = tarefas.find(
        t => t.codigo === codigoTarefa
    );

    if (!tarefaBuscada) {
        throw new Error("Tarefa não encontrada!");
    }

    return tarefaBuscada;
}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: geradorCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    console.log("Tarefa cadastrada com sucesso!");

    return tarefa;
}

// Listar tarefas
function listarTarefas() {
    return tarefas;
}

// Concluir tarefa
function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("A tarefa já estava concluída!");
    }

    tarefa.status = false;

    console.log("Tarefa concluída com sucesso!");
}

// Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        throw new Error("Informe uma prioridade entre 1 e 3.");
    }

    tarefa.prioridade = novaPrioridade;

    console.log("Prioridade alterada com sucesso!");
}

// Cadastrar pela página HTML
function cadastrarTarefaHTML() {
    try {
        const titulo = document.getElementById("titulo").value;
        const prioridade = Number(
            document.getElementById("prioridade").value
        );

        cadastrarTarefa(titulo, prioridade);

        document.getElementById("titulo").value = "";

        atualizarLista();

    } catch (erro) {
        alert(erro.message);
    }
}

// Atualizar lista na página
function atualizarLista() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    listarTarefas().forEach(tarefa => {
        const item = document.createElement("li");

        if (tarefa.status === false) {
            item.classList.add("concluida");
        }

        item.innerHTML = `
            Código: ${tarefa.codigo}<br>
            Tarefa: ${tarefa.titulo}<br>
            Prioridade: ${tarefa.prioridade}<br>
            Status: ${tarefa.status ? "Pendente" : "Concluída"}
            <br><br>

            <button onclick="concluirTarefaHTML(${tarefa.codigo})">
                Concluir
            </button>

            <button onclick="alterarPrioridadeHTML(${tarefa.codigo})">
                Alterar prioridade
            </button>
        `;

        lista.appendChild(item);
    });
}

// Concluir pela página HTML
function concluirTarefaHTML(codigo) {
    try {
        concluirTarefa(codigo);
        atualizarLista();
    } catch (erro) {
        alert(erro.message);
    }
}

// Alterar prioridade pela página HTML
function alterarPrioridadeHTML(codigo) {
    const novaPrioridade = Number(
        prompt("Digite a nova prioridade (1, 2 ou 3):")
    );

    try {
        alterarPrioridade(codigo, novaPrioridade);
        atualizarLista();
    } catch (erro) {
        alert(erro.message);
    }
}
