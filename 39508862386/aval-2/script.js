// Definição da classe que representará cada Tarefa
class Tarefa {
    constructor(codigo, titulo, prioridade) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.prioridade = prioridade; // 1 (alta), 2 (média), 3 (baixa)
        this.concluida = false; // Status de conclusão inicializado como falso
    }
}

// Sistema de Gerenciamento de Tarefas
class GerenciadorTarefas {
    constructor() {
        this.tarefas = [];
        this.proximoCodigo = 1; // Contador para gerar códigos automáticos e únicos
    }

    // 1. Cadastrar uma nova tarefa
    cadastrarTarefa(titulo, prioridade) {
        // Regra de validação: O título deve ter no mínimo 5 caracteres
        if (!titulo || titulo.trim().length < 5) {
            console.log("❌ Erro: O título deve ter no mínimo 5 caracteres.");
            return null;
        }

        // Regra de validação: A prioridade deve ser um valor entre 1 e 3
        if (prioridade < 1 || prioridade > 3 || !Number.isInteger(prioridade)) {
            console.log("❌ Erro: A prioridade deve ser um valor inteiro entre 1 (alta) e 3 (baixa).");
            return null;
        }

        const novaTarefa = new Tarefa(this.proximoCodigo++, titulo, prioridade);
        this.tarefas.push(novaTarefa);
        console.log(`✅ Tarefa "${titulo}" cadastrada com sucesso! (Código: ${novaTarefa.codigo})`);
        return novaTarefa;
    }

    // 2. Listar as tarefas cadastradas
    listarTarefas() {
        if (this.tarefas.length === 0) {
            console.log("\n📭 Nenhuma tarefa cadastrada no momento.");
            return;
        }

        console.log("\n=== LISTA DE TAREFAS ===");
        this.tarefas.forEach(tarefa => {
            const status = tarefa.concluida ? "✅ Concluída" : "⏳ Pendente";
            const textoPrioridade = tarefa.prioridade === 1 ? "Alta" : tarefa.prioridade === 2 ? "Média" : "Baixa";
            console.log(`[Cód: ${tarefa.codigo}] ${tarefa.titulo} | Prioridade: ${textoPrioridade} | Status: ${status}`);
        });
        console.log("========================\n");
    }

    // 3. Marcar uma tarefa como concluída
    marcarComoConcluida(codigo) {
        const tarefa = this.tarefas.find(t => t.codigo === codigo);

        if (!tarefa) {
            console.log(`❌ Erro: Tarefa com o código ${codigo} não encontrada.`);
            return false;
        }

        tarefa.concluida = true;
        console.log(`🎉 Tarefa [Cód: ${codigo}] marcada como concluída!`);
        return true;
    }

    // 4. Alterar a prioridade de uma tarefa
    alterarPrioridade(codigo, novaPrioridade) {
        const tarefa = this.tarefas.find(t => t.codigo === codigo);

        if (!tarefa) {
            console.log(`❌ Erro: Tarefa com o código ${codigo} não encontrada.`);
            return false;
        }

        // Regra de validação: A prioridade deve ser um valor entre 1 e 3
        if (novaPrioridade < 1 || novaPrioridade > 3 || !Number.isInteger(novaPrioridade)) {
            console.log("❌ Erro: A prioridade deve ser um valor inteiro entre 1 (alta) e 3 (baixa).");
            return false;
        }

        tarefa.prioridade = novaPrioridade;
        console.log(`🔄 Prioridade da tarefa [Cód: ${codigo}] alterada com sucesso.`);
        return true;
    }
}

// --- EXEMPLO DE USO DO SISTEMA ---

const sistema = new GerenciadorTarefas();

// Testando cadastros válidos
sistema.cadastrarTarefa("Estudar JavaScript Assíncrono", 1);
sistema.cadastrarTarefa("Academia às 19h", 2);
sistema.cadastrarTarefa("Comprar pó de café", 3);

// Testando regras de validação (Erros esperados)
sistema.cadastrarTarefa("Ler", 1); // Título curto demais
sistema.cadastrarTarefa("Finalizar relatório", 5); // Prioridade inválida

// Listando tarefas iniciais
sistema.listarTarefas();

// Marcar tarefa como concluída
sistema.marcarComoConcluida(1);

// Alterar prioridade de uma tarefa
sistema.alterarPrioridade(3, 1);

// Listando novamente para ver as alterações aplicadas
sistema.listarTarefas();
