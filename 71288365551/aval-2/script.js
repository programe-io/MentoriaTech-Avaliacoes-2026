const btCadastrar = document.getElementById("btCadastrar");
const btListar = document.getElementById("btListar");
const btConcluir = document.getElementById("btConcluir");
const btAlterar = document.getElementById("btAlterar");

const titulo = document.getElementById("titulo");
const prioridade = document.getElementById("prioridade");
const codigo = document.getElementById("codigo");
const novaPrioridade = document.getElementById("novaPrioridade");

const lista = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

let tarefas = [];
let geradorCodigo = 0;

// Eventos dos botões
btCadastrar.onclick = () => executar(() => {
    cadastrarTarefa(titulo.value, Number(prioridade.value));
});

btListar.onclick = () => executar(() => {
    listarNaTela();
});

btConcluir.onclick = () => executar(() => {
    concluirTarefa(Number(codigo.value));
});

btAlterar.onclick = () => executar(() => {
    alterarPrioridade(
        Number(codigo.value),
        Number(novaPrioridade.value)
    );
});

// Executar funções e tratar erros
function executar(funcao) {
    try {
        funcao();
        mensagem.textContent = "Operação realizada com sucesso!";
    } catch (erro) {
        mensagem.textContent = erro.message;
        alert(erro.message);
    }
}

// Validar dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres!");
    }

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        throw new Error("A prioridade deve estar entre 1 e 3!");
    }
}

// Cadastrar tarefa
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

    tituloInputLimpar();

    listarNaTela();
}

// Limpar campos
function tituloInputLimpar() {
    titulo.value = "";
    prioridade.value = "";
}

// Listar tarefas
function listarTarefas() {
    return tarefas;
}

// Exibir tarefas na tela
function listarNaTela() {

    lista.innerHTML = "";

    let resultado = listarTarefas();

    if (resultado.length === 0) {
        let item = document.createElement("li");
        item.textContent = "Nenhuma tarefa cadastrada.";
        lista.appendChild(item);
        return;
    }

    resultado.forEach(tarefa => {

        let item = document.createElement("li");

        let status = tarefa.status
            ? "Em andamento"
            : "Concluída";

        item.textContent =
            "Código: " + tarefa.codigo +
            " | Título: " + tarefa.titulo +
            " | Prioridade: " + tarefa.prioridade +
            " | Status: " + status;

        lista.appendChild(item);
    });
}

// Buscar tarefa pelo código
function buscarTarefa(codigo) {

    let tarefa = tarefas.find(
        item => item.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Código da tarefa não encontrado!");
    }

    return tarefa;
}

// Concluir tarefa
function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Essa tarefa já está concluída!");
    }

    tarefa.status = false;

    listarNaTela();
}

// Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {

    let tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(
        tarefa.titulo,
        novaPrioridade
    );

    tarefa.prioridade = novaPrioridade;

    listarNaTela();

    novaPrioridadeInputLimpar();
}

// Limpar campos de gerenciamento
function novaPrioridadeInputLimpar() {
    codigo.value = "";
    novaPrioridade.value = "";
}