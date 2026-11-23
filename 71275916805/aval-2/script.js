
// ARRAY PRINCIPAL
let tarefas = JSON.parse(
    localStorage.getItem("tarefas")
) || [];

// GERADOR DE CÓDIGOS
let proximoCodigo = tarefas.reduce(
    (maior, tarefa) => Math.max(maior, tarefa.codigo),
    0
) + 1;

let filtroAtual = "todas";

// SALVAR TAREFAS
function salvarTarefas() {
    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}

// VALIDAR DADOS DA TAREFA
function validarDadosDaTarefa(titulo, prioridade) {

    if (typeof titulo !== "string" ||
        titulo.trim().length < 5) {
        throw new Error(
            "O título deve ter no mínimo 5 caracteres."
        );
    }

    if (!Number.isInteger(prioridade) ||
        prioridade < 1 || prioridade > 3) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }
}

// CADASTRAR TAREFA
function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    let novaTarefa = {
        codigo: proximoCodigo++,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);

    salvarTarefas();
    listarTarefas();
}

// LISTAR TAREFAS
function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    let tarefasFiltradas = tarefas;

    if (filtroAtual === "pendentes") {
        tarefasFiltradas = tarefas.filter(
            tarefa => tarefa.status === true
        );
    }

    if (filtroAtual === "concluidas") {
        tarefasFiltradas = tarefas.filter(
            tarefa => tarefa.status === false
        );
    }

    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    tarefasFiltradas = tarefasFiltradas.filter(
        tarefa => tarefa.titulo.toLowerCase().includes(pesquisa)
    );

    if (tarefasFiltradas.length === 0) {
        lista.innerHTML =
            '<p class="vazio">Nenhuma tarefa encontrada.</p>';
    }

    tarefasFiltradas.forEach(tarefa => {

        const elemento = document.createElement("div");

        elemento.className = tarefa.status
            ? "tarefa"
            : "tarefa concluida";

        const prioridadeTexto = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        elemento.innerHTML = `
            <div class="tarefa-info">
                <h3>${escaparHTML(tarefa.titulo)}</h3>

                <p>
                    Código: ${tarefa.codigo} |
                    Prioridade:
                    <strong class="prioridade-${tarefa.prioridade}">
                        ${prioridadeTexto[tarefa.prioridade]}
                    </strong>
                </p>

                <p>
                    Status:
                    ${tarefa.status ? "Pendente" : "Concluída"}
                </p>
            </div>

            <div class="acoes">

                ${tarefa.status ? `
                    <button class="btn-concluir"
                        onclick="concluirTarefa(${tarefa.codigo})">
                        Concluir
                    </button>
                ` : ""}

                <button class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Prioridade
                </button>

                <button class="btn-excluir"
                    onclick="excluirTarefa(${tarefa.codigo})">
                    Excluir
                </button>

            </div>
        `;

        lista.appendChild(elemento);
    });

    atualizarResumo();
}

// PROTEGER TEXTO INSERIDO PELO USUÁRIO
function escaparHTML(texto) {
    return texto.replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

// BUSCAR TAREFA
function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// CONCLUIR TAREFA
function concluirTarefa(codigo) {

    try {

        const tarefa = buscarTarefa(codigo);

        if (tarefa.status === false) {
            throw new Error("Essa tarefa já foi concluída.");
        }

        tarefa.status = false;

        salvarTarefas();
        listarTarefas();

    } catch (erro) {

        alert(erro.message);

    }
}

// ALTERAR PRIORIDADE
function alterarPrioridade(codigo) {

    try {

        const tarefa = buscarTarefa(codigo);

        const entrada = prompt(
            "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
        );

        if (entrada === null || entrada.trim() === "") {
            return;
        }

        const novaPrioridade = Number(entrada);

        validarDadosDaTarefa(
            tarefa.titulo,
            novaPrioridade
        );

        tarefa.prioridade = novaPrioridade;

        salvarTarefas();
        listarTarefas();

        alert("Prioridade alterada com sucesso!");

    } catch (erro) {

        alert(erro.message);

    }
}

// EXCLUIR TAREFA
function excluirTarefa(codigo) {

    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmar) return;

    tarefas = tarefas.filter(
        tarefa => tarefa.codigo !== codigo
    );

    salvarTarefas();
    listarTarefas();
}

// ATUALIZAR RESUMO
function atualizarResumo() {

    const total = tarefas.length;

    const pendentes = tarefas.filter(
        tarefa => tarefa.status === true
    ).length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.status === false
    ).length;

    document.getElementById("totalTarefas")
        .textContent = total;

    document.getElementById("tarefasPendentes")
        .textContent = pendentes;

    document.getElementById("tarefasConcluidas")
        .textContent = concluidas;
}

// EVENTO DE CADASTRO
document.getElementById("formTarefa")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const titulo = document
            .getElementById("titulo").value;

        const prioridade = Number(
            document.getElementById("prioridade").value
        );

        try {

            cadastrarTarefa(titulo, prioridade);

            alert("Tarefa cadastrada com sucesso!");

            this.reset();

        } catch (erro) {

            alert(erro.message);

        }
    });

// EVENTO DE PESQUISA
document.getElementById("pesquisa")
    .addEventListener("input", listarTarefas);

// EVENTOS DOS FILTROS
document.querySelectorAll(".filtro").forEach(botao => {

    botao.addEventListener("click", function() {

        filtroAtual = this.dataset.filtro;

        document.querySelectorAll(".filtro")
            .forEach(item => item.classList.remove("ativo"));

        this.classList.add("ativo");

        listarTarefas();
    });

});

// INICIAR SISTEMA
listarTarefas();
