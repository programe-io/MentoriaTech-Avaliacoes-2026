class GerenciadorTarefas {
    constructor() {
        this.tarefas = [];
        this.proximoCodigo = 1; // Controla o autoincremento do código
    }

    // 1. Cadastrar uma nova tarefa
    cadastrarTarefa(titulo, prioridade) {
        // Validação: O título deve ter no mínimo 5 caracteres
        if (!titulo || titulo.trim().length < 5) {
            console.error(`❌ Erro: O título "${titulo}" é inválido. Deve ter no mínimo 5 caracteres.`);
            return null;
        }

        // Validação: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa)
        if (![1, 2, 3].includes(prioridade)) {
            console.error(`❌ Erro: Prioridade ${prioridade} inválida. Escolha 1 (alta), 2 (média) ou 3 (baixa).`);
            return null;
        }

        const novaTarefa = {
            codigo: this.proximoCodigo++,
            titulo: titulo.trim(),
            prioridade: prioridade,
            concluida: false
        };

        this.tarefas.push(novaTarefa);
        console.log(`✅ Tarefa "${novaTarefa.titulo}" cadastrada com sucesso! (Código: ${novaTarefa.codigo})`);
        return novaTarefa;
    }

    // 2. Listar as tarefas cadastradas
    listarTarefas() {
        if (this.tarefas.length === 0) {
            console.log("\n📭 Nenhuma tarefa cadastrada no momento.");
            return;
        }

        console.log("\n📋 === LISTA DE TAREFAS ===");
        this.tarefas.forEach(tarefa => {
            const status = tarefa.concluida ? "✅ Concluída" : "⏳ Pendente";
            const textoPrioridade = tarefa.prioridade === 1 ? "Alta (1)" : tarefa.prioridade === 2 ? "Média (2)" : "Baixa (3)";
            console.log(`[Cód: ${tarefa.codigo}] Mapeamento: "${tarefa.titulo}" | Prioridade: ${textoPrioridade} | Status: ${status}`);
        });
        console.log("===========================\n");
    }

    // 3. Marcar uma tarefa como concluída
    marcarComoConcluida(codigo) {
        const tarefa = this.tarefas.find(t => t.codigo === codigo);

        if (!tarefa) {
            console.error(`❌ Erro: Tarefa com código ${codigo} não encontrada.`);
            return false;
        }

        tarefa.concluida = true;
        console.log(`💪 Tarefa [Cód: ${codigo}] alterada para Concluída!`);
        return true;
    }

    // 4. Alterar a prioridade de uma tarefa
    alterarPrioridade(codigo, novaPrioridade) {
        // Validação da nova prioridade
        if (![1, 2, 3].includes(novaPrioridade)) {
            console.error(`❌ Erro: A prioridade ${novaPrioridade} é inválida. Escolha entre 1 e 3.`);
            return false;
        }

        const tarefa = this.tarefas.find(t => t.codigo === codigo);

        if (!tarefa) {
            console.error(`❌ Erro: Tarefa com código ${codigo} não encontrada.`);
            return false;
        }

        tarefa.prioridade = novaPrioridade;
        console.log(`⚡ Prioridade da tarefa [Cód: ${codigo}] atualizada para ${novaPrioridade}.`);
        return true;
    }
}

// ==========================================
//           EXEMPLO DE EXECUÇÃO
// ==========================================

const sistema = new GerenciadorTarefas();

console.log("--- TESTANDO CADASTROS ---");
sistema.cadastrarTarefa("Estudar para a prova de JS", 1); // Válida
sistema.cadastrarTarefa("Fazer compras", 3);              // Válida

console.log("\n--- TESTANDO VALIDAÇÕES DE ERRO ---");
sistema.cadastrarTarefa("Ler", 2);       // Erro: menos de 5 caracteres
sistema.cadastrarTarefa("Academia", 5);  // Erro: prioridade fora do intervalo (1-3)

console.log("\n--- PRIMEIRA LISTAGEM ---");
sistema.listarTarefas();

console.log("--- MODIFICANDO TAREFAS ---");
sistema.marcarComoConcluida(1);      // Conclui a tarefa 1
sistema.alterarPrioridade(2, 1);    // Muda prioridade da tarefa 2 para Alta

console.log("\n--- LISTAGEM FINAL ATUALIZADA ---");
sistema.listarTarefas();
