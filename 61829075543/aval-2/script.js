let listaDeTarefas = [];
let contadorCodigo = 1;

const formTarefa = document.getElementById('formTarefa');
const inputTitulo = document.getElementById('titulo');
const selectPrioridade = document.getElementById('prioridade');
const divMensagem = document.getElementById('mensagemFeedback');
const containerLista = document.getElementById('listaTarefas');

formTarefa.addEventListener('submit', function(event) {
  event.preventDefault();

  const titulo = inputTitulo.value.trim();
  const prioridade = parseInt(selectPrioridade.value);

  divMensagem.innerText = '';
  divMensagem.className = 'feedback';

  if (titulo.length < 5) {
    divMensagem.innerText = '⚠️ O título deve conter no mínimo 5 caracteres!';
    divMensagem.classList.add('erro');
    return;
  \}

  if (isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
    divMensagem.innerText = '⚠️ A prioridade precisa ser um número entre 1 (alta) e 3 (baixa)!';
    divMensagem.classList.add('erro');
    return;
  \}

  cadastrarTarefa(titulo, prioridade);

  inputTitulo.value = '';
  selectPrioridade.value = '2';
  inputTitulo.focus();

  divMensagem.innerText = '✨ Tarefa cadastrada com sucesso! 💕';
  divMensagem.classList.add('sucesso');
\});

function cadastrarTarefa(titulo, prioridade) {
  const novaTarefa = {
    codigo: contadorCodigo++,
    titulo: titulo,
    prioridade: prioridade,
    concluida: false
  \};

  listaDeTarefas.push(novaTarefa);
  listarTarefas();
\}

function listarTarefas() {
  containerLista.innerHTML = '';

  if (listaDeTarefas.length === 0) {
    containerLista.innerHTML = '<p class="sem-tarefas">Nenhuma tarefa por aqui ainda... ✨</p>';
    return;
  \}

  listaDeTarefas.forEach(tarefa => {
    const cardItem = document.createElement('div');
    cardItem.className = `tarefa-item \${tarefa.concluida ? 'concluida' : ''\}`;

    if (!tarefa.concluida) {
      if (tarefa.prioridade === 1) cardItem.style.borderLeftColor = 'var(--rosa-escuro)';
      if (tarefa.prioridade === 2) cardItem.style.borderLeftColor = 'var(--laranja-forte)';
      if (tarefa.prioridade === 3) cardItem.style.borderLeftColor = 'var(--laranja-suave)';
    \}

    cardItem.innerHTML = `
      <div class="tarefa-info">
        <span class="tarefa-codigo">#\${tarefa.codigo\}</span>
        <span class="tarefa-titulo">\${escaparHTML(tarefa.titulo)\}</span>
      </div>
      <div class="tarefa-acoes">
        <button class="btn-status" onclick="marcarComoConcluida(\${tarefa.codigo\})">
          \${tarefa.concluida ? 'Desmarcar ↩️' : 'Concluir ✔️'\}
        </button>
        <div>
          <label style="font-size:0.75rem; margin-right:4px;">Prioridade:</label>
          <select class="prioridade-select-inline" onchange="alterarPrioridade(\${tarefa.codigo\}, this.value)">
            <option value="1" \${tarefa.prioridade === 1 ? 'selected' : ''\}>1 (Alta)</option>
            <option value="2" \${tarefa.prioridade === 2 ? 'selected' : ''\}>2 (Média)</option>
            <option value="3" \${tarefa.prioridade === 3 ? 'selected' : ''\}>3 (Baixa)</option>
          </select>
        </div>
      </div>
    `;

    containerLista.appendChild(cardItem);
  \});
\}

function marcarComoConcluida(codigo) {
  const tarefa = listaDeTarefas.find(t => t.codigo === codigo);
  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
    listarTarefas();
  \}
\}

function alterarPrioridade(codigo, novaPrioridade) {
  const prioridadeNum = parseInt(novaPrioridade);
  
  if (prioridadeNum >= 1 && prioridadeNum <= 3) {
    const tarefa = listaDeTarefas.find(t => t.codigo === codigo);
    if (tarefa) {
      tarefa.prioridade = prioridadeNum;
      listarTarefas();
    \}
  \}
\}

function escaparHTML(texto) {
  const div = document.createElement('div');
  div.innerText = texto;
  return div.innerHTML;
\}

listarTarefas();

$0