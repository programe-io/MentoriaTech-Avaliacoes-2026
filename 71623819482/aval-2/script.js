const STORAGE_KEY = 'gerenciador_tarefas_v1';

// Tarefas iniciais de exemplo
const tarefasIniciais = [
  {
    id: 1,
    titulo: 'Revisar relatório mensal da equipe',
    categoria: 'Trabalho',
    prioridade: 'alta',
    data: new Date().toISOString().split('T')[0],
    concluida: false
  },
  {
    id: 2,
    titulo: 'Estudar manipulação de DOM em JavaScript',
    categoria: 'Estudos',
    prioridade: 'media',
    data: '',
    concluida: true
  },
  {
    id: 3,
    titulo: 'Agendar consulta médica de rotina',
    categoria: 'Pessoal',
    prioridade: 'baixa',
    data: '',
    concluida: false
  }
];

let tarefas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || tarefasIniciais;
let filtroStatusAtual = 'todas';

// Elementos do DOM
const listaTarefas = document.getElementById('listaTarefas');
const estadoVazio = document.getElementById('estadoVazio');
const formTarefa = document.getElementById('formTarefa');
const inputBusca = document.getElementById('inputBusca');
const filtroPrioridade = document.getElementById('filtroPrioridade');
const modalEditar = document.getElementById('modalEditar');

// Exibir data atual no cabeçalho
function exibirDataAtual() {
  const opcoes = { weekday: 'long', day: 'numeric', month: 'long' };
  document.getElementById('dataAtual').textContent = new Date().toLocaleDateString('pt-BR', opcoes);
}

// Salvar no navegador
function salvarTarefas() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
}

// Formatar data YYYY-MM-DD para DD/MM/YYYY e verificar atraso
function formatarDataTarefa(dataStr, concluida) {
  if (!dataStr) return null;

  const [ano, mes, dia] = dataStr.split('-');
  const hoje = new Date().toISOString().split('T')[0];
  const atrasada = !concluida && dataStr < hoje;

  return {
    texto: `${dia}/${mes}/${ano}`,
    atrasada
  };
}

// Atualizar barra de progresso e contadores
function atualizarProgresso() {
  const total = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluida).length;
  const pendentes = total - concluidas;
  const porcentagem = total === 0 ? 0 : Math.round((concluidas / total) * 100);

  document.getElementById('contadorProgresso').textContent = `${concluidas} de ${total} concluídas`;
  document.getElementById('barraPreenchimento').style.width = `${porcentagem}%`;
  document.getElementById('itensRestantes').textContent = 
    `${pendentes} ${pendentes === 1 ? 'tarefa pendente' : 'tarefas pendentes'}`;
}

// Renderizar lista na tela
function renderizarTarefas() {
  const termoBusca = inputBusca.value.toLowerCase().trim();
  const prioridadeSelecionada = filtroPrioridade.value;

  const filtradas = tarefas.filter(tarefa => {
    const matchStatus =
      filtroStatusAtual === 'todas' ||
      (filtroStatusAtual === 'pendentes' && !tarefa.concluida) ||
      (filtroStatusAtual === 'concluidas' && tarefa.concluida);

    const matchTexto = tarefa.titulo.toLowerCase().includes(termoBusca);
    const matchPrioridade = !prioridadeSelecionada || tarefa.prioridade === prioridadeSelecionada;

    return matchStatus && matchTexto && matchPrioridade;
  });

  listaTarefas.innerHTML = '';

  if (filtradas.length === 0) {
    estadoVazio.classList.remove('oculto');
  } else {
    estadoVazio.classList.add('oculto');

    const nomesPrioridade = {
      alta: 'Alta',
      media: 'Média',
      baixa: 'Baixa'
    };

    filtradas.forEach(tarefa => {
      const li = document.createElement('li');
      li.className = `tarefa-item ${tarefa.concluida ? 'concluida' : ''}`;

      const infoData = formatarDataTarefa(tarefa.data, tarefa.concluida);
      const htmlData = infoData
        ? `<span class="data-limite ${infoData.atrasada ? 'data-atrasada' : ''}">
             📅 ${infoData.texto} ${infoData.atrasada ? '(Atrasada)' : ''}
           </span>`
        : '';

      li.innerHTML = `
        <div class="tarefa-esquerda">
          <input 
            type="checkbox" 
            class="checkbox-tarefa" 
            ${tarefa.concluida ? 'checked' : ''} 
            onchange="alternarConclusao(${tarefa.id})"
          >
          <div class="tarefa-info">
            <span class="tarefa-titulo">${tarefa.titulo}</span>
            <div class="tarefa-meta">
              <span class="badge badge-categoria">${tarefa.categoria}</span>
              <span class="badge badge-${tarefa.prioridade}">${nomesPrioridade[tarefa.prioridade]}</span>
              ${htmlData}
            </div>
          </div>
        </div>
        <div class="tarefa-acoes">
          <button class="btn-icone" title="Editar" onclick="abrirModalEdicao(${tarefa.id})">✏️</button>
          <button class="btn-icone excluir" title="Excluir" onclick="excluirTarefa(${tarefa.id})">🗑️</button>
        </div>
      `;

      listaTarefas.appendChild(li);
    });
  }

  atualizarProgresso();
}

// Adicionar nova tarefa
formTarefa.addEventListener('submit', (e) => {
  e.preventDefault();

  const titulo = document.getElementById('inputTitulo').value.trim();
  const categoria = document.getElementById('inputCategoria').value;
  const prioridade = document.getElementById('inputPrioridade').value;
  const data = document.getElementById('inputData').value;

  if (!titulo) return;

  const novaTarefa = {
    id: Date.now(),
    titulo,
    categoria,
    prioridade,
    data,
    concluida: false
  };

  tarefas.unshift(novaTarefa);
  salvarTarefas();
  renderizarTarefas();
  formTarefa.reset();
});

// Marcar / Desmarcar tarefa
function alternarConclusao(id) {
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return;

  tarefa.concluida = !tarefa.concluida;
  salvarTarefas();
  renderizarTarefas();
}

// Excluir tarefa
function excluirTarefa(id) {
  tarefas = tarefas.filter(t => t.id !== id);
  salvarTarefas();
  renderizarTarefas();
}

// Abrir modal de edição
function abrirModalEdicao(id) {
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return;

  document.getElementById('editId').value = tarefa.id;
  document.getElementById('editTitulo').value = tarefa.titulo;
  document.getElementById('editCategoria').value = tarefa.categoria;
  document.getElementById('editPrioridade').value = tarefa.prioridade;
  document.getElementById('editData').value = tarefa.data;

  modalEditar.classList.remove('oculto');
}

function fecharModalEdicao() {
  modalEditar.classList.add('oculto');
}

document.getElementById('btnFecharModal').addEventListener('click', fecharModalEdicao);
document.getElementById('btnCancelarModal').addEventListener('click', fecharModalEdicao);

// Salvar edição
document.getElementById('formEditar').addEventListener('submit', (e) => {
  e.preventDefault();

  const id = Number(document.getElementById('editId').value);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return;

  tarefa.titulo = document.getElementById('editTitulo').value.trim();
  tarefa.categoria = document.getElementById('editCategoria').value;
  tarefa.prioridade = document.getElementById('editPrioridade').value;
  tarefa.data = document.getElementById('editData').value;

  salvarTarefas();
  renderizarTarefas();
  fecharModalEdicao();
});

// Troca de abas (Todas / Pendentes / Concluídas)
document.querySelectorAll('.aba').forEach(botao => {
  botao.addEventListener('click', () => {
    document.querySelectorAll('.aba').forEach(b => b.classList.remove('ativa'));
    botao.classList.add('ativa');
    filtroStatusAtual = botao.dataset.filtro;
    renderizarTarefas();
  });
});

// Limpar todas as concluídas
document.getElementById('btnLimparConcluidas').addEventListener('click', () => {
  const temConcluidas = tarefas.some(t => t.concluida);
  if (!temConcluidas) return;

  if (confirm('Deseja remover todas as tarefas concluídas?')) {
    tarefas = tarefas.filter(t => !t.concluida);
    salvarTarefas();
    renderizarTarefas();
  }
});

// Eventos de busca e filtro
inputBusca.addEventListener('input', renderizarTarefas);
filtroPrioridade.addEventListener('change', renderizarTarefas);

// Inicialização
exibirDataAtual();
renderizarTarefas();