// Array para armazenar as tarefas
let tarefas = [];

// Gerador de códigos
let proximoCodigo = 0;

// Função para validar os dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error("O título deve possuir pelo menos 5 caracteres.");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve estar entre 1 e 3.");
    }
}

// Função para cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);
}

// Função para listar tarefas
function listarTarefas() {
    return tarefas;
}

// Função para buscar tarefa pelo código
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// Função para concluir tarefa
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Esta tarefa já foi concluída.");
    }

    tarefa.status = false;
}

// Função para alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

// Função para mostrar as tarefas na tela
function renderizarTarefas() {
    const container = document.getElementById("tabelaContainer");

    container.innerHTML = "";

    const lista = listarTarefas();

    if (lista.length === 0) {
        container.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    const tabela = document.createElement("table");

    const cabecalho = document.createElement("thead");
    cabecalho.innerHTML = `
        <tr>
            <th>Código</th>
            <th>Título</th>
            <th>Prioridade</th>
            <th>Status</th>
            <th>Ação</th>
        </tr>
    `;

    tabela.appendChild(cabecalho);

    const corpo = document.createElement("tbody");

    lista.forEach(function(tarefa) {
        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.textContent = tarefa.codigo;

        const titulo = document.createElement("td");
        titulo.textContent = tarefa.titulo;

        const prioridade = document.createElement("td");
        prioridade.textContent = tarefa.prioridade;

        const status = document.createElement("td");

        if (tarefa.status) {
            status.textContent = "Em andamento";
            status.className = "emAndamento";
        } else {
            status.textContent = "Concluída";
            status.className = "concluida";
        }

        const acao = document.createElement("td");
        const botao = document.createElement("button");

        botao.textContent = tarefa.status
            ? "Concluir"
            : "Já concluída";

        botao.className = "btnConcluir";
        botao.disabled = !tarefa.status;

        botao.addEventListener("click", function() {
            try {
                concluirTarefa(tarefa.codigo);
                renderizarTarefas();
                alert("Tarefa concluída!");
            } catch (erro) {
                alert(erro.message);
            }
        });

        acao.appendChild(botao);

        linha.appendChild(codigo);
        linha.appendChild(titulo);
        linha.appendChild(prioridade);
        linha.appendChild(status);
        linha.appendChild(acao);

        corpo.appendChild(linha);
    });

    tabela.appendChild(corpo);
    container.appendChild(tabela);
}

// Evento de cadastro
document.getElementById("formTarefa").addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const prioridade = Number(document.getElementById("prioridade").value);

    try {
        cadastrarTarefa(titulo, prioridade);

        renderizarTarefas();

        alert("Tarefa cadastrada com sucesso!");

        document.getElementById("formTarefa").reset();

    } catch (erro) {
        alert(erro.message);
    }
});

// Evento para alterar prioridade
document.getElementById("btnAlterar").addEventListener("click", function() {
    const codigo = Number(document.getElementById("codigoAlterar").value);
    const novaPrioridade = Number(document.getElementById("novaPrioridade").value);

    try {
        alterarPrioridade(codigo, novaPrioridade);

        renderizarTarefas();

        alert("Prioridade alterada com sucesso!");

        document.getElementById("novaPrioridade").value = "";

    } catch (erro) {
        alert(erro.message);
    }
});

// Exibição inicial
renderizarTarefas();