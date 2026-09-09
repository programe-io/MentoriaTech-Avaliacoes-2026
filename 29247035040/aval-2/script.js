// Lista de tarefas
let tarefas = [];

// Código da próxima tarefa
let proximoCodigo = 1;


// ========================================
// CADASTRAR TAREFA
// ========================================

function cadastrarTarefa() {

    const tituloInput = document.getElementById("titulo");
    const prioridadeInput = document.getElementById("prioridade");
    const mensagem = document.getElementById("mensagem");

    const titulo = tituloInput.value.trim();
    const prioridade = Number(prioridadeInput.value);

    // Validação do título
    if (titulo.length < 5) {
        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres.",
            "erro"
        );

        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        mostrarMensagem(
            "A prioridade deve ser um valor entre 1 e 3.",
            "erro"
        );

        return;
    }

    // Criação da tarefa
    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    // Adiciona a tarefa na lista
    tarefas.push(novaTarefa);

    // Incrementa o código
    proximoCodigo++;

    // Limpa o formulário
    tituloInput.value = "";
    prioridadeInput.value = "1";

    mostrarMensagem(
        "Tarefa cadastrada com sucesso!",
        "sucesso"
    );

    // Atualiza a lista
    listarTarefas();
}


// ========================================
// LISTAR TAREFAS
// ========================================

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");
    const contador = document.getElementById("contador");

    // Atualiza o contador
    if (tarefas.length === 1) {
        contador.textContent = "1 tarefa";
    } else {
        contador.textContent = `${tarefas.length} tarefas`;
    }

    // Verifica se existem tarefas
    if (tarefas.length === 0) {
        lista.innerHTML = `
            <p class="vazio">
                Nenhuma tarefa cadastrada.
            </p>
        `;

        return;
    }

    // Limpa a lista
    lista.innerHTML = "";

    // Percorre as tarefas
    tarefas.forEach(function(tarefa) {

        const div = document.createElement("div");

        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        const nomePrioridade = obterNomePrioridade(
            tarefa.prioridade
        );

        const status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        div.innerHTML = `
            <div class="tarefa-info">

                <div>
                    <div class="titulo">
                        ${tarefa.titulo}
                    </div>

                    <div class="detalhes">
                        Código: ${tarefa.codigo}
                        |
                        Prioridade: ${tarefa.prioridade} - ${nomePrioridade}
                        |
                        Status: ${status}
                    </div>
                </div>

                <div class="acoes">

                    ${
                        !tarefa.concluida
                        ? `
                            <button
                                class="btn-concluir"
                                onclick="concluirTarefa(${tarefa.codigo})"
                            >
                                Concluir
                            </button>
                        `
                        : ""
                    }

                    <button
                        class="btn-prioridade"
                        onclick="alterarPrioridade(${tarefa.codigo})"
                    >
                        Alterar prioridade
                    </button>

                </div>

            </div>
        `;

        lista.appendChild(div);
    });
}


// ========================================
// MARCAR TAREFA COMO CONCLUÍDA
// ========================================

function concluirTarefa(codigo) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        mostrarMensagem(
            "Tarefa não encontrada.",
            "erro"
        );

        return;
    }

    tarefa.concluida = true;

    mostrarMensagem(
        "Tarefa marcada como concluída!",
        "sucesso"
    );

    listarTarefas();
}


// ========================================
// ALTERAR PRIORIDADE
// ========================================

function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        mostrarMensagem(
            "Tarefa não encontrada.",
            "erro"
        );

        return;
    }

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );

    const prioridade = Number(novaPrioridade);

    // Validação
    if (
        novaPrioridade === null ||
        prioridade < 1 ||
        prioridade > 3 ||
        !Number.isInteger(prioridade)
    ) {
        mostrarMensagem(
            "A prioridade deve ser um valor entre 1 e 3.",
            "erro"
        );

        return;
    }

    tarefa.prioridade = prioridade;

    mostrarMensagem(
        "Prioridade alterada com sucesso!",
        "sucesso"
    );

    listarTarefas();
}


// ========================================
// NOME DA PRIORIDADE
// ========================================

function obterNomePrioridade(prioridade) {

    if (prioridade === 1) {
        return "Alta";
    }

    if (prioridade === 2) {
        return "Média";
    }

    if (prioridade === 3) {
        return "Baixa";
    }

    return "Desconhecida";
}


// ========================================
// EXIBIR MENSAGEM
// ========================================

function mostrarMensagem(texto, tipo) {

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.className = tipo;

    // Remove a mensagem depois de 3 segundos
    setTimeout(function() {
        mensagem.textContent = "";
        mensagem.className = "";
    }, 3000);
}


// ========================================
// INICIALIZAÇÃO
// ========================================

listarTarefas();
