// Array para armazenar as tarefas
let tarefas = [];

// Função para adicionar uma nova tarefa
function adicionarTarefa(descricao) {
    if (!descricao || descricao.trim() === "") {
        console.log("Erro: A descrição da tarefa não pode estar vazia.");
        return;
    }

    const novaTarefa = {
        id: tarefas.length + 1,
        descricao: descricao,
        concluida: false
    };

    tarefas.push(novaTarefa);
    console.log(`Tarefa "${descricao}" adicionada com sucesso! (ID: ${novaTarefa.id})`);
}

// Função para listar todas as tarefas
function listarTarefas() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    console.log("\n--- LISTA DE TAREFAS ---");
    for (let tarefa of tarefas) {
        let status = tarefa.concluida ? "[CONCLUÍDA]" : "[PENDENTE]";
        console.log(`${tarefa.id}. ${tarefa.descricao} - ${status}`);
    }
    console.log------------------------\n");
}

// Função para marcar uma tarefa como concluída
function concluirTarefa(id) {
    let tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.concluida = true;
        console.log(`Tarefa "${tarefa.descricao}" marcada como concluída!`);
    } else {
        console.log("Erro: Tarefa não encontrada.");
    }
}

// Função para remover uma tarefa
function removerTarefa(id) {
    let index = tarefas.findIndex(t => t.id === id);

    if (index !== -1) {
        let tarefaRemovida = tarefas.splice(index, 1)[0];
        console.log(`Tarefa "${tarefaRemovida.descricao}" foi removida com sucesso.`);
    } else {
        console.log("Erro: Tarefa não encontrada.");
    }
}

// --- EXEMPLO DE USO ---

// 1. Adicionando tarefas
adicionarTarefa("Estudar JavaScript");
adicionarTarefa("Praticar exercícios de lógica");
adicionarTarefa("Revisar o código do projeto");

// 2. Listando as tarefas iniciais
listarTarefas();

// 3. Concluindo a primeira tarefa (ID 1)
concluirTarefa(1);

// 4. Removendo uma tarefa (ID 2)
removerTarefa(2);

// 5. Listando novamente para verificar o resultado final
listarTarefas();