let tarefas = [];
let filtro = "todas";

function adicionarTarefa() {
  let campo = document.getElementById("novaTarefa");
  let texto = campo.value.trim();

  if (texto === "") {
    alert("Escreva uma tarefa antes de adicionar.");
    return;
  }

  tarefas.push({
    titulo: texto,
    feita: false
  });

  campo.value = "";
  renderizar();
}

function alternarTarefa(indice) {
  tarefas[indice].feita = !tarefas[indice].feita;
  renderizar();
}

function removerTarefa(indice) {
  tarefas.splice(indice, 1);
  renderizar();
}

function mudarFiltro(novoFiltro) {
  filtro = novoFiltro;
  renderizar();
}

function renderizar() {
  let lista = document.getElementById("lista");
  let resumo = document.getElementById("resumo");
  lista.innerHTML = "";

  let feitasCount = 0;
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].feita) {
      feitasCount++;
    }
  }

  for (let i = 0; i < tarefas.length; i++) {
    let item = tarefas[i];
    let mostrar =
      filtro === "todas" ||
      (filtro === "pendentes" && !item.feita) ||
      (filtro === "feitas" && item.feita);

    if (mostrar) {
      let li = document.createElement("li");

      let span = document.createElement("span");
      span.className = "texto-tarefa";
      span.textContent = item.titulo;
      if (item.feita) {
        span.classList.add("feita");
      }
      span.onclick = function () {
        alternarTarefa(i);
      };

      let btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-excluir";
      btn.textContent = "Excluir";
      btn.onclick = function () {
        removerTarefa(i);
      };

      li.appendChild(span);
      li.appendChild(btn);
      lista.appendChild(li);
    }
  }

  let pendentesCount = tarefas.length - feitasCount;
  resumo.textContent =
    "Total: " + tarefas.length + " | Pendentes: " + pendentesCount + " | Feitas: " + feitasCount;
}

renderizar();