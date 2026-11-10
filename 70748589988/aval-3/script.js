// 1. ESTRUTURA DE DADOS EM MEMÓRIA (Única Fonte da Verdade)
let tarefas = [
  { id: 1, titulo: "Aprender renderização orientada a dados", concluida: true },
  { id: 2, titulo: "Entender o fluxo do estado para o DOM", concluida: false }
];

// Referências aos elementos do DOM
const containerLista = document.getElementById("lista-tarefas");
const formTarefa = document.getElementById("form-tarefa");
const inputTarefa = document.getElementById("input-tarefa");

// 2. FUNÇÃO DE RENDERIZAÇÃO (Array -> HTML)
function render() {
  // Passo A: Limpar o container atual
  containerLista.innerHTML = "";

  if (tarefas.length === 0) {
    containerLista.innerHTML = `<li class="vazio">Nenhuma tarefa encontrada.</li>`;
    return;
  }

  // Passo B: Percorrer a estrutura de dados
  tarefas.forEach(tarefa => {
    // Passo C: Gerar os elementos e o HTML
    const li = document.createElement("li");
    li.className = `item-tarefa ${tarefa.concluida ? "concluida" : ""}`;

    li.innerHTML = `
      <span>${tarefa.titulo}</span>
      <button class="btn-deletar">&times;</button>
    `;

    // Vincular eventos do item
    li.querySelector("span").addEventListener("click", () => alternarStatus(tarefa.id));
    li.querySelector(".btn-deletar").addEventListener("click", () => removerTarefa(tarefa.id));

    // Passo D: Inserir no DOM
    containerLista.appendChild(li);
  });
}

// 3. FUNÇÕES QUE ALTERAM OS DADOS E DISPARAM A RENDERIZAÇÃO

function adicionarTarefa(titulo) {
  const novaTarefa = {
    id: Date.now(),
    titulo: titulo,
    concluida: false
  };

  tarefas.push(novaTarefa); // Altera o Array
  render();                 // Atualiza a interface
}

function removerTarefa(id) {
  tarefas = tarefas.filter(t => t.id !== id); // Altera o Array
  render();                                   // Atualiza a interface
}

function alternarStatus(id) {
  tarefas = tarefas.map(t => {
    if (t.id === id) {
      return { ...t, concluida: !t.concluida };
    }
    return t;
  }); // Altera o Array
  render(); // Atualiza a interface
}

// Escuta a ação do usuário no formulário
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