
// Lista que armazena as tarefas
let tarefas = [];

// Código automático para cada tarefa
let proximoCodigo = 1;

// Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    titulo = titulo.trim();
    prioridade = Number(prioridade);

    // Validar o título
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return false;
    }

    // Validar a prioridade
    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return false;
    }

    const novaTarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);

    listarTarefas();

    alert("Tarefa cadastrada com sucesso!");
    return true;
}

// Retornar o nome da prioridade
function nomePrioridade(prioridade) {
    if (prioridade === 1) {
        return "1 - Alta";
    } else if (prioridade === 2) {
        return "2 - Média";
    } else {
        return "3 - Baixa";
    }
}

// Listar todas as tarefas
function listarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="5" class="vazio">
                    Nenhuma tarefa cadastrada.
                </td>
            </tr>
        `;
        return;
    }

    tarefas.forEach(function(tarefa) {
        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.textContent = tarefa.codigo;

        const titulo = document.createElement("td");
        titulo.textContent = tarefa.titulo;

        const prioridade = document.createElement("td");
        prioridade.textContent = nomePrioridade(tarefa.prioridade);

        const status = document.createElement("td");
        status.textContent = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        status.className = tarefa.concluida
            ? "concluida"
            : "pendente";

        const acoes = document.createElement("td");
        acoes.className = "acoes";

        // Botão para concluir a tarefa
        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = tarefa.concluida
            ? "Já concluída"
            : "Concluir tarefa";

        botaoConcluir.className = "botao-concluir";
        botaoConcluir.disabled = tarefa.concluida;

        botaoConcluir.addEventListener("click", function() {
            concluirTarefa(tarefa.codigo);
        });

        // Botão para alterar a prioridade
        const botaoPrioridade = document.createElement("button");
        botaoPrioridade.textContent = "Alterar prioridade";
        botaoPrioridade.className = "botao-prioridade";

        botaoPrioridade.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo);
        });

        acoes.appendChild(botaoConcluir);
        acoes.appendChild(botaoPrioridade);

        linha.appendChild(codigo);
        linha.appendChild(titulo);
        linha.appendChild(prioridade);
        linha.appendChild(status);
        linha.appendChild(acoes);

        lista.appendChild(linha);
    });
}

// Marcar uma tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    listarTarefas();

    alert("Tarefa concluída com sucesso!");
}

// Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (novaPrioridade === null || novaPrioridade.trim() === "") {
        return;
    }

    const prioridade = Number(novaPrioridade);

    if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = prioridade;

    listarTarefas();

    alert("Prioridade alterada com sucesso!");
}

// Evento do formulário
document.getElementById("formTarefa")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        const titulo = document.getElementById("titulo").value;
        const prioridade = document.getElementById("prioridade").value;

        const cadastrada = cadastrarTarefa(titulo, prioridade);

        if (cadastrada) {
            this.reset();
            document.getElementById("prioridade").value = "2";
        }
    });

// Mostrar a lista ao abrir o site
listarTarefas();

