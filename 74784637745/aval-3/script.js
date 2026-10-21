
const tarefas = [];
let proximoCodigo = 1;

// Selecionar os elementos do HTML
const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

// Validar os dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }

    if (!Number.isInteger(prioridade) || prioridade < 1 || prioridade > 3) {
        throw new Error("Escolha uma prioridade entre 1 e 3.");
    }
}

// Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);
    return tarefa;
}

// Listar as tarefas na página
function listarTarefas() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        const item = document.createElement("li");
        item.textContent = "Nenhuma tarefa cadastrada.";
        listaTarefas.appendChild(item);
        return;
    }

    tarefas.forEach(function(tarefa) {
        const item = document.createElement("li");

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");
        const nomesPrioridade = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };
        prioridade.textContent =
            "Prioridade: " + nomesPrioridade[tarefa.prioridade];

        const status = document.createElement("p");
        status.textContent = tarefa.status
            ? "Status: Em andamento"
            : "Status: Concluída";

        item.appendChild(titulo);
        item.appendChild(codigo);
        item.appendChild(prioridade);
        item.appendChild(status);

        if (tarefa.status) {
            const botaoConcluir = document.createElement("button");
            botaoConcluir.textContent = "Concluir tarefa";

            botaoConcluir.addEventListener("click", function() {
                concluirTarefa(tarefa.codigo);
            });

            item.appendChild(botaoConcluir);
        }

        const botaoPrioridade = document.createElement("button");
        botaoPrioridade.textContent = "Alterar prioridade";
        botaoPrioridade.style.marginLeft = "8px";
        botaoPrioridade.style.marginTop = "8px";

        botaoPrioridade.addEventListener("click", function() {
            const novaPrioridade = prompt(
                "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
            );

            if (novaPrioridade === null || novaPrioridade.trim() === "") {
                return;
            }

            try {
                alterarPrioridade(
                    tarefa.codigo,
                    Number(novaPrioridade)
                );
                mostrarMensagem("Prioridade alterada com sucesso!");
            } catch (erro) {
                mostrarMensagem(erro.message);
            }
        });

        item.appendChild(botaoPrioridade);
        listaTarefas.appendChild(item);
    });
}

// Buscar uma tarefa pelo código
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === Number(codigo);
    });

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// Concluir uma tarefa
function concluirTarefa(codigo) {
    try {
        const tarefa = buscarTarefa(codigo);

        if (!tarefa.status) {
            throw new Error("Esta tarefa já está concluída.");
        }

        tarefa.status = false;
        listarTarefas();
        mostrarMensagem("Tarefa concluída com sucesso!");
    } catch (erro) {
        mostrarMensagem(erro.message);
    }
}

// Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
    listarTarefas();
}

// Exibir mensagens para o usuário
function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}

// Cadastrar tarefa ao enviar o formulário
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    try {
        const titulo = campoTitulo.value;
        const prioridade = Number(campoPrioridade.value);

        cadastrarTarefa(titulo, prioridade);

        listarTarefas();
        mostrarMensagem("Tarefa cadastrada com sucesso!");

        formulario.reset();
    } catch (erro) {
        mostrarMensagem(erro.message);
    }
});

// Exibir a lista inicial
listarTarefas();
