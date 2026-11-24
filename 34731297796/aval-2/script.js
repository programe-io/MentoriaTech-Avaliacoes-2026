
// GERENCIADOR DE TAREFAS - JAVASCRIPT

let tarefas = [];

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {
    let tarefa = {
        codigo: tarefas.length + 1,
        titulo: titulo,
        prioridade: prioridade,
        status: "Pendente"
    };

    tarefas.push(tarefa);
    console.log("Tarefa cadastrada com sucesso!");
}

// Listar tarefas
function listarTarefas() {
    console.log("=== LISTA DE TAREFAS ===");

    tarefas.forEach(tarefa => {
        console.log(
            `Código: ${tarefa.codigo} |
            Título: ${tarefa.titulo} |
            Prioridade: ${tarefa.prioridade} |
            Status: ${tarefa.status}`
        );
    });
}

// Buscar tarefa
function buscarTarefa(codigo) {
    let tarefa = tarefas.find(
        item => item.codigo === codigo
    );

    if (tarefa) {
        console.log(tarefa);
    } else {
        console.log("Tarefa não encontrada!");
    }
}

// Concluir tarefa
function concluirTarefa(codigo) {
    let tarefa = tarefas.find(
        item => item.codigo === codigo
    );

    if (tarefa) {
        tarefa.status = "Concluída";
        console.log("Tarefa concluída!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

// Alterar tarefa
function alterarTarefa(codigo, novoTitulo, novaPrioridade) {
    let tarefa = tarefas.find(
        item => item.codigo === codigo
    );

    if (tarefa) {
        tarefa.titulo = novoTitulo;
        tarefa.prioridade = novaPrioridade;
        console.log("Tarefa alterada!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

// Excluir tarefa
function excluirTarefa(codigo) {
    let tamanhoAnterior = tarefas.length;

    tarefas = tarefas.filter(
        item => item.codigo !== codigo
    );

    if (tarefas.length < tamanhoAnterior) {
        console.log("Tarefa excluída!");
    } else {
        console.log("Tarefa não encontrada!");
    }
}

// EXEMPLOS DE USO

cadastrarTarefa("Organizar documentos", "Alta");
cadastrarTarefa("Fazer relatório", "Média");
cadastrarTarefa("Enviar trabalho", "Baixa");

listarTarefas();

concluirTarefa(1);

alterarTarefa(2, "Finalizar relatório", "Alta");

buscarTarefa(2);

excluirTarefa(3);

listarTarefas();
