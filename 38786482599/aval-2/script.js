// Array central para armazenamento das tarefas[cite: 19]
let tarefas = [];

// Gerador automático de códigos independente de remoções[cite: 20]
let proximoCodigo = 1;

// ================================================
// FUNÇÕES LÓGICAS (Propostas na Aula)[cite: 19]
// ================================================

// 1. Validar Dados da Tarefa[cite: 19]
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título da tarefa deve ter, no mínimo, cinco caracteres.");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve estar entre 1 e 3.");
  }
}

// 2. Buscar Tarefa pelo Código com find[cite: 21]
function buscarTarefa(codigo) {
  const tarefa = tarefas.find((item) => item.codigo === codigo);
  if (!tarefa) {
    throw new Error("Código de tarefa não encontrado.");
  }
  return tarefa;
}

// 3. Cadastrar Tarefa[cite: 20]
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  // Status inicial: true = em execução / não concluída[cite: 19, 20]
  const novaTarefa = {
    codigo: proximoCodigo++,
    titulo: titulo,
    prioridade: prioridade,
    status: true
  };

  tarefas.push(novaTarefa);
}

// 4. Listar Tarefas[cite: 20]
function listarTarefas() {
  return tarefas;
}

// 5. Concluir Tarefa[cite: 21]
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  // Impede conclusão duplicada[cite: 21]
  if (tarefa.status === false) {
    throw new Error("Esta tarefa já estava concluída.");
  }

  tarefa.status = false; // Define status como concluído[cite: 21]
}

// 6. Alterar Prioridade da Tarefa[cite: 21, 22]
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  
  // Reutiliza a validação usando o título atual da tarefa[cite: 21]
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
}

// ================================================
// INTERAÇÃO COM A INTERFACE GRÁFICA (DOM)
// ================================================

const formCadastro = document.getElementById('form-cadastro');
const formPrioridade = document.getElementById('form-prioridade');
const tabelaTarefas = document.getElementById('tabela-tarefas');
const divMensagem = document.getElementById('mensagem');

// Exibe alertas de erro ou sucesso
function exibirMensagem(texto, tipo) {
  divMensagem.textContent = texto;
  divMensagem.className = `mensagem ${tipo}`;
  
  setTimeout(() => {
    divMensagem.className = "mensagem hidden";
  }, 4000);
}

// Atualiza a tabela na interface do usuário[cite: 20, 22]
function renderizarTabela() {
  const lista = listarTarefas();
  tabelaTarefas.innerHTML = '';

  if (lista.length === 0) {
    tabelaTarefas.innerHTML = `
      <tr>
        <td colspan="5" class="text-center">Nenhuma tarefa cadastrada.</td>
      </tr>
    `;
    return;
  }

  lista.forEach((tarefa) => {
    const tr = document.createElement('tr');
    
    // Mapeamento visual das prioridades
    const textoPrioridade = {
      1: "1 - Alta",
      2: "2 - Média",
      3: "3 - Baixa"
    }[tarefa.prioridade];

    tr.innerHTML = `
      <td><strong>#${tarefa.codigo}</strong></td>
      <td class="${tarefa.status ? '' : 'status-concluida'}">${tarefa.titulo}</td>
      <td>${textoPrioridade}</td>
      <td>
        <span class="${tarefa.status ? 'status-em-execucao' : 'status-concluida'}">
          ${tarefa.status ? 'Em Execução' : 'Concluída'}
        </span>
      </td>
      <td>
        ${tarefa.status ? `
          <button class="btn btn-action" onclick="acaoConcluir(${tarefa.codigo})">
            Concluir
          </button>
        ` : '—'}
      </td>
    `;
    tabelaTarefas.appendChild(tr);
  });
}

// Evento: Cadastrar Tarefa
formCadastro.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const titulo = document.getElementById('titulo').value;
  const prioridade = parseInt(document.getElementById('prioridade').value);

  try {
    cadastrarTarefa(titulo, prioridade);
    renderizarTabela();
    exibirMensagem("Tarefa cadastrada com sucesso!", "sucesso");
    formCadastro.reset();
  } catch (error) {
    exibirMensagem(error.message, "erro");
  }
});

// Evento: Alterar Prioridade
formPrioridade.addEventListener('submit', (e) => {
  e.preventDefault();

  const codigo = parseInt(document.getElementById('codigo-prio').value);
  const novaPrioridade = parseInt(document.getElementById('nova-prioridade').value);

  try {
    alterarPrioridade(codigo, novaPrioridade);
    renderizarTabela();
    exibirMensagem(`Prioridade da tarefa #${codigo} alterada com sucesso!`, "sucesso");
    formPrioridade.reset();
  } catch (error) {
    exibirMensagem(error.message, "erro");
  }
});

// Ação direta pelo botão na tabela para concluir tarefa[cite: 21]
function acaoConcluir(codigo) {
  try {
    concluirTarefa(codigo);
    renderizarTabela();
    exibirMensagem(`Tarefa #${codigo} concluída com sucesso!`, "sucesso");
  } catch (error) {
    exibirMensagem(error.message, "erro");
  }
}