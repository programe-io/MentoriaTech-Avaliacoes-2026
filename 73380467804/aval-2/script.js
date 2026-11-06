
let tarefas = [];
let geradorCodigo = 1;

// Validar os dados da tarefa
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
}

// Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        throw new Error("Informe uma prioridade entre 1 e 3.");
    }

    tarefa.prioridade = novaPrioridade;
}

// Exibir mensagens
function mostrarMensagem(texto, erro = false) {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.style.color = erro ? "red" : "green";
}

// Cadastrar pela interface
function cadastrar() {
    try {
        const titulo = document.getElementById("titulo").value.trim();

        const prioridade = Number(
            document.getElementById("prioridade").value
        );

        cadastrarTarefa(titulo, prioridade);

        mostrarMensagem("Tarefa cadastrada com sucesso!");

        document.getElementById("titulo").value = "";

        atualizarLista();

    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

// Concluir pela interface
function concluir(codigo) {
    try {
        concluirTarefa(codigo);

        mostrarMensagem("Tarefa concluída com sucesso!");

        atualizarLista();

    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

// Alterar prioridade pela interface
function alterar(codigo) {
    const novaPrioridade = Number(
        prompt("Digite a nova prioridade (1, 2 ou 3):")
    );

    if (!Number.isInteger(novaPrioridade)) {
        mostrarMensagem("Informe uma prioridade válida.", true);
        return;
    }

    try {
        alterarPrioridade(codigo, novaPrioridade);

        mostrarMensagem("Prioridade alterada com sucesso!");

        atualizarLista();

    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
}

// Atualizar lista na tela
function atualizarLista() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = '<p class="vazia">Nenhuma tarefa cadastrada.</p>';
        return;
    }

    listarTarefas().forEach(tarefa => {
        const div = document.createElement("div");

        div.className = tarefa.status
            ? "tarefa"
            : "tarefa concluida";

        const status = tarefa.status
            ? "Pendente"
            : "Concluída";

        const prioridades = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p><strong>Código:</strong> ${tarefa.codigo}</p>

            <p><strong>Prioridade:</strong> ${prioridades[tarefa.prioridade]}</p>

            <p><strong>Status:</strong> ${status}</p>

            <div class="acoes">
                ${
                    tarefa.status
                    ? `<button class="concluir" onclick="concluir(${tarefa.codigo})">
                        Concluir
                       </button>`
                    : ""
                }

                <button class="alterar" onclick="alterar(${tarefa.codigo})">
                    Alterar prioridade
                </button>
            </div>
        `;

        lista.appendChild(div);
    });
}

// Inicializar sistema
atualizarLista();
