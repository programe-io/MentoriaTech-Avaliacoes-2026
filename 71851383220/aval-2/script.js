
// ==========================================
// GERENCIADOR DE TAREFAS
// ==========================================

// Armazenamento
const CHAVE_STORAGE = "gerenciadorTarefas_v1";

let tarefas = carregarTarefas();

let proximoCodigo = tarefas.reduce(
    (maior, tarefa) => Math.max(maior, Number(tarefa.codigo) || 0),
    0
) + 1;

let codigoEmEdicao = null;


// ==========================================
// ELEMENTOS HTML
// ==========================================

const form = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");

const listaTarefas = document.getElementById("listaTarefas");
const pesquisa = document.getElementById("pesquisa");

const filtroStatus = document.getElementById("filtroStatus");
const filtroPrioridade = document.getElementById("filtroPrioridade");

const mensagemVazia = document.getElementById("mensagemVazia");

const botaoSalvar = document.getElementById("botaoSalvar");
const botaoCancelar = document.getElementById("botaoCancelar");

const tituloFormulario = document.getElementById("tituloFormulario");


// ==========================================
// LOCAL STORAGE
// ==========================================

function carregarTarefas() {

    try {

        const dados = JSON.parse(
            localStorage.getItem(CHAVE_STORAGE)
        );

        return Array.isArray(dados) ? dados : [];

    } catch (erro) {

        console.error("Erro ao carregar tarefas:", erro);

        return [];

    }

}


function salvarTarefas() {

    try {

        localStorage.setItem(
            CHAVE_STORAGE,
            JSON.stringify(tarefas)
        );

    } catch (erro) {

        alert("Não foi possível salvar as tarefas.");

        console.error(erro);

    }

}


// ==========================================
// CADASTRAR TAREFA
// ==========================================

function cadastrarTarefa(titulo, prioridade) {

    const novaTarefa = {

        codigo: proximoCodigo++,

        titulo: titulo.trim(),

        prioridade: Number(prioridade),

        status: false

    };

    tarefas.push(novaTarefa);

    salvarTarefas();

    renderizarTarefas();

}


// ==========================================
// BUSCAR TAREFA PELO CÓDIGO
// ==========================================

function buscarTarefa(codigo) {

    return tarefas.find(
        tarefa => tarefa.codigo === Number(codigo)
    );

}


// ==========================================
// EXCLUIR TAREFA
// ==========================================

function excluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (!tarefa) return;

    const confirmou = confirm(
        `Deseja excluir a tarefa "${tarefa.titulo}"?`
    );

    if (!confirmou) return;

    tarefas = tarefas.filter(
        item => item.codigo !== Number(codigo)
    );

    salvarTarefas();

    renderizarTarefas();

    if (codigoEmEdicao === Number(codigo)) {
        cancelarEdicao();
    }

}


// ==========================================
// CONCLUIR OU REABRIR TAREFA
// ==========================================

function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (!tarefa) return;

    tarefa.status = !tarefa.status;

    salvarTarefas();

    renderizarTarefas();

}


// ==========================================
// EDITAR TAREFA
// ==========================================

function iniciarEdicao(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (!tarefa) return;

    codigoEmEdicao = tarefa.codigo;

    campoTitulo.value = tarefa.titulo;

    campoPrioridade.value = String(tarefa.prioridade);

    tituloFormulario.textContent = "Editar tarefa";

    botaoSalvar.textContent = "Salvar alterações";

    botaoCancelar.classList.remove("oculto");

    campoTitulo.focus();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ==========================================
// CANCELAR EDIÇÃO
// ==========================================

function cancelarEdicao() {

    codigoEmEdicao = null;

    form.reset();

    campoPrioridade.value = "2";

    tituloFormulario.textContent = "Adicionar tarefa";

    botaoSalvar.textContent = "+ Adicionar tarefa";

    botaoCancelar.classList.add("oculto");

}


// ==========================================
// ALTERAR DADOS DA TAREFA
// ==========================================

function alterarTarefa(codigo, titulo, prioridade) {

    const tarefa = buscarTarefa(codigo);

    if (!tarefa) return;

    tarefa.titulo = titulo.trim();

    tarefa.prioridade = Number(prioridade);

    salvarTarefas();

    renderizarTarefas();

}


// ==========================================
// FILTRAR E PESQUISAR TAREFAS
// ==========================================

function obterTarefasFiltradas() {

    const termo = pesquisa.value
        .trim()
        .toLocaleLowerCase("pt-BR");

    const statusEscolhido = filtroStatus.value;

    const prioridadeEscolhida = filtroPrioridade.value;

    return tarefas.filter(tarefa => {

        const combinaTitulo = tarefa.titulo
            .toLocaleLowerCase("pt-BR")
            .includes(termo);

        const combinaStatus =
            statusEscolhido === "todas" ||

            (statusEscolhido === "pendentes" && !tarefa.status) ||

            (statusEscolhido === "concluidas" && tarefa.status);

        const combinaPrioridade =
            prioridadeEscolhida === "todas" ||

            tarefa.prioridade === Number(prioridadeEscolhida);

        return combinaTitulo &&
               combinaStatus &&
               combinaPrioridade;

    });

}


// ==========================================
// ATUALIZAR ESTATÍSTICAS
// ==========================================

function atualizarEstatisticas() {

    const concluidas = tarefas.filter(
        tarefa => tarefa.status
    ).length;

    const pendentes = tarefas.length - concluidas;

    document.getElementById("totalTarefas").textContent =
        tarefas.length;

    document.getElementById("totalConcluidas").textContent =
        concluidas;

    document.getElementById("totalPendentes").textContent =
        pendentes;

    document.getElementById("textoQuantidade").textContent =
        `${tarefas.length} tarefa(s) cadastrada(s).`;

}


// ==========================================
// EXIBIR TAREFAS NA TELA
// ==========================================

function renderizarTarefas() {

    const tarefasExibidas = obterTarefasFiltradas();

    listaTarefas.innerHTML = "";

    tarefasExibidas.forEach(tarefa => {

        const item = document.createElement("article");

        item.className = `tarefa ${
            tarefa.status ? "concluida" : ""
        }`;


        // Checkbox

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "check-tarefa";

        checkbox.checked = Boolean(tarefa.status);

        checkbox.setAttribute(
            "aria-label",
            `Concluir ${tarefa.titulo}`
        );

        checkbox.addEventListener("change", () => {
            concluirTarefa(tarefa.codigo);
        });


        // Detalhes

        const detalhes = document.createElement("div");

        detalhes.className = "detalhes-tarefa";


        const titulo = document.createElement("span");

        titulo.className = "titulo-tarefa";

        titulo.textContent = tarefa.titulo;


        const meta = document.createElement("div");

        meta.className = "meta-tarefa";


        const codigo = document.createElement("span");

        codigo.textContent = `Código #${tarefa.codigo}`;


        const prioridade = document.createElement("span");

        prioridade.className =
            `pilula prioridade-${tarefa.prioridade}`;

        prioridade.textContent =
            `Prioridade ${nomePrioridade(tarefa.prioridade)}`;

        meta.append(codigo, prioridade);


        if (tarefa.status) {

            const status = document.createElement("span");

            status.className = "pilula status-concluida";

            status.textContent = "Concluída";

            meta.appendChild(status);

        }

        detalhes.append(titulo, meta);


        // Botões de ação

        const acoes = document.createElement("div");

        acoes.className = "acoes-tarefa";


        // Editar

        const editar = document.createElement("button");

        editar.type = "button";

        editar.className = "botao-icone";

        editar.textContent = "✎";

        editar.title = "Editar tarefa";

        editar.setAttribute(
            "aria-label",
            `Editar ${tarefa.titulo}`
        );

        editar.addEventListener("click", () => {
            iniciarEdicao(tarefa.codigo);
        });


        // Excluir

        const excluir = document.createElement("button");

        excluir.type = "button";

        excluir.className = "botao-icone excluir";

        excluir.textContent = "×";

        excluir.title = "Excluir tarefa";

        excluir.setAttribute(
            "aria-label",
            `Excluir ${tarefa.titulo}`
        );

        excluir.addEventListener("click", () => {
            excluirTarefa(tarefa.codigo);
        });


        acoes.append(editar, excluir);

        item.append(checkbox, detalhes, acoes);

        listaTarefas.appendChild(item);

    });


    // Mensagem quando não existem tarefas

    mensagemVazia.classList.toggle(
        "visivel",
        tarefasExibidas.length === 0
    );

    mensagemVazia.textContent =
        tarefas.length === 0
            ? "Nenhuma tarefa por aqui. Adicione sua primeira tarefa!"
            : "Nenhuma tarefa encontrada com esses filtros.";


    atualizarEstatisticas();

}


// ==========================================
// NOMES DAS PRIORIDADES
// ==========================================

function nomePrioridade(prioridade) {

    const nomes = {

        1: "Baixa",

        2: "Média",

        3: "Alta"

    };

    return nomes[prioridade] || "Média";

}


// ==========================================
// EVENTO DO FORMULÁRIO
// ==========================================

form.addEventListener("submit", evento => {

    evento.preventDefault();

    const titulo = campoTitulo.value.trim();

    const prioridade = Number(campoPrioridade.value);


    // Validar título

    if (titulo.length < 5) {

        alert("O título precisa ter pelo menos 5 caracteres.");

        campoTitulo.focus();

        return;

    }


    // Validar prioridade

    if (![1, 2, 3].includes(prioridade)) {

        alert("Selecione uma prioridade válida.");

        return;

    }


    // Verificar se está editando ou cadastrando

    if (codigoEmEdicao === null) {

        cadastrarTarefa(titulo, prioridade);

    } else {

        alterarTarefa(
            codigoEmEdicao,
            titulo,
            prioridade
        );

        cancelarEdicao();

    }


    if (codigoEmEdicao === null) {
        form.reset();
    }

    campoPrioridade.value = "2";

    campoTitulo.focus();

});


// ==========================================
// EVENTOS DOS BOTÕES E FILTROS
// ==========================================

botaoCancelar.addEventListener("click", cancelarEdicao);

pesquisa.addEventListener("input", renderizarTarefas);

filtroStatus.addEventListener("change", renderizarTarefas);

filtroPrioridade.addEventListener("change", renderizarTarefas);


// ==========================================
// EXCLUIR TODAS AS TAREFAS CONCLUÍDAS
// ==========================================

document.getElementById("limparConcluidas")
    .addEventListener("click", () => {

        const quantidade = tarefas.filter(
            tarefa => tarefa.status
        ).length;

        if (quantidade === 0) {

            alert("Não há tarefas concluídas para excluir.");

            return;

        }

        const confirmou = confirm(
            `Deseja excluir ${quantidade} tarefa(s) concluída(s)?`
        );

        if (!confirmou) return;

        tarefas = tarefas.filter(
            tarefa => !tarefa.status
        );

        salvarTarefas();

        renderizarTarefas();

        if (
            codigoEmEdicao !== null &&
            !buscarTarefa(codigoEmEdicao)
        ) {
            cancelarEdicao();
        }

    });


// ==========================================
// INICIALIZAÇÃO DO GERENCIADOR
// ==========================================

renderizarTarefas();
