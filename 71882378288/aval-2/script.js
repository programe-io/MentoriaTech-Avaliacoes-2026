
// =====================================
// 1. CONFIGURAÇÕES INICIAIS
// =====================================

const CHAVE_STORAGE = "gerenciadorTarefas";

let tarefas = carregarTarefas();

// =====================================
// 2. ELEMENTOS HTML
// =====================================

const formTarefa = document.getElementById("formTarefa");
const tituloInput = document.getElementById("titulo");
const prioridadeInput = document.getElementById("prioridade");

const listaTarefas = document.getElementById("listaTarefas");

const filtroStatus = document.getElementById("filtroStatus");
const filtroPrioridade = document.getElementById("filtroPrioridade");
const pesquisa = document.getElementById("pesquisa");

// =====================================
// 3. LOCAL STORAGE
// =====================================

function carregarTarefas() {
    try {
        const dados = localStorage.getItem(CHAVE_STORAGE);

        if (!dados) return [];

        const tarefasSalvas = JSON.parse(dados);

        if (!Array.isArray(tarefasSalvas)) return [];

        return tarefasSalvas;
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
        alert("Não foi possível salvar as tarefas no navegador.");
        console.error(erro);
    }
}

// =====================================
// 4. GERAR CÓDIGO
// =====================================

function gerarCodigo() {
    if (tarefas.length === 0) {
        return 1;
    }

    return Math.max(...tarefas.map(tarefa => tarefa.codigo)) + 1;
}

// =====================================
// 5. CADASTRAR TAREFA
// =====================================

function cadastrarTarefa(titulo, prioridade) {

    titulo = titulo.trim();
    prioridade = Number(prioridade);

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres.");
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        alert("Selecione uma prioridade válida.");
        return;
    }

    const novaTarefa = {
        codigo: gerarCodigo(),
        titulo: titulo,
        prioridade: prioridade,
        status: false,
        data: new Date().toLocaleDateString("pt-BR")
    };

    tarefas.push(novaTarefa);

    salvarTarefas();
    listarTarefas();

    formTarefa.reset();
}

// =====================================
// 6. BUSCAR TAREFA
// =====================================

function buscarTarefa(codigo) {
    return tarefas.find(
        tarefa => tarefa.codigo === Number(codigo)
    );
}

// =====================================
// 7. CONCLUIR OU REABRIR TAREFA
// =====================================

function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (!tarefa) return;

    tarefa.status = !tarefa.status;

    salvarTarefas();
    listarTarefas();
}

// =====================================
// 8. ALTERAR PRIORIDADE
// =====================================

function alterarPrioridade(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (!tarefa) return;

    const novaPrioridade = prompt(
        "Informe a nova prioridade:\n1 - Baixa\n2 - Média\n3 - Alta"
    );

    if (novaPrioridade === null) return;

    const prioridade = Number(novaPrioridade);

    if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade inválida!");
        return;
    }

    tarefa.prioridade = prioridade;

    salvarTarefas();
    listarTarefas();
}

// =====================================
// 9. EXCLUIR TAREFA
// =====================================

function excluirTarefa(codigo) {

    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmar) return;

    tarefas = tarefas.filter(
        tarefa => tarefa.codigo !== Number(codigo)
    );

    salvarTarefas();
    listarTarefas();
}

// =====================================
// 10. LIMPAR TAREFAS CONCLUÍDAS
// =====================================

function limparConcluidas() {

    const quantidade = tarefas.filter(
        tarefa => tarefa.status
    ).length;

    if (quantidade === 0) {
        alert("Não existem tarefas concluídas.");
        return;
    }

    if (!confirm("Deseja excluir todas as tarefas concluídas?")) {
        return;
    }

    tarefas = tarefas.filter(
        tarefa => !tarefa.status
    );

    salvarTarefas();
    listarTarefas();
}

// =====================================
// 11. FILTRAR TAREFAS
// =====================================

function filtrarTarefas() {

    let resultado = [...tarefas];

    const status = filtroStatus.value;
    const prioridade = filtroPrioridade.value;
    const termo = pesquisa.value.trim().toLowerCase();

    // Filtrar por status

    if (status === "pendentes") {
        resultado = resultado.filter(
            tarefa => !tarefa.status
        );
    }

    if (status === "concluidas") {
        resultado = resultado.filter(
            tarefa => tarefa.status
        );
    }

    // Filtrar por prioridade

    if (prioridade !== "todas") {
        resultado = resultado.filter(
            tarefa => tarefa.prioridade === Number(prioridade)
        );
    }

    // Pesquisar pelo título ou código

    if (termo !== "") {
        resultado = resultado.filter(tarefa =>
            tarefa.titulo.toLowerCase().includes(termo) ||
            String(tarefa.codigo).includes(termo)
        );
    }

    return resultado;
}

// =====================================
// 12. PROTEÇÃO DO HTML
// =====================================

function escaparHTML(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => {
        const entidades = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entidades[caractere];
    });
}

// =====================================
// 13. LISTAR TAREFAS
// =====================================

function listarTarefas() {

    listaTarefas.innerHTML = "";

    const resultado = filtrarTarefas();

    if (resultado.length === 0) {
        listaTarefas.innerHTML =
            '<li class="vazio">Nenhuma tarefa encontrada.</li>';
    }

    resultado.forEach(tarefa => {

        const item = document.createElement("li");

        const prioridades = {
            1: "Baixa",
            2: "Média",
            3: "Alta"
        };

        const classes = {
            1: "prioridade-baixa",
            2: "prioridade-media",
            3: "prioridade-alta"
        };

        item.className = "tarefa " + classes[tarefa.prioridade];

        if (tarefa.status) {
            item.classList.add("concluida");
        }

        item.innerHTML = `
            <div class="tarefa-info">
                <h3>${escaparHTML(tarefa.titulo)}</h3>

                <p>Código: ${tarefa.codigo}</p>

                <p>Prioridade: ${prioridades[tarefa.prioridade]}</p>

                <p>Status: ${tarefa.status ? "Concluída" : "Pendente"}</p>

                <p>Cadastro: ${escaparHTML(tarefa.data)}</p>
            </div>

            <div class="acoes">
                <button
                    class="btn-concluir"
                    data-acao="concluir"
                    data-codigo="${tarefa.codigo}">
                    ${tarefa.status ? "Reabrir" : "Concluir"}
                </button>

                <button
                    data-acao="prioridade"
                    data-codigo="${tarefa.codigo}">
                    Prioridade
                </button>

                <button
                    class="btn-excluir"
                    data-acao="excluir"
                    data-codigo="${tarefa.codigo}">
                    Excluir
                </button>
            </div>
        `;

        listaTarefas.appendChild(item);
    });

    atualizarContadores();
}

// =====================================
// 14. ATUALIZAR CONTADORES
// =====================================

function atualizarContadores() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.status
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("total").textContent = total;

    document.getElementById("pendentes").textContent = pendentes;

    document.getElementById("concluidas").textContent = concluidas;
}

// =====================================
// 15. EVENTOS
// =====================================

// Cadastrar tarefa

formTarefa.addEventListener("submit", function(event) {

    event.preventDefault();

    cadastrarTarefa(
        tituloInput.value,
        prioridadeInput.value
    );
});

// Filtros e pesquisa

filtroStatus.addEventListener("change", listarTarefas);

filtroPrioridade.addEventListener("change", listarTarefas);

pesquisa.addEventListener("input", listarTarefas);

// Botões das tarefas

listaTarefas.addEventListener("click", function(event) {

    const botao = event.target.closest("button[data-acao]");

    if (!botao) return;

    const codigo = Number(botao.dataset.codigo);
    const acao = botao.dataset.acao;

    if (acao === "concluir") {
        concluirTarefa(codigo);
    }

    if (acao === "excluir") {
        excluirTarefa(codigo);
    }

    if (acao === "prioridade") {
        alterarPrioridade(codigo);
    }
});

// Excluir todas as concluídas

document.getElementById("limparConcluidas")
    .addEventListener("click", limparConcluidas);

// =====================================
// 16. INICIALIZAÇÃO DO SISTEMA
// =====================================

listarTarefas();
