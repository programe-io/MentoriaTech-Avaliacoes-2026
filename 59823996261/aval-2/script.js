
"use strict";

// ======================================
// 1. ARMAZENAMENTO E CÓDIGOS
// ======================================

const CHAVE_TAREFAS = "taskFlowTarefas";

function carregarTarefas() {
    try {
        const dados = localStorage.getItem(CHAVE_TAREFAS);
        const lista = dados ? JSON.parse(dados) : [];

        if (!Array.isArray(lista)) return [];

        return lista.filter((tarefa) =>
            tarefa &&
            Number.isInteger(tarefa.codigo) &&
            typeof tarefa.titulo === "string" &&
            Number.isInteger(tarefa.prioridade) &&
            tarefa.prioridade >= 1 &&
            tarefa.prioridade <= 3 &&
            typeof tarefa.status === "boolean"
        );
    } catch (erro) {
        console.error("Erro ao carregar tarefas:", erro);
        return [];
    }
}

let tarefas = carregarTarefas();

let proximoCodigo = tarefas.reduce(
    (maior, tarefa) => Math.max(maior, tarefa.codigo),
    0
) + 1;

let filtroAtual = "todas";
let codigoEmEdicao = null;

// ======================================
// 2. ELEMENTOS DA PÁGINA
// ======================================

const form = document.getElementById("formTarefa");
const campoCodigo = document.getElementById("codigo");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");

const listaHTML = document.getElementById("listaTarefas");
const pesquisa = document.getElementById("pesquisa");
const mensagemVazia = document.getElementById("mensagemVazia");

// ======================================
// 3. VALIDAR DADOS DA TAREFA
// ======================================

function validarDadosDaTarefa(titulo, prioridade) {
    if (typeof titulo !== "string" || titulo.trim().length < 5) {
        throw new Error(
            "O título deve possuir pelo menos cinco caracteres."
        );
    }

    if (!Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3) {
        throw new Error(
            "A prioridade deve ser 1, 2 ou 3."
        );
    }
}

// ======================================
// 4. SALVAR DADOS
// ======================================

function salvarTarefas() {
    try {
        localStorage.setItem(
            CHAVE_TAREFAS,
            JSON.stringify(tarefas)
        );
        return true;
    } catch (erro) {
        console.error("Erro ao salvar tarefas:", erro);
        alert("Não foi possível salvar as tarefas neste navegador.");
        return false;
    }
}

// ======================================
// 5. CADASTRAR TAREFA
// ======================================

function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);

    if (!salvarTarefas()) {
        tarefas.pop();
        return false;
    }

    proximoCodigo++;

    listarTarefas();
    return novaTarefa;
}

// ======================================
// 6. LISTAR TAREFAS
// ======================================

function listarTarefas() {
    const termo = pesquisa.value.trim().toLowerCase();

    const tarefasFiltradas = tarefas.filter((tarefa) => {
        const correspondeTexto =
            tarefa.titulo.toLowerCase().includes(termo) ||
            String(tarefa.codigo).includes(termo);

        const correspondeStatus =
            filtroAtual === "todas" ||
            (filtroAtual === "pendentes" && tarefa.status) ||
            (filtroAtual === "concluidas" && !tarefa.status);

        return correspondeTexto && correspondeStatus;
    });

    // Ordena por prioridade: 1 é a mais alta.
    tarefasFiltradas.sort((a, b) =>
        a.prioridade - b.prioridade || a.codigo - b.codigo
    );

    listaHTML.replaceChildren();

    tarefasFiltradas.forEach((tarefa) => {
        const item = document.createElement("article");

        item.className = tarefa.status
            ? "tarefa"
            : "tarefa concluida";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "check-tarefa";
        checkbox.checked = !tarefa.status;
        checkbox.setAttribute(
            "aria-label",
            "Marcar tarefa como concluída"
        );
        checkbox.dataset.acao = "concluir";
        checkbox.dataset.codigo = tarefa.codigo;

        const conteudo = document.createElement("div");
        conteudo.className = "conteudo-tarefa";

        const titulo = document.createElement("h3");
        titulo.className = "titulo-tarefa";
        titulo.textContent = tarefa.titulo;

        const meta = document.createElement("div");
        meta.className = "meta-tarefa";

        const codigo = document.createElement("span");
        codigo.textContent = "Tarefa #" +
            String(tarefa.codigo).padStart(3, "0");

        const prioridade = document.createElement("span");
        prioridade.className =
            "prioridade prioridade-" + tarefa.prioridade;

        prioridade.textContent = [
            "",
            "Prioridade alta",
            "Prioridade média",
            "Prioridade baixa"
        ][tarefa.prioridade];

        const status = document.createElement("span");
        status.className = "status-tarefa";
        status.textContent = tarefa.status
            ? "Em andamento"
            : "Concluída";

        meta.append(codigo, prioridade, status);
        conteudo.append(titulo, meta);

        const acoes = document.createElement("div");
        acoes.className = "acoes-tarefa";

        const btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.textContent = "Editar";
        btnEditar.className = "btn-editar";
        btnEditar.dataset.acao = "editar";
        btnEditar.dataset.codigo = tarefa.codigo;

        const btnExcluir = document.createElement("button");
        btnExcluir.type = "button";
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";
        btnExcluir.dataset.acao = "excluir";
        btnExcluir.dataset.codigo = tarefa.codigo;

        acoes.append(btnEditar, btnExcluir);
        item.append(checkbox, conteudo, acoes);

        listaHTML.appendChild(item);
    });

    mensagemVazia.hidden = tarefasFiltradas.length > 0;

    document.getElementById("contadorTarefas").textContent =
        tarefasFiltradas.length +
        (tarefasFiltradas.length === 1
            ? " tarefa exibida"
            : " tarefas exibidas");

    atualizarResumo();
}

// ======================================
// 7. BUSCAR TAREFA POR CÓDIGO
// ======================================

function buscarTarefa(codigo) {
    const tarefa = tarefas.find(
        (item) => item.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// ======================================
// 8. CONCLUIR TAREFA
// ======================================

function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (!tarefa.status) {
        throw new Error("Esta tarefa já está concluída.");
    }

    tarefa.status = false;

    if (!salvarTarefas()) {
        tarefa.status = true;
        return false;
    }

    listarTarefas();
    return true;
}

// ======================================
// 9. REABRIR TAREFA
// ======================================

function reabrirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (tarefa.status) {
        throw new Error("Esta tarefa já está pendente.");
    }

    tarefa.status = true;

    if (!salvarTarefas()) {
        tarefa.status = false;
        return false;
    }

    listarTarefas();
    return true;
}

// ======================================
// 10. ALTERAR PRIORIDADE
// ======================================

function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    const prioridadeAntiga = tarefa.prioridade;
    tarefa.prioridade = novaPrioridade;

    if (!salvarTarefas()) {
        tarefa.prioridade = prioridadeAntiga;
        return false;
    }

    listarTarefas();
    return true;
}

// ======================================
// 11. EDITAR TÍTULO
// ======================================

function editarTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    codigoEmEdicao = codigo;
    campoCodigo.value = codigo;
    campoTitulo.value = tarefa.titulo;
    campoPrioridade.value = String(tarefa.prioridade);

    document.getElementById("tituloFormulario").textContent =
        "Editar tarefa #" + codigo;

    document.getElementById("btnSalvar").textContent =
        "Salvar alterações";

    document.getElementById("btnCancelar").hidden = false;

    document.getElementById("cadastro").scrollIntoView({
        behavior: "smooth"
    });

    campoTitulo.focus();
}

function cancelarEdicao() {
    codigoEmEdicao = null;
    form.reset();
    campoCodigo.value = "";
    campoPrioridade.value = "2";

    document.getElementById("tituloFormulario").textContent =
        "＋ Nova tarefa";

    document.getElementById("btnSalvar").textContent =
        "Adicionar tarefa";

    document.getElementById("btnCancelar").hidden = true;
}

// ======================================
// 12. EXCLUIR TAREFA
// ======================================

function excluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (!confirm('Deseja excluir "' + tarefa.titulo + '"?')) {
        return false;
    }

    const indice = tarefas.findIndex(
        (item) => item.codigo === codigo
    );

    const removida = tarefas.splice(indice, 1)[0];

    if (!salvarTarefas()) {
        tarefas.splice(indice, 0, removida);
        return false;
    }

    if (codigoEmEdicao === codigo) {
        cancelarEdicao();
    }

    listarTarefas();
    return true;
}

// ======================================
// 13. ATUALIZAR RESUMO
// ======================================

function atualizarResumo() {
    const total = tarefas.length;

    const pendentes = tarefas.filter(
        (tarefa) => tarefa.status
    ).length;

    const concluidas = tarefas.filter(
        (tarefa) => !tarefa.status
    ).length;

    const prioridadeAlta = tarefas.filter(
        (tarefa) => tarefa.status && tarefa.prioridade === 1
    ).length;

    document.getElementById("totalTarefas").textContent = total;
    document.getElementById("totalPendentes").textContent = pendentes;
    document.getElementById("totalConcluidas").textContent = concluidas;
    document.getElementById("totalAlta").textContent = prioridadeAlta;
}

// ======================================
// 14. FORMULÁRIO
// ======================================

form.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    try {
        validarDadosDaTarefa(titulo, prioridade);

        if (codigoEmEdicao !== null) {
            const tarefa = buscarTarefa(codigoEmEdicao);
            const tituloAntigo = tarefa.titulo;
            const prioridadeAntiga = tarefa.prioridade;

            tarefa.titulo = titulo;
            tarefa.prioridade = prioridade;

            if (!salvarTarefas()) {
                tarefa.titulo = tituloAntigo;
                tarefa.prioridade = prioridadeAntiga;
                return;
            }

            listarTarefas();
            cancelarEdicao();
            alert("Tarefa atualizada com sucesso!");
        } else {
            const criada = cadastrarTarefa(titulo, prioridade);

            if (criada) {
                cancelarEdicao();
                alert("Tarefa cadastrada com sucesso!");
            }
        }
    } catch (erro) {
        alert(erro.message);
    }
});

// ======================================
// 15. AÇÕES DA LISTA
// ======================================

listaHTML.addEventListener("click", function(evento) {
    const botao = evento.target.closest("button[data-acao]");

    if (!botao || !listaHTML.contains(botao)) return;

    const codigo = Number(botao.dataset.codigo);

    try {
        if (botao.dataset.acao === "editar") {
            editarTarefa(codigo);
        }

        if (botao.dataset.acao === "excluir") {
            excluirTarefa(codigo);
        }
    } catch (erro) {
        alert(erro.message);
    }
});

listaHTML.addEventListener("change", function(evento) {
    const checkbox = evento.target;

    if (
        !checkbox.matches('input[data-acao="concluir"]')
    ) {
        return;
    }

    const codigo = Number(checkbox.dataset.codigo);

    try {
        if (checkbox.checked) {
            reabrirTarefa(codigo);
        } else {
            concluirTarefa(codigo);
        }
    } catch (erro) {
        alert(erro.message);
        listarTarefas();
    }
});

// ======================================
// 16. FILTROS E PESQUISA
// ======================================

document.querySelectorAll(".filtro").forEach((botao) => {
    botao.addEventListener("click", () => {
        filtroAtual = botao.dataset.filtro;

        document.querySelectorAll(".filtro").forEach((item) => {
            item.classList.toggle("ativo", item === botao);
        });

        listarTarefas();
    });
});

pesquisa.addEventListener("input", listarTarefas);

document.getElementById("btnCancelar").addEventListener(
    "click",
    cancelarEdicao
);

// ======================================
// 17. LIMPAR TAREFAS CONCLUÍDAS
// ======================================

document.getElementById("btnLimparConcluidas").addEventListener(
    "click",
    () => {
        const antigas = tarefas;
        tarefas = tarefas.filter((tarefa) => tarefa.status);

        if (tarefas.length === antigas.length) {
            alert("Não existem tarefas concluídas para remover.");
            return;
        }

        if (!confirm("Deseja remover todas as tarefas concluídas?")) {
            tarefas = antigas;
            return;
        }

        if (!salvarTarefas()) {
            tarefas = antigas;
            return;
        }

        if (
            codigoEmEdicao !== null &&
            !buscarTarefaExiste(codigoEmEdicao)
        ) {
            cancelarEdicao();
        }

        listarTarefas();
        alert("Tarefas concluídas removidas.");
    }
);

function buscarTarefaExiste(codigo) {
    return tarefas.some((tarefa) => tarefa.codigo === codigo);
}

// ======================================
// 18. DATA E INICIALIZAÇÃO
// ======================================

document.getElementById("dataHoje").textContent =
    new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

listarTarefas();