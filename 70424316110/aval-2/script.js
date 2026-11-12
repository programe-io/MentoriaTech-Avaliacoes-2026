let tarefas = [];
let proximoCodigo = 1;

// 1. Cadastrar uma nova tarefa
function cadastrarTarefa() {
  const inputTitulo = document.getElementById("titulo");
  const selectPrioridade = document.getElementById("prioridade");
  const msgErro = document.getElementById("mensagem-erro");

  const titulo = inputTitulo.value.trim();
  const prioridade = Number(selectPrioridade.value);

  // Regra 1: O título deve ter no mínimo 5 caracteres
  if (titulo.length < 5) {
    msgErro.textContent = "Erro: O título deve ter no mínimo 5 caracteres.";
    return;
  \}

  // Regra 2: A prioridade deve ser um valor entre 1 e 3
  if (![1, 2, 3].includes(prioridade)) {
    msgErro.textContent = "Erro: A prioridade deve ser entre 1 (alta) e 3 (baixa).";
    return;
  \}

  msgErro.textContent = "";

  const novaTarefa = {
    codigo: proximoCodigo++,
    titulo: titulo,
    prioridade: prioridade,
    concluida: false
  \};

  tarefas.push(novaTarefa);
  inputTitulo.value = "";
  listarTarefas();
\}

// 2. Listar as tarefas cadastradas na tela
function listarTarefas() {
  const lista = document.getElementById("lista-tarefas");
  lista.innerHTML = "";

  tarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    if (tarefa.concluida) {
      li.classList.add("concluida");
    \}

    li.innerHTML = `
      <span class="titulo-tarefa">
        <strong>#\${tarefa.codigo\}</strong> - \${tarefa.titulo\}
      </span>
      <div class="acoes">
        <select onchange="alterarPrioridade(\${tarefa.codigo\}, this.value)">
          <option value="1" \${tarefa.prioridade === 1 ? "selected" : ""\}>Alta (1)</option>
          <option value="2" \${tarefa.prioridade === 2 ? "selected" : ""\}>Média (2)</option>
          <option value="3" \${tarefa.prioridade === 3 ? "selected" : ""\}>Baixa (3)</option>
        </select>
        <button class="btn-concluir" onclick="concluirTarefa(\${tarefa.codigo\})">
          \${tarefa.concluida ? "Concluída" : "Concluir"\}
        </button>
      </div>
    `;

    lista.appendChild(li);
  \});
\}

// 3. Marcar uma tarefa como concluída
function concluirTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
    listarTarefas();
  \}
\}

// 4. Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {
  const prioridadeNum = Number(novaPrioridade);
  if (![1, 2, 3].includes(prioridadeNum)) return;

  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (tarefa) {
    tarefa.prioridade = prioridadeNum;
    listarTarefas();
  \}
\}