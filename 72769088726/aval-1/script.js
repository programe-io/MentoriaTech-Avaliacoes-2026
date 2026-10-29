
/* Array que guarda todas as tarefas */
let tarefas = [];
let geradorCodigo = 0;

// Validar os dados da tarefa
function validarDadosTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error(
            "O título deve ter no mínimo 5 caracteres."
        );
    }

    if (![1, 2, 3].includes(Number(prioridade))) {
        throw new Error(
            "Informe uma prioridade entre 1 e 3."
        );
    }
}

// Cadastrar uma tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: ++geradorCodigo,
        titulo: titulo.trim(),
        prioridade: Number(prioridade),
        status: true
    };

    tarefas.push(tarefa);
    return tarefa;
}

// Listar todas as tarefas
function listarTarefas() {
    return tarefas;
}

// Buscar tarefa pelo código
function buscarTarefa(codigo) {
    return tarefas.find(
        tarefa => tarefa.codigo === Number(codigo)
    );
}

// Concluir uma tarefa
function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    tarefa.status = false;
}

// Excluir uma tarefa
function excluirTarefa(codigo) {
    let indice = tarefas.findIndex(
        tarefa => tarefa.codigo === Number(codigo)
    );

    if (indice === -1) {
        throw new Error("Tarefa não encontrada.");
    }

    tarefas.splice(indice, 1);
}

// Exibir as tarefas na tela
function renderizarTarefas() {
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML =
            '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
        return;
    }

    tarefas.forEach(tarefa => {
        const elemento = document.createElement("div");

        elemento.className = tarefa.status
            ? "tarefa"
            : "tarefa concluida";

        const informacoes = document.createElement("div");
        informacoes.className = "info-tarefa";

        const titulo = document.createElement("strong");
        titulo.className = "titulo-tarefa";
        titulo.textContent = tarefa.titulo;

        const detalhes = document.createElement("p");
        detalhes.textContent =
            `Código: ${tarefa.codigo} | Prioridade: ${
                tarefa.prioridade === 3
                    ? "Alta"
                    : tarefa.prioridade === 2
                    ? "Média"
                    : "Baixa"
            }`;

        const status = document.createElement("p");
        status.textContent = tarefa.status
            ? "Status: Pendente"
            : "Status: Concluída";

        informacoes.append(titulo, detalhes, status);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        if (tarefa.status) {
            const btnConcluir = document.createElement("button");
            btnConcluir.textContent = "Concluir";
            btnConcluir.className = "btn-concluir";

            btnConcluir.addEventListener("click", () => {
                concluirTarefa(tarefa.codigo);
                renderizarTarefas();
            });

            acoes.appendChild(btnConcluir);
        }

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";

        btnExcluir.addEventListener("click", () => {
            excluirTarefa(tarefa.codigo);
            renderizarTarefas();
        });

        acoes.appendChild(btnExcluir);
        elemento.append(informacoes, acoes);
        lista.appendChild(elemento);
    });
}

// Cadastrar pelo formulário HTML
document.getElementById("formTarefa")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        const titulo = document.getElementById("titulo").value;
        const prioridade = document.getElementById("prioridade").value;
        const mensagem = document.getElementById("mensagem");

        try {
            cadastrarTarefa(titulo, prioridade);

            mensagem.textContent = "Tarefa cadastrada com sucesso!";
            mensagem.style.color = "green";

            this.reset();
            renderizarTarefas();
        } catch (erro) {
            mensagem.textContent = erro.message;
            mensagem.style.color = "red";
        }
    });

// Mostrar a lista inicial
renderizarTarefas();