
let tarefas = [];
let proximoCodigo = 1;

// Cadastrar uma nova tarefa
function cadastrarTarefa(titulo, prioridade) {

  titulo = titulo.trim();
  prioridade = Number(prioridade);

  // Validar título
  if (titulo.length < 5) {
    alert("O título deve possuir no mínimo 5 caracteres!");
    return;
  }

  // Validar prioridade
  if (![1, 2, 3].includes(prioridade)) {
    alert("A prioridade deve ser 1, 2 ou 3!");
    return;
  }

  const tarefa = {
    codigo: proximoCodigo++,
    titulo: titulo,
    prioridade: prioridade,
    concluida: false
  };

  tarefas.push(tarefa);

  listarTarefas();
}

// Listar todas as tarefas
function listarTarefas() {

  const lista = document.getElementById("listaTarefas");

  lista.innerHTML = "";

  if (tarefas.length === 0) {
    lista.innerHTML =
      '<p class="empty">Nenhuma tarefa cadastrada.</p>';
  }

  tarefas.forEach(tarefa => {

    const div = document.createElement("div");

    div.className = tarefa.concluida
      ? "task done"
      : "task";

    let prioridadeTexto = "";
    let prioridadeClasse = "";

    if (tarefa.prioridade === 1) {
      prioridadeTexto = "Alta";
      prioridadeClasse = "high";
    } else if (tarefa.prioridade === 2) {
      prioridadeTexto = "Média";
      prioridadeClasse = "medium";
    } else {
      prioridadeTexto = "Baixa";
      prioridadeClasse = "low";
    }

    div.innerHTML = `
            <div class="task-info">
                <h3>${tarefa.titulo}</h3>

                <p>
                    Código: ${tarefa.codigo} |
                    Status: ${tarefa.concluida
      ? "Concluída"
      : "Pendente"}
                </p>

                <span class="priority ${prioridadeClasse}">
                    Prioridade ${tarefa.prioridade} - ${prioridadeTexto}
                </span>
            </div>

            <div class="task-actions">

                <button class="btn-done"
                    onclick="marcarConcluida(${tarefa.codigo})">
                    ${tarefa.concluida ? "Reabrir" : "Concluir"}
                </button>

                <button class="btn-edit"
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Editar
                </button>

                <button class="btn-delete"
                    onclick="excluirTarefa(${tarefa.codigo})">
                    Excluir
                </button>

            </div>
        `;

    lista.appendChild(div);
  });

  atualizarDashboard();
}

// Marcar tarefa como concluída
function marcarConcluida(codigo) {

  const tarefa = tarefas.find(t => t.codigo === codigo);

  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
    listarTarefas();
  }
}

// Alterar prioridade
function alterarPrioridade(codigo) {

  const tarefa = tarefas.find(t => t.codigo === codigo);

  if (!tarefa) return;

  const novaPrioridade = Number(
    prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
  );

  if (![1, 2, 3].includes(novaPrioridade)) {
    alert("Prioridade inválida! Digite 1, 2 ou 3.");
    return;
  }

  tarefa.prioridade = novaPrioridade;

  listarTarefas();

  alert("Prioridade alterada com sucesso!");
}

// Excluir tarefa
function excluirTarefa(codigo) {

  const confirmar = confirm(
    "Deseja realmente excluir esta tarefa?"
  );

  if (confirmar) {
    tarefas = tarefas.filter(t => t.codigo !== codigo);
    listarTarefas();
  }
}

// Atualizar indicadores
function atualizarDashboard() {

  const total = tarefas.length;

  const concluidas = tarefas.filter(
    t => t.concluida
  ).length;

  const pendentes = total - concluidas;

  document.getElementById("total").textContent = total;

  document.getElementById("pendentes").textContent =
    pendentes;

  document.getElementById("concluidas").textContent =
    concluidas;
}

// Evento do formulário
document.getElementById("formTarefa")
  .addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const prioridade = document.getElementById("prioridade").value;

    cadastrarTarefa(titulo, prioridade);

    if (titulo.trim().length >= 5 &&
      ["1", "2", "3"].includes(prioridade)) {

      this.reset();
    }
  });

// Inicializar sistema
listarTarefas();
