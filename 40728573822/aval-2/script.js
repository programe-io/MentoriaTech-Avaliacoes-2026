
let tarefas = [];
let proximoCodigo = 1;

const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");

const totalTarefas = document.getElementById("totalTarefas");
const pendentes = document.getElementById("pendentes");
const concluidas = document.getElementById("concluidas");
const contadorLista = document.getElementById("contadorLista");

function nomePrioridade(valor) {
    if (valor === 1) return "Alta";
    if (valor === 2) return "Média";
    return "Baixa";
}

function classePrioridade(valor) {
    if (valor === 1) return "alta";
    if (valor === 2) return "media";
    return "baixa";
}

// 1. CADASTRAR UMA NOVA TAREFA
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    if (titulo.length < 5) {
        alert("O título precisa ter pelo menos 5 caracteres.");
        campoTitulo.focus();
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        alert("Escolha uma prioridade entre 1 e 3.");
        return;
    }

    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    formulario.reset();
    campoPrioridade.value = "2";

    renderizarTarefas();
    campoTitulo.focus();
});

// 2. LISTAR AS TAREFAS CADASTRADAS
function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    totalTarefas.textContent = tarefas.length;

    pendentes.textContent = tarefas.filter(
        tarefa => !tarefa.concluida
    ).length;

    concluidas.textContent = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    contadorLista.textContent =
        tarefas.length === 1
            ? "1 tarefa"
            : tarefas.length + " tarefas";

    if (tarefas.length === 0) {
        const vazio = document.createElement("div");
        vazio.className = "vazio";

        const tituloVazio = document.createElement("strong");
        tituloVazio.textContent = "Nenhuma tarefa cadastrada";

        const mensagem = document.createElement("p");
        mensagem.textContent =
            "Cadastre sua primeira tarefa no formulário acima para começar a organizar seu dia.";

        vazio.appendChild(tituloVazio);
        vazio.appendChild(mensagem);
        listaTarefas.appendChild(vazio);
        return;
    }

    tarefas.forEach(function(tarefa) {
        const cartao = document.createElement("article");

        cartao.className = tarefa.concluida
            ? "tarefa acabada"
            : "tarefa";

        const informacoes = document.createElement("div");
        informacoes.className = "tarefa-info";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const detalhes = document.createElement("div");
        detalhes.className = "detalhes";

        const codigo = document.createElement("span");
        codigo.textContent = "Código #" + tarefa.codigo;

        const prioridade = document.createElement("span");
        prioridade.className =
            "etiqueta " + classePrioridade(tarefa.prioridade);
        prioridade.textContent =
            "Prioridade " + nomePrioridade(tarefa.prioridade);

        const status = document.createElement("span");
        status.className = tarefa.concluida
            ? "etiqueta status-concluida"
            : "etiqueta status";

        status.textContent = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        detalhes.appendChild(codigo);
        detalhes.appendChild(prioridade);
        detalhes.appendChild(status);

        informacoes.appendChild(titulo);
        informacoes.appendChild(detalhes);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        // 3. MARCAR UMA TAREFA COMO CONCLUÍDA
        const botaoConcluir = document.createElement("button");
        botaoConcluir.className = "botao-acao botao-concluir";
        botaoConcluir.textContent = tarefa.concluida
            ? "Desfazer"
            : "✓ Concluir";

        botaoConcluir.addEventListener("click", function() {
            concluirTarefa(tarefa.codigo);
        });

        // 4. ALTERAR A PRIORIDADE DE UMA TAREFA
        const botaoPrioridade = document.createElement("button");
        botaoPrioridade.className = "botao-acao";
        botaoPrioridade.textContent = "Alterar prioridade";

        botaoPrioridade.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo);
        });

        acoes.appendChild(botaoConcluir);
        acoes.appendChild(botaoPrioridade);

        cartao.appendChild(informacoes);
        cartao.appendChild(acoes);

        listaTarefas.appendChild(cartao);
    });
}

function concluirTarefa(codigo) {
    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) return;

    tarefa.concluida = !tarefa.concluida;
    renderizarTarefas();
}

function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) return;

    const novaPrioridade = prompt(
        "Alterar prioridade da tarefa:\n\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa\n\n" +
        "Digite 1, 2 ou 3:"
    );

    if (novaPrioridade === null) return;

    const valor = novaPrioridade.trim();

    if (!["1", "2", "3"].includes(valor)) {
        alert("Valor inválido! Digite 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = Number(valor);
    renderizarTarefas();
}

// Exibe a mensagem inicial quando a página abre.
renderizarTarefas();