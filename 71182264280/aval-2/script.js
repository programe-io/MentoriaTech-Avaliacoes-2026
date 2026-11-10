// Sistema de Gerenciamento de Tarefas
class GerenciadorTarefas {
  constructor() {
    this.tarefas = [];
    this.proximoCodigo = 1;
  }

  // 1. Cadastrar uma nova tarefa
  cadastrarTarefa(titulo, prioridade) {
    // Validação: O título deve ter no mínimo 5 caracteres
    if (!titulo || titulo.trim().length < 5) {
      console.log("Erro: O título deve ter no mínimo 5 caracteres.");
      return null;
    }

    // Validação: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa)
    if (prioridade < 1 || prioridade > 3 || !Number.isInteger(prioridade)) {
      console.log("Erro: A prioridade deve ser um valor inteiro entre 1 (alta) e 3 (baixa).");
      return null;
    }

    const novaTarefa = {
      codigo: this.proximoCodigo++,
      titulo: titulo.trim(),
      prioridade: prioridade,
      concluida: false
    };

    this.tarefas.push(novaTarefa);
    console.log(`Tarefa "${novaTarefa.titulo}" cadastrada com sucesso! (Código: ${novaTarefa.codigo})`);
    return novaTarefa;
  }

  // 2. Listar as tarefas cadastradas
  listarTarefas() {
    if (this.tarefas.length === 0) {
      console.log("Nenhuma tarefa cadastrada no momento.");
      return;
    }

    console.log("\n--- LISTA DE TAREFAS ---");
    this.tarefas.forEach(tarefa => {
      const status = tarefa.concluida ? "[Concluída]" : "[Pendente]";
      console.log(`Cód: ${tarefa.codigo} | Título: ${tarefa.titulo} | Prioridade: ${tarefa.prioridade} | Status: ${status}`);
    });
    console.log("------------------------\n");
  }

  // 3. Marcar uma tarefa como concluída
  marcarComoConcluida(codigo) {
    const tarefa = this.tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
      console.log(`Erro: Tarefa com o código ${codigo} não encontrada.`);
      return false;
    }

    tarefa.concluida = true;
    console.log(`Tarefa de código ${codigo} marcada como concluída!`);
    return true;
  }

  // 4. Alterar a prioridade de uma tarefa
  alterarPrioridade(codigo, novaPrioridade) {
    // Validação da nova prioridade
    if (novaPrioridade < 1 || novaPrioridade > 3 || !Number.isInteger(novaPrioridade)) {
      console.log("Erro: A prioridade deve ser um valor inteiro entre 1 (alta) e 3 (baixa).");
      return false;
    }

    const tarefa = this.tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
      console.log(`Erro: Tarefa com o código ${codigo} não encontrada.`);
      return false;
    }

    tarefa.prioridade = novaPrioridade;
    console.log(`Prioridade da tarefa ${codigo} alterada para ${novaPrioridade}.`);
    return true;
  }
}

// === EXEMPLO DE USO / TESTES ===

const app = new GerenciadorTarefas();

// Testando validações de cadastro
app.cadastrarTarefa("Estudar", 1); // Erro (menos de 5 caracteres)
app.cadastrarTarefa("Criar repositório no GitHub", 5); // Erro (prioridade inválida)

// Cadastros válidos
app.cadastrarTarefa("Estudar JavaScript Avançado", 1);
app.cadastrarTarefa("Fazer compras no mercado", 3);
app.cadastrarTarefa("Revisar o código do projeto", 2);

// Listando tarefas iniciais
app.listarTarefas();

// Marcar tarefa como concluída
app.marcarComoConcluida(1);

// Alterar prioridade de uma tarefa
app.alterarPrioridade(2, 1);

// Listando tarefas após as modificações
app.listarTarefas();
