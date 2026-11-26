
// ==========================================
// GERENCIADOR DE TAREFAS
// ==========================================

// 1. Array de tarefas

let tarefas = [];

// 2. Gerador de código

let geradorCodigo = 0;


// ==========================================
// 3. VALIDAR DADOS DA TAREFA
// ==========================================

function validarDadosDaTarefa(titulo, prioridade) {

    if (typeof titulo !== "string" || titulo.trim().length < 5) {
        throw new Error(
            "O título deve possuir no mínimo cinco caracteres."
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
// 4. CADASTRAR TAREFA
// ==========================================

function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    geradorCodigo++;

    let novaTarefa = {

        codigo: geradorCodigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true

    };

    tarefas.push(novaTarefa);

    atualizarTela();

    return novaTarefa;
}


// ==========================================
// 5. LISTAR TAREFAS
// ==========================================

function listarTarefas() {

    return tarefas;

}


// ==========================================
// 6. BUSCAR TAREFA
// ==========================================

function buscarTarefa(codigoTarefa) {

    const tarefa = tarefas.find(
        (tarefa) => tarefa.codigo === codigoTarefa
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}


// ==========================================
// 7. CONCLUIR TAREFA
// ==========================================

function concluirTarefa(codigoTarefa) {

    const tarefa = buscarTarefa(codigoTarefa);

    if (tarefa.status === false) {

        throw new Error(
            "Esta tarefa já foi concluída."
        );

    }

    tarefa.status = false;

    atualizarTela();

    return tarefa;
}


// ==========================================
// 8. ALTERAR PRIORIDADE
// ==========================================

function alterarPrioridade(codigoTarefa, novaPrioridade) {

    const tarefa = buscarTarefa(codigoTarefa);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    atualizarTela();

    return tarefa;
}


// ==========================================
// 9. ATUALIZAR A TELA
// ==========================================

function atualizarTela() {

    const tabela = document.getElementById("listaTarefas");

    const mensagemVazia = document.getElementById("mensagemVazia");

    tabela.innerHTML = "";

    const lista = listarTarefas();

    mensagemVazia.style.display =
        lista.length === 0 ? "block" : "none";


    lista.forEach((tarefa) => {

        const linha = document.createElement("tr");


        // Código

        const codigo = document.createElement("td");

        codigo.textContent = tarefa.codigo;


        // Título

        const titulo = document.createElement("td");

        titulo.textContent = tarefa.titulo;


        // Prioridade

        const prioridade = document.createElement("td");

        const nomesPrioridade = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        prioridade.textContent =
            nomesPrioridade[tarefa.prioridade];

        prioridade.className =
            "prioridade-" +
            (tarefa.prioridade === 1
                ? "alta"
                : tarefa.prioridade === 2
                    ? "media"
                    : "baixa");


        // Status

        const status = document.createElement("td");

        status.textContent =
            tarefa.status ? "Pendente" : "Concluída";

        status.className =
            tarefa.status
                ? "status-pendente"
                : "status-concluida";


        // Ações

        const acoes = document.createElement("td");


        // Botão concluir

        const btnConcluir = document.createElement("button");

        btnConcluir.textContent =
            tarefa.status ? "Concluir" : "Concluída";

        btnConcluir.className = "btn-concluir";

        btnConcluir.disabled = !tarefa.status;

        if (!tarefa.status) {
            btnConcluir.style.opacity = "0.6";
            btnConcluir.style.cursor = "not-allowed";
        }

        btnConcluir.addEventListener("click", () => {

            try {

                concluirTarefa(tarefa.codigo);

            } catch (erro) {

                alert(erro.message);

            }

        });


        // Botão alterar prioridade

        const btnPrioridade = document.createElement("button");

        btnPrioridade.textContent = "Prioridade";

        btnPrioridade.className = "btn-prioridade";

        btnPrioridade.addEventListener("click", () => {

            alterarPrioridadeTela(tarefa.codigo);

        });


        acoes.appendChild(btnConcluir);

        acoes.appendChild(btnPrioridade);


        // Montar tabela

        linha.appendChild(codigo);

        linha.appendChild(titulo);

        linha.appendChild(prioridade);

        linha.appendChild(status);

        linha.appendChild(acoes);


        if (!tarefa.status) {

            linha.classList.add("tarefa-concluida");

        }

        tabela.appendChild(linha);

    });


    atualizarIndicadores();

}


// ==========================================
// 10. ALTERAR PRIORIDADE PELA TELA
// ==========================================

function alterarPrioridadeTela(codigoTarefa) {

    const novaPrioridade = prompt(
        "Informe a nova prioridade:\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );

    if (novaPrioridade === null || novaPrioridade.trim() === "") {
        return;
    }

    const prioridadeConvertida = Number(novaPrioridade);

    try {

        alterarPrioridade(
            codigoTarefa,
            prioridadeConvertida
        );

        alert("Prioridade alterada com sucesso!");

    } catch (erro) {

        alert("Erro: " + erro.message);

    }

}


// ==========================================
// 11. ATUALIZAR INDICADORES
// ==========================================

function atualizarIndicadores() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        (tarefa) => tarefa.status === false
    ).length;

    const pendentes = tarefas.filter(
        (tarefa) => tarefa.status === true
    ).length;


    document.getElementById("totalTarefas").textContent = total;

    document.getElementById("tarefasPendentes").textContent = pendentes;

    document.getElementById("tarefasConcluidas").textContent = concluidas;

}


// ==========================================
// 12. EVENTO DO FORMULÁRIO
// ==========================================

const formulario = document.getElementById("formTarefa");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = document.getElementById("titulo").value;

    const prioridade = Number(
        document.getElementById("prioridade").value
    );


    try {

        cadastrarTarefa(titulo, prioridade);

        formulario.reset();

        alert("Tarefa cadastrada com sucesso!");

    } catch (erro) {

        alert("Erro: " + erro.message);

    }

});


// ==========================================
// 13. INICIALIZAR SISTEMA
// ==========================================

atualizarTela();
