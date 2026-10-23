// =======================================================
// 3 e 13. Armazenamento das tarefas e Persistência (LocalStorage)
// =======================================================
// Tenta carregar as tarefas salvas anteriormente; se não existirem, começa com um array vazio
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// =======================================================
// 7. Geração automática de códigos
// =======================================================
// Define o próximo código com base no maior ID existente para evitar duplicados ao recarregar
let proximoCodigo = tarefas.length > 0 ? Math.max(...tarefas.map(t => t.codigo)) + 1 : 1;

// Função auxiliar para guardar o estado atual das tarefas no navegador
function salvarNoLocalStorage() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// =======================================================
// 5. Validação dos dados da tarefa
// =======================================================
function validarDadosDaTarefa(titulo, prioridade) {
  if (!titulo || titulo.length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve ser um número entre 1 e 3.");
  }
}

// =======================================================
// 9. Busca de tarefas com find
// =======================================================
function buscarTarefa(codigo) {
  const tarefaEncontrada = tarefas.find(tarefa => tarefa.codigo === codigo);
  if (!tarefaEncontrada) {
    throw new Error(`Tarefa com o código ${codigo} não foi encontrada.`);
  }
  return tarefaEncontrada;
}

// =======================================================
// 6. Cadastro e modelagem de uma tarefa
// =======================================================
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  const novaTarefa = {
    codigo: proximoCodigo,
    titulo: titulo,
    prioridade: parseInt(prioridade),
    status: true // true = em execução, false = concluída
  };

  proximoCodigo++;
  tarefas.push(novaTarefa);
  
  salvarNoLocalStorage(); // Grava as alterações
  return novaTarefa;
}

// =======================================================
// 8. Listagem das tarefas cadastradas
// =======================================================
function listarTarefas() {
  return tarefas;
}

// =======================================================
// 10. Conclusão de uma tarefa
// =======================================================
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  if (tarefa.status === false) {
    throw new Error("Esta tarefa já estava concluída.");
  }
  tarefa.status = false;
  
  salvarNoLocalStorage(); // Grava as alterações
  return tarefa;
}

// =======================================================
// 11. Alteração da prioridade
// =======================================================
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  validarDadosDaTarefa(tarefa.titulo, parseInt(novaPrioridade));
  tarefa.prioridade = parseInt(novaPrioridade);
  
  salvarNoLocalStorage(); // Grava as alterações
  return tarefa;
}

// =======================================================
// INTERAÇÃO COM A INTERFACE (DOM)
// =======================================================

const formTarefa = document.getElementById('formTarefa');
const listaTarefasContainer = document.getElementById('listaTarefas');
const errorAlert = document.getElementById('errorAlert');

function mostrarErro(mensagem) {
  errorAlert.textContent = `⚠️ Erro: ${mensagem}`;
  errorAlert.style.display = 'block';
}

function limparErro() {
  errorAlert.style.display = 'none';
}

function renderizarTarefas() {
  listaTarefasContainer.innerHTML = '';
  const lista = listarTarefas();

  if (lista.length === 0) {
    listaTarefasContainer.innerHTML = '<p style="color: var(--text-light)">Nenhuma tarefa cadastrada ainda.</p>';
    return;
  }

  lista.forEach(tarefa => {
    const item = document.createElement('div');
    item.className = 'tarefa-item';

    const statusTexto = tarefa.status ? "Em execução" : "Concluída";
    const statusClasse = tarefa.status ? "status-execucao" : "status-concluida";

    item.innerHTML = `
      <div class="tarefa-info">
        <span class="titulo ${tarefa.status ? '' : 'status-concluida'}">#${tarefa.codigo} - ${tarefa.titulo}</span>
        <div class="detalhes">
          Prioridade: <span class="prioridade-${tarefa.prioridade}">${tarefa.prioridade}</span> | 
          Status: <span class="status-badge ${statusClasse}">${statusTexto}</span>
        </div>
      </div>
      <div class="actions">
        ${tarefa.status ? `
          <select class="select-prioridade-inline" onchange="handleAlterarPrioridade(${tarefa.codigo}, this.value)">
            <option value="1" ${tarefa.prioridade === 1 ? 'selected' : ''}>P1 (Alta)</option>
            <option value="2" ${tarefa.prioridade === 2 ? 'selected' : ''}>P2 (Média)</option>
            <option value="3" ${tarefa.prioridade === 3 ? 'selected' : ''}>P3 (Baixa)</option>
          </select>
          <button class="btn-concluir" onclick="handleConcluirTarefa(${tarefa.codigo})">Concluir</button>
        ` : ''}
      </div>
    `;
    listaTarefasContainer.appendChild(item);
  });
}

// Evento de submissão do formulário
formTarefa.addEventListener('submit', function(event) {
  event.preventDefault();
  limparErro();

  const tituloInput = document.getElementById('titulo');
  const prioridadeInput = document.getElementById('prioridade');

  try {
    cadastrarTarefa(tituloInput.value.trim(), prioridadeInput.value);
    tituloInput.value = '';
    renderizarTarefas();
  } catch (error) {
    mostrarErro(error.message);
  }
});

// Funções globais mapeadas para os botões do HTML
window.handleConcluirTarefa = function(codigo) {
  limparErro();
  try {
    concluirTarefa(codigo);
    renderizarTarefas();
  } catch (error) {
    mostrarErro(error.message);
  }
};

window.handleAlterarPrioridade = function(codigo, novaPrioridade) {
  limparErro();
  try {
    alterarPrioridade(codigo, novaPrioridade);
    renderizarTarefas();
  } catch (error) {
    mostrarErro(error.message);
  }
};

// Renderização inicial ao carregar a página
renderizarTarefas();
