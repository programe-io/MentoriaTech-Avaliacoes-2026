
// CARREGAR TAREFAS SALVAS

let tarefas = JSON.parse(
    localStorage.getItem("tarefas")
) || [];

let indiceEdicao = null;

let filtroAtual = "Todas";


// SALVAR TAREFAS

function salvarDados() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

}


// CADASTRAR OU ALTERAR TAREFA

document.getElementById("formTarefa")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nomeTarefa").value.trim();

    const descricao = document.getElementById("descricao").value.trim();

    const prioridade = document.getElementById("prioridade").value;

    if (!nome || !prioridade) {
        alert("Preencha os campos obrigatórios!");
        return;
    }

    const tarefa = {

        id: indiceEdicao !== null
            ? tarefas[indiceEdicao].id
            : Date.now() + Math.random(),

        nome,
        descricao,
        prioridade,

        status: indiceEdicao !== null
            ? tarefas[indiceEdicao].status
            : "Pendente"

    };

    if (indiceEdicao !== null) {

        tarefas[indiceEdicao] = tarefa;

        alert("Tarefa atualizada com sucesso!");

    } else {

        tarefas.push(tarefa);

        alert("Tarefa cadastrada com sucesso!");

    }

    salvarDados();

    cancelarEdicao();

    listarTarefas();

});


// ESCAPAR TEXTOS INSERIDOS PELO USUÁRIO

function escapar(texto) {

    return String(texto).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);

}


// LISTAR TAREFAS

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    const busca = document.getElementById("pesquisa")
        .value.toLowerCase();

    lista.innerHTML = "";

    const filtradas = tarefas.filter(tarefa => {

        const correspondeBusca =
            tarefa.nome.toLowerCase().includes(busca);

        const correspondeFiltro =
            filtroAtual === "Todas" ||
            tarefa.status === filtroAtual;

        return correspondeBusca && correspondeFiltro;

    });

    if (filtradas.length === 0) {

        lista.innerHTML = `
            <div class="vazio">
                Nenhuma tarefa encontrada.
            </div>
        `;

    }

    filtradas.forEach(tarefa => {

        const indice = tarefas.findIndex(
            t => t.id === tarefa.id
        );

        let classePrioridade = tarefa.prioridade === "Alta"
            ? "alta"
            : tarefa.prioridade === "Média"
                ? "media"
                : "baixa";

        const classeConcluida =
            tarefa.status === "Concluída"
                ? "concluida"
                : "";

        lista.innerHTML += `

            <div class="tarefa ${classePrioridade} ${classeConcluida}">

                <h3>${escapar(tarefa.nome)}</h3>

                <p>${escapar(tarefa.descricao)}</p>

                <p>
                    <strong>Prioridade:</strong>
                    ${escapar(tarefa.prioridade)}
                </p>

                <span class="status">
                    Status: ${escapar(tarefa.status)}
                </span>

                <br>

                <button class="concluir"
                    onclick="concluirTarefa(${indice})">

                    ${tarefa.status === "Concluída"
                        ? "Marcar como Pendente"
                        : "Concluir Tarefa"}

                </button>

                <button class="prioridade"
                    onclick="alterarPrioridade(${indice})">

                    Alterar Prioridade

                </button>

                <button class="editar"
                    onclick="editarTarefa(${indice})">

                    Editar

                </button>

                <button class="excluir"
                    onclick="excluirTarefa(${indice})">

                    Excluir

                </button>

            </div>

        `;

    });

    atualizarResumo();

}


// MARCAR TAREFA COMO CONCLUÍDA

function concluirTarefa(indice) {

    if (tarefas[indice].status === "Pendente") {

        tarefas[indice].status = "Concluída";

    } else {

        tarefas[indice].status = "Pendente";

    }

    salvarDados();

    listarTarefas();

}


// ALTERAR PRIORIDADE

function alterarPrioridade(indice) {

    const prioridade = tarefas[indice].prioridade;

    if (prioridade === "Alta") {

        tarefas[indice].prioridade = "Média";

    } else if (prioridade === "Média") {

        tarefas[indice].prioridade = "Baixa";

    } else {

        tarefas[indice].prioridade = "Alta";

    }

    salvarDados();

    listarTarefas();

}


// EDITAR TAREFA

function editarTarefa(indice) {

    const tarefa = tarefas[indice];

    document.getElementById("nomeTarefa").value = tarefa.nome;

    document.getElementById("descricao").value = tarefa.descricao;

    document.getElementById("prioridade").value = tarefa.prioridade;

    indiceEdicao = indice;

    document.getElementById("tituloFormulario")
        .textContent = "Alterar Tarefa";

    document.getElementById("btnSalvar")
        .textContent = "Salvar Alterações";

    document.getElementById("btnCancelar")
        .style.display = "inline-block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// CANCELAR EDIÇÃO

function cancelarEdicao() {

    indiceEdicao = null;

    document.getElementById("formTarefa").reset();

    document.getElementById("tituloFormulario")
        .textContent = "Cadastrar Nova Tarefa";

    document.getElementById("btnSalvar")
        .textContent = "Cadastrar Tarefa";

    document.getElementById("btnCancelar")
        .style.display = "none";

}


// EXCLUIR TAREFA

function excluirTarefa(indice) {

    if (confirm("Deseja realmente excluir esta tarefa?")) {

        if (indiceEdicao === indice) {
            cancelarEdicao();
        } else if (indiceEdicao !== null && indiceEdicao > indice) {
            indiceEdicao--;
        }

        tarefas.splice(indice, 1);

        salvarDados();

        listarTarefas();

        alert("Tarefa excluída com sucesso!");

    }

}


// FILTRAR TAREFAS

function filtrarTarefas(filtro) {

    filtroAtual = filtro;

    listarTarefas();

}


// ATUALIZAR RESUMO

function atualizarResumo() {

    const total = tarefas.length;

    const pendentes = tarefas.filter(
        tarefa => tarefa.status === "Pendente"
    ).length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.status === "Concluída"
    ).length;

    document.getElementById("totalTarefas")
        .textContent = total;

    document.getElementById("totalPendentes")
        .textContent = pendentes;

    document.getElementById("totalConcluidas")
        .textContent = concluidas;

}


// INICIAR SISTEMA

listarTarefas();
