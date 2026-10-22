const tarefas = []; // Array central[cite: 2]
let geradorCodigo = 0; // Gerador automático de ID[cite: 3]
function validarDadosDaTarefa(titulo, prioridade) {
  if (!titulo || titulo.length < 5) {
    throw new Error("O título da tarefa deve ter no mínimo 5 caracteres.");[cite: 2]
  }

  const prioNum = Number(prioridade);
  if (isNaN(prioNum) || prioNum < 1 || prioNum > 3) {
    throw new Error("A prioridade deve ser um valor entre 1 e 3.");[cite: 2, 3]
  }
  function buscarTarefa(codigo) {
  const tarefaEncontrada = tarefas.find(t => t.codigo === Number(codigo));[cite: 4]
  if (!tarefaEncontrada) {
    throw new Error(`Tarefa com o código ${codigo} não foi encontrada.`);[cite: 4]
  }
  return tarefaEncontrada;[cite: 4]
}function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);
    validarDadosDaTarefa(titulo, prioridade);
    const novaTarefa = {
    codigo: geradorCodigo,[cite: 3]
    titulo: titulo.trim(),[cite: 3]
    prioridade: Number(prioridade),[cite: 3]
    status: true // true = Em execução (Não concluída)[cite: 3]
  };
  tarefas.push(novaTarefa);[cite: 3]
  return novaTarefa;
}tarefas.push(novaTarefa);[cite: 3]
  return novaTarefa;
}
function listarTarefas() {
  return tarefas;[cite: 3]
}

// 10. Conclusão de uma tarefa[cite: 4]
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);[cite: 4]

  if (!tarefa.status) {
    throw new Error("A tarefa já se encontra concluída.");[cite: 4]
  }

  tarefa.status = false; // Altera o status para concluída[cite: 3, 4]
}

// 11. Alteração da prioridade[cite: 4]
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);[cite: 4]
  
  // Reutiliza a validação passando o título atual e a nova prioridade[cite: 4]
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);[cite: 4]

  tarefa.prioridade = Number(novaPrioridade);[cite: 5]
}

// ===================================================
// INTEGRAÇÃO COM A INTERFACE GRÁFICA (DOM)
// ===================================================

const formTarefa = document.getElementById('form-tarefa');
const inputTitulo = document.getElementById('titulo');
const selectPrioridade = document.getElementById('prioridade');
const listaTarefasEl = document.getElementById('lista-tarefas');
const msgErroEl = document.getElementById('mensagem-erro');
const msgSucessoEl = document.getElementById('mensagem-sucesso');

function exibirMensagem(tipo, texto) {
  msgErroEl.style.display = 'none';
  msgSucessoEl.style.display = 'none';

  if (tipo === 'erro') {
    msgErroEl.textContent = texto;
    msgErroEl.style.display = 'block';
  } else if (tipo === 'sucesso') {
    msgSucessoEl.textContent = texto;
    msgSucessoEl.style.display = 'block';
  }
}

function atualizarInterface() {
  listaTarefasEl.innerHTML = '';
  const lista = listarTarefas();

  if (lista.length === 0) {
    listaTarefasEl.innerHTML = '<li style="text-align:center; color: #888;">Nenhuma tarefa cadastrada.</li>';
    return;
  }

  lista.forEach(tarefa => {
    const li = document.createElement('li');
    li.className = `tarefa-item ${!tarefa.status ? 'concluidastatus' : ''}`;

    const textoPrioridade = tarefa.prioridade === 1 ? 'Alta' : tarefa.prioridade === 2 ? 'Média' : 'Baixa';
    const statusTexto = tarefa.status ? 'Em Execução' : 'Concluída';

    li.innerHTML = `
      <div class="tarefa-info">
        <h3>#${tarefa.codigo} - ${tarefa.titulo}</h3>
        <p>
          Prioridade: <span class="badge prio-${tarefa.prioridade}">${textoPrioridade}</span> | 
          Status: <strong>${statusTexto}</strong>
        </p>
      </div>
      <div class="acoes">
        ${tarefa.status ? `<button class="btn-sucesso" onclick="handleConcluir(${tarefa.codigo})">Concluir</button>` : ''}
        <button class="btn-alterar" onclick="handleAlterarPrioridade(${tarefa.codigo})">Alterar Prioridade</button>
      </div>
    `;

    listaTarefasEl.appendChild(li);
  });
}

// Manipuladores de eventos
formTarefa.addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    cadastrarTarefa(inputTitulo.value, selectPrioridade.value);
    exibirMensagem('sucesso', 'Tarefa cadastrada com sucesso!');
    inputTitulo.value = '';
    selectPrioridade.value = '';
    atualizarInterface();
  } catch (erro) {
    exibirMensagem('erro', erro.message);
  }
});

function handleConcluir(codigo) {
  try {
    concluirTarefa(codigo);
    exibirMensagem('sucesso', `Tarefa #${codigo} concluída!`);
    atualizarInterface();
  } catch (erro) {
    exibirMensagem('erro', erro.message);
  }
}

function handleAlterarPrioridade(codigo) {
  const novaPrio = prompt("Introduza a nova prioridade (1 - Alta, 2 - Média, 3 - Baixa):");
  if (novaPrio !== null) {
    try {
      alterarPrioridade(codigo, novaPrio);
      exibirMensagem('sucesso', `Prioridade da tarefa #${codigo} alterada!`);
      atualizarInterface();
    } catch (erro) {
      exibirMensagem('erro', erro.message);
    }
  }
}

// Inicialização
atualizarInterface();