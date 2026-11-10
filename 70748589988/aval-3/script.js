// 1. ESTADO EM MEMÓRIA (Fonte Única da Verdade)
let tarefas = [
  { id: 1, titulo: "Aprender renderização orientada a dados", concluida: true },
  { id: 2, titulo: "Entender o fluxo do estado para o DOM", concluida: false }
];

// Referências seguras aos elementos do DOM
const containerLista = document.getElementById("lista-tarefas");
const formTarefa = document.getElementById("form-tarefa");
const inputTarefa = document.getElementById("input-tarefa");

// 2. FUNÇÃO DE RENDERIZAÇÃO (Dados -> Interface)
function render() {
  // Limpa o container totalmente a cada chamada
  containerLista.innerHTML = "";

  // Caso o array esteja vazio
  if (tarefas.length === 0) {
    const liVazio = document.createElement("li");
    liVazio.className = "vazio";
    liVazio.textContent = "Nenhuma tarefa encontrada.";
    containerLista.appendChild(liVazio);
    return;
  }

  // Percorre o Array e constrói o HTML seguro (evita XSS usando textContent)
  tarefas.forEach(tarefa => {
    const li = document.createElement("li");
    li.className = `item-tarefa ${tarefa.concluida ? "concluida" : ""}`;

    const span = document.createElement("span");
    span.textContent = tarefa.titulo;
    span.addEventListener("click", () => alternarStatus(tarefa.id));

    const btnDeletar = document.createElement("button");
    btnDeletar.className = "btn-deletar";
    btnDeletar.innerHTML = "&times;";
    btnDeletar.addEventListener("click", () => removerTarefa(tarefa.id));

    li.appendChild(span);
    li.appendChild(btnDeletar);

    containerLista.appendChild(li);
  });
}

// 3. MUTADORES DE ESTADO (Alteram o Array e disparam o render)
function adicionarTarefa(titulo) {
  const novaTarefa = {
    id: Date.now(),
    titulo: titulo,
    concluida: false
  };

  tarefas.push(novaTarefa);
  render();
}

function removerTarefa(id) {
  tarefas = tarefas.filter(t => t.id !== id);
  render();
}

function alternarStatus(id) {
  tarefas = tarefas.map(t => {
    if (t.id === id) {
      return { ...t, concluida: !t.concluida };
    }
    return t;
  });
  render();
}

// EVENT LISTENERS DE INTERAÇÃO
formTarefa.addEventListener("submit", (e) => {
  e.preventDefault();
  const valor = inputTarefa.value.trim();

  if (valor) {
    adicionarTarefa(valor);
    inputTarefa.value = "";
  }
});

// Renderização inicial
render();