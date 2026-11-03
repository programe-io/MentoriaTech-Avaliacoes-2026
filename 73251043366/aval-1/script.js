class GerenciadorDeTarefas {
  constructor() {
    this.tarefas = [];
    this.proximoCodigo = 1;
  }

  // 1. Cadastrar uma nova tarefa
  cadastrarTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
      console.log("Erro: O título deve ter no mínimo 5 caracteres.");
      return;
    }

    if (prioridade < 1 || prioridade > 3) {
      console.log("Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
      return;
    }

    const novaTarefa = {
      codigo: this.proximoCodigo++,
      titulo: titulo,
      prioridade: prioridade,
      concluida: false
    };

    this.tarefas.push(novaTarefa);
    console.log(`Tarefa '${titulo}' cadastrada com sucesso!`);
  }

  // 2. Listar as tarefas cadastradas
  listarTarefas() {
    if (this.tarefas.length === 0) {
      console.log("Nenhuma tarefa cadastrada.");
      return;
    }

    console.log("--- Lista de Tarefas ---");
    this.tarefas.forEach(t => {
      const status = t.concluida ? "[Concluída]" : "[Pendente]";
      console.log(`ID: ${t.codigo} | Título: ${t.titulo} | Prioridade: ${t.prioridade} | Status: ${status}`);
    });
  }

  // 3. Marcar uma tarefa como concluída
  marcarComoConcluida(codigo) {
    const tarefa = this.tarefas.find(t => t.codigo === codigo);
    if (!tarefa) {
      console.log("Erro: Tarefa não encontrada.");
      return;
    }

    tarefa.concluida = true;
    console.log(`Tarefa ID ${codigo} marcada como concluída.`);
  }

  // 4. Alterar a prioridade de uma tarefa
  alterarPrioridade(codigo, novaPrioridade) {
    if (novaPrioridade < 1 || novaPrioridade > 3) {
      console.log("Erro: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
      return;
    }

    const tarefa = this.tarefas.find(t => t.codigo === codigo);
    if (!tarefa) {
      console.log("Erro: Tarefa não encontrada.");
      return;
    }

    tarefa.prioridade = novaPrioridade;
    console.log(`Prioridade da tarefa ID ${codigo} alterada para ${novaPrioridade}.`);
  }
}

// Exemplo de teste:
const sistema = new GerenciadorDeTarefas();

sistema.cadastrarTarefa("Estudar JS", 1); // Sucesso
sistema.cadastrarTarefa("Ler", 2);       // Falha: menos de 5 caracteres
sistema.cadastrarTarefa("Fazer compras no mercado", 2); // Sucesso

sistema.listarTarefas();

sistema.marcarComoConcluida(1);
sistema.alterarPrioridade(2, 3);

sistema.listarTarefas();