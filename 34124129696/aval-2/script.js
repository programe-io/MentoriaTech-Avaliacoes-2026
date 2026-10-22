// Array central para armazenamento das tarefas[cite: 19]
let tarefas = [];

// Gerador de código independente iniciado em zero[cite: 20]
let proximoCodigo = 1;

// ---- LÓGICA DO ALGORITMO E FUNÇÕES DE REGRAS DE NEGÓCIO ----

// 1. Função para validar dados da tarefa[cite: 19, 22]
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");[cite: 19]
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve estar entre 1 e 3.");[cite: 19, 20]
  }
}

// 2. Função para cadastrar uma nova tarefa[cite: 19, 20, 22]
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);[cite: 20]

  const novaTarefa = {
    codigo: proximoCodigo++, // Código incrementado automaticamente[cite: 20]
    titulo: titulo,
    prioridade: prioridade,
    status: true // true representa que está "em execução"[cite: 20]
  };

  tarefas.push(novaTarefa);[cite: 20]
}

// 3. Função para listar as tarefas cadastras[cite: 20, 22]
function listarTarefas() {
  return tarefas;[cite: 20]
}

// 4. Função auxiliar para buscar tarefa por código[cite: 21, 22]
function buscarTarefa(codigo) {
  const tarefaEncontrada = tarefas.find((item) => item.codigo === codigo);[cite: 21]

  if (!tarefaEncontrada) {
    throw new Error("Código não encontrado.");[cite: 21]
  }

  return tarefaEncontrada;[cite: 21]
}

// 5. Função para marcar tarefa como concluída[cite: 21, 22]
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);[cite: 21]

  if (!tarefa.status) {
    throw new Error("A tarefa já estava concluída.");[cite: 21]
  }

  tarefa.status = false; // Altera o status para concluída (falso)[cite: 21]
}

// 6. Função para alterar a prioridade de uma tarefa[cite: 21, 22]
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);[cite: 21]

  // Reutiliza a validação existente passando o próprio título já validado[cite: 21]
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);[cite: 21]

  tarefa.prioridade = novaPrioridade;[cite: 22]
}

// ---- INTERAÇÃO COM A INTERFACE GRÁFICA (DOM) ----

function renderizarTabela() {
  const tbody = document.getElementById('tabela-tarefas');
  tbody.innerHTML = '';

  const lista = listarTarefas();[cite: 20]

  lista.forEach((tarefa) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${tarefa.codigo}</td>
      <td>${tarefa.titulo}</td>
      <td>${tarefa.prioridade}</td>
      <td>
        <span class="${tarefa.status ? 'status-execucao' : 'status-concluida'}">
          ${tarefa.status ? 'Em Execução' : 'Concluída'}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function exibirMensagem(texto, tipo) {
  const msgDiv = document.getElementById('mensagem');
  msgDiv.textContent = texto;
  msgDiv.className = `mensagem ${tipo}`;

  setTimeout(() => {
    msgDiv.className = 'mensagem hidden';
  }, 3500);
}

// Evento de Cadastro
document.getElementById('form-cadastro').addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    const titulo = document.getElementById('titulo').value;
    const prioridade = parseInt(document.getElementById('prioridade').value);

    cadastrarTarefa(titulo, prioridade);
    renderizarTabela();
    exibirMensagem("Tarefa cadastrada com sucesso!", "sucesso");
    e.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
});

// Evento de Conclusão de Tarefa
document.getElementById('form-concluir').addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    const codigo = parseInt(document.getElementById('codigo-concluir').value);

    concluirTarefa(codigo);
    renderizarTabela();
    exibirMensagem("Tarefa concluída com sucesso!", "sucesso");
    e.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
});

// Evento de Alteração de Prioridade
document.getElementById('form-prioridade').addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    const codigo = parseInt(document.getElementById('codigo-prioridade').value);
    const novaPrioridade = parseInt(document.getElementById('nova-prioridade').value);

    alterarPrioridade(codigo, novaPrioridade);
    renderizarTabela();
    exibirMensagem("Prioridade alterada com sucesso!", "sucesso");
    e.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
});