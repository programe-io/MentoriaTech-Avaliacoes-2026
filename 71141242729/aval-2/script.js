
// ======================================
// GERENCIADOR DE TAREFAS
// ======================================

// Carregar tarefas salvas no navegador
let tarefas = carregarTarefas();

let filtroAtual = "todas";

// Elementos HTML
const form = document.getElementById("formTarefa");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const data = document.getElementById("data");
const tarefaId = document.getElementById("tarefaId");

const lista = document.getElementById("listaTarefas");
const busca = document.getElementById("busca");
const ordenacao = document.getElementById("ordenacao");

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const btnLimpar = document.getElementById("btnLimpar");

// ======================================
// LOCALSTORAGE
// ======================================

function carregarTarefas() {
    try {
        const dados = localStorage.getItem("minhasTarefas");
        const tarefasSalvas = dados ? JSON.parse(dados) : [];

        return Array.isArray(tarefasSalvas)
            ? tarefasSalvas.filter(t =>
                t &&
                t.id !== undefined &&
                typeof t.titulo === "string" &&
                typeof t.descricao === "string"
            )
            : [];

    } catch (erro) {
        console.error("Erro ao carregar tarefas:", erro);
        return [];
    }
}

function salvarTarefas() {
    try {
        localStorage.setItem(
            "minhasTarefas",
            JSON.stringify(tarefas)
        );
    } catch (erro) {
        alert("Não foi possível salvar os dados no navegador.");
        console.error(erro);
    }
}

// ======================================
// VALIDAR DADOS
// ======================================

function validarDados() {
    if (titulo.value.trim() === "") {
        alert("Digite o título da tarefa!");
        titulo.focus();
        return false;
    }

    if (descricao.value.trim() === "") {
        alert("Digite a descrição da tarefa!");
        descricao.focus();
        return false;
    }

    return true;
}

// ======================================
// CADASTRAR E ALTERAR
// ======================================

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!validarDados()) return;

    const id = tarefaId.value;

    if (id) {
        alterarTarefa(id);
    } else {
        cadastrarTarefa();
    }
});

function cadastrarTarefa() {
    const novaTarefa = {
        id: gerarId(),
        titulo: titulo.value.trim(),
        descricao: descricao.value.trim(),
        data: data.value,
        concluida: false,
        criadaEm: new Date().toISOString()
    };

    tarefas.push(novaTarefa);

    salvarTarefas();
    limparFormulario();
    atualizarSistema();

    alert("Tarefa cadastrada com sucesso!");
}

function alterarTarefa(id) {
    const tarefa = tarefas.find(t => String(t.id) === id);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.titulo = titulo.value.trim();
    tarefa.descricao = descricao.value.trim();
    tarefa.data = data.value;

    salvarTarefas();
    limparFormulario();
    atualizarSistema();

    alert("Tarefa atualizada com sucesso!");
}

// Gerar identificador único
function gerarId() {
    return crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now() + "-" + Math.random();
}

// ======================================
// LISTAR TAREFAS
// ======================================

function listarTarefas() {
    lista.innerHTML = "";

    const termo = busca.value.trim().toLowerCase();

    let resultado = tarefas.filter(t => {
        const correspondeBusca =
            t.titulo.toLowerCase().includes(termo) ||
            t.descricao.toLowerCase().includes(termo);

        const correspondeFiltro =
            filtroAtual === "todas" ||
            (filtroAtual === "pendentes" && !t.concluida) ||
            (filtroAtual === "concluidas" && t.concluida);

        return correspondeBusca && correspondeFiltro;
    });

    // Ordenar tarefas
    resultado.sort((a, b) => {
        if (ordenacao.value === "antigas") {
            return new Date(a.criadaEm || 0) -
                   new Date(b.criadaEm || 0);
        }

        if (ordenacao.value === "data") {
            return (a.data || "9999-12-31")
                .localeCompare(b.data || "9999-12-31");
        }

        if (ordenacao.value === "titulo") {
            return a.titulo.localeCompare(b.titulo);
        }

        return new Date(b.criadaEm || 0) -
               new Date(a.criadaEm || 0);
    });

    if (resultado.length === 0) {
        lista.innerHTML = `
            <p class="vazio">
                Nenhuma tarefa encontrada.
            </p>
        `;
        return;
    }

    resultado.forEach(tarefa => {
        const elemento = document.createElement("article");

        elemento.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        // Criar elementos sem inserir conteúdo do usuário
        // diretamente como HTML.
        const tituloElemento = document.createElement("h3");
        tituloElemento.textContent = tarefa.titulo;

        const descricaoElemento = document.createElement("p");
        descricaoElemento.textContent = tarefa.descricao;

        const status = document.createElement("p");
        status.className = "status";
        status.textContent = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        elemento.append(
            tituloElemento,
            descricaoElemento,
            status
        );

        if (tarefa.data) {
            const dataElemento = document.createElement("p");
            const partes = tarefa.data.split("-");

            dataElemento.textContent =
                `Vencimento: ${partes[2]}/${partes[1]}/${partes[0]}`;

            elemento.appendChild(dataElemento);
        }

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoConcluir = criarBotao(
            tarefa.concluida ? "Reabrir" : "Concluir",
            "btn-concluir",
            () => concluirTarefa(tarefa.id)
        );

        const botaoEditar = criarBotao(
            "Editar",
            "btn-editar",
            () => prepararEdicao(tarefa.id)
        );

        const botaoExcluir = criarBotao(
            "Excluir",
            "btn-excluir",
            () => excluirTarefa(tarefa.id)
        );

        acoes.append(
            botaoConcluir,
            botaoEditar,
            botaoExcluir
        );

        elemento.appendChild(acoes);
        lista.appendChild(elemento);
    });
}

function criarBotao(texto, classe, acao) {
    const botao = document.createElement("button");

    botao.type = "button";
    botao.textContent = texto;
    botao.className = classe;
    botao.addEventListener("click", acao);

    return botao;
}

// ======================================
// CONCLUIR E REABRIR
// ======================================

function concluirTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) return;

    tarefa.concluida = !tarefa.concluida;

    salvarTarefas();
    atualizarSistema();
}

// ======================================
// EDITAR TAREFA
// ======================================

function prepararEdicao(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) return;

    tarefaId.value = tarefa.id;
    titulo.value = tarefa.titulo;
    descricao.value = tarefa.descricao;
    data.value = tarefa.data || "";

    btnSalvar.textContent = "Salvar alterações";
    btnCancelar.hidden = false;

    document.getElementById("formTitulo").textContent =
        "Editar tarefa";

    document.getElementById("formTarefa")
        .scrollIntoView({ behavior: "smooth" });

    titulo.focus();
}

function limparFormulario() {
    form.reset();
    tarefaId.value = "";

    btnSalvar.textContent = "Cadastrar tarefa";
    btnCancelar.hidden = true;

    document.getElementById("formTitulo").textContent =
        "Cadastrar tarefa";
}

btnCancelar.addEventListener("click", limparFormulario);

// ======================================
// EXCLUIR TAREFA
// ======================================

function excluirTarefa(id) {
    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmar) return;

    tarefas = tarefas.filter(t => t.id !== id);

    salvarTarefas();
    atualizarSistema();

    if (tarefaId.value === String(id)) {
        limparFormulario();
    }
}

// ======================================
// FILTROS
// ======================================

document.querySelectorAll(".filtro").forEach(botao => {
    botao.addEventListener("click", function() {
        filtroAtual = this.dataset.filtro;

        document.querySelectorAll(".filtro")
            .forEach(b => b.classList.remove("ativo"));

        this.classList.add("ativo");

        listarTarefas();
    });
});

// ======================================
// BUSCA E ORDENAÇÃO
// ======================================

busca.addEventListener("input", listarTarefas);

ordenacao.addEventListener("change", listarTarefas);

// ======================================
// EXCLUIR TODAS AS TAREFAS
// ======================================

btnLimpar.addEventListener("click", function() {
    if (tarefas.length === 0) {
        alert("Não existem tarefas para excluir.");
        return;
    }

    if (!confirm("Tem certeza que deseja excluir TODAS as tarefas?")) {
        return;
    }

    tarefas = [];

    salvarTarefas();
    limparFormulario();
    atualizarSistema();

    alert("Todas as tarefas foram excluídas!");
});

// ======================================
// CONTADORES
// ======================================

function atualizarContadores() {
    const total = tarefas.length;

    const concluidas = tarefas.filter(
        t => t.concluida
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("total").textContent = total;
    document.getElementById("pendentes").textContent = pendentes;
    document.getElementById("concluidas").textContent = concluidas;
}

// ======================================
// ATUALIZAR SISTEMA
// ======================================

function atualizarSistema() {
    atualizarContadores();
    listarTarefas();
}

// Inicialização
atualizarSistema();
