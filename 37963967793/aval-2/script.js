
let tarefas = [];
let codigoAtual = 0;

const formTarefa = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

// Validar os dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error(
            "O título deve ter no mínimo 5 caracteres."
        );
    }

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }
}

// Cadastrar uma tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    codigoAtual++;

    const novaTarefa = {
        codigo: codigoAtual,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);

    listarTarefas();
}

// Retornar a lista de tarefas
function listarTarefas() {
    return tarefas;
}

// Buscar tarefa pelo código
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// Concluir uma tarefa
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Essa tarefa já foi concluída.");
    }

    tarefa.status = false;

    listarTarefas();
}

// Alterar a prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}

// Exibir as tarefas na tabela
function exibirTarefas() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 5;
        celula.textContent = "Nenhuma tarefa cadastrada.";

        linha.appendChild(celula);
        listaTarefas.appendChild(linha);
        return;
    }

    tarefas.forEach(function(tarefa) {
        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.textContent = tarefa.codigo;

        const titulo = document.createElement("td");
        titulo.textContent = tarefa.titulo;

        const prioridade = document.createElement("td");
        prioridade.textContent = tarefa.prioridade;

        const status = document.createElement("td");

        if (tarefa.status) {
            status.textContent = "Pendente";
            status.className = "status-pendente";
        } else {
            status.textContent = "Concluída";
            status.className = "status-concluida";
        }

        const acoes = document.createElement("td");

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = "Concluir";
        botaoConcluir.disabled = !tarefa.status;

        botaoConcluir.addEventListener("click", function() {
            try {
                concluirTarefa(tarefa.codigo);
                mensagem.textContent = "Tarefa concluída!";
                mensagem.style.color = "#15803d";
            } catch (erro) {
                mensagem.textContent = erro.message;
                mensagem.style.color = "#dc2626";
            }
        });

        const botaoPrioridade = document.createElement("button");
        botaoPrioridade.textContent = "Alterar prioridade";

        botaoPrioridade.addEventListener("click", function() {
            const entrada = prompt(
                "Digite a nova prioridade: 1 (Alta), 2 (Média) ou 3 (Baixa)"
            );

            if (entrada === null || entrada.trim() === "") {
                return;
            }

            const novaPrioridade = Number(entrada);

            try {
                alterarPrioridade(
                    tarefa.codigo,
                    novaPrioridade
                );

                mensagem.textContent = "Prioridade alterada!";
                mensagem.style.color = "#15803d";
            } catch (erro) {
                mensagem.textContent = erro.message;
                mensagem.style.color = "#dc2626";
            }
        });

        acoes.append(botaoConcluir, botaoPrioridade);

        linha.append(
            codigo,
            titulo,
            prioridade,
            status,
            acoes
        );

        listaTarefas.appendChild(linha);
    });
}

// Atualizar a listagem
function atualizarLista() {
    exibirTarefas();
}

// Evento do formulário
formTarefa.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    try {
        cadastrarTarefa(titulo, prioridade);

        mensagem.textContent = "Tarefa cadastrada com sucesso!";
        mensagem.style.color = "#15803d";

        formTarefa.reset();
        document.getElementById("prioridade").value = "2";
    } catch (erro) {
        mensagem.textContent = erro.message;
        mensagem.style.color = "#dc2626";
    }
});

// Exibir a lista atualizada
listarTarefas = function() {
    atualizarLista();
    return tarefas;
};

exibirTarefas();
