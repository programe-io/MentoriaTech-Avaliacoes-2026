
let tarefas = JSON.parse(localStorage.getItem("dailyTasks")) || [];

function salvar() {
  localStorage.setItem("dailyTasks", JSON.stringify(tarefas));
}

function adicionar() {
  const nome = document.getElementById("nome").value.trim();
  const prioridade = document.getElementById("prioridade").value;
  const data = document.getElementById("data").value;

  if (!nome) {
    alert("Digite o nome da tarefa!");
    return;
  }

  tarefas.push({
    nome,
    prioridade,
    data,
    concluida: false
  });

  document.getElementById("nome").value = "";
  document.getElementById("data").value = "";

  salvar();
  renderizar();
}

function concluir(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  salvar();
  renderizar();
}

function excluir(index) {
  tarefas.splice(index, 1);
  salvar();
  renderizar();
}

function renderizar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  tarefas.forEach((t, index) => {
    const div = document.createElement("div");
    div.className = "item " + t.prioridade;

    if (t.concluida) div.classList.add("concluida");

    const titulo = document.createElement("h3");
    titulo.textContent = t.nome;

    const detalhes = document.createElement("p");
    detalhes.textContent =
      "Prioridade: " + t.prioridade +
      " | Data: " + (t.data || "Não definida");

    const concluirBtn = document.createElement("button");
    concluirBtn.textContent = t.concluida ? "Reabrir" : "Concluir";
    concluirBtn.onclick = () => concluir(index);

    const excluirBtn = document.createElement("button");
    excluirBtn.textContent = "Excluir";
    excluirBtn.style.background = "#dc2626";
    excluirBtn.onclick = () => excluir(index);

    div.append(titulo, detalhes, concluirBtn, excluirBtn);
    lista.appendChild(div);
  });
}

renderizar();
