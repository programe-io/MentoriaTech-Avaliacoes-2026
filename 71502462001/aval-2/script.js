// ---------- Estado da aplicação ----------
// Cada tarefa: { id, titulo, prioridade, prazo, status }

let tarefas = [];

// ---------- Referências do DOM ----------

const formTarefa = document.getElementById('formTarefa');
const contadorGeral = document.getElementById('contadorGeral');

const colunas = {
  afazer: document.getElementById('lista-afazer'),
  andamento: document.getElementById('lista-andamento'),
  concluida: document.getElementById('lista-concluida'),
};

const contadores = {
  afazer: document.getElementById('contador-afazer'),
  andamento: document.getElementById('contador-andamento'),
  concluida: document.getElementById('contador-concluida'),
};

const nomesPrioridade = { alta: 'Alta', media: 'Média', baixa: 'Baixa' };
const nomesColuna = { afazer: 'A fazer', andamento: 'Em andamento', concluida: 'Concluídas' };

// ---------- Funções auxiliares ----------

function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function escapeHtml(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

function formatarData(isoString) {
  if (!isoString) return null;
  const [ano, mes, dia] = isoString.split('-');
  return `${dia}/${mes}/${ano}`;
}

function prazoEstaAtrasado(isoString, status) {
  if (!isoString || status === 'concluida') return false;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const dataPrazo = new Date(isoString + 'T00:00:00');
  return dataPrazo < hoje;
}

// ---------- Renderização ----------

function renderizar() {
  // Limpa as três colunas
  Object.values(colunas).forEach((coluna) => (coluna.innerHTML = ''));

  const contagemPorStatus = { afazer: 0, andamento: 0, concluida: 0 };

  tarefas.forEach((tarefa) => {
    contagemPorStatus[tarefa.status]++;

    const cartao = document.createElement('div');
    cartao.className = 'tarefa' + (tarefa.status === 'concluida' ? ' concluida' : '');
    cartao.dataset.prioridade = tarefa.prioridade;

    const atrasado = prazoEstaAtrasado(tarefa.prazo, tarefa.status);
    const prazoFormatado = formatarData(tarefa.prazo);

    cartao.innerHTML = `
      <p class="tarefa-titulo">${escapeHtml(tarefa.titulo)}</p>
      <div class="tarefa-meta">
        <span class="etiqueta-prioridade ${tarefa.prioridade}">${nomesPrioridade[tarefa.prioridade]}</span>
        ${prazoFormatado ? `<span class="tarefa-prazo ${atrasado ? 'atrasado' : ''}">${atrasado ? 'Atrasada · ' : 'Prazo: '}${prazoFormatado}</span>` : ''}
      </div>
      <div class="tarefa-acoes">
        ${botoesDeAcao(tarefa)}
        <button class="btn-excluir" data-acao="excluir" data-id="${tarefa.id}">Excluir</button>
      </div>
    `;

    colunas[tarefa.status].appendChild(cartao);
  });

  // Mensagem de coluna vazia
  Object.keys(colunas).forEach((status) => {
    if (contagemPorStatus[status] === 0) {
      const vazio = document.createElement('p');
      vazio.className = 'coluna-vazia';
      vazio.textContent = `Nenhuma tarefa em "${nomesColuna[status]}"`;
      colunas[status].appendChild(vazio);
    }
    contadores[status].textContent = contagemPorStatus[status];
  });

  atualizarContadorGeral();
}

function botoesDeAcao(tarefa) {
  if (tarefa.status === 'afazer') {
    return `<button data-acao="mover" data-destino="andamento" data-id="${tarefa.id}">Iniciar</button>`;
  }
  if (tarefa.status === 'andamento') {
    return `
      <button data-acao="mover" data-destino="afazer" data-id="${tarefa.id}">Voltar</button>
      <button data-acao="mover" data-destino="concluida" data-id="${tarefa.id}">Concluir</button>
    `;
  }
  // concluida
  return `<button data-acao="mover" data-destino="andamento" data-id="${tarefa.id}">Reabrir</button>`;
}

function atualizarContadorGeral() {
  const total = tarefas.length;
  const concluidas = tarefas.filter((t) => t.status === 'concluida').length;

  if (total === 0) {
    contadorGeral.textContent = 'Nenhuma tarefa ainda';
  } else {
    contadorGeral.textContent = `${concluidas} de ${total} tarefas concluídas`;
  }
}

// ---------- Manipulação de tarefas ----------

function adicionarTarefa(titulo, prioridade, prazo) {
  tarefas.push({
    id: gerarId(),
    titulo,
    prioridade,
    prazo: prazo || null,
    status: 'afazer',
  });
  renderizar();
}

function moverTarefa(id, novoStatus) {
  const tarefa = tarefas.find((t) => t.id === id);
  if (!tarefa) return;
  tarefa.status = novoStatus;
  renderizar();
}

function excluirTarefa(id) {
  tarefas = tarefas.filter((t) => t.id !== id);
  renderizar();
}

// ---------- Eventos ----------

formTarefa.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const titulo = document.getElementById('titulo').value.trim();
  const prioridade = document.getElementById('prioridade').value;
  const prazo = document.getElementById('prazo').value;

  if (!titulo) return;

  adicionarTarefa(titulo, prioridade, prazo);
  formTarefa.reset();
  document.getElementById('titulo').focus();
});

document.querySelector('.quadro').addEventListener('click', (evento) => {
  const botao = evento.target.closest('button');
  if (!botao) return;

  const { acao, id, destino } = botao.dataset;

  if (acao === 'excluir') {
    excluirTarefa(id);
  } else if (acao === 'mover') {
    moverTarefa(id, destino);
  }
});

// ---------- Dados iniciais de exemplo ----------

adicionarTarefa('Preparar relatório mensal', 'alta', '2026-09-15');
adicionarTarefa('Responder e-mails pendentes', 'media', '');
adicionarTarefa('Revisar apresentação do cliente', 'media', '2026-09-10');
moverTarefa(tarefas[2].id, 'andamento');