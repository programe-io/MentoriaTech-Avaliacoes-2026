// ==========================================
// 3. Armazenamento das tarefas com arrays
// ==========================================
const listaDeTarefas = [];

// Contador para o item 7 (Geração automática de códigos)
let proximoId = 1;

// ==========================================
// 5. Validação dos dados da tarefa
// ==========================================
function validarDadosTarefa(titulo, prioridade) {
    if (!titulo || titulo.trim() === "") {
        console.error("Erro: O título da tarefa não pode estar vazio.");
        return false;
    }
    const prioridadesValidas = ["baixa", "média", "alta"];
    if (!prioridadesValidas.includes(prioridade.toLowerCase())) {
        console.error("Erro: Prioridade inválida. Use baixa, média ou alta.");
        return false;
    }
    return true;
}

// ==========================================
// 6. Cadastro e modelagem de uma tarefa
// 7. Geração automática de códigos
// ==========================================
function cadastrarTarefa(titulo, prioridade) {
    // Validação antes do cadastro
    if (!validarDadosTarefa(titulo, prioridade)) return;

    // Modelagem do objeto da tarefa
    const novaTarefa = {
        id: proximoId++, // Geração automática do código (ID)
        titulo: titulo.trim(),
        prioridade: prioridade.toLowerCase(),
        concluida: false
    };

    listaDeTarefas.push(novaTarefa);
    console.log(`Tarefa "${titulo}" cadastrada com sucesso! (ID: ${novaTarefa.id})`);
}

// ==========================================
// 8. Listagem das tarefas cadastradas
// ==========================================
function listarTarefas() {
    if (listaDeTarefas.length === 0) {
        console.log("\nNenhuma tarefa cadastrada no momento.");
        return;
    }

    console.log("\n=== LISTA DE TAREFAS ===");
    listaDeTarefas.forEach(tarefa => {
        const status = tarefa.concluida ? "[X] Concluída" : "[ ] Pendente";
        console.log(`ID: ${tarefa.id} | ${status} | Título: ${tarefa.titulo} | Prioridade: ${tarefa.prioridade}`);
    });
    console.log("========================\n");
}

// ==========================================
// 9. Busca de tarefas com find
// ==========================================
function buscarTarefaPorId(id) {
    const tarefaEncontrada = listaDeTarefas.find(tarefa => tarefa.id === id);
    if (!tarefaEncontrada) {
        console.error(`Erro: Tarefa com ID ${id} não foi encontrada.`);
    }
    return tarefaEncontrada;
}

// ==========================================
// 10. Conclusão de uma tarefa
// ==========================================
function concluirTarefa(id) {
    const tarefa = buscarTarefaPorId(id);
    if (tarefa) {
        tarefa.concluida = true;
        console.log(`Sucesso: Tarefa ID ${id} marcada como concluída!`);
    }
}

// ==========================================
// 11. Alteração da prioridade
// ==========================================
function alterarPrioridade(id, novaPrioridade) {
    const tarefa = buscarTarefaPorId(id);
    if (!tarefa) return;

    // Reaproveita a validação apenas para a prioridade
    if (!validarDadosTarefa(tarefa.titulo, novaPrioridade)) return;

    tarefa.prioridade = novaPrioridade.toLowerCase();
    console.log(`Sucesso: Prioridade da tarefa ID ${id} alterada para "${novaPrioridade}".`);
}

// ==========================================
// 12. Execução e Demonstração do Fluxo
// ==========================================

// 1. Cadastrando tarefas
cadastrarTarefa("Estudar JavaScript", "alta");
cadastrarTarefa("Comprar café", "baixa");
cadastrarTarefa("Academia", "média");

// Tentativa de cadastro inválido (para testar a validação do item 5)
cadastrarTarefa("", "alta"); 

// 2. Listando o estado inicial das tarefas
listarTarefas();

// 3. Concluindo uma tarefa (item 10)
concluirTarefa(1);

// 4. Alterando prioridade de outra tarefa (item 11)
alterarPrioridade(2, "alta");

// 5. Listando novamente para ver as alterações aplicadas
listarTarefas();
