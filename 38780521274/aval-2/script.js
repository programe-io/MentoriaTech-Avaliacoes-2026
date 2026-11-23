
/* =====================================
   SISTEMA DE GERENCIAMENTO DE TAREFAS
===================================== */

// Carregar tarefas salvas no navegador
let tarefas = JSON.parse(
    localStorage.getItem("tarefas")
) || [
    {
        codigo: "T001",
        titulo: "Desenvolver sistema",
        prioridade: "Alta",
        status: "Pendente"
    },
    {
        codigo: "T002",
        titulo: "Elaborar documentação",
        prioridade: "Média",
        status: "Concluída"
    },
    {
        codigo: "T003",
        titulo: "Realizar testes",
        prioridade: "Baixa",
        status: "Pendente"
    }
];

// Índice da tarefa que está sendo editada
let indiceEdicao = null;


/* =====================================
   SALVAR DADOS NO LOCALSTORAGE
===================================== */

function salvarDados() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

}


/* =====================================
   CADASTRAR E ATUALIZAR TAREFAS
===================================== */

function salvarTarefa() {

    const codigo = document
        .getElementById("codigo")
        .value.trim();

    const titulo = document
        .getElementById("titulo")
        .value.trim();

    const prioridade = document
        .getElementById("prioridade")
        .value;

    // Validar campos
    if (!codigo || !titulo) {

        alert("Preencha todos os campos obrigatórios!");

        return;
    }

    // Verificar código duplicado
    const duplicado = tarefas.some((tarefa, indice) => {

        return tarefa.codigo.toLowerCase() === codigo.toLowerCase()
            && indice !== indiceEdicao;

    });

    if (duplicado) {

        alert("Já existe uma tarefa com este código!");

        return;
    }

    // Criar objeto da tarefa
    const novaTarefa = {

        codigo: codigo,

        titulo: titulo,

        prioridade: prioridade,

        status: indiceEdicao !== null
            ? tarefas[indiceEdicao].status
            : "Pendente"

    };

    // Verificar se é edição ou cadastro
    if (indiceEdicao !== null) {

        tarefas[indiceEdicao] = novaTarefa;

        alert("Tarefa atualizada com sucesso!");

    } else {

        tarefas.push(novaTarefa);

        alert("Tarefa cadastrada com sucesso!");

    }

    salvarDados();

    cancelarEdicao();

    renderizar();

}


/* =====================================
   EXIBIR TAREFAS NA TABELA
===================================== */

function renderizar() {

    const tabela = document.getElementById("tabela");

    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const filtroStatus = document
        .getElementById("filtroStatus")
        .value;

    tabela.innerHTML = "";

    // Filtrar tarefas
    const tarefasFiltradas = tarefas.filter(tarefa => {

        const correspondePesquisa =
            tarefa.codigo.toLowerCase().includes(pesquisa) ||
            tarefa.titulo.toLowerCase().includes(pesquisa);

        const correspondeStatus =
            filtroStatus === "" ||
            tarefa.status === filtroStatus;

        return correspondePesquisa && correspondeStatus;

    });

    // Verificar se existem tarefas
    if (tarefasFiltradas.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="5" class="vazio">
                    Nenhuma tarefa encontrada.
                </td>
            </tr>
        `;

    }

    // Percorrer tarefas
    tarefasFiltradas.forEach(tarefa => {

        const indice = tarefas.indexOf(tarefa);

        // Classe da prioridade
        const classePrioridade = {

            "Alta": "alta",

            "Média": "media",

            "Baixa": "baixa"

        }[tarefa.prioridade];

        // Classe do status
        const classeStatus =
            tarefa.status === "Concluída"
                ? "concluida"
                : "pendente";

        tabela.innerHTML += `

            <tr>

                <td>${escapar(tarefa.codigo)}</td>

                <td>${escapar(tarefa.titulo)}</td>

                <td>
                    <span class="prioridade ${classePrioridade}">
                        ${tarefa.prioridade}
                    </span>
                </td>

                <td>
                    <span class="status ${classeStatus}">
                        ${tarefa.status}
                    </span>
                </td>

                <td>

                    <div class="acoes">

                        <button
                            class="btn-status"
                            onclick="alternarStatus(${indice})"
                            title="Alterar status">

                            ✓

                        </button>

                        <button
                            class="btn-edit"
                            onclick="editarTarefa(${indice})"
                            title="Editar">

                            ✎

                        </button>

                        <button
                            class="btn-delete"
                            onclick="excluirTarefa(${indice})"
                            title="Excluir">

                            ✕

                        </button>

                    </div>

                </td>

            </tr>

        `;

    });

    atualizarIndicadores();

}


/* =====================================
   PROTEÇÃO CONTRA HTML INJETADO
===================================== */

function escapar(valor) {

    return String(valor).replace(/[&<>"']/g, caractere => ({

        "&": "&amp;",

        "<": "&lt;",

        ">": "&gt;",

        '"': "&quot;",

        "'": "&#39;"

    })[caractere]);

}


/* =====================================
   ATUALIZAR INDICADORES
===================================== */

function atualizarIndicadores() {

    const total = tarefas.length;

    const pendentes = tarefas.filter(
        tarefa => tarefa.status === "Pendente"
    ).length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.status === "Concluída"
    ).length;

    document.getElementById("total").textContent = total;

    document.getElementById("pendentes").textContent = pendentes;

    document.getElementById("concluidas").textContent = concluidas;

}


/* =====================================
   ALTERAR STATUS DA TAREFA
===================================== */

function alternarStatus(indice) {

    if (tarefas[indice].status === "Pendente") {

        tarefas[indice].status = "Concluída";

    } else {

        tarefas[indice].status = "Pendente";

    }

    salvarDados();

    renderizar();

}


/* =====================================
   EDITAR TAREFA
===================================== */

function editarTarefa(indice) {

    const tarefa = tarefas[indice];

    document.getElementById("codigo").value =
        tarefa.codigo;

    document.getElementById("titulo").value =
        tarefa.titulo;

    document.getElementById("prioridade").value =
        tarefa.prioridade;

    indiceEdicao = indice;

    document.getElementById("tituloFormulario").textContent =
        "Editar Tarefa";

    document.getElementById("cancelar").style.display =
        "inline-block";

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================
   EXCLUIR TAREFA
===================================== */

function excluirTarefa(indice) {

    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmar) {

        return;

    }

    tarefas.splice(indice, 1);

    if (indiceEdicao !== null) {

        if (indiceEdicao === indice) {

            cancelarEdicao();

        } else if (indiceEdicao > indice) {

            indiceEdicao--;

        }

    }

    salvarDados();

    renderizar();

    alert("Tarefa excluída com sucesso!");

}


/* =====================================
   CANCELAR EDIÇÃO
===================================== */

function cancelarEdicao() {

    indiceEdicao = null;

    document.getElementById("codigo").value = "";

    document.getElementById("titulo").value = "";

    document.getElementById("prioridade").value = "Baixa";

    document.getElementById("tituloFormulario").textContent =
        "Cadastrar Nova Tarefa";

    document.getElementById("cancelar").style.display =
        "none";

}


/* =====================================
   INICIALIZAÇÃO DO SISTEMA
===================================== */

// Exibir tarefas ao abrir o sistema
renderizar();

// Garantir que os dados iniciais sejam salvos
salvarDados();
