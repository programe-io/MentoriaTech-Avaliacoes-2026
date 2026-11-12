let tarefas = [];
let proximoCodigo = 1;

const form = document.getElementById("form-tarefa");
const inputTitulo = document.getElementById("titulo");
const selectPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("lista-tarefas");
const mensagemErro = document.getElementById("mensagem-erro");

// 1. Cadastrar uma nova tarefa
form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  mensagemErro.textContent = "";

  const titulo = inputTitulo.value.trim();
  const prioridade = Number(selectPrioridade.value);

  // Validação: título com no mínimo 5 caracteres
  if (titulo.length < 5) {
    mensagemErro.textContent = "Erro: O título deve ter no mínimo 5 caracteres.";
    return;
  }

  // Validação: prioridade entre 1 (alta) e 3 (baixa)
  if (prioridade < 1 || prioridade > 3) {
    mensagemErro.textContent = "Erro: A prioridade deve ser entre 1 (alta) e 3 (baixa).";
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
  listarTarefas();
});

// 2. Listar as tarefas cadastradas na tela
function listarTarefas() {
  listaTarefas.innerHTML = "";
  const nomesPrioridade = { 1: "Alta", 2: "Média", 3: "Baixa" };

  tarefas.forEach(function (tarefa) {
    const item = document.createElement("li");
    if (tarefa.concluida) {
      item.classList.add("concluida");
    }

    const statusTexto = tarefa.concluida ? "Concluída" : "Pendente";

    item.innerHTML = `
      <div class="info">
        <strong>#${tarefa.codigo} - ${tarefa.titulo}</strong><br>
        <small>Prioridade: ${tarefa.prioridade} (${nomesPrioridade[tarefa.prioridade]}) | Status: ${statusTexto}</small>
      </div>
      <div class="acoes">
        <select onchange="alterarPrioridade(${tarefa.codigo}, this.value)">
          <option value="1" ${tarefa.prioridade === 1 ? "selected" : ""}>1 - Alta</option>
          <option value="2" ${tarefa.prioridade === 2 ? "selected" : ""}>2 - Média</option>
          <option value="3" ${tarefa.prioridade === 3 ? "selected" : ""}>3 - Baixa</option>
        </select>
        <button class="btn-concluir" onclick="concluirTarefa(${tarefa.codigo})">
          ${tarefa.concluida ? "Concluída" : "Concluir"}
        </button>
      </div>
    `;

    listaTarefas.appendChild(item);
  });
}

// 3. Marcar uma tarefa como concluída
function concluirTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (tarefa) {
    tarefa.concluida = true;
    listarTarefas();
  }
}

// 4. Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo, novaPrioridade) {
  const prioridadeNum = Number(novaPrioridade);

  if (prioridadeNum < 1 || prioridadeNum > 3) {
    mensagemErro.textContent = "Erro: A prioridade deve estar entre 1 e 3.";
    return;
  }

  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (tarefa) {
    tarefa.prioridade = prioridadeNum;
    listarTarefas();
  }
}
