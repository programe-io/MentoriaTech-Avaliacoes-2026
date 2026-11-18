
// ==========================================
// 1. ARMAZENAMENTO DAS TAREFAS
// ==========================================

let tarefas = [];

let codigoGerador = 0;


// ==========================================
// 2. FUNÇÃO DE VALIDAÇÃO
// ==========================================

function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        throw new Error(
            "O título precisa ter no mínimo 5 caracteres."
        );
    }

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }

}


// ==========================================
// 3. CADASTRAR TAREFA
// ==========================================

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

    atualizarDashboard();

    listarTarefas();

    mostrarMensagem(
        "Tarefa cadastrada com sucesso!",
        "sucesso"
    );

    return novaTarefa;

}


// ==========================================
// 4. LISTAR TAREFAS
// ==========================================

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {

        lista.innerHTML = `
            <p class="empty-message">
                Nenhuma tarefa cadastrada.
            </p>
        `;

        atualizarDashboard();

        return tarefas;
    }

    filtrarTarefas();

    atualizarDashboard();

    return tarefas;

}


// ==========================================
// 5. BUSCAR TAREFA PELO CÓDIGO
// ==========================================

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error(
            "Tarefa não encontrada!"
        );
    }

    return tarefa;

}


// ==========================================
// 6. CONCLUIR TAREFA
// ==========================================

function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error(
            "Esta tarefa já foi concluída!"
        );
    }

    tarefa.status = false;

    listarTarefas();

    mostrarMensagem(
        "Tarefa concluída com sucesso!",
        "sucesso"
    );

}


// ==========================================
// 7. ALTERAR PRIORIDADE
// ==========================================

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


// ==========================================
// 8. EXIBIR TAREFAS NA TELA
// ==========================================

function filtrarTarefas() {

    const lista = document.getElementById("listaTarefas");

    const filtro = document.getElementById("filtroStatus").value;

    lista.innerHTML = "";

    let tarefasFiltradas = tarefas;

    if (filtro === "pendentes") {

        tarefasFiltradas = tarefas.filter(
            tarefa => tarefa.status === true
        );

    } else if (filtro === "concluidas") {

        tarefasFiltradas = tarefas.filter(
            tarefa => tarefa.status === false
        );

    }

    if (tarefasFiltradas.length === 0) {

        lista.innerHTML = `
            <p class="empty-message">
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

        const statusTexto = tarefa.status
            ? "Pendente"
            : "Concluída";

        const prioridadeTexto = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        elemento.innerHTML = `
            <div class="task-info">

                <h3>${escaparHTML(tarefa.titulo)}</h3>

                <p>Código: #${tarefa.codigo}</p>

                <p>
                    Status: ${statusTexto}
                </p>

                <p>
                    Prioridade:
                    <span class="priority priority-${tarefa.prioridade}">
                        ${prioridadeTexto[tarefa.prioridade]}
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
                    onclick="executarAlteracao(${tarefa.codigo})"
                    ${!tarefa.status ? "disabled" : ""}
                >
                    Alterar prioridade
                </button>

                <button
                    class="${tarefa.status ? "btn-concluir" : "btn-concluida"}"
                    onclick="executarConclusao(${tarefa.codigo})"
                    ${!tarefa.status ? "disabled" : ""}
                >
                    ${tarefa.status ? "Concluir tarefa" : "Concluída"}
                </button>

            </div>
        `;

        lista.appendChild(elemento);

    });

}


// ==========================================
// 9. EXECUTAR ALTERAÇÃO
// ==========================================

function executarAlteracao(codigo) {

    try {

        const prioridade = Number(
            document.getElementById(
                `prioridade-${codigo}`
            ).value
        );

        alterarPrioridade(codigo, prioridade);

    } catch (erro) {

        mostrarMensagem(erro.message, "erro");

    }

}


// ==========================================
// 10. EXECUTAR CONCLUSÃO
// ==========================================

function executarConclusao(codigo) {

    try {

        concluirTarefa(codigo);

    } catch (erro) {

        mostrarMensagem(erro.message, "erro");

    }

}


// ==========================================
// 11. BUSCAR PELO CÓDIGO NA INTERFACE
// ==========================================

function buscarPorCodigo() {

    try {

        const codigo = Number(
            document.getElementById("codigoBusca").value
        );

        if (!Number.isInteger(codigo) || codigo < 1) {
            throw new Error(
                "Informe um código válido."
            );
        }

        const tarefa = buscarTarefa(codigo);

        document.getElementById("filtroStatus").value = "todas";

        filtrarTarefas();

        const elemento = Array.from(
            document.querySelectorAll(".task")
        ).find(item =>
            item.querySelector(".task-info p").textContent
                === `Código: #${tarefa.codigo}`
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


// ==========================================
// 12. ATUALIZAR INDICADORES
// ==========================================

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


// ==========================================
// 13. EXIBIR MENSAGENS
// ==========================================

function mostrarMensagem(texto, tipo) {

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;

    mensagem.className = `mensagem ${tipo}`;

}


// ==========================================
// 14. PROTEÇÃO CONTRA HTML INJETADO
// ==========================================

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


// ==========================================
// 15. EVENTO DE CADASTRO
// ==========================================

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


// ==========================================
// 16. INICIALIZAÇÃO
// ==========================================

listarTarefas();
