// =====================================
// ARRAY DE TAREFAS
// =====================================

let tarefas = [];
let geradorCodigo = 0;


// =====================================
// VALIDAR DADOS
// =====================================

function validarDadosTarefa(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        throw new Error(
            "O título deve ter no mínimo 5 caracteres."
        );
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error(
            "Informe uma prioridade entre 1 e 3."
        );
    }
}


// =====================================
// BUSCAR TAREFA
// =====================================

function buscarTarefa(codigo) {

    return tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });
}


// =====================================
// CADASTRAR TAREFA
// =====================================

function cadastrarTarefa(titulo, prioridade) {

    validarDadosTarefa(titulo, prioridade);

    geradorCodigo++;

    let tarefa = {
        codigo: geradorCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    return tarefa;
}


// =====================================
// ADICIONAR TAREFA NA TELA
// =====================================

function adicionarTarefa() {

    let campoTitulo =
        document.getElementById("titulo");

    let campoPrioridade =
        document.getElementById("prioridade");

    let titulo = campoTitulo.value;

    let prioridade =
        Number(campoPrioridade.value);

    try {

        cadastrarTarefa(titulo, prioridade);

        campoTitulo.value = "";

        atualizarTela();

    } catch (erro) {

        alert(erro.message);

    }
}


// =====================================
// CONCLUIR TAREFA
// =====================================

function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada.");
        return;
    }

    tarefa.status = false;

    atualizarTela();
}


// =====================================
// EXCLUIR TAREFA
// =====================================

function excluirTarefa(codigo) {

    let indice = tarefas.findIndex(
        function(tarefa) {
            return tarefa.codigo === codigo;
        }
    );

    if (indice === -1) {
        alert("Tarefa não encontrada.");
        return;
    }

    tarefas.splice(indice, 1);

    atualizarTela();
}


// =====================================
// EDITAR TAREFA
// =====================================

function editarTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        return;
    }

    let novoTitulo = prompt(
        "Digite o novo título:",
        tarefa.titulo
    );

    if (novoTitulo === null) {
        return;
    }

    let novaPrioridade = prompt(
        "Digite a prioridade (1, 2 ou 3):",
        tarefa.prioridade
    );

    if (novaPrioridade === null) {
        return;
    }

    novaPrioridade = Number(novaPrioridade);

    try {

        validarDadosTarefa(
            novoTitulo,
            novaPrioridade
        );

        tarefa.titulo = novoTitulo;
        tarefa.prioridade = novaPrioridade;

        atualizarTela();

    } catch (erro) {

        alert(erro.message);

    }
}


// =====================================
// MOSTRAR TAREFAS NA TELA
// =====================================

function atualizarTela() {

    let lista =
        document.getElementById("listaTarefas");

    lista.innerHTML = "";


    if (tarefas.length === 0) {

        lista.innerHTML = `
            <div class="mensagem">
                Nenhuma tarefa cadastrada.
            </div>
        `;

    }


    tarefas.forEach(function(tarefa) {

        let prioridadeTexto =
            "Prioridade " + tarefa.prioridade;

        let statusTexto =
            tarefa.status
                ? "Pendente"
                : "Concluída";


        let statusClasse =
            tarefa.status
                ? "pendente"
                : "concluida";


        lista.innerHTML += `

            <div class="tarefa">

                <div class="codigo">
                    Código: ${tarefa.codigo}
                </div>

                <h2>
                    ${tarefa.titulo}
                </h2>

                <span class="
                    prioridade
                    prioridade-${tarefa.prioridade}
                ">
                    ${prioridadeTexto}
                </span>

                <span class="
                    status
                    ${statusClasse}
                ">
                    Status: ${statusTexto}
                </span>

                <div class="acoes">

                    ${
                        tarefa.status
                        ?
                        `
                        <button
                            class="btn-concluir"
                            onclick="concluirTarefa(${tarefa.codigo})"
                        >
                            Concluir
                        </button>
                        `
                        :
                        ""
                    }

                    <button
                        class="btn-editar"
                        onclick="editarTarefa(${tarefa.codigo})"
                    >
                        Editar
                    </button>

                    <button
                        class="btn-excluir"
                        onclick="excluirTarefa(${tarefa.codigo})"
                    >
                        Excluir
                    </button>

                </div>

            </div>

        `;

    });


    atualizarEstatisticas();
}


// =====================================
// ATUALIZAR ESTATÍSTICAS
// =====================================

function atualizarEstatisticas() {

    let total = tarefas.length;

    let pendentes =
        tarefas.filter(function(tarefa) {
            return tarefa.status === true;
        }).length;

    let concluidas =
        tarefas.filter(function(tarefa) {
            return tarefa.status === false;
        }).length;


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


// =====================================
// INICIAR SISTEMA
// =====================================

atualizarTela();