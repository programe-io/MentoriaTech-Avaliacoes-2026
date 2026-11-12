let tarefas = [];
let proximoCodigo = 1;

const form = document.getElementById("form-tarefa");
const inputTitulo = document.getElementById("titulo");
const selectPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("lista-tarefas");
const mensagem = document.getElementById("mensagem");

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = tipo;
}

// 1. Cadastrar uma nova tarefa
form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const titulo = inputTitulo.value.trim();
  const prioridade = Number(selectPrioridade.value);

  // Regra de validação: mínimo 5 caracteres
  if (titulo.length < 5) {
    mostrarMensagem("Erro: O título deve ter no mínimo 5 caracteres.", "erro");
    return;
  }

  // Regra de validação: prioridade entre 1 e 3
  if (prioridade < 1 || prioridade > 3 || isNaN(prioridade)) {
    mostrarMensagem("Erro: A prioridade deve ser entre 1 e 3.", "erro");
    return;
  }

  const novaTarefa = {
    codigo: proximoCodigo++,
    titulo: titulo,
    prioridade: prioridade,
    concluida: false
  };

  tarefas.push(novaTarefa);
  inputTitulo.value = "";
  mostrarMensagem("Tarefa cadastrada com sucesso!", "sucesso");
  listarTarefas();
});

// 2. Listar as tarefas cadastradas
function listarTarefas() {
  listaTarefas.innerHTML = "";

  if (tarefas.length === 0) {
    listaTarefas.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
    return;
  }

  tarefas.forEach((tarefa) => {
    const item = document.createElement("li");
    if (tarefa.concluida) {
      item.classList.add("concluida");
    }

    item.innerHTML = `
      <div class="info">
        <strong>#${tarefa.codigo} - ${tarefa.titulo}</strong><br>
        <small>Status: ${tarefa.concluida ? "Concluída" : "Pendente"}</small>
      </div>
      <div class="acoes">
        <select onchange="alterarPrioridade(${tarefa.codigo}, this.value)">
          <option value="1" ${tarefa.prioridade === 1 ? "selected" : ""}>1 - Alta</option>
          <option value="2" ${tarefa.prioridade === 2 ? "selected" : ""}>2 - Média</option>
          <option value="3" ${tarefa.prioridade === 3 ? "selected" : ""}>3 - Baixa</option>
        </select>
        <button 
          type="button"
          class="btn-concluir" 
          onclick="concluirTarefa(${tarefa.codigo})"
          ${tarefa.concluida ? "disabled" : ""}
        >
          ${tarefa.concluida ? "Concluída" : "Concluir"}
        </button>
      </div>
    `;

    listaTarefas.appendChild(item);
  });
}

// 3. Marcar uma tarefa como concluída
window.concluirTarefa = function (codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (tarefa) {
    tarefa.concluida = true;
    mostrarMensagem(`Tarefa #${codigo} marcada como concluída.`, "sucesso");
    listarTarefas();
  }
};

// 4. Alterar a prioridade de uma tarefa
window.alterarPrioridade = function (codigo, novaPrioridade) {
  const valor = Number(novaPrioridade);
  const tarefa = tarefas.find((t) => t.codigo === codigo);

  if (tarefa && valor >= 1 && valor <= 3) {
    tarefa.prioridade = valor;
    mostrarMensagem(`Prioridade da tarefa #${codigo} alterada.`, "sucesso");
    listarTarefas();
  }
};

// Inicializa a lista vazia
listarTarefas();
