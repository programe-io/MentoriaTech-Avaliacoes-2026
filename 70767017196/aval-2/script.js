/* Array que vai guardar o conjunto de todas as tarefas */
let tarefas = [];[cite: 1]

function validarDadosTarefa(titulo, prioridade){[cite: 1]
    if(titulo.length < 5){[cite: 1]
        throw new Error('O título deve ter no mínimo 5 caracteres');[cite: 1]
    }
    if(prioridade < 1 || prioridade > 3){[cite: 1]
        throw new Error('Informe uma prioridade entre 1 e 3');[cite: 1]
    }
}

function cadastrarTarefa(titulo, prioridade){[cite: 1]
    validarDadosTarefa(titulo, prioridade);[cite: 1]

    let tarefa = {
        id: tarefas.length + 1,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    console.log(`Tarefa "${titulo}" cadastrada com sucesso!`);
}

// Função para listar todas as tarefas
function listarTarefas(){
    if(tarefas.length === 0){
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    console.log("\n--- LISTA DE TAREFAS ---");
    tarefas.forEach(t => {
        let status = t.concluida ? "[X]" : "[ ]";
        console.log(`${t.id}. ${status} ${t.titulo} (Prioridade: ${t.prioridade})`);
    });
}

// Função para marcar uma tarefa como concluída pelo ID
function concluirTarefa(id){
    let tarefa = tarefas.find(t => t.id === id);
    
    if(!tarefa){
        throw new Error(`Tarefa com ID ${id} não encontrada.`);
    }

    tarefa.concluida = true;
    console.log(`Tarefa "${tarefa.titulo}" marcada como concluída!`);
}

// Função para remover uma tarefa pelo ID
function removerTarefa(id){
    let index = tarefas.findIndex(t => t.id === id);

    if(index === -1){
        throw new Error(`Tarefa com ID ${id} não encontrada.`);
    }

    let removida = tarefas.splice(index, 1);
    console.log(`Tarefa "${removida[0].titulo}" removida com sucesso!`);
}

/* Testes do Algoritmo */[cite: 1]
try {
    cadastrarTarefa('Cadastrar', 3);[cite: 1]
    cadastrarTarefa('Estudar JavaScript', 1);
    cadastrarTarefa('Fazer exercícios', 2);

    listarTarefas();

    concluirTarefa(1);
    listarTarefas();

    removerTarefa(2);
    listarTarefas();

    // Teste de validação (vai gerar erro de título curto)
    // cadastrarTarefa('Ler', 2);
} catch (error) {
    console.error(`Erro: ${error.message}`);
}