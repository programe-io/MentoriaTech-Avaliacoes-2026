
let tarefas = [];
let proximoCodigo = 0;

// Validar os dados
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres!");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve ser entre 1 e 3!");
    }
}

// Cadastrar tarefa
function cadastrarTarefa() {
    try {
        const titulo = document.getElementById("titulo").value;
        const prioridade = Number(document.getElementById("prioridade").value);

        validarDadosDaTarefa(titulo, prioridade);

        proximoCodigo++;

        const tarefa = {
            codigo: proximoCodigo,
            titulo: titulo.trim(),
            prioridade: prioridade,
            status: true
        };

        tarefas.push(tarefa);

        document.getElementById("titulo").value = "";
        document.getElementById("prioridade").value = "";

        listarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
}

// Listar tarefas
function listarTarefas() {
    const lista = document.getElementById("tarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(tarefa => {
        lista.innerHTML += `
            <div class="tarefa ${!tarefa.status ? 'concluida' : ''}">
                <h3>${tarefa.titulo}</h3>

                <p>Código: ${tarefa.codigo}</p>
                <p>Prioridade: ${tarefa.prioridade}</p>
                <p>Status: ${tarefa.status ? "Em andamento" : "Concluída"}</p>

                <button onclick="concluirTarefa(${tarefa.codigo})">
                    Concluir
                </button>

                <button onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>

                <button class="excluir" onclick="excluirTarefa(${tarefa.codigo})">
                    Excluir
                </button>
            </div>
        `;
    });
}

// Buscar tarefa pelo código
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada!");
    }

    return tarefa;
}

// Concluir tarefa
function concluirTarefa(codigo) {
    try {
        const tarefa = buscarTarefa(codigo);

        if (!tarefa.status) {
            throw new Error("Essa tarefa já foi concluída!");
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
            prompt("Digite a nova prioridade (1 - Alta, 2 - Média, 3 - Baixa):")
        );

        if (!novaPrioridade) {
            return;
        }

        validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

        tarefa.prioridade = novaPrioridade;

        listarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
}

// Excluir tarefa
function excluirTarefa(codigo) {
    tarefas = tarefas.filter(tarefa => tarefa.codigo !== codigo);

    listarTarefas();
}

// Exibir lista inicial
listarTarefas();
