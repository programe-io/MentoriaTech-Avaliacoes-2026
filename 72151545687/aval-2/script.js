
// ARRAY PRINCIPAL
let tarefas = [];

// GERADOR DE CÓDIGOS
let proximoCodigo = 0;

// FILTRO ATUAL
let filtroAtual = "todas";

// ELEMENTOS HTML
const formTarefa = document.getElementById("formTarefa");
const listaTarefas = document.getElementById("listaTarefas");

// 1. FUNÇÃO PARA VALIDAR OS DADOS
function validarDadosDaTarefa(titulo, prioridade) {

    if (typeof titulo !== "string" || titulo.trim().length < 5) {
        throw new Error("O título deve possuir no mínimo 5 caracteres.");
    }

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        throw new Error("A prioridade deve estar entre 1 e 3.");
    }
}

// 2. FUNÇÃO PARA CADASTRAR TAREFA
function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);

    return novaTarefa;
}

// 3. FUNÇÃO PARA LISTAR TAREFAS
function listarTarefas() {
    return tarefas;
}

// 4. FUNÇÃO PARA BUSCAR TAREFA
function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// 5. FUNÇÃO PARA CONCLUIR TAREFA
function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (!tarefa.status) {
        throw new Error("Esta tarefa já foi concluída.");
    }

    tarefa.status = false;

    return tarefa;
}

// 6. FUNÇÃO PARA ALTERAR PRIORIDADE
function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    return tarefa;
}

// 7. FUNÇÃO PARA ATUALIZAR O RESUMO
function atualizarResumo() {

    const total = tarefas.length;

    const pendentes = tarefas.filter(
        tarefa => tarefa.status
    ).length;

    const concluidas = tarefas.filter(
        tarefa => !tarefa.status
    ).length;

    document.getElementById("totalTarefas").textContent = total;

    document.getElementById("tarefasPendentes").textContent = pendentes;

    document.getElementById("tarefasConcluidas").textContent = concluidas;
}

// 8. FUNÇÃO PARA MOSTRAR AS TAREFAS NA TELA
function exibirTarefas() {

    listaTarefas.replaceChildren();

    let tarefasFiltradas = tarefas;

    if (filtroAtual === "pendentes") {
        tarefasFiltradas = tarefas.filter(
            tarefa => tarefa.status
        );
    }

    if (filtroAtual === "concluidas") {
        tarefasFiltradas = tarefas.filter(
            tarefa => !tarefa.status
        );
    }

    if (tarefasFiltradas.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.className = "vazio";
        mensagem.textContent = "Nenhuma tarefa encontrada.";
        listaTarefas.appendChild(mensagem);
    }

    tarefasFiltradas.forEach(tarefa => {

        const item = document.createElement("div");
        item.className = "tarefa";

        const informacoes = document.createElement("div");
        informacoes.className = "info-tarefa";

        if (!tarefa.status) {
            informacoes.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("span");
        prioridade.className = "prioridade";

        if (tarefa.prioridade === 1) {
            prioridade.classList.add("alta");
            prioridade.textContent = "Prioridade alta";
        } else if (tarefa.prioridade === 2) {
            prioridade.classList.add("media");
            prioridade.textContent = "Prioridade média";
        } else {
            prioridade.classList.add("baixa");
            prioridade.textContent = "Prioridade baixa";
        }

        const status = document.createElement("p");
        status.textContent = tarefa.status
            ? "Status: Em andamento"
            : "Status: Concluída";

        informacoes.append(
            titulo,
            codigo,
            prioridade,
            status
        );

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        if (tarefa.status) {
            const botaoConcluir = document.createElement("button");

            botaoConcluir.className = "btn-concluir";
            botaoConcluir.textContent = "Concluir";
            botaoConcluir.dataset.acao = "concluir";
            botaoConcluir.dataset.codigo = tarefa.codigo;

            acoes.appendChild(botaoConcluir);
        }

        const botaoPrioridade = document.createElement("button");

        botaoPrioridade.className = "btn-prioridade";
        botaoPrioridade.textContent = "Alterar prioridade";
        botaoPrioridade.dataset.acao = "prioridade";
        botaoPrioridade.dataset.codigo = tarefa.codigo;

        acoes.appendChild(botaoPrioridade);

        item.append(informacoes, acoes);

        listaTarefas.appendChild(item);
    });

    atualizarResumo();
}

// 9. CADASTRO PELO FORMULÁRIO
formTarefa.addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = document.getElementById("titulo").value;

    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    try {
        cadastrarTarefa(titulo, prioridade);

        alert("Tarefa cadastrada com sucesso!");

        formTarefa.reset();

        exibirTarefas();

    } catch (erro) {
        alert(erro.message);
    }
});

// 10. AÇÕES DOS BOTÕES
listaTarefas.addEventListener("click", function(event) {

    const botao = event.target.closest("button[data-acao]");

    if (!botao) return;

    const codigo = Number(botao.dataset.codigo);

    try {

        if (botao.dataset.acao === "concluir") {

            concluirTarefa(codigo);

            alert("Tarefa concluída com sucesso!");

        } else if (botao.dataset.acao === "prioridade") {

            const resposta = prompt(
                "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
            );

            if (resposta === null) return;

            if (!/^[123]$/.test(resposta.trim())) {
                throw new Error("Digite 1, 2 ou 3.");
            }

            alterarPrioridade(codigo, Number(resposta));

            alert("Prioridade alterada com sucesso!");
        }

        exibirTarefas();

    } catch (erro) {
        alert(erro.message);
    }
});

// 11. FILTROS DE TAREFAS
document.querySelectorAll(".filtro").forEach(botao => {

    botao.addEventListener("click", function() {

        document.querySelectorAll(".filtro").forEach(item => {
            item.classList.remove("ativo");
        });

        this.classList.add("ativo");

        filtroAtual = this.dataset.filtro;

        exibirTarefas();
    });
});

// INICIALIZAÇÃO
exibirTarefas();
