class GerenciadorTarefas {
  constructor() {
    this.tarefas = [];
    this.proximoCodigo = 1;
  }

  validarTitulo(titulo) {
    if (typeof titulo !== "string" || titulo.trim().length < 5) {
      throw new Error("O título deve ter no mínimo 5 caracteres.");
    }
  }

  validarPrioridade(prioridade) {
    const numero = Number(prioridade);
    if (!Number.isInteger(numero) || numero < 1 || numero > 3) {
      throw new Error("A prioridade deve ser um valor inteiro entre 1 (alta) e 3 (baixa).");
    }
  }

  cadastrarTarefa(titulo, prioridade, diaSemana = "Segunda-feira") {
    this.validarTitulo(titulo);
    this.validarPrioridade(prioridade);

    const novaTarefa = {
      codigo: this.proximoCodigo++,
      titulo: titulo.trim(),
      prioridade: Number(prioridade), // 1 = Alta, 2 = Média, 3 = Baixa
      concluida: false,
      diaSemana
    };

    this.tarefas.push(novaTarefa);
    return novaTarefa;
  }

  listarTarefas(filtroDia = "Todos") {
    if (filtroDia === "Todos") {
      return [...this.tarefas];
    }
    return this.tarefas.filter((t) => t.diaSemana === filtroDia);
  }

  marcarComoConcluida(codigo) {
    const tarefa = this.tarefas.find((t) => t.codigo === Number(codigo));
    if (!tarefa) {
      throw new Error(`Tarefa com código #${codigo} não encontrada.`);
    }
    tarefa.concluida = true;
    return tarefa;
  }

  alterarPrioridade(codigo, novaPrioridade) {
    this.validarPrioridade(novaPrioridade);
    const tarefa = this.tarefas.find((t) => t.codigo === Number(codigo));
    if (!tarefa) {
      throw new Error(`Tarefa com código #${codigo} não encontrada.`);
    }
    tarefa.prioridade = Number(novaPrioridade);
    return tarefa;
  }
}