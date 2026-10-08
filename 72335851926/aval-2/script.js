// Array que armazenará todas as tarefas
let tarefas = [];

// Elementos do HTML
const formTarefa = document.getElementById("formTarefa");
const tituloInput = document.getElementById("titulo");
const prioridadeInput = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

// Cadastro de uma nova tarefa
formTarefa.addEventListener("submit", function (event) {
    event.preventDefault();

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
        codigo: tarefas.length + 1,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    // Adiciona a tarefa ao array
    tarefas.push(novaTarefa);

    // Atualiza a lista
    listarTarefas();

    // Limpa o formulário
    formTarefa.reset();

    mostrarMensagem("Tarefa cadastrada com sucesso!", "sucesso");
});

// Lista todas as tarefas
function listarTarefas() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        listaTarefas.innerHTML =
            '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
        return;
    }

    tarefas.forEach(function (tarefa) {
        const div = document.createElement("div");

        div.classList.add("tarefa");

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        const nomePrioridade = obterNomePrioridade(tarefa.prioridade);
        const classePrioridade = obterClassePrioridade(tarefa.prioridade);

        div.innerHTML = `
            <h3>${tarefa.codigo} - ${tarefa.titulo}</h3>

            <p>
                Prioridade:
                <span class="${classePrioridade}">
                    ${tarefa.prioridade} - ${nomePrioridade}
                </span>
            </p>

            <p>
                Status:
                <strong>
                    ${tarefa.concluida ? "Concluída" : "Pendente"}
                </strong>
            </p>

            <div class="acoes">
                ${
                    !tarefa.concluida
                        ? `<button
                            class="btn-concluir"
                            onclick="marcarComoConcluida(${tarefa.codigo})">
                            Marcar como concluída
                           </button>`
                        : ""
                }

                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>
            </div>
        `;

        listaTarefas.appendChild(div);
    });
}

// Marca uma tarefa como concluída
function marcarComoConcluida(codigo) {
    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.codigo === codigo;
    });

    if (tarefa) {
        tarefa.concluida = true;
        listarTarefas();

        mostrarMensagem(
            "Tarefa marcada como concluída!",
            "sucesso"
        );
    }
}

// Altera a prioridade de uma tarefa
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(function (tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        return;
    }

    const novaPrioridade = Number(
        prompt(
            "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
        )
    );

    // Validação da prioridade
    if (
        Number.isNaN(novaPrioridade) ||
        novaPrioridade < 1 ||
        novaPrioridade > 3
    ) {
        mostrarMensagem(
            "Prioridade inválida! Digite um valor entre 1 e 3.",
            "erro"
        );
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();

    mostrarMensagem(
        "Prioridade alterada com sucesso!",
        "sucesso"
    );
}

// Retorna o nome da prioridade
function obterNomePrioridade(prioridade) {
    if (prioridade === 1) {
        return "Alta";
    }

    if (prioridade === 2) {
        return "Média";
    }

    return "Baixa";
}

// Retorna a classe CSS da prioridade
function obterClassePrioridade(prioridade) {
    if (prioridade === 1) {
        return "prioridade-alta";
    }

    if (prioridade === 2) {
        return "prioridade-media";
    }

    return "prioridade-baixa";
}

// Exibe mensagens para o usuário
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;

    setTimeout(function () {
        mensagem.textContent = "";
        mensagem.className = "";
    }, 3000);
}