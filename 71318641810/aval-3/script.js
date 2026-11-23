
let tarefas = JSON.parse(localStorage.getItem("proTasks")) || [];

function salvar() {
  localStorage.setItem("proTasks", JSON.stringify(tarefas));
}

function adicionar() {
  const projeto = document.getElementById("projeto").value.trim();
  const descricao = document.getElementById("descricao").value.trim();

  if (!projeto || !descricao) {
    alert("Preencha os dois campos!");
    return;
  }

  tarefas.push({
    projeto,
    descricao,
    status: "fazer"
  });

  document.getElementById("projeto").value = "";
  document.getElementById("descricao").value = "";

  salvar();
  renderizar();
}

function mudarStatus(index) {
  const estados = ["fazer", "andamento", "concluido"];
  const atual = estados.indexOf(tarefas[index].status);

  tarefas[index].status = estados[(atual + 1) % estados.length];

  salvar();
  renderizar();
}

function excluir(index) {
  tarefas.splice(index, 1);
  salvar();
  renderizar();
}

function renderizar() {
  ["fazer", "andamento", "concluido"].forEach(id => {
    document.getElementById(id).innerHTML = "";
  });

  tarefas.forEach((t, index) => {
    const card = document.createElement("div");
    card.className = "tarefa";

    const titulo = document.createElement("h3");
    titulo.textContent = t.projeto;

    const descricao = document.createElement("p");
    descricao.textContent = t.descricao;

    const mover = document.createElement("button");
    mover.textContent = "Mover →";
    mover.onclick = () => mudarStatus(index);

    const apagar = document.createElement("button");
    apagar.textContent = "Excluir";
    apagar.className = "excluir";
    apagar.onclick = () => excluir(index);

    card.append(titulo, descricao, mover, apagar);

    document.getElementById(t.status).appendChild(card);
  });
}

renderizar();
