let tarefas = [];
let codigoAtual = 0;

const form = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error("O título deve ter no mínimo cinco caracteres.");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 e 3.");
    }
}

function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    codigoAtual++;

    const tarefa = {
        codigo: codigoAtual,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);
    listarTarefas();
}

function listarTarefas() {
    lista.replaceChildren();

    tarefas.forEach(tarefa => {
        const item = document.createElement("li");

        if (!tarefa.status) {
            item.classList.add("concluida");
        }

        const texto = document.createElement("span");
        texto.textContent =
            `Código: ${tarefa.codigo} | ${tarefa.titulo} | Prioridade: ${tarefa.prioridade} | ${tarefa.status ? "Em andamento" : "Concluída"}`;

        item.appendChild(texto);
        item.appendChild(document.createElement("br"));

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = "Concluir";
        botaoConcluir.addEventListener("click", () => {
            try {
                concluirTarefa(tarefa.codigo);
                mostrarMensagem("Tarefa concluída!");
            } catch (erro) {
                mostrarMensagem(erro.message, true);
            }
        });

        const botaoPrioridade = document.createElement("button");
        botaoPrioridade.textContent = "Alterar prioridade";
        botaoPrioridade.addEventListener("click", () => {
            const novaPrioridade = Number(
                prompt("Digite a nova prioridade (1, 2 ou 3):")
            );

            if (Number.isNaN(novaPrioridade)) return;

            try {
                alterarPrioridade(tarefa.codigo, novaPrioridade);
                mostrarMensagem("Prioridade alterada!");
            } catch (erro) {
                mostrarMensagem(erro.message, true);
            }
        });

        item.appendChild(botaoConcluir);
        item.appendChild(botaoPrioridade);
        lista.appendChild(item);
    });
}

function buscarTarefa(codigo) {
    const tarefa = tarefas.find(tarefa => tarefa.codigo === codigo);

    if (!tarefa) {
        throw new Error("Código da tarefa não encontrado.");
    }

    return tarefa;
}

function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (!tarefa.status) {
        throw new Error("Essa tarefa já foi concluída.");
    }

    tarefa.status = false;
    listarTarefas();
}

function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
    listarTarefas();
}

function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.style.color = erro ? "red" : "green";
}

form.addEventListener("submit", evento => {
    evento.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    try {
        cadastrarTarefa(titulo, prioridade);
        form.reset();
        mostrarMensagem("Tarefa cadastrada com sucesso!");
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    }
});

listarTarefas();