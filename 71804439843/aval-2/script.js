
let tarefas = [];
let geradorCodigo = 1;

// Validar os dados da tarefa
function validarDadosTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("Informe uma prioridade entre 1 e 3.");
    }
}

// Buscar tarefa pelo código
function buscarTarefa(codigoTarefa) {

    const tarefaBuscada = tarefas.find(
        t => t.codigo === codigoTarefa
    );

    if (!tarefaBuscada) {
        throw new Error("Tarefa não encontrada!");
    }

    return tarefaBuscada;
}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {

    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: geradorCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    return tarefa;
}

// Listar tarefas
function listarTarefas() {
    return tarefas;
}

// Concluir tarefa
function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("A tarefa já foi concluída!");
    }

    tarefa.status = false;
}

// Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {

    let tarefa = buscarTarefa(codigo);

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        throw new Error("Informe uma prioridade entre 1 e 3.");
    }

    tarefa.prioridade = novaPrioridade;
}

// Mostrar tarefas na tela
function exibirTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    listarTarefas().forEach(tarefa => {

        const div = document.createElement("div");

        div.className = tarefa.status
            ? "tarefa"
            : "tarefa concluida";

        div.innerHTML = `
            <p><strong>Código:</strong> ${tarefa.codigo}</p>

            <p><strong>Título:</strong> ${tarefa.titulo}</p>

            <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>

            <p class="status">
                Status: ${tarefa.status ? "Pendente" : "Concluída"}
            </p>

            <div class="acoes">
                <button class="concluir"
                    onclick="executarAcao(() => concluirTarefa(${tarefa.codigo}))">
                    Concluir
                </button>

                <button class="alterar"
                    onclick="solicitarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>
            </div>
        `;

        lista.appendChild(div);
    });
}

// Cadastrar pelo formulário
document.getElementById("formTarefa")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = document.getElementById("titulo").value;

    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    executarAcao(() => cadastrarTarefa(titulo, prioridade));

    this.reset();
});

// Executar ações e tratar erros
function executarAcao(acao) {

    try {
        acao();
        exibirTarefas();

    } catch (erro) {
        alert(erro.message);
    }
}

// Solicitar nova prioridade
function solicitarPrioridade(codigo) {

    const novaPrioridade = Number(
        prompt("Digite a nova prioridade (1, 2 ou 3):")
    );

    if (!novaPrioridade) return;

    executarAcao(() => alterarPrioridade(codigo, novaPrioridade));
}
