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

    const prioNum = parseInt(prioridade);
    if (![1, 2, 3].includes(prioNum)) {
      throw new Error("A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
    }

    const novaTarefa = {
      codigo: this.proximoCodigo++,
      titulo: titulo.trim(),
      prioridade: prioNum,
      concluida: false
    };

    this.tarefas.push(novaTarefa);
    return novaTarefa;
  }

  // Marcar uma tarefa como concluída
  marcarComoConcluida(codigo) {
    const tarefa = this.tarefas.find(t => t.codigo === codigo);
    if (tarefa) {
      tarefa.concluida = true;
      return true;
    }
    return false;
  }

  // Alterar a prioridade de uma tarefa
  alterarPrioridade(codigo, novaPrioridade) {
    const prioNum = parseInt(novaPrioridade);
    if (![1, 2, 3].includes(prioNum)) return false;

    const tarefa = this.tarefas.find(t => t.codigo === codigo);
    if (tarefa) {
      tarefa.prioridade = prioNum;
      return true;
    }
    return false;
  }
}

// --- INSTÂNCIA DO SISTEMA E INTERAÇÃO COM O DOM ---
const sistema = new SistemaTarefas();

const form = document.getElementById('form-tarefa');
const inputTitulo = document.getElementById('titulo');
const selectPrioridade = document.getElementById('prioridade');
const tabelaTarefas = document.getElementById('lista-tarefas');
const mensagemErro = document.getElementById('mensagem-erro');

// Função para atualizar a tabela no ecrã
function atualizarInterface() {
  tabelaTarefas.innerHTML = '';

  if (sistema.tarefas.length === 0) {
    tabelaTarefas.innerHTML = `<tr><td colspan="5" style="text-align:center;">Nenhuma tarefa cadastrada.</td></tr>`;
    return;
  }

  sistema.tarefas.forEach(tarefa => {
    const tr = document.createElement('tr');
    
    // Identificar texto e classe da prioridade
    const prioTexto = tarefa.prioridade === 1 ? "1 - Alta" : tarefa.prioridade === 2 ? "2 - Média" : "3 - Baixa";
    const classePrio = `prio-${tarefa.prioridade}`;
    
    // Identificar status
    const statusTexto = tarefa.concluida ? "Concluída" : "Pendente";
    const classeStatus = tarefa.concluida ? "status-concluida" : "status-pendente";

    tr.innerHTML = `
      <td>${tarefa.codigo}</td>
      <td class="${classeStatus}">${tarefa.titulo}</td>
      <td class="${classePrio}">${prioTexto}</td>
      <td class="${classeStatus}">${statusTexto}</td>
      <td>
        ${!tarefa.concluida ? `<button class="btn-acao btn-concluir" onclick="concluirTarefa(\${tarefa.codigo})">Concluir</button>` : ''}
        <select class="mudar-prio-inline" onchange="mudarPrioridade(${tarefa.codigo}, this.value)">
          <option value="" disabled selected>Alterar Prio.</option>
          <option value="1">1 - Alta</option>
          <option value="2">2 - Média</option>
          <option value="3">3 - Baixa</option>
        </select>
      </td>
    `;
    
    tabelaTarefas.appendChild(tr);
  });
}

// Evento de submissão do formulário
form.addEventListener('submit', function(event) {
  event.preventDefault();
  mensagemErro.textContent = ''; // Limpa mensagens anteriores

  try {
    sistema.cadastrarTarefa(inputTitulo.value, selectPrioridade.value);
    inputTitulo.value = ''; // Limpa o campo de texto
    selectPrioridade.value = '1'; // Reseta o select
    atualizarInterface();
  } catch (error) {
    mensagemErro.textContent = error.message;
  }
});

// Funções globais para os botões de ação da tabela
window.concluirTarefa = function(codigo) {
  sistema.marcarComoConcluida(codigo);
  atualizarInterface();
};

window.mudarPrioridade = function(codigo, novaPrioridade) {
  sistema.alterarPrioridade(codigo, novaPrioridade);
  atualizarInterface();
};

// Renderização inicial
atualizarInterface();
