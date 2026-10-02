// ==========================================
// DADOS
// ==========================================

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let tarefaEditando = null;


// ==========================================
// ELEMENTOS
// ==========================================

const form = document.getElementById("formTarefa");

const tituloInput = document.getElementById("titulo");
const descricaoInput = document.getElementById("descricao");
const prioridadeInput = document.getElementById("prioridade");
const prazoInput = document.getElementById("prazo");

const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

const buscaInput = document.getElementById("busca");
const filtroStatus = document.getElementById("filtroStatus");
const filtroPrioridade = document.getElementById("filtroPrioridade");


// ==========================================
// VALIDAR TAREFA
// ==========================================

function validarTarefa(titulo, descricao, prazo) {

    if (!titulo.trim()) {
        return "O título é obrigatório.";
    }

    if (titulo.trim().length < 3) {
        return "O título deve ter pelo menos 3 caracteres.";
    }

    if (descricao.trim().length < 5) {
        return "A descrição deve ter pelo menos 5 caracteres.";
    }

    if (!prazo) {
        return "Informe o prazo da tarefa.";
    }

    return null;
}


// ==========================================
// SALVAR NO LOCALSTORAGE
// ==========================================

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}


// ==========================================
// CRIAR TAREFA
// ==========================================

function criarTarefa() {

    const titulo = tituloInput.value.trim();
    const descricao = descricaoInput.value.trim();
    const prioridade = prioridadeInput.value;
    const prazo = prazoInput.value;

    const erro = validarTarefa(titulo, descricao, prazo);

    if (erro) {
        mostrarMensagem(erro, "red");
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        titulo,
        descricao,
        prioridade,
        prazo,
        concluida: false,
        criadaEm: new Date().toISOString()
    };

    tarefas.push(novaTarefa);

    salvarTarefas();

    form.reset();

    prioridadeInput.value = "media";

    mostrarMensagem("Tarefa cadastrada com sucesso!", "green");

    renderizar();
}


// ==========================================
// ALTERAR TAREFA
// ==========================================

function alterarTarefa(id) {

    const tarefa = tarefas.find(tarefa => tarefa.id === id);

    if (!tarefa) {
        return;
    }

    const novoTitulo = prompt("Novo título:", tarefa.titulo);

    if (novoTitulo === null) {
        return;
    }

    const titulo = novoTitulo.trim();

    if (titulo.length < 3) {
        alert("O título deve ter pelo menos 3 caracteres.");
        return;
    }

    const novaDescricao = prompt(
        "Nova descrição:",
        tarefa.descricao
    );

    if (novaDescricao === null) {
        return;
    }

    if (novaDescricao.trim().length < 5) {
        alert("A descrição deve ter pelo menos 5 caracteres.");
        return;
    }

    tarefa.titulo = titulo;
    tarefa.descricao = novaDescricao.trim();

    salvarTarefas();
    renderizar();
}


// ==========================================
// CONCLUIR / REABRIR
// ==========================================

function concluirTarefa(id) {

    const tarefa = tarefas.find(tarefa => tarefa.id === id);

    if (!tarefa) {
        return;
    }

    tarefa.concluida = !tarefa.concluida;

    salvarTarefas();
    renderizar();
}


// ==========================================
// EXCLUIR
// ==========================================

function excluirTarefa(id) {

    const tarefa = tarefas.find(tarefa => tarefa.id === id);

    if (!tarefa) {
        return;
    }

    const confirmar = confirm(
        `Deseja excluir a tarefa "${tarefa.titulo}"?`
    );

    if (!confirmar) {
        return;
    }

    tarefas = tarefas.filter(tarefa => tarefa.id !== id);

    salvarTarefas();
    renderizar();
}


// ==========================================
// BUSCAR TAREFAS
// ==========================================

function buscarTarefas() {

    const termo = buscaInput.value.toLowerCase().trim();

    return tarefas.filter(tarefa => {

        const correspondeTexto =
            tarefa.titulo.toLowerCase().includes(termo) ||
            tarefa.descricao.toLowerCase().includes(termo);

        const correspondeStatus =
            filtroStatus.value === "todas" ||
            (filtroStatus.value === "concluida" && tarefa.concluida) ||
            (filtroStatus.value === "pendente" && !tarefa.concluida);

        const correspondePrioridade =
            filtroPrioridade.value === "todas" ||
            tarefa.prioridade === filtroPrioridade.value;

        return (
            correspondeTexto &&
            correspondeStatus &&
            correspondePrioridade
        );
    });
}


// ==========================================
// VERIFICAR SE ESTÁ ATRASADA
// ==========================================

function tarefaEstaAtrasada(tarefa) {

    if (tarefa.concluida) {
        return false;
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const prazo = new Date(tarefa.prazo + "T00:00:00");

    return prazo < hoje;
}


// ==========================================
// FORMATAR DATA
// ==========================================

function formatarData(data) {

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


// ==========================================
// RENDERIZAR TAREFAS
// ==========================================

function renderizarTarefas() {

    const tarefasFiltradas = buscarTarefas();

    listaTarefas.innerHTML = "";

    if (tarefasFiltradas.length === 0) {

        listaTarefas.innerHTML = `
            <div class="sem-tarefas">
                Nenhuma tarefa encontrada.
            </div>
        `;

        return;
    }

    tarefasFiltradas.forEach(tarefa => {

        const div = document.createElement("div");

        div.className = `tarefa ${
            tarefa.concluida ? "concluida" : ""
        }`;

        const atrasada = tarefaEstaAtrasada(tarefa);

        div.innerHTML = `

            <div class="tarefa-info">

                <div class="tarefa-titulo">
                    ${escaparHTML(tarefa.titulo)}
                </div>

                <div class="tarefa-descricao">
                    ${escaparHTML(tarefa.descricao)}
                </div>

                <div class="tarefa-meta">

                    <span class="badge prioridade-${tarefa.prioridade}">
                        Prioridade: ${formatarPrioridade(tarefa.prioridade)}
                    </span>

                    <span class="badge status">
                        ${tarefa.concluida ? "Concluída" : "Pendente"}
                    </span>

                    <span class="badge">
                        Prazo: ${formatarData(tarefa.prazo)}
                    </span>

                    ${
                        atrasada
                            ? `<span class="badge atrasada">Atrasada</span>`
                            : ""
                    }

                </div>

            </div>

            <div class="acoes">

                <button
                    class="btn btn-concluir"
                    onclick="concluirTarefa(${tarefa.id})"
                >
                    ${tarefa.concluida ? "Reabrir" : "Concluir"}
                </button>

                <button
                    class="btn btn-editar"
                    onclick="alterarTarefa(${tarefa.id})"
                >
                    Alterar
                </button>

                <button
                    class="btn btn-excluir"
                    onclick="excluirTarefa(${tarefa.id})"
                >
                    Excluir
                </button>

            </div>
        `;

        listaTarefas.appendChild(div);
    });
}


// ==========================================
// RESUMO
// ==========================================

function atualizarResumo() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = tarefas.filter(
        tarefa => !tarefa.concluida
    ).length;

    const atrasadas = tarefas.filter(
        tarefa => tarefaEstaAtrasada(tarefa)
    ).length;

    document.getElementById("totalTarefas").textContent = total;

    document.getElementById("tarefasPendentes").textContent =
        pendentes;

    document.getElementById("tarefasConcluidas").textContent =
        concluidas;

    document.getElementById("tarefasAtrasadas").textContent =
        atrasadas;
}


// ==========================================
// RENDERIZAR TUDO
// ==========================================

function renderizar() {

    renderizarTarefas();

    atualizarResumo();
}


// ==========================================
// MENSAGEM
// ==========================================

function mostrarMensagem(texto, cor) {

    mensagem.textContent = texto;
    mensagem.style.color = cor;

    setTimeout(() => {
        mensagem.textContent = "";
    }, 3000);
}


// ==========================================
// FORMATAR PRIORIDADE
// ==========================================

function formatarPrioridade(prioridade) {

    const nomes = {
        baixa: "Baixa",
        media: "Média",
        alta: "Alta"
    };

    return nomes[prioridade] || prioridade;
}


// ==========================================
// PROTEÇÃO CONTRA HTML
// ==========================================

function escaparHTML(texto) {

    const div = document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;
}


// ==========================================
// EVENTOS
// ==========================================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    criarTarefa();
});


buscaInput.addEventListener("input", renderizar);

filtroStatus.addEventListener("change", renderizar);

filtroPrioridade.addEventListener("change", renderizar);


// ==========================================
// INICIALIZAÇÃO
// ==========================================

renderizar();
