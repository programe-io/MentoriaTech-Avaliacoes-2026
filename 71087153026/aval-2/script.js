class GerenciadorTarefas {
    constructor() {
        this.tarefas = [];
        this.proximoCodigo = 1;
    }

    cadastrarTarefa(titulo, prioridade) {
        if (!titulo || titulo.trim().length < 5) {
            console.error("❌ Erro: O título deve ter no mínimo 5 caracteres.");
            return null;
        }

        if (![1, 2, 3].includes(prioridade)) {
            console.error("❌ Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
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

    listarTarefas() {
        if (this.tarefas.length === 0) {
            console.log("\n📭 Nenhuma tarefa cadastrada no momento.");
            return;
        }

        console.log("\n📋 --- LISTA DE TAREFAS ---");
        this.tarefas.forEach(tarefa => {
            const status = tarefa.concluida ? "🟢 Concluída" : "⏳ Pendente";
            const prioridadeTexto = tarefa.prioridade === 1 ? "Alta (1)" : tarefa.prioridade === 2 ? "Média (2)" : "Baixa (3)";
            console.log(`[Cód: ${tarefa.codigo}] ${tarefa.titulo} | Prioridade: ${prioridadeTexto} | Status: ${status}`);
        });
        console.log("---------------------------\n");
    }

    concluirTarefa(codigo) {
        const tarefa = this.tarefas.find(t => t.codigo === codigo);

        if (!tarefa) {
            console.error(`❌ Erro: Tarefa com o código ${codigo} não foi encontrada.`);
            return false;
        }

        tarefa.concluida = true;
        console.log(`✅ Tarefa [Cód: ${codigo}] marcada como concluída!`);
        return true;
    }

    alterarPrioridade(codigo, novaPrioridade) {
        if (![1, 2, 3].includes(novaPrioridade)) {
            console.error("❌ Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
            return false;
        }

        const tarefa = this.tarefas.find(t => t.codigo === codigo);

        if (!tarefa) {
            console.error(`❌ Erro: Tarefa com o código ${codigo} não foi encontrada.`);
            return false;
        }

        tarefa.prioridade = novaPrioridade;
        console.log(`🔄 Prioridade da tarefa [Cód: ${codigo}] alterada para ${novaPrioridade}.`);
        return true;
    }
}

const sistema = new GerenciadorTarefas();

sistema.cadastrarTarefa("Estudar mentoria tech", 1);
sistema.cadastrarTarefa("Ler", 2);
sistema.cadastrarTarefa("Fazer compras", 5);
sistema.cadastrarTarefa("Informática", 3);

sistema.listarTarefas();

sistema.concluirTarefa(1);
sistema.alterarPrioridade(2, 1);
sistema.concluirTarefa(99);

sistema.listarTarefas();
