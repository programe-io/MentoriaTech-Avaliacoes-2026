
const formulario = document.getElementById("formulario");
const campo = document.getElementById("tarefa");
const lista = document.getElementById("lista");

let tarefas = JSON.parse(localStorage.getItem("taskflow")) || [];

function salvar() {
  localStorage.setItem("taskflow", JSON.stringify(tarefas));
}

function renderizar() {
  lista.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");

    if (tarefa.concluida) {
      li.classList.add("concluida");
    }

    const texto = document.createElement("span");
    texto.textContent = tarefa.nome;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const concluir = document.createElement("button");
    concluir.textContent = tarefa.concluida ? "↩" : "✓";
    concluir.onclick = () => {
      tarefas[index].concluida = !tarefas[index].concluida;
      salvar();
      renderizar();
    };

    const excluir = document.createElement("button");
    excluir.textContent = "✕";
    excluir.className = "excluir";
    excluir.onclick = () => {
      tarefas.splice(index, 1);
      salvar();
      renderizar();
    };

    acoes.append(concluir, excluir);
    li.append(texto, acoes);
    lista.appendChild(li);
  });

  const concluidas = tarefas.filter(t => t.concluida).length;

  document.getElementById("total").textContent = tarefas.length;
  document.getElementById("concluidas").textContent = concluidas;
  document.getElementById("pendentes").textContent =
    tarefas.length - concluidas;
}

formulario.addEventListener("submit", function(e) {
  e.preventDefault();

  if (!campo.value.trim()) return;

  tarefas.push({
    nome: campo.value.trim(),
    concluida: false
  });

  campo.value = "";
  salvar();
  renderizar();
});

renderizar();
