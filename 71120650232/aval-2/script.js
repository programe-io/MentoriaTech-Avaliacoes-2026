class GerenciadorDeTarefas {
  constructor() {
    this.tarefas = [];
    this.proximoCodigo = 1;
  }

  // 1. Cadastrar uma nova tarefa
  cadastrarTarefa(titulo, prioridade) {
    // Validação do título (mínimo de 5 caracteres)
    if (!titulo || titulo.trim().length < 5) {
      return { sucesso: false, mensagem: "Erro: O título deve ter no mínimo 5 caracteres." };
    }

    // Validação da prioridade (entre 1 e 3)
    if (prioridade < 1 || prioridade > 3) {
      return { sucesso: false, mensagem: "Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa)." };
    }

    const novaTarefa = {
      codigo: this.proximoCodigo++,
      titulo: titulo.trim(),
      prioridade: Number(prioridade),
      concluida: false
    };

    this.tarefas.push(novaTarefa);
    return { sucesso: true, mensagem: "Tarefa cadastrada com sucesso!", tarefa: novaTarefa };
  }

  // 2. Listar as tarefas cadastradas
  listarTarefas() {
    if (this.tarefas.length === 0) {
      console.log("Nenhuma tarefa cadastrada no sistema.");
      return;
    }

    console.log("\n=================== LISTA DE TAREFAS ===================");
    this.tarefas.forEach(t => {
      const status = t.concluida ? "Concluída [X]" : "Pendente [ ]";
      const descPrioridade = { 1: "Alta", 2: "Média", 3: "Baixa" }[t.prioridade];
      
      console.log(`[Cód: ${t.codigo}] ${t.titulo}`);
      console.log(` ↳ Prioridade: ${descPrioridade} (${t.prioridade}) | Status: ${status}`);
      console.log("--------------------------------------------------------");
    });
  }

  // 3. Marcar uma tarefa como concluída
  concluirTarefa(codigo) {
    const tarefa = this.tarefas.find(t => t.codigo === codigo);
    
    if (!tarefa) {
      return { sucesso: false, mensagem: `Erro: Tarefa com código ${codigo} não encontrada.` };
    }

    if (tarefa.concluida) {
      return { sucesso: false, mensagem: "Aviso: Esta tarefa já está concluída." };
    }

    tarefa.concluida = true;
    return { sucesso: true, mensagem: `Tarefa ${codigo} marcada como concluída com sucesso!` };
  }

  // 4. Alterar a prioridade de uma tarefa
  alterarPrioridade(codigo, novaPrioridade) {
    // Validação da nova prioridade
    if (novaPrioridade < 1 || novaPrioridade > 3) {
      return { sucesso: false, mensagem: "Erro: A nova prioridade deve ser um valor entre 1 (alta) e 3 (baixa)." };
    }

    const tarefa = this.tarefas.find(t => t.codigo === codigo);
    
    if (!tarefa) {
      return { sucesso: false, mensagem: `Erro: Tarefa com código ${codigo} não encontrada.` };
    }

    tarefa.prioridade = Number(novaPrioridade);
    return { sucesso: true, mensagem: `Prioridade da tarefa ${codigo} alterada para ${novaPrioridade}.` };
  }
}