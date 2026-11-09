let tarefas = JSON.parse(
  localStorage.getItem("tarefas") || "[]"
);

function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionar() {
  const campo = document.getElementById("tarefa");

  if (!campo.value.trim()) return;

  tarefas.push({
    nome: campo.value.trim(),
    concluida: false
  });

  campo.value = "";
  salvar();
  mostrar();
}

function mostrar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  tarefas.forEach((t, i) => {
    const item = document.createElement("li");
    item.textContent = t.nome + "  ×";

    if (t.concluida) item.classList.add("concluida");

    item.onclick = () => {
      if (t.concluida) {
        tarefas.splice(i, 1);
      } else {
        t.concluida = true;
      }
      salvar();
      mostrar();
    };

    lista.appendChild(item);
  });
}

mostrar();