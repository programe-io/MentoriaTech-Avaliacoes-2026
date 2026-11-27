
let tarefas = [];
let codigoAtual = 0;

const formulario = document.getElementById("formTarefa");

function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error("O título precisa ter no mínimo 5 caracteres.");
    }

    if (prioridade < 1 || prioridade > 3 ||
        !Number.isInteger(prioridade)) {
        throw new Error("A prioridade deve ser entre 1 e 3.");
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
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
        return tarefas;
    }

    tarefas.forEach(tarefa => {
        const elemento = document.createElement("div");

        elemento.className = tarefa.status
            ? "tarefa"
            : "tarefa concluida";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");
        prioridade.textContent =
            "Prioridade: " + tarefa.prioridade;

        const status = document.createElement("p");
        status.textContent = tarefa.status
            ? "Status: Em andamento"
            : "Status: Concluída";

        elemento.appendChild(titulo);
        elemento.appendChild(codigo);
        elemento.appendChild(prioridade);
        elemento.appendChild(status);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        if (tarefa.status) {
            const concluir = document.createElement("button");
            concluir.textContent = "Concluir";
            concluir.className = "btn-concluir";

            concluir.onclick = () => {
                executarAcao(() => concluirTarefa(tarefa.codigo));
            };

            acoes.appendChild(concluir);
        }

        const alterar = document.createElement("button");
        alterar.textContent = "Alterar prioridade";
        alterar.className = "btn-alterar";

        alterar.onclick = () => {
            const novaPrioridade = Number(
                prompt("Digite a nova prioridade (1, 2 ou 3):")
            );

            if (novaPrioridade === 0 || Number.isNaN(novaPrioridade)) {
                return;
            }

            executarAcao(() =>
                alterarPrioridade(tarefa.codigo, novaPrioridade)
            );
        };

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "btn-excluir";

        excluir.onclick = () => {
            if (confirm("Deseja excluir esta tarefa?")) {
                excluirTarefa(tarefa.codigo);
            }
        };

        acoes.appendChild(alterar);
        acoes.appendChild(excluir);

        elemento.appendChild(acoes);
        lista.appendChild(elemento);
    });

    return tarefas;
}

function buscarTarefa(codigo) {
    const tarefa = tarefas.find(
        item => item.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (!tarefa.status) {
        throw new Error("Esta tarefa já foi concluída.");
    }

    tarefa.status = false;

    listarTarefas();
}

function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}

function excluirTarefa(codigo) {
    buscarTarefa(codigo);

    tarefas = tarefas.filter(
        tarefa => tarefa.codigo !== codigo
    );

    listarTarefas();
}

function executarAcao(acao) {
    try {
        acao();

        mostrarMensagem("Operação realizada com sucesso.", "green");
    } catch (erro) {
        mostrarMensagem(erro.message, "red");
    }
}

function mostrarMensagem(texto, cor) {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.style.color = cor;
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    try {
        cadastrarTarefa(titulo, prioridade);

        mostrarMensagem(
            "Tarefa cadastrada com sucesso!",
            "green"
        );

        formulario.reset();

    } catch (erro) {
        mostrarMensagem(erro.message, "red");
    }
});

listarTarefas();
