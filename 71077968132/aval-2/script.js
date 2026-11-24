
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gerenciador de Tarefas</title>

<style>
* {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  margin: 0;
  background: #f1f5f9;
  color: #1e293b;
}

header {
  background: #172554;
  color: white;
  padding: 25px;
  text-align: center;
}

.container {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(180px,1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 3px 10px #0001;
}

.card h3 {
  color: #64748b;
  margin: 0;
}

.card p {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 0;
}

.panel {
  background: white;
  padding: 22px;
  border-radius: 12px;
  margin-bottom: 20px;
}

input, select, textarea {
  width: 100%;
  padding: 12px;
  margin: 7px 0;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
}

textarea {
  resize: vertical;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  background: #2563eb;
  color: white;
  margin: 4px;
}

button:hover {
  opacity: .85;
}

.task {
  border-left: 5px solid #2563eb;
  background: #f8fafc;
  padding: 15px;
  border-radius: 8px;
  margin: 12px 0;
}

.task h3 {
  margin-top: 0;
}

.task p {
  color: #64748b;
}

.high { border-left-color: #dc2626; }
.medium { border-left-color: #f59e0b; }
.low { border-left-color: #16a34a; }

.tag {
  display: inline-block;
  padding: 5px 9px;
  border-radius: 5px;
  font-size: 12px;
  background: #e2e8f0;
  margin-right: 5px;
}

.delete { background: #dc2626; }
.edit { background: #64748b; }
.done { background: #16a34a; }
.progress { background: #d97706; }

.columns {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 15px;
}

.column {
  background: white;
  padding: 15px;
  border-radius: 10px;
  min-width: 0;
}

.column h2 {
  font-size: 18px;
}

@media(max-width:750px) {
  .columns {
    grid-template-columns: 1fr;
  }
}
</style>
</head>

<body>

<header>
  <h1>📋 Gerenciador de Tarefas</h1>
  <p>Organize suas atividades e aumente sua produtividade</p>
</header>

<div class="container">

  <div class="stats">
    <div class="card">
      <h3>Total de tarefas</h3>
      <p id="total">0</p>
    </div>

    <div class="card">
      <h3>Pendentes</h3>
      <p id="pendentes">0</p>
    </div>

    <div class="card">
      <h3>Em andamento</h3>
      <p id="andamento">0</p>
    </div>

    <div class="card">
      <h3>Concluídas</h3>
      <p id="concluidas">0</p>
    </div>
  </div>

  <div class="panel">
    <h2>➕ Nova tarefa</h2>

    <input id="titulo" placeholder="Nome da tarefa">

    <textarea id="descricao"
    placeholder="Descrição da tarefa"></textarea>

    <label>Prazo:</label>
    <input type="date" id="prazo">

    <label>Prioridade:</label>
    <select id="prioridade">
      <option value="low">Baixa</option>
      <option value="medium">Média</option>
      <option value="high">Alta</option>
    </select>

    <button onclick="adicionar()">Adicionar tarefa</button>
  </div>

  <div class="panel">
    <h2>🔎 Pesquisar tarefas</h2>
    <input id="busca"
    placeholder="Digite o nome da tarefa..."
    oninput="renderizar()">
  </div>

  <div class="columns">

    <div class="column">
      <h2>📝 Pendentes</h2>
      <div id="listaPendente"></div>
    </div>

    <div class="column">
      <h2>⚙️ Em andamento</h2>
      <div id="listaAndamento"></div>
    </div>

    <div class="column">
      <h2>✅ Concluídas</h2>
      <div id="listaConcluida"></div>
    </div>

  </div>

</div>

<script>

let tarefas = JSON.parse(
  localStorage.getItem("minhasTarefas")
) || [];

function salvar() {
  localStorage.setItem(
    "minhasTarefas",
    JSON.stringify(tarefas)
  );
}

function adicionar() {

  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value;
  const prazo = document.getElementById("prazo").value;
  const prioridade = document.getElementById("prioridade").value;

  if (!titulo) {
    alert("Digite o título da tarefa!");
    return;
  }

  tarefas.push({
    id: Date.now(),
    titulo,
    descricao,
    prazo,
    prioridade,
    status: "pendente"
  });

  salvar();

  document.getElementById("titulo").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("prazo").value = "";

  renderizar();
}

function excluir(id) {

  if (confirm("Deseja excluir esta tarefa?")) {
    tarefas = tarefas.filter(t => t.id !== id);
    salvar();
    renderizar();
  }
}

function editar(id) {

  const tarefa = tarefas.find(t => t.id === id);

  const titulo = prompt("Título:", tarefa.titulo);

  if (titulo === null || !titulo.trim()) return;

  const descricao = prompt("Descrição:", tarefa.descricao);

  if (descricao === null) return;

  tarefa.titulo = titulo.trim();
  tarefa.descricao = descricao;

  salvar();
  renderizar();
}

function mudarStatus(id, status) {

  const tarefa = tarefas.find(t => t.id === id);

  tarefa.status = status;

  salvar();
  renderizar();
}

function criarCard(t) {

  const prioridade = {
    high: "Alta",
    medium: "Média",
    low: "Baixa"
  };

  const prazo = t.prazo
    ? new Date(t.prazo + "T12:00:00").toLocaleDateString("pt-BR")
    : "Sem prazo";

  const div = document.createElement("div");
  div.className = `task ${t.prioridade}`;

  const titulo = document.createElement("h3");
  titulo.textContent = t.titulo;

  const descricao = document.createElement("p");
  descricao.textContent = t.descricao;

  const info = document.createElement("div");
  info.className = "tag";
  info.textContent = "Prioridade: " + prioridade[t.prioridade];

  const data = document.createElement("div");
  data.className = "tag";
  data.textContent = "Prazo: " + prazo;

  div.append(titulo, descricao, info, data);

  const acoes = document.createElement("div");

  const editarBtn = document.createElement("button");
  editarBtn.className = "edit";
  editarBtn.textContent = "Editar";
  editarBtn.onclick = () => editar(t.id);

  const excluirBtn = document.createElement("button");
  excluirBtn.className = "delete";
  excluirBtn.textContent = "Excluir";
  excluirBtn.onclick = () => excluir(t.id);

  acoes.append(editarBtn, excluirBtn);

  if (t.status === "pendente") {
    const btn = document.createElement("button");
    btn.className = "progress";
    btn.textContent = "Iniciar";
    btn.onclick = () => mudarStatus(t.id, "andamento");
    acoes.append(btn);
  }

  if (t.status === "andamento") {
    const btn = document.createElement("button");
    btn.className = "done";
    btn.textContent = "Concluir";
    btn.onclick = () => mudarStatus(t.id, "concluida");
    acoes.append(btn);

    const voltar = document.createElement("button");
    voltar.textContent = "Voltar";
    voltar.onclick = () => mudarStatus(t.id, "pendente");
    acoes.append(voltar);
  }

  if (t.status === "concluida") {
    const voltar = document.createElement("button");
    voltar.textContent = "Reabrir";
    voltar.onclick = () => mudarStatus(t.id, "pendente");
    acoes.append(voltar);
  }

  div.append(acoes);

  return div;
}

function renderizar() {

  const busca = document.getElementById("busca")
    .value.toLowerCase();

  const listas = {
    pendente: document.getElementById("listaPendente"),
    andamento: document.getElementById("listaAndamento"),
    concluida: document.getElementById("listaConcluida")
  };

  Object.values(listas).forEach(lista => lista.replaceChildren());

  const filtradas = tarefas.filter(t =>
    t.titulo.toLowerCase().includes(busca) ||
    t.descricao.toLowerCase().includes(busca)
  );

  filtradas.forEach(t => {
    listas[t.status].appendChild(criarCard(t));
  });

  document.getElementById("total").textContent = tarefas.length;

  document.getElementById("pendentes").textContent =
    tarefas.filter(t => t.status === "pendente").length;

  document.getElementById("andamento").textContent =
    tarefas.filter(t => t.status === "andamento").length;

  document.getElementById("concluidas").textContent =
    tarefas.filter(t => t.status === "concluida").length;
}

renderizar();

</script>

</body>
</html>
