// Banco de dados do sistema (uma lista simples)
let tarefas = [];
let proximoCodigo = 1;

// 1. Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {
    // Regra de validação: mínimo 5 caracteres
    if (titulo.length < 5) {
        console.log("Erro: O título deve ter no mínimo 5 caracteres.");
        return;
    }
    // Regra de validação: prioridade entre 1 e 3
    if (prioridade < 1 || prioridade > 3) {
        console.log("Erro: A prioridade deve ser entre 1 (alta) e 3 (baixa).");
        return;
    }

    // Cria o objeto da tarefa
    let novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);
    proximoCodigo++; // Aumenta o código para a próxima tarefa
    console.log("Tarefa cadastrada com sucesso!");
}

// 2. Listar as tarefas cadastradas
function listarTarefas() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    for (let i = 0; i < tarefas.length; i++) {
        let t = tarefas[i];
        let status = t.concluida ? "Concluída" : "Pendente";
        console.log(`Cód: ${t.codigo} | Título: ${t.titulo} | Prioridade: ${t.prioridade} | Status: ${status}`);
    }
}

// 3. Marcar uma tarefa como concluída
function marcarComoConcluida(codigo) {
    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].codigo === codigo) {
            tarefas[i].concluida = true;
            console.log("Tarefa marcada como concluída!");
            return;
        }
    }
    console.log("Tarefa não encontrada.");
}

// 4. Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {
    if (novaPrioridade < 1 || novaPrioridade > 3) {
        console.log("Erro: Prioridade inválida.");
        return;
    }

    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].codigo === codigo) {
            tarefas[i].prioridade = novaPrioridade;
            console.log("Prioridade alterada com sucesso!");
            return;
        }
    }
    console.log("Tarefa não encontrada.");
}

// === TESTANDO O CÓDIGO ===
cadastrarTarefa("Estudar", 1);        // Funciona
cadastrarTarefa("Ler", 2);            // Erro (menos de 5 letras)
cadastrarTarefa("Fazer bolo", 3);     // Funciona

console.log("\n--- Lista Inicial ---");
listarTarefas();

console.log("\n--- Atualizando Tarefas ---");
marcarComoConcluida(1); 
alterarPrioridade(3, 1);

console.log("\n--- Lista Final ---");
listarTarefas();
