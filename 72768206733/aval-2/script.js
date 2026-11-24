// Carrega as tarefas salvas no navegador ou inicia uma lista vazia
let tarefas = JSON.parse(localStorage.getItem('minhas_tarefas')) || [];
let filtroAtual = 'todas';

// Seleciona os elementos do HTML
const form = document.getElementById('form-tarefa');
const lista = document.getElementById('lista-tarefas');
const contador = document.getElementById('contador');

// Salva no navegador e atualiza a tela
function salvarERenderizar() {
  localStorage.setItem('minhas_tarefas', JSON.stringify(tarefas));
  renderizar();
}

// Adiciona uma nova tarefa
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const texto = document.getElementById('input-tarefa').value.trim();
  const prioridade = document.getElementById('prioridade').value;

  if (!texto) return;

  tarefas.push({
    id: Date.now(),
    texto,
    prioridade,
    concluida: false
  });

  form.reset();
  salvarERenderizar();
});

// Marca ou desmarca a tarefa como concluída
function alternarStatus(id) {
  const tarefa = tarefas.find(t => t.id === id);

  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
    salvarERenderizar();
  }
}

// Exclui uma tarefa da lista
function removerTarefa(id) {
  tarefas = tarefas.filter(t => t.id !== id);
  salvarERenderizar();
}

// Altera o filtro ativo (Todas, Pendentes ou Concluídas)
function mudarFiltro(filtro, botao) {
  filtroAtual = filtro;

  document.querySelectorAll('.filtros button').forEach(btn => {
    btn.classList.remove('ativo');
  });

  botao.classList.add('ativo');
  renderizar();
}

// Desenha a lista de tarefas na tela
function renderizar() {
  lista.innerHTML = '';

  const pendentes = tarefas.filter(t => !t.concluida).length;
  contador.textContent = `${pendentes} ${pendentes === 1 ? 'pendente' : 'pendentes'}`;

  const filtradas = tarefas.filter(t => {
    if (filtroAtual === 'pendentes') return !t.concluida;
    if (filtroAtual === 'concluidas') return t.concluida;
    return true;
  });

  filtradas.forEach(tarefa => {
    const li = document.createElement('li');
    if (tarefa.concluida) {
      li.classList.add('concluida');
    }

    li.innerHTML = `
      <label class="tarefa-info">
        <input type="checkbox" ${tarefa.concluida ? 'checked' : ''} onchange="alternarStatus(${tarefa.id})">
        <span class="texto">${tarefa.texto}</span>
      </label>
      <span class="badge ${tarefa.prioridade}">${tarefa.prioridade}</span>
      <button class="btn-del" onclick="removerTarefa(${tarefa.id})">Excluir</button>
    `;

    lista.appendChild(li);
  });
}

// Inicia a lista ao abrir a página
renderizar();