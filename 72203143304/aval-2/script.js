
// ========================================
// 1. ARMAZENAMENTO DAS TAREFAS
// ========================================

let tarefas = [];

let codigoGerador = 0;


// ========================================
// 2. VALIDAR DADOS DA TAREFA
// ========================================

function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        throw new Error(
            "O título precisa ter no mínimo 5 caracteres."
        );
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }

}


// ========================================
// 3. CADASTRAR TAREFA
// ========================================

function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    codigoGerador++;

    const novaTarefa = {

        codigo: codigoGerador,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true

    };

    tarefas.push(novaTarefa);

    listarTarefas();

    atualizarDashboard();

    mostrarMensagem(
        "Tarefa cadastrada com sucesso!",
        "sucesso"
    );

    return novaTarefa;

}


// ========================================
// 4. LISTAR TAREFAS
// ========================================

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {

        lista.innerHTML = `
            <p class="empty">
                Nenhuma tarefa cadastrada.
            </p>
        `;

        return tarefas;

    }

    filtrarTarefas();

    return tarefas;

}


// ========================================
// 5. BUSCAR TAREFA COM FIND
// ========================================

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {

        throw new Error(
            "Código da tarefa não encontrado!"
        );

    }

    return tarefa;

}


// ========================================
// 6. CONCLUIR TAREFA
// ========================================

function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {

        throw new Error(
            "Esta tarefa já foi concluída!"
        );

    }

    tarefa.status = false;

    listarTarefas();

    atualizarDashboard();

    mostrarMensagem(
        "Tarefa concluída com sucesso!",
        "sucesso"
    );

}


// ========================================
// 7. ALTERAR PRIORIDADE
// ========================================

function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    listarTarefas();

    mostrarMensagem(
        "Prioridade alterada com sucesso!",
        "sucesso"
    );

}


// ========================================
// 8. FILTRAR TAREFAS
// ========================================

function filtrarTarefas() {

    const lista = document.getElementById("listaTarefas");

    const filtro = document.getElementById("filtroStatus").value;

    lista.innerHTML = "";

    let tarefasFiltradas = tarefas;

    if (filtro === "pendentes") {

        tarefasFiltradas = tarefas.filter(
            tarefa => tarefa.status === true
        );

    }

    if (filtro === "concluidas") {

        tarefasFiltradas = tarefas.filter(
            tarefa => tarefa.status === false
        );

    }

    if (tarefasFiltradas.length === 0) {

        lista.innerHTML = `
            <p class="empty">
                Nenhuma tarefa encontrada.
            </p>
        `;

        return;

    }

    tarefasFiltradas.forEach(tarefa => {

        const elemento = document.createElement("div");

        elemento.className = tarefa.status
            ? "task"
            : "task completed";

        const prioridades = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        elemento.innerHTML = `

            <div class="task-info">

                <h3>${escaparHTML(tarefa.titulo)}</h3>

                <p>Código: #${tarefa.codigo}</p>

                <p>
                    Status:
                    ${tarefa.status ? "Pendente" : "Concluída"}
                </p>

                <p>
                    Prioridade:

                    <span class="priority priority-${tarefa.prioridade}">
                        ${prioridades[tarefa.prioridade]}
                    </span>
                </p>

            </div>

            <div class="task-actions">

                <select
                    id="prioridade-${tarefa.codigo}"
                    ${!tarefa.status ? "disabled" : ""}
                >

                    <option value="1"
                        ${tarefa.prioridade === 1 ? "selected" : ""}>
                        Alta
                    </option>

                    <option value="2"
                        ${tarefa.prioridade === 2 ? "selected" : ""}>
                        Média
                    </option>

                    <option value="3"
                        ${tarefa.prioridade === 3 ? "selected" : ""}>
                        Baixa
                    </option>

                </select>

                <button
                    class="btn-alterar"
                    data-acao="alterar"
                    data-codigo="${tarefa.codigo}"
                    ${!tarefa.status ? "disabled" : ""}
                >
                    Alterar prioridade
                </button>

                <button
                    class="${tarefa.status ? "btn-concluir" : "btn-concluida"}"
                    data-acao="concluir"
                    data-codigo="${tarefa.codigo}"
                    ${!tarefa.status ? "disabled" : ""}
                >
                    ${tarefa.status ? "Concluir tarefa" : "Concluída"}
                </button>

            </div>

        `;

        lista.appendChild(elemento);

    });

}


// ========================================
// 9. BUSCAR TAREFA NA INTERFACE
// ========================================

function buscarPorCodigo() {

    try {

        const codigo = Number(
            document.getElementById("codigoBusca").value
        );

        if (!Number.isInteger(codigo) || codigo < 1) {

            throw new Error("Informe um código válido.");

        }

        const tarefa = buscarTarefa(codigo);

        document.getElementById("filtroStatus").value = "todas";

        filtrarTarefas();

        const elemento = Array.from(
            document.querySelectorAll(".task")
        ).find(item =>
            item.querySelector(".task-info p").textContent ===
            `Código: #${tarefa.codigo}`
        );

        if (elemento) {

            elemento.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            elemento.style.border = "2px solid #2563eb";

        }

        mostrarMensagem(
            `Tarefa encontrada: ${tarefa.titulo}`,
            "sucesso"
        );

    } catch (erro) {

        mostrarMensagem(erro.message, "erro");

    }

}


// ========================================
// 10. ATUALIZAR DASHBOARD
// ========================================

function atualizarDashboard() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.status === false
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("totalTarefas").textContent = total;

    document.getElementById("tarefasPendentes").textContent = pendentes;

    document.getElementById("tarefasConcluidas").textContent = concluidas;

}


// ========================================
// 11. EXIBIR MENSAGENS
// ========================================

function mostrarMensagem(texto, tipo) {

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;

    mensagem.className = tipo;

}


// ========================================
// 12. PROTEGER CONTEÚDO HTML
// ========================================

function escaparHTML(texto) {

    return texto.replace(/[&<>"']/g, caractere => {

        const entidades = {

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"

        };

        return entidades[caractere];

    });

}


// ========================================
// 13. EVENTOS DOS BOTÕES DAS TAREFAS
// ========================================

document.getElementById("listaTarefas").addEventListener(
    "click",
    function(event) {

        const botao = event.target.closest("button[data-acao]");

        if (!botao) return;

        const codigo = Number(botao.dataset.codigo);

        try {

            if (botao.dataset.acao === "concluir") {

                concluirTarefa(codigo);

            }

            if (botao.dataset.acao === "alterar") {

                const prioridade = Number(
                    document.getElementById(
                        `prioridade-${codigo}`
                    ).value
                );

                alterarPrioridade(codigo, prioridade);

            }

        } catch (erro) {

            mostrarMensagem(erro.message, "erro");

        }

    }
);


// ========================================
// 14. EVENTO DE CADASTRO
// ========================================

document.getElementById("formTarefa").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        try {

            const titulo = document.getElementById("titulo").value;

            const prioridade = Number(
                document.getElementById("prioridade").value
            );

            cadastrarTarefa(titulo, prioridade);

            this.reset();

        } catch (erro) {

            mostrarMensagem(erro.message, "erro");

        }

    }
);


// ========================================
// 15. EVENTOS DE BUSCA E FILTRO
// ========================================

document.getElementById("btnBuscar").addEventListener(
    "click",
    buscarPorCodigo
);

document.getElementById("btnMostrarTodas").addEventListener(
    "click",
    function() {

        document.getElementById("filtroStatus").value = "todas";

        document.getElementById("codigoBusca").value = "";

        listarTarefas();

    }
);

document.getElementById("filtroStatus").addEventListener(
    "change",
    filtrarTarefas
);


// ========================================
// 16. INICIALIZAÇÃO
// ========================================

listarTarefas();

atualizarDashboard();
