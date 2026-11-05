
// ======================================
// GERENCIADOR DE TAREFAS
// ======================================

// Recuperar tarefas salvas
let tarefas = JSON.parse(
    localStorage.getItem("tarefas")
) || [];

// Elementos HTML
const form = document.getElementById("formTarefa");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const data = document.getElementById("data");
const prioridade = document.getElementById("prioridade");
const codigo = document.getElementById("codigo");

const lista = document.getElementById("listaTarefas");
const pesquisa = document.getElementById("pesquisa");
const filtroStatus = document.getElementById("filtroStatus");
const filtroPrioridade = document.getElementById("filtroPrioridade");
const contador = document.getElementById("contador");
const btnSalvar = document.getElementById("btnSalvar");

// ======================================
// ARMAZENAR NO LOCALSTORAGE
// ======================================

function salvarDados() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// ======================================
// VALIDAR DADOS
// ======================================

function validarDados() {
    if (titulo.value.trim().length < 5) {
        alert("O título precisa ter pelo menos 5 caracteres!");
        return false;
    }

    if (descricao.value.trim() === "") {
        alert("Digite uma descrição!");
        return false;
    }

    if (data.value === "") {
        alert("Informe a data!");
        return false;
    }

    return true;
}

// ======================================
// CADASTRAR E ALTERAR TAREFA
// ======================================

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!validarDados()) return;

    const id = codigo.value;

    if (id) {
        const tarefa = buscarTarefa(id);

        if (tarefa) {
            tarefa.titulo = titulo.value.trim();
            tarefa.descricao = descricao.value.trim();
            tarefa.data = data.value;
            tarefa.prioridade = Number(prioridade.value);

            alert("Tarefa alterada com sucesso!");
        }
    } else {
        const novaTarefa = {
            id: crypto.randomUUID(),
            titulo: titulo.value.trim(),
            descricao: descricao.value.trim(),
            data: data.value,
            prioridade: Number(prioridade.value),
            status: false
        };

        tarefas.push(novaTarefa);

        alert("Tarefa cadastrada com sucesso!");
    }

    salvarDados();
    form.reset();
    codigo.value = "";
    btnSalvar.textContent = "Cadastrar tarefa";

    listarTarefas();
});

// ======================================
// BUSCAR TAREFA
// ======================================

function buscarTarefa(id) {
    return tarefas.find(tarefa => tarefa.id === id);
}

// ======================================
// LISTAR TAREFAS
// ======================================

function listarTarefas() {
    lista.innerHTML = "";

    const texto = pesquisa.value.toLowerCase();
    const status = filtroStatus.value;
    const prioridadeSelecionada = filtroPrioridade.value;

    const tarefasFiltradas = tarefas.filter(tarefa => {

        const correspondeTexto =
            tarefa.titulo.toLowerCase().includes(texto) ||
            tarefa.descricao.toLowerCase().includes(texto);

        const correspondeStatus =
            status === "todas" ||
            (status === "concluida" && tarefa.status) ||
            (status === "pendente" && !tarefa.status);

        const correspondePrioridade =
            prioridadeSelecionada === "todas" ||
            tarefa.prioridade === Number(prioridadeSelecionada);

        return correspondeTexto &&
            correspondeStatus &&
            correspondePrioridade;
    });

    if (tarefasFiltradas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa encontrada.</p>";
    }

    tarefasFiltradas.forEach(tarefa => {

        const div = document.createElement("div");

        div.className = tarefa.status
            ? "tarefa concluida"
            : "tarefa";

        const prioridades = {
            1: "Baixa",
            2: "Média",
            3: "Alta"
        };

        const h3 = document.createElement("h3");
        h3.textContent = tarefa.titulo;

        const pDescricao = document.createElement("p");
        pDescricao.textContent = "Descrição: " + tarefa.descricao;

        const pData = document.createElement("p");
        pData.textContent = "Data: " + tarefa.data;

        const pPrioridade = document.createElement("p");
        pPrioridade.textContent =
            "Prioridade: " + prioridades[tarefa.prioridade];

        const pStatus = document.createElement("p");
        pStatus.textContent = tarefa.status
            ? "Status: Concluída"
            : "Status: Pendente";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const btnConcluir = document.createElement("button");
        btnConcluir.className = "concluir";
        btnConcluir.textContent = tarefa.status
            ? "Reabrir"
            : "Concluir";

        btnConcluir.addEventListener("click", () => {
            concluirTarefa(tarefa.id);
        });

        const btnEditar = document.createElement("button");
        btnEditar.className = "editar";
        btnEditar.textContent = "Editar";

        btnEditar.addEventListener("click", () => {
            editarTarefa(tarefa.id);
        });

        const btnExcluir = document.createElement("button");
        btnExcluir.className = "excluir";
        btnExcluir.textContent = "Excluir";

        btnExcluir.addEventListener("click", () => {
            excluirTarefa(tarefa.id);
        });

        acoes.append(btnConcluir, btnEditar, btnExcluir);

        div.append(
            h3,
            pDescricao,
            pData,
            pPrioridade,
            pStatus,
            acoes
        );

        lista.appendChild(div);
    });

    const concluidas = tarefas.filter(t => t.status).length;
    const pendentes = tarefas.length - concluidas;

    contador.textContent =
        `Total: ${tarefas.length} | Pendentes: ${pendentes} | Concluídas: ${concluidas}`;
}

// ======================================
// CONCLUIR TAREFA
// ======================================

function concluirTarefa(id) {
    const tarefa = buscarTarefa(id);

    if (!tarefa) return;

    tarefa.status = !tarefa.status;

    salvarDados();
    listarTarefas();
}

// ======================================
// EDITAR TAREFA
// ======================================

function editarTarefa(id) {
    const tarefa = buscarTarefa(id);

    if (!tarefa) return;

    codigo.value = tarefa.id;
    titulo.value = tarefa.titulo;
    descricao.value = tarefa.descricao;
    data.value = tarefa.data;
    prioridade.value = tarefa.prioridade;

    btnSalvar.textContent = "Salvar alterações";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ======================================
// EXCLUIR TAREFA
// ======================================

function excluirTarefa(id) {
    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmar) return;

    tarefas = tarefas.filter(tarefa => tarefa.id !== id);

    salvarDados();
    listarTarefas();
}

// ======================================
// EXCLUIR TODAS AS CONCLUÍDAS
// ======================================

document.getElementById("limparConcluidas")
    .addEventListener("click", function() {

        const concluidas = tarefas.filter(t => t.status);

        if (concluidas.length === 0) {
            alert("Não existem tarefas concluídas!");
            return;
        }

        if (!confirm("Excluir todas as tarefas concluídas?")) {
            return;
        }

        tarefas = tarefas.filter(tarefa => !tarefa.status);

        salvarDados();
        listarTarefas();
    });

// ======================================
// FILTROS E PESQUISA
// ======================================

pesquisa.addEventListener("input", listarTarefas);

filtroStatus.addEventListener("change", listarTarefas);

filtroPrioridade.addEventListener("change", listarTarefas);

// ======================================
// INICIAR SISTEMA
// ======================================

listarTarefas();
