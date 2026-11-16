const inputTarefa = document.getElementById('nova-tarefa');
const btnAdicionar = document.getElementById('btn-adicionar');
const listaTarefas = document.getElementById('lista-tarefas');
const contador = document.getElementById('contador');

function atualizarContador() {
  const total = listaTarefas.children.length;
  const concluidas = document.querySelectorAll('li.concluida').length;
  contador.textContent = `\${concluidas\} de \${total\} tarefas concluídas`;
\}

function adicionarTarefa() {
  const texto = inputTarefa.value.trim();
  if (texto === '') return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span>\${texto\}</span>
    <div class="acoes">
      <button class="btn-check" title="Concluir">✔</button>
      <button class="btn-delete" title="Excluir">✖</button>
    </div>
  `;

  li.querySelector('.btn-check').addEventListener('click', () => {
    li.classList.toggle('concluida');
    atualizarContador();
  \});

  li.querySelector('.btn-delete').addEventListener('click', () => {
    li.remove();
    atualizarContador();
  \});

  listaTarefas.appendChild(li);
  inputTarefa.value = '';
  atualizarContador();
\}

btnAdicionar.addEventListener('click', adicionarTarefa);

inputTarefa.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') adicionarTarefa();$0