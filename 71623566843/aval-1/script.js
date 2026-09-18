let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let filtroAtual = "todas";

const input = document.getElementById("tarefaInput");
const btnAdicionar = document.getElementById("btnAdicionar");
const lista = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");


// Salvar tarefas
function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}


// Adicionar tarefa
function adicionarTarefa() {

  const texto = input.value.trim();

  if (texto === "") {
    alert("Digite uma tarefa!");
    return;
  }

  const novaTarefa = {
    id: Date.now(),
    texto: texto,
    concluida: false
  };

  tarefas.push(novaTarefa);

  input.value = "";

  salvarTarefas();

  mostrarTarefas();
}


// Concluir tarefa
function concluirTarefa(id) {

  tarefas = tarefas.map(tarefa => {

    if (tarefa.id === id) {
      tarefa.concluida = !tarefa.concluida;
    }

    return tarefa;
  });

  salvarTarefas();

  mostrarTarefas();
}


// Excluir tarefa
function excluirTarefa(id) {

  tarefas = tarefas.filter(tarefa => tarefa.id !== id);

  salvarTarefas();

  mostrarTarefas();
}


// Filtrar tarefas
function filtrar(tipo) {

  filtroAtual = tipo;

  document
    .querySelectorAll(".filtros button")
    .forEach(botao => {
      botao.classList.remove("ativo");
    });

  document
    .querySelector(`[data-filtro="${tipo}"]`)
    .classList.add("ativo");

  mostrarTarefas();
}


// Mostrar tarefas
function mostrarTarefas() {

  lista.innerHTML = "";

  let tarefasFiltradas = tarefas;

  if (filtroAtual === "pendentes") {

    tarefasFiltradas = tarefas.filter(
      tarefa => !tarefa.concluida
    );

  }

  if (filtroAtual === "concluidas") {

    tarefasFiltradas = tarefas.filter(
      tarefa => tarefa.concluida
    );

  }


  if (tarefasFiltradas.length === 0) {

    lista.innerHTML = `
      <div class="vazio">
        Nenhuma tarefa encontrada.
      </div>
    `;

  }


  tarefasFiltradas.forEach(tarefa => {

    const li = document.createElement("li");

    if (tarefa.concluida) {
      li.classList.add("concluida");
    }

    li.innerHTML = `
      <input
        type="checkbox"
        ${tarefa.concluida ? "checked" : ""}
      >

      <span>${tarefa.texto}</span>

      <div class="acoes">

        <button class="concluir">
          ✓
        </button>

        <button class="excluir">
          🗑
        </button>

      </div>
    `;


    const checkbox = li.querySelector("input");

    checkbox.addEventListener("change", () => {
      concluirTarefa(tarefa.id);
    });


    const btnConcluir = li.querySelector(".concluir");

    btnConcluir.addEventListener("click", () => {
      concluirTarefa(tarefa.id);
    });


    const btnExcluir = li.querySelector(".excluir");

    btnExcluir.addEventListener("click", () => {
      excluirTarefa(tarefa.id);
    });


    lista.appendChild(li);

  });


  const pendentes = tarefas.filter(
    tarefa => !tarefa.concluida
  ).length;


  contador.textContent =
    `${tarefas.length} tarefa(s) • ${pendentes} pendente(s)`;
}


// Botão adicionar
btnAdicionar.addEventListener("click", adicionarTarefa);


// Enter para adicionar
input.addEventListener("keydown", event => {

  if (event.key === "Enter") {
    adicionarTarefa();
  }

});


// Botões de filtro
document
  .querySelectorAll(".filtros button")
  .forEach(botao => {

    botao.addEventListener("click", () => {

      filtrar(botao.dataset.filtro);

    });

  });


// Inicializar
mostrarTarefas();