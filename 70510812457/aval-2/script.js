class SistemaTarefas {
  constructor() {
    this.tarefas = [];
    this.proximoCodigo = 1;
  }

  // Cadastrar uma nova tarefa
  cadastrarTarefa(titulo, prioridade) {
    if (!titulo || titulo.trim().length < 5) {
      throw new Error("O título deve ter no mínimo 5 caracteres.");
    }

    prioridade = Number(prioridade);
    if (![1, 2, 3].includes(prioridade)) {
      throw new Error("A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
    }

    const novaTarefa = {
      codigo: this.proximoCodigo++,
      titulo: titulo.trim(),
      prioridade: prioridade,
      concluida: false
    };

    this.tarefas.push(novaTarefa);
    return novaTarefa;
  }

  // Marcar uma tarefa como concluída (ou alternar status)
  concluirTarefa(codigo) {
    const tarefa = this.tarefas.find(t => t.codigo === codigo);
    if (!tarefa) {
      throw new Error("Tarefa não encontrada.");
    }
    tarefa.concluida = !tarefa.concluida;
    return tarefa;
  }

  // Alterar a prioridade de uma tarefa
  alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = this.tarefas.find(t => t.codigo === codigo);
    if (!tarefa) {
      throw new Error("Tarefa não encontrada.");
    }

    novaPrioridade = Number(novaPrioridade);
    if (![1, 2, 3].includes(novaPrioridade)) {
      throw new Error("A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
    }

    tarefa.prioridade = novaPrioridade;
    return tarefa;
  }
}

// Instância global do sistema
const sistema = new SistemaTarefas();

// Funções para interação com o HTML

function cadastrar() {
  const inputTitulo = document.getElementById("inputTitulo");
  const selectPrioridade = document.getElementById("selectPrioridade");
  const msgErro = document.getElementById("msgErro");

  msgErro.innerText = "";

  try {
    sistema.cadastrarTarefa(inputTitulo.value, selectPrioridade.value);
    inputTitulo.value = "";
    renderizar();
  } catch (erro) {
    msgErro.innerText = erro.message;
  }
}

function concluir(codigo) {
  try {
    sistema.concluirTarefa(codigo);
    renderizar();
  } catch (erro) {
    alert(erro.message);
  }
}

function alterarPrioridade(codigo) {
  const tarefa = sistema.tarefas.find(t => t.codigo === codigo);
  if (tarefa) {
    // Alterna a prioridade ciclicamente: 1 -> 2 -> 3 -> 1
    const proximaPrioridade = (tarefa.prioridade % 3) + 1;
    sistema.alterarPrioridade(codigo, proximaPrioridade);
    renderizar();
  }
}

function renderizar() {
  const lista = document.getElementById("listaTarefas");
  lista.innerHTML = "";

  if (sistema.tarefas.length === 0) {
    lista.innerHTML = "<li>Nenhuma tarefa cadastrada.</li>";
    return;
  }

  sistema.tarefas.forEach(t => {
    const li = document.createElement("li");
    const statusText = t.concluida ? "[CONCLUÍDA]" : "[PENDENTE]";

    li.innerHTML = `
      <strong>Código:</strong> ${t.codigo} |
      <strong>Título:</strong> ${t.titulo} |
      <strong>Prioridade:</strong> ${t.prioridade} |
      <strong>Status:</strong> ${statusText}
     
      <button onclick="concluir(${t.codigo})">Alternar Conclusão</button>
      <button onclick="alterarPrioridade(${t.codigo})">Mudar Prioridade</button>
    `;

    lista.appendChild(li);
  });
}

// Dados de teste iniciais para exibição
sistema.cadastrarTarefa("Estudar JavaScript", 1);
sistema.cadastrarTarefa("Fazer exercícios físicos", 2);
renderizar();