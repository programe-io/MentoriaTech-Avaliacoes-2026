```javascript
// ========================================
// GERENCIADOR DE TAREFAS
// ========================================


// Carrega as tarefas salvas
let tarefas = JSON.parse(
    localStorage.getItem("tarefas")
) || [];


// ========================================
// ELEMENTOS
// ========================================

const tituloInput =
    document.getElementById("tituloTarefa");

const prioridadeInput =
    document.getElementById("prioridade");

const dataInput =
    document.getElementById("dataTarefa");

const lista =
    document.getElementById("listaTarefas");

const pesquisa =
    document.getElementById("pesquisa");

const filtro =
    document.getElementById("filtro");

const mensagemVazia =
    document.getElementById("mensagemVazia");


// ========================================
// DATA ATUAL
// ========================================

function mostrarData() {

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

    document.getElementById(
        "dataAtual"
    ).textContent = data;
}


// ========================================
// SALVAR
// ========================================

function salvar() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}


// ========================================
// ADICIONAR
// ========================================

function adicionarTarefa() {

    const titulo =
        tituloInput.value.trim();

    const prioridade =
        prioridadeInput.value;

    const data =
        dataInput.value;


    if (titulo === "") {

        alert("Digite uma tarefa!");

        tituloInput.focus();

        return;
    }


    const tarefa = {

        id: Date.now(),

        titulo: titulo,

        prioridade: prioridade,

        data: data,

        concluida: false
    };


    tarefas.push(tarefa);

    salvar();

    limparFormulario();

    renderizar();

    tituloInput.focus();
}


// ========================================
// LIMPAR FORMULÁRIO
// ========================================

function limparFormulario() {

    tituloInput.value = "";

    prioridadeInput.value = "media";

    dataInput.value = "";
}


// ========================================
// CONCLUIR
// ========================================

function alternarTarefa(id) {

    const tarefa =
        tarefas.find(
            tarefa => tarefa.id === id
        );

    if (!tarefa) return;

    tarefa.concluida =
        !tarefa.concluida;

    salvar();

    renderizar();
}


// ========================================
// EXCLUIR
// ========================================

function excluirTarefa(id) {

    const tarefa =
        tarefas.find(
            tarefa => tarefa.id === id
        );

    if (!tarefa) return;


    const confirmar = confirm(
        `Deseja excluir a tarefa "${tarefa.titulo}"?`
    );


    if (!confirmar) return;


    tarefas = tarefas.filter(
        tarefa => tarefa.id !== id
    );

    salvar();

    renderizar();
}


// ========================================
// EDITAR
// ========================================

function editarTarefa(id) {

    const tarefa =
        tarefas.find(
            tarefa => tarefa.id === id
        );

    if (!tarefa) return;


    const novoTitulo = prompt(
        "Digite o novo título:",
        tarefa.titulo
    );


    if (novoTitulo === null) return;


    if (novoTitulo.trim() === "") {

        alert("O título não pode ficar vazio.");

        return;
    }


    tarefa.titulo =
        novoTitulo.trim();


    salvar();

    renderizar();
}


// ========================================
// FORMATAR DATA
// ========================================

function formatarData(data) {

    if (!data) {
        return "Sem prazo";
    }


    const partes =
        data.split("-");


    if (partes.length !== 3) {
        return data;
    }


    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


// ========================================
// TEXTO DA PRIORIDADE
// ========================================

function textoPrioridade(prioridade) {

    if (prioridade === "alta") {
        return "Alta";
    }

    if (prioridade === "media") {
        return "Média";
    }

    return "Baixa";
}


// ========================================
// FILTRAR
// ========================================

function obterTarefasFiltradas() {

    const texto =
        pesquisa.value
            .toLowerCase()
            .trim();

    const tipo =
        filtro.value;


    return tarefas.filter(tarefa => {

        const correspondeTexto =
            tarefa.titulo
                .toLowerCase()
                .includes(texto);


        let correspondeFiltro = true;


        if (tipo === "pendentes") {

            correspondeFiltro =
                !tarefa.concluida;
        }


        if (tipo === "concluidas") {

            correspondeFiltro =
                tarefa.concluida;
        }


        if (tipo === "alta") {

            correspondeFiltro =
                tarefa.prioridade === "alta";
        }


        return (
            correspondeTexto &&
            correspondeFiltro
        );
    });
}


// ========================================
// RENDERIZAR
// ========================================

function renderizar() {

    lista.innerHTML = "";


    const tarefasFiltradas =
        obterTarefasFiltradas();


    if (tarefasFiltradas.length === 0) {

        mensagemVazia.style.display =
            "block";

    } else {

        mensagemVazia.style.display =
            "none";
    }


    tarefasFiltradas.forEach(tarefa => {

        const elemento =
            document.createElement("div");


        elemento.className =
            "tarefa";


        if (tarefa.concluida) {

            elemento.classList.add(
                "concluida"
            );
        }


        elemento.innerHTML = `

            <button
                class="check"
                title="Concluir tarefa">
            </button>

            <div class="info-tarefa">

                <div class="titulo">
                    ${escaparHTML(tarefa.titulo)}
                </div>

                <div class="detalhes">

                    <span class="prioridade ${tarefa.prioridade}">
                        ${textoPrioridade(tarefa.prioridade)}
                    </span>

                    <span>
                        📅 ${formatarData(tarefa.data)}
                    </span>

                </div>

            </div>

            <div class="acoes">

                <button
                    class="btn-editar"
                    title="Editar">
                    ✏️
                </button>

                <button
                    class="btn-excluir"
                    title="Excluir">
                    🗑️
                </button>

            </div>
        `;


        const botaoCheck =
            elemento.querySelector(".check");

        const botaoEditar =
            elemento.querySelector(".btn-editar");

        const botaoExcluir =
            elemento.querySelector(".btn-excluir");


        botaoCheck.addEventListener(
            "click",
            () => alternarTarefa(tarefa.id)
        );


        botaoEditar.addEventListener(
            "click",
            () => editarTarefa(tarefa.id)
        );


        botaoExcluir.addEventListener(
            "click",
            () => excluirTarefa(tarefa.id)
        );


        lista.appendChild(elemento);
    });


    atualizarResumo();
}


// ========================================
// RESUMO
// ========================================

function atualizarResumo() {

    const total =
        tarefas.length;


    const concluidas =
        tarefas.filter(
            tarefa => tarefa.concluida
        ).length;


    const pendentes =
        total - concluidas;


    document.getElementById(
        "totalTarefas"
    ).textContent = total;


    document.getElementById(
        "tarefasPendentes"
    ).textContent = pendentes;


    document.getElementById(
        "tarefasConcluidas"
    ).textContent = concluidas;
}


// ========================================
// LIMPAR CONCLUÍDAS
// ========================================

function limparConcluidas() {

    const quantidade =
        tarefas.filter(
            tarefa => tarefa.concluida
        ).length;


    if (quantidade === 0) {

        alert(
            "Não existem tarefas concluídas."
        );

        return;
    }


    const confirmar = confirm(
        `Deseja excluir ${quantidade} tarefa(s) concluída(s)?`
    );


    if (!confirmar) return;


    tarefas = tarefas.filter(
        tarefa => !tarefa.concluida
    );


    salvar();

    renderizar();
}


// ========================================
// SEGURANÇA
// ========================================

function escaparHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;
}


// ========================================
// EVENTOS
// ========================================

document
    .getElementById("btnAdicionar")
    .addEventListener(
        "click",
        adicionarTarefa
    );


tituloInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            adicionarTarefa();
        }
    }
);


pesquisa.addEventListener(
    "input",
    renderizar
);


filtro.addEventListener(
    "change",
    renderizar
);


document
    .getElementById("limparConcluidas")
    .addEventListener(
        "click",
        limparConcluidas
    );


// ========================================
// INICIAR SISTEMA
// ========================================

mostrarData();

renderizar();
```
