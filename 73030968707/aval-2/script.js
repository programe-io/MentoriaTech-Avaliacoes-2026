// 3. Armazenamento das tarefas com arrays
const listaDeTarefas = [];

// 6. Cadastro e modelagem de uma tarefa (Função Construtora / Fábrica)
function criarTarefa(titulo, prioridade = 'baixa') {
    return {
        id: geradorIdAutomatico(), // 7. Geração automática de códigos
        titulo: titulo,
        prioridade: prioridade,   // 'baixa', 'média', 'alta'
        concluida: false
    };
}

// 7. Geração automática de códigos (IDs únicos simples)
function geradorIdAutomatico() {
    return Math.floor(Math.random() * 10000);
}

// 5. Validação dos dados da tarefa
function validarTarefa(titulo) {
    if (!titulo || titulo.trim() === "") {
        console.error("Erro de validação: O título da tarefa não pode estar vazio.");
        return false;
    }
    return true;
}

// 4 e 12. Organização e responsabilidade das funções (Fluxo Principal)
function cadastrarTarefa(titulo, prioridade) {
    if (!validarTarefa(titulo)) return;

    const novaTarefa = criarTarefa(titulo, prioridade);
    listaDeTarefas.push(novaTarefa);
    console.log(`Tarefa "${titulo}" cadastrada com sucesso! (ID: ${novaTarefa.id})`);
}

// 8. Listagem das tarefas cadastradas
function listarTarefas() {
    if (listaDeTarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada no momento.");
        return;
    }
    
    console.log("\n--- LISTA DE TAREFAS ---");
    listaDeTarefas.forEach(tarefa => {
        const status = tarefa.concluida ? "[✅ Concluída]" : "[⏳ Pendente]";
        console.log(`${tarefa.id} - ${tarefa.titulo} | Prioridade: ${tarefa.prioridade} ${status}`);
    });
}

// 9. Busca de tarefas com find
function buscarTarefaPorId(id) {
    const tarefaEncontrada = listaDeTarefas.find(tarefa => tarefa.id === id);
    if (!tarefaEncontrada) {
        console.log(`Tarefa com ID ${id} não foi encontrada.`);
    }
    return tarefaEncontrada;
}

// 10. Conclusão de uma tarefa
function concluirTarefa(id) {
    const tarefa = buscarTarefaPorId(id);
    if (tarefa) {
        tarefa.concluida = true;
        console.log(`Tarefa "${tarefa.titulo}" marcada como concluída!`);
    }
}

// 11. Alteração da prioridade
function alterarPrioridadeTarefa(id, novaPrioridade) {
    const tarefa = buscarTarefaPorId(id);
    if (tarefa) {
        tarefa.prioridade = novaPrioridade;
        console.log(`Prioridade da tarefa "${tarefa.titulo}" alterada para: ${novaPrioridade}`);
    }
}

// --- SIMULAÇÃO DE USO DO SISTEMA ---
console.log("Iniciando o sistema de tarefas...");

// Cadastrando tarefas
cadastrarTarefa("Estudar Arrays em JavaScript", "alta");
cadastrarTarefa("Criar a estrutura do HTML/CSS", "média");
cadastrarTarefa("Enviar o projeto no GitHub", "baixa");

// Listando após o cadastro
listarTarefas();

// Armazenando o ID da primeira tarefa para testes dinâmicos
const idTeste = listaDeTarefas[0].id;

// Concluindo e alterando a prioridade de uma tarefa
concluirTarefa(idTeste);
alterarPrioridadeTarefa(idTeste, "baixa");

// Listando novamente para ver as alterações aplicadas
listarTarefas();
