class GerenciadorDeTarefas {
  constructor() {
    this.tarefas = [];
    this.proximoCodigo = 1;
  }

  cadastrarTarefa(titulo, prioridade) {
    if (typeof titulo !== 'string' || titulo.trim().length < 5) {
      console.log("Erro: O título deve ter no mínimo 5 caracteres.");
      return false;
    }

    if (!Number.isInteger(prioridade) || prioridade < 1 || prioridade > 3) {
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
    console.log(`Tarefa "${novaTarefa.titulo}" cadastrada com sucesso!`);
    return true;
  }

  listarTarefas() {
    if (this.tarefas.length === 0) {
      console.log("Nenhuma tarefa cadastrada.");
      return;
    }

    console.log("\n--- Lista de Tarefas ---");
    this.tarefas.forEach(t => {
      const status = t.concluida ? "[Concluída]" : "[Pendente]";
      console.log(`Código: ${t.codigo} | Título: ${t.titulo} | Prioridade: ${t.prioridade} | Status: ${status}`);
    });
    console.log("------------------------\n");
  }

  marcarComoConcluida(codigo) {
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
    if (!Number.isInteger(novaPrioridade) || novaPrioridade < 1 || novaPrioridade > 3) {
      console.log("Erro: A nova prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
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

// Exemplo de uso:
const gerenciador = new GerenciadorDeTarefas();

gerenciador.cadastrarTarefa("Estudar JavaScript", 1); // Sucesso
gerenciador.cadastrarTarefa("Ler", 2); // Erro (título curto)
gerenciador.cadastrarTarefa("Comprar pão", 5); // Erro (prioridade inválida)
gerenciador.cadastrarTarefa("Fazer exercícios", 3); // Sucesso

gerenciador.listarTarefas();

gerenciador.marcarComoConcluida(1);
gerenciador.alterarPrioridade(2, 1);

gerenciador.listarTarefas();