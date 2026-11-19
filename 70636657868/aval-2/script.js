// Array central que armazena todas as tarefas.
const tarefas = [];
let proximoCodigo = 1;

// Valida os dados antes de cadastrar ou alterar uma tarefa.
function validarDados(titulo, prioridade) {
  if (typeof titulo !== "string" || titulo.trim().length < 5) {
    throw new Error("O título deve possuir no mínimo cinco caracteres.");
  \}

  const prioridadeNumero = Number(prioridade);
  if (![1, 2, 3].includes(prioridadeNumero)) {
    throw new Error("A prioridade deve ser 1, 2 ou 3.");
  \}

  return { titulo: titulo.trim(), prioridade: prioridadeNumero \};
\}

// Cria um objeto tarefa e adiciona-o ao array.
function cadastrarTarefa(titulo, prioridade) {
  const dados = validarDados(titulo, prioridade);

  const novaTarefa = {
    codigo: proximoCodigo++,
    titulo: dados.titulo,
    prioridade: dados.prioridade,
    concluida: false
  \};

  tarefas.push(novaTarefa);
  return novaTarefa;
\}

// Retorna todas as tarefas cadastradas.
function listarTarefas() {
  return tarefas;
\}

// Procura uma tarefa pelo código usando find().
function buscarTarefa(codigo) {
  return tarefas.find(tarefa => tarefa.codigo === Number(codigo));
\}

// Altera o status da tarefa para concluída.
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  if (!tarefa) throw new Error("Tarefa não encontrada.");
  tarefa.concluida = true;
  return tarefa;
\}

// Altera a prioridade de uma tarefa existente.
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  if (!tarefa) throw new Error("Tarefa não encontrada.");

  const dados = validarDados(tarefa.titulo, novaPrioridade);
  tarefa.prioridade = dados.prioridade;
  return tarefa;
\}

// Atualiza a apresentação das tarefas na página.
function renderizarTarefas(lista = listarTarefas()) {
  const area = document.getElementById("task-list");
  const contador = document.getElementById("counter");

  contador.textContent = `\${tarefas.length\} \${tarefas.length === 1 ? "tarefa" : "tarefas"\}`;

  if (lista.length === 0) {
    area.innerHTML = '<p class="empty">Nenhuma tarefa para exibir.</p>';
    return;
  \}

  area.innerHTML = lista.map(tarefa => `
    <article class="task \${tarefa.concluida ? "done" : ""\}">
      <div>
        <h3>\${escaparHTML(tarefa.titulo)\}</h3>
        <div class="meta">Código: \${tarefa.codigo\} · Prioridade: \${tarefa.prioridade\}</div>
        <div class="status">\${tarefa.concluida ? "Concluída" : "Em andamento"\}</div>
      </div>
      <div class="actions">
        \${tarefa.concluida ? "" : `<button class="complete" data-action="complete" data-code="\${tarefa.codigo\}">Concluir</button>`\}
        <button class="priority" data-action="priority" data-code="\${tarefa.codigo\}">Alterar prioridade</button>
      </div>
    </article>
  `).join("");
\}

// Evita que caracteres digitados no título sejam interpretados como HTML.
function escaparHTML(texto) {
  return texto.replace(/[&<>"']/g, caractere => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  \})[caractere]);
\}

document.getElementById("task-form").addEventListener("submit", evento => {
  evento.preventDefault();
  const mensagem = document.getElementById("message");

  try {
    cadastrarTarefa(
      document.getElementById("title").value,
      document.getElementById("priority").value
    );$0