// ==========================================
// ELEMENTOS
// ==========================================

const tarefaForm = document.getElementById("tarefaForm");

const tarefaId = document.getElementById("tarefaId");
const titulo = document.getElementById("titulo");
const categoria = document.getElementById("categoria");
const prioridade = document.getElementById("prioridade");
const prazo = document.getElementById("prazo");
const descricao = document.getElementById("descricao");

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");

const tituloFormulario =
    document.getElementById("tituloFormulario");

const listaTarefas =
    document.getElementById("listaTarefas");

const listaVazia =
    document.getElementById("listaVazia");

const busca =
    document.getElementById("busca");

const filtroStatus =
    document.getElementById("filtroStatus");

const filtroPrioridade =
    document.getElementById("filtroPrioridade");


// ==========================================
// DADOS
// ==========================================

let tarefas =
    JSON.parse(localStorage.getItem("tarefas")) || [];


// ==========================================
// SALVAR
// ==========================================

function salvarTarefas() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}


// ==========================================
// DATA ATUAL
// ==========================================

function mostrarDataAtual() {

    const hoje = new Date();

    const data = hoje.toLocaleDateString(
        "pt-BR",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

    document.getElementById("dataAtual")
        .textContent = data;
}


// ==========================================
// FORMATAR DATA
// ==========================================

function formatarData(data) {

    if (!data) {
        return "Sem prazo";
    }

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


// ==========================================
// DATA DE HOJE
// ==========================================

function dataHoje() {

    const hoje = new Date();

    const ano = hoje.getFullYear();

    const mes =
        String(hoje.getMonth() + 1)
            .padStart(2, "0");

    const dia =
        String(hoje.getDate())
            .padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}


// ==========================================
// VERIFICAR ATRASO
// ==========================================

function estaAtrasada(tarefa) {

    if (
        tarefa.concluida ||
        !tarefa.prazo
    ) {
        return false;
    }

    return tarefa.prazo < dataHoje();
}


// ==========================================
// NOME DA PRIORIDADE
// ==========================================

function nomePrioridade(prioridade) {

    const nomes = {
        alta: "Alta",
        media: "Média",
        baixa: "Baixa"
    };

    return nomes[prioridade] || prioridade;
}


// ==========================================
// ESCAPAR HTML
// ==========================================

function escaparHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent = texto || "";

    return div.innerHTML;
}


// ==========================================
// RENDERIZAR
// ==========================================

function renderizarTarefas() {

    listaTarefas.innerHTML = "";

    const termo =
        busca.value
            .toLowerCase()
            .trim();

    const statusSelecionado =
        filtroStatus.value;

    const prioridadeSelecionada =
        filtroPrioridade.value;


    const tarefasFiltradas =
        tarefas.filter(tarefa => {

            // Busca
            const correspondeBusca =
                tarefa.titulo
                    .toLowerCase()
                    .includes(termo) ||

                tarefa.descricao
                    .toLowerCase()
                    .includes(termo) ||

                tarefa.categoria
                    .toLowerCase()
                    .includes(termo);


            if (!correspondeBusca) {
                return false;
            }


            // Status
            if (
                statusSelecionado ===
                "pendentes" &&
                tarefa.concluida
            ) {
                return false;
            }


            if (
                statusSelecionado ===
                "concluidas" &&
                !tarefa.concluida
            ) {
                return false;
            }


            if (
                statusSelecionado ===
                "atrasadas" &&
                !estaAtrasada(tarefa)
            ) {
                return false;
            }


            // Prioridade
            if (
                prioridadeSelecionada !== "todas" &&
                tarefa.prioridade !==
                prioridadeSelecionada
            ) {
                return false;
            }


            return true;
        });


    // Ordenação:
    // pendentes primeiro
    // depois prazo
    tarefasFiltradas.sort((a, b) => {

        if (a.concluida !== b.concluida) {
            return a.concluida ? 1 : -1;
        }

        if (!a.prazo) {
            return 1;
        }

        if (!b.prazo) {
            return -1;
        }

        return a.prazo.localeCompare(b.prazo);
    });


    // Lista vazia
    listaVazia.style.display =
        tarefasFiltradas.length === 0
            ? "block"
            : "none";


    // Criar tarefas
    tarefasFiltradas.forEach(
        tarefa => criarElementoTarefa(tarefa)
    );


    atualizarEstatisticas();
}


// ==========================================
// CRIAR ELEMENTO DA TAREFA
// ==========================================

function criarElementoTarefa(tarefa) {

    const div =
        document.createElement("div");

    div.className = "tarefa";

    if (tarefa.concluida) {
        div.classList.add("concluida");
    }


    const atrasada =
        estaAtrasada(tarefa);


    const prazoHTML = tarefa.prazo
        ? `
            <span class="prazo ${atrasada ? "atrasado" : ""}">
                📅 ${formatarData(tarefa.prazo)}
                ${atrasada ? " • Atrasada" : ""}
            </span>
        `
        : `
            <span class="prazo">
                📅 Sem prazo
            </span>
        `;


    div.innerHTML = `

        <div
            class="checkbox"
            onclick="alternarConclusao('${tarefa.id}')"
            title="Marcar como concluída"
        >
            ${tarefa.concluida ? "✓" : ""}
        </div>


        <div class="tarefa-info">

            <div class="tarefa-titulo">
                ${escaparHTML(tarefa.titulo)}
            </div>


            ${
                tarefa.descricao
                    ? `
                        <div class="tarefa-descricao">
                            ${escaparHTML(tarefa.descricao)}
                        </div>
                    `
                    : ""
            }


            <div class="tarefa-meta">

                <span class="tag categoria">
                    ${escaparHTML(tarefa.categoria)}
                </span>

                <span
                    class="tag prioridade-${tarefa.prioridade}"
                >
                    ${nomePrioridade(tarefa.prioridade)}
                </span>

                ${prazoHTML}

            </div>

        </div>


        <div class="acoes">

            <button
                class="btn-acao btn-editar"
                onclick="editarTarefa('${tarefa.id}')"
                title="Editar"
            >
                ✏️
            </button>


            <button
                class="btn-acao btn-excluir"
                onclick="excluirTarefa('${tarefa.id}')"
                title="Excluir"
            >
                🗑️
            </button>

        </div>
    `;


    listaTarefas.appendChild(div);
}


// ==========================================
// ADICIONAR / EDITAR
// ==========================================

tarefaForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const id = tarefaId.value;


        const dados = {

            id: id || crypto.randomUUID(),

            titulo:
                titulo.value.trim(),

            categoria:
                categoria.value,

            prioridade:
                prioridade.value,

            prazo:
                prazo.value,

            descricao:
                descricao.value.trim(),

            concluida: false
        };


        // Editar
        if (id) {

            const index =
                tarefas.findIndex(
                    tarefa =>
                        tarefa.id === id
                );


            if (index !== -1) {

                dados.concluida =
                    tarefas[index].concluida;

                tarefas[index] = dados;
            }

        }

        // Nova tarefa
        else {

            tarefas.push(dados);
        }


        salvarTarefas();

        limparFormulario();

        renderizarTarefas();
    }
);


// ==========================================
// EDITAR
// ==========================================

function editarTarefa(id) {

    const tarefa =
        tarefas.find(
            tarefa =>
                tarefa.id === id
        );


    if (!tarefa) {
        return;
    }


    tarefaId.value =
        tarefa.id;

    titulo.value =
        tarefa.titulo;

    categoria.value =
        tarefa.categoria;

    prioridade.value =
        tarefa.prioridade;

    prazo.value =
        tarefa.prazo;

    descricao.value =
        tarefa.descricao;


    tituloFormulario.textContent =
        "Editar tarefa";

    btnSalvar.textContent =
        "Salvar alterações";

    btnCancelar.classList.remove(
        "hidden"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// EXCLUIR
// ==========================================

function excluirTarefa(id) {

    const tarefa =
        tarefas.find(
            tarefa =>
                tarefa.id === id
        );


    if (!tarefa) {
        return;
    }


    const confirmar =
        confirm(
            `Deseja excluir a tarefa "${tarefa.titulo}"?`
        );


    if (!confirmar) {
        return;
    }


    tarefas =
        tarefas.filter(
            tarefa =>
                tarefa.id !== id
        );


    salvarTarefas();

    renderizarTarefas();
}


// ==========================================
// CONCLUIR
// ==========================================

function alternarConclusao(id) {

    const tarefa =
        tarefas.find(
            tarefa =>
                tarefa.id === id
        );


    if (!tarefa) {
        return;
    }


    tarefa.concluida =
        !tarefa.concluida;


    salvarTarefas();

    renderizarTarefas();
}


// ==========================================
// LIMPAR FORMULÁRIO
// ==========================================

function limparFormulario() {

    tarefaForm.reset();

    tarefaId.value = "";

    prioridade.value = "media";

    tituloFormulario.textContent =
        "Nova tarefa";

    btnSalvar.textContent =
        "+ Adicionar tarefa";

    btnCancelar.classList.add(
        "hidden"
    );
}


// ==========================================
// CANCELAR EDIÇÃO
// ==========================================

btnCancelar.addEventListener(
    "click",
    limparFormulario
);


// ==========================================
// ESTATÍSTICAS
// ==========================================

function atualizarEstatisticas() {

    const total =
        tarefas.length;


    const concluidas =
        tarefas.filter(
            tarefa =>
                tarefa.concluida
        ).length;


    const pendentes =
        tarefas.filter(
            tarefa =>
                !tarefa.concluida
        ).length;


    const atrasadas =
        tarefas.filter(
            tarefa =>
                estaAtrasada(tarefa)
        ).length;


    document.getElementById(
        "totalTarefas"
    ).textContent = total;


    document.getElementById(
        "tarefasPendentes"
    ).textContent = pendentes;


    document.getElementById(
        "tarefasConcluidas"
    ).textContent = concluidas;


    document.getElementById(
        "tarefasAtrasadas"
    ).textContent = atrasadas;
}


// ==========================================
// FILTROS
// ==========================================

busca.addEventListener(
    "input",
    renderizarTarefas
);


filtroStatus.addEventListener(
    "change",
    renderizarTarefas
);


filtroPrioridade.addEventListener(
    "change",
    renderizarTarefas
);


// ==========================================
// INICIALIZAÇÃO
// ==========================================

mostrarDataAtual();

renderizarTarefas();
