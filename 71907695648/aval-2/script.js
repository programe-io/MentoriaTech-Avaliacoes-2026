
const CHAVE = "gerenciadorTarefas";

let tarefas = carregarTarefas();

let proximoCodigo = tarefas.reduce(
    (maior, tarefa) => Math.max(maior, tarefa.codigo), 0
) + 1;

const formTarefa = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const corpoTabela = document.getElementById("corpoTabela");
const mensagem = document.getElementById("mensagem");

const pesquisa = document.getElementById("pesquisa");
const filtroStatus = document.getElementById("filtroStatus");
const filtroPrioridade = document.getElementById("filtroPrioridade");

const dialogEdicao = document.getElementById("dialogEdicao");
const formEdicao = document.getElementById("formEdicao");

document.getElementById("dataAtual").textContent =
    new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "full"
    }).format(new Date());


// CARREGAR TAREFAS

function carregarTarefas() {
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE));
        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        return [];
    }
}


// SALVAR TAREFAS

function salvarTarefas() {
    localStorage.setItem(CHAVE, JSON.stringify(tarefas));
}


// VALIDAR DADOS

function validarDados(titulo, prioridade) {

    if (typeof titulo !== "string" || titulo.trim().length < 5) {
        throw new Error("O título precisa ter pelo menos 5 caracteres.");
    }

    prioridade = Number(prioridade);

    if (![1, 2, 3].includes(prioridade)) {
        throw new Error("Selecione uma prioridade válida.");
    }

    return {
        titulo: titulo.trim(),
        prioridade
    };
}


// CADASTRAR TAREFA

function cadastrarTarefa(titulo, prioridade) {

    const dados = validarDados(titulo, prioridade);

    const novaTarefa = {
        codigo: proximoCodigo++,
        titulo: dados.titulo,
        prioridade: dados.prioridade,
        status: false
    };

    tarefas.push(novaTarefa);

    salvarTarefas();
    renderizarTarefas();

    mostrarMensagem("Tarefa cadastrada com sucesso!", "sucesso");
}


// BUSCAR TAREFA

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        item => item.codigo === Number(codigo)
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}


// CONCLUIR TAREFA

function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (tarefa.status) {
        throw new Error("Essa tarefa já foi concluída.");
    }

    tarefa.status = true;

    salvarTarefas();
    renderizarTarefas();

    mostrarMensagem("Tarefa concluída!", "sucesso");
}


// EXCLUIR TAREFA

function excluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    const confirmar = confirm(
        `Deseja excluir a tarefa "${tarefa.titulo}"?`
    );

    if (!confirmar) return;

    tarefas = tarefas.filter(
        item => item.codigo !== Number(codigo)
    );

    salvarTarefas();
    renderizarTarefas();

    mostrarMensagem("Tarefa excluída!", "sucesso");
}


// ALTERAR TAREFA

function alterarTarefa(codigo, titulo, prioridade) {

    const tarefa = buscarTarefa(codigo);
    const dados = validarDados(titulo, prioridade);

    tarefa.titulo = dados.titulo;
    tarefa.prioridade = dados.prioridade;

    salvarTarefas();
    renderizarTarefas();

    mostrarMensagem("Tarefa atualizada!", "sucesso");
}


// NOME DA PRIORIDADE

function nomePrioridade(prioridade) {

    return {
        1: "Alta",
        2: "Média",
        3: "Baixa"
    }[prioridade];
}


// CRIAR BOTÕES

function criarBotao(texto, acao, codigo) {

    const botao = document.createElement("button");

    botao.type = "button";
    botao.className = `acao ${acao}`;
    botao.textContent = texto;

    botao.addEventListener("click", () => {
        executarAcao(acao, codigo);
    });

    return botao;
}


// EXECUTAR AÇÕES

function executarAcao(acao, codigo) {

    try {

        if (acao === "concluir") {
            concluirTarefa(codigo);
        }

        if (acao === "editar") {
            abrirEdicao(codigo);
        }

        if (acao === "excluir") {
            excluirTarefa(codigo);
        }

    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
}


// RENDERIZAR TAREFAS

function renderizarTarefas() {

    const termo = pesquisa.value.trim().toLowerCase();

    const statusSelecionado = filtroStatus.value;
    const prioridadeSelecionada = filtroPrioridade.value;

    const tarefasFiltradas = tarefas.filter(tarefa => {

        const correspondeBusca =
            tarefa.titulo.toLowerCase().includes(termo) ||
            String(tarefa.codigo).includes(termo);

        const correspondeStatus =
            statusSelecionado === "todas" ||
            (statusSelecionado === "concluidas" && tarefa.status) ||
            (statusSelecionado === "pendentes" && !tarefa.status);

        const correspondePrioridade =
            prioridadeSelecionada === "todas" ||
            String(tarefa.prioridade) === prioridadeSelecionada;

        return correspondeBusca &&
            correspondeStatus &&
            correspondePrioridade;
    });

    corpoTabela.replaceChildren();

    tarefasFiltradas.forEach(tarefa => {

        const linha = document.createElement("tr");

        if (tarefa.status) {
            linha.classList.add("concluida");
        }

        // Código
        const codigo = document.createElement("td");
        codigo.textContent = `#${tarefa.codigo}`;
        linha.appendChild(codigo);

        // Título
        const titulo = document.createElement("td");
        titulo.className = "tarefa-nome";
        titulo.textContent = tarefa.titulo;
        linha.appendChild(titulo);

        // Prioridade
        const prioridade = document.createElement("td");
        const tagPrioridade = document.createElement("span");

        tagPrioridade.className =
            `tag prioridade-${tarefa.prioridade}`;

        tagPrioridade.textContent =
            nomePrioridade(tarefa.prioridade);

        prioridade.appendChild(tagPrioridade);
        linha.appendChild(prioridade);

        // Status
        const status = document.createElement("td");
        const tagStatus = document.createElement("span");

        tagStatus.className = tarefa.status
            ? "tag status-concluida"
            : "tag status-pendente";

        tagStatus.textContent = tarefa.status
            ? "Concluída"
            : "Em andamento";

        status.appendChild(tagStatus);
        linha.appendChild(status);

        // Ações
        const acoes = document.createElement("td");
        const grupo = document.createElement("div");

        grupo.className = "acoes";

        if (!tarefa.status) {
            grupo.appendChild(
                criarBotao("Concluir", "concluir", tarefa.codigo)
            );
        }

        grupo.appendChild(
            criarBotao("Editar", "editar", tarefa.codigo)
        );

        grupo.appendChild(
            criarBotao("Excluir", "excluir", tarefa.codigo)
        );

        acoes.appendChild(grupo);
        linha.appendChild(acoes);

        corpoTabela.appendChild(linha);
    });

    atualizarResumo();

    document.getElementById("estadoVazio")
        .classList.toggle("visivel", tarefasFiltradas.length === 0);
}


// ATUALIZAR RESUMO

function atualizarResumo() {

    document.getElementById("totalTarefas").textContent =
        tarefas.length;

    document.getElementById("tarefasPendentes").textContent =
        tarefas.filter(tarefa => !tarefa.status).length;

    document.getElementById("tarefasConcluidas").textContent =
        tarefas.filter(tarefa => tarefa.status).length;
}


// ABRIR EDIÇÃO

function abrirEdicao(codigo) {

    const tarefa = buscarTarefa(codigo);

    document.getElementById("codigoEdicao").value =
        tarefa.codigo;

    document.getElementById("tituloEdicao").value =
        tarefa.titulo;

    document.getElementById("prioridadeEdicao").value =
        tarefa.prioridade;

    dialogEdicao.showModal();
}


// MENSAGEM

function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}


// EVENTO DE CADASTRO

formTarefa.addEventListener("submit", evento => {

    evento.preventDefault();

    try {

        cadastrarTarefa(
            campoTitulo.value,
            campoPrioridade.value
        );

        formTarefa.reset();
        campoPrioridade.value = "2";
        campoTitulo.focus();

    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});


// EVENTO DE EDIÇÃO

formEdicao.addEventListener("submit", evento => {

    evento.preventDefault();

    try {

        alterarTarefa(
            document.getElementById("codigoEdicao").value,
            document.getElementById("tituloEdicao").value,
            document.getElementById("prioridadeEdicao").value
        );

        dialogEdicao.close();

    } catch (erro) {
        mostrarMensagem(erro.message, "erro");
    }
});


// FILTROS

pesquisa.addEventListener("input", renderizarTarefas);

filtroStatus.addEventListener("change", renderizarTarefas);

filtroPrioridade.addEventListener("change", renderizarTarefas);


// FECHAR JANELA DE EDIÇÃO

document.getElementById("cancelarEdicao")
    .addEventListener("click", () => {
        dialogEdicao.close();
    });


// INICIAR SISTEMA

renderizarTarefas();
