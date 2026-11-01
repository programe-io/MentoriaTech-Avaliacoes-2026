
/* Array que vai guardar todas as tarefas */
let tarefas = [];

/* Função para validar os dados */
function validarDadosTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error('O título deve ter no mínimo 5 caracteres');
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
    }
}

/* Cadastrar uma nova tarefa */
function cadastrarTarefa(titulo, prioridade) {

    validarDadosTarefa(titulo, prioridade);

    let novaTarefa = {
        codigo: tarefas.length + 1,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);
}

/* Listar todas as tarefas */
function listarTarefas() {
    console.log(tarefas);
}

/* Marcar uma tarefa como concluída */
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;
    } else {
        throw new Error('Tarefa não encontrada');
    }
}

/* Alterar a prioridade de uma tarefa */
function alterarPrioridade(codigo, novaPrioridade) {

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        throw new Error('Informe uma prioridade entre 1 e 3');
    }

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.prioridade = novaPrioridade;
    } else {
        throw new Error('Tarefa não encontrada');
    }
}

// --------------------------------
// Testes do Algoritmo

cadastrarTarefa('Estudar JavaScript', 1);
cadastrarTarefa('Fazer exercícios', 2);
cadastrarTarefa('Organizar quarto', 3);

listarTarefas();

concluirTarefa(1);

alterarPrioridade(2, 1);

listarTarefas();
