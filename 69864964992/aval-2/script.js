const inputTarefa = document.getElementById('novaTarefa');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaTarefas = document.getElementById('listaTarefas');

function adicionarTarefa() {
  const texto = inputTarefa.value.trim();

  if (texto === '') {
    alert('Por favor, digite uma tarefa antes de adicionar!');
    return;
  \}

  const item = document.createElement('li');
  
  const spanTexto = document.createElement('span');
  spanTexto.textContent = texto;
  spanTexto.onclick = () => item.classList.toggle('concluida');

  const btnRemover = document.createElement('button');
  btnRemover.textContent = 'Excluir';
  btnRemover.className = 'btn-remover';
  btnRemover.onclick = () => item.remove();

  item.appendChild(spanTexto);
  item.appendChild(btnRemover);
  listaTarefas.appendChild(item);

  inputTarefa.value = '';
  inputTarefa.focus();
\}

btnAdicionar.addEventListener('click', adicionarTarefa);

inputTarefa.addEventListener('keypress', (evento) => {
  if (evento.key === 'Enter') {
    adicionarTarefa();
  \}
\});$0