class GerenciadorDeTarefas {
    constructor() {
        this.tarefas = [];
        this.proximoCodigo = 1;
    }

    cadastrar(titulo, prioridade) {
        if (!titulo || titulo.trim().length < 5) {
            console.log("Erro: O título deve ter no mínimo 5 caracteres.");
            return false;
        }

        if (prioridade < 1 || prioridade > 3) {
            console.log("Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
            return false;
        }

        const novaTarefa = {
            codigo: this.proximoCodigo++,
            titulo: titulo.trim(),
            prioridade: prioridade,
            concluida: false
        };

        this.tarefas.push(novaTarefa);
        console.log(`Tarefa "${novaTarefa.titulo}" cadastrada com sucesso! (Código: ${novaTarefa.codigo})`);
        return true;
    }

    listar() {
        if (this.tarefas.length === 0) {
            console.log("Nenhuma tarefa cadastrada.");
            return;
        }

        console.log("\n--- LISTA DE TAREFAS ---");
        this.tarefas.forEach(t => {
            const status = t.concluida ? "[X] Concluída" : "[ ] Pendente";
            console.log(`Código: ${t.codigo} | Título: ${t.titulo} | Prioridade: ${t.prioridade} | Status: ${status}`);
        });
        console.log("-------------------------\n");
    }

    marcarConcluida(codigo) {
        const tarefa = this.tarefas.find(t => t.codigo === codigo);
        if (!tarefa) {
            console.log(`Erro: Tarefa com código ${codigo} não encontrada.`);
            return false;
        }

        tarefa.concluida = true;
        console.log(`Tarefa ${codigo} marcada como concluída.`);
        return true;
    }

    alterarPrioridade(codigo, novaPrioridade) {
        if (novaPrioridade < 1 || novaPrioridade > 3) {
            console.log("Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
            return false;
        }

        const tarefa = this.tarefas.find(t => t.codigo === codigo);
        if (!tarefa) {
            console.log(`Erro: Tarefa com código ${codigo} não encontrada.`);
            return false;
        }

        tarefa.prioridade = novaPrioridade;
        console.log(`Prioridade da tarefa ${codigo} alterada para ${novaPrioridade}.`);
        return true;
    }
}

// Exemplo de uso do sistema:
const sistema = new GerenciadorDeTarefas();

// Cadastrando tarefas
sistema.cadastrar("Estudar JavaScript", 1); // Válido
sistema.cadastrar("Ler", 2); // Inválido (título curto)
sistema.cadastrar("Comprar pão", 3); // Válido

// Listando tarefas
sistema.listar();

// Marcando tarefa como concluída
sistema.marcarConcluida(1);

// Alterando prioridade
sistema.alterarPrioridade(2, 1);

// Listando novamente para conferir as alterações
sistema.listar();