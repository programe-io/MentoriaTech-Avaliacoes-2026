
let tarefas = [];
let codigoAtual = 1;

// CADASTRAR TAREFA
function cadastrarTarefa(titulo, prioridade) {

    titulo = titulo.trim();
    prioridade = Number(prioridade);

    if (titulo.length < 5) {
        alert("O título precisa ter pelo menos 5 caracteres!");
        return false;
    }

    if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade inválida! Use 1, 2 ou 3.");
        return false;
    }

    const novaTarefa = {
        codigo: codigoAtual++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);

    listarTarefas();

    return true;
}

// LISTAR TAREFAS
function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    const pesquisa = document.getElementById("busca")
        .value.toLowerCase();

    const filtro = document.getElementById("filtro").value;

    let resultado = tarefas.filter(tarefa => {

        const correspondeTitulo = tarefa.titulo
            .toLowerCase()
            .includes(pesquisa);

        const correspondeStatus =
            filtro === "todas" ||
            (filtro === "pendente" && !tarefa.concluida) ||
            (filtro === "concluida" && tarefa.concluida);

        return correspondeTitulo && correspondeStatus;
    });

    lista.innerHTML = "";

    if (resultado.length === 0) {
        lista.innerHTML =
            '<p class="empty">Nenhuma tarefa encontrada.</p>';
    }

    resultado.forEach(tarefa => {

        let nomePrioridade = "";
        let classe = "";

        switch (tarefa.prioridade) {
            case 1:
                nomePrioridade = "Alta";
                classe = "high";
                break;

            case 2:
                nomePrioridade = "Média";
                classe = "medium";
                break;

            case 3:
                nomePrioridade = "Baixa";
                classe = "low";
                break;
        }

        const div = document.createElement("div");

        div.className = tarefa.concluida
            ? "task done"
            : "task";

        const info = document.createElement("div");
        info.className = "task-info";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const detalhes = document.createElement("p");
        detalhes.textContent =
            `Código: ${tarefa.codigo} | ${
                tarefa.concluida ? "Concluída" : "Pendente"
            }`;

        const prioridade = document.createElement("span");
        prioridade.className = `priority ${classe}`;
        prioridade.textContent =
            `Prioridade ${tarefa.prioridade} - ${nomePrioridade}`;

        info.append(titulo, detalhes, prioridade);

        const actions = document.createElement("div");
        actions.className = "actions";

        const concluir = criarBotao(
            tarefa.concluida ? "Reabrir" : "Concluir",
            "complete",
            () => marcarConcluida(tarefa.codigo)
        );

        const editar = criarBotao(
            "Editar",
            "edit",
            () => alterarPrioridade(tarefa.codigo)
        );

        const excluir = criarBotao(
            "Excluir",
            "delete",
            () => excluirTarefa(tarefa.codigo)
        );

        actions.append(concluir, editar, excluir);

        div.append(info, actions);

        lista.appendChild(div);
    });

    atualizarIndicadores();
}

// CRIAR BOTÕES
function criarBotao(texto, classe, acao) {

    const botao = document.createElement("button");

    botao.textContent = texto;
    botao.className = classe;
    botao.addEventListener("click", acao);

    return botao;
}

// CONCLUIR TAREFA
function marcarConcluida(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        listarTarefas();
    }
}

// ALTERAR PRIORIDADE
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) return;

    const novaPrioridade = prompt(
        "Escolha a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (novaPrioridade === null) return;

    if (!["1", "2", "3"].includes(novaPrioridade.trim())) {
        alert("Informe uma prioridade válida!");
        return;
    }

    tarefa.prioridade = Number(novaPrioridade);

    listarTarefas();

    alert("Prioridade atualizada!");
}

// EXCLUIR TAREFA
function excluirTarefa(codigo) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta tarefa?"
    );

    if (!confirmar) return;

    tarefas = tarefas.filter(
        tarefa => tarefa.codigo !== codigo
    );

    listarTarefas();
}

// ATUALIZAR INDICADORES
function atualizarIndicadores() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("total").textContent = total;

    document.getElementById("pendentes").textContent =
        pendentes;

    document.getElementById("concluidas").textContent =
        concluidas;
}

// EVENTO DO FORMULÁRIO
document.getElementById("formTarefa")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const titulo = document.getElementById("titulo").value;
        const prioridade = document.getElementById("prioridade").value;

        const cadastrada = cadastrarTarefa(titulo, prioridade);

        if (cadastrada) {
            this.reset();
        }
    });

// EVENTO DE PESQUISA
document.getElementById("busca")
    .addEventListener("input", listarTarefas);

// EVENTO DE FILTRO
document.getElementById("filtro")
    .addEventListener("change", listarTarefas);

// INICIALIZAÇÃO
listarTarefas();
