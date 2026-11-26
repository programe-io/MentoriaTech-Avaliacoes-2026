let tarefas = [];
let proximoCodigo = 1;

function adicionarTarefa() {
  const inputTitulo = document.getElementById("titulo");
  const selectPrioridade = document.getElementById("prioridade");
  const msgErro = document.getElementById("mensagem-erro");

  const titulo = inputTitulo.value.trim();
  const prioridade = Number(selectPrioridade.value);

  // Validação: mínimo 5 caracteres
  if (titulo.length < 5) {
    msgErro.textContent = "Erro: O título deve ter no mínimo 5 caracteres.";
    return;
  }

  // Validação: prioridade entre 1 e 3
  if (!.includes(prioridade)) {
    msgErro.textContent = "Erro: A prioridade deve ser entre 1 (alta) e 3 (baixa).";
    return;
  }

  msgErro.textContent = "";

  tarefas.push({
    codigo: proximoCodigo++,
    titulo: titulo,
    prioridade: prioridade,
    concluida: false
  });

  inputTitulo.value = "";
  renderizarTarefas();
}

function concluirTarefa(codigo) {
  const tarefa = tarefas.find(t => t.codigo === codigo);
  if (tarefa) {
    tarefa.concluida = true;
    renderizarTarefas();
  }
}

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = tarefas.find(t => t.codigo === codigo);
  const prioridadeNum = Number(novaPrioridade);

  if (tarefa && .includes(prioridadeNum)) {
    tarefa.prioridade = prioridadeNum;
    renderizarTarefas();
  }
}

function renderizarTarefas() {
  const lista = document.getElementById("lista-tarefas");
  lista.innerHTML = "";

  tarefas.forEach(tarefa => {
    const li = document.createElement("li");
    if (tarefa.concluida) li.classList.add("concluida");

    li.innerHTML = `
      <span class="info">
        <strong>#${tarefa.codigo}</strong> - ${tarefa.titulo}
      </span>
      <div class="acoes">
        <select onchange="alterarPrioridade(${tarefa.codigo}, this.value)">
          <option value="1" ${tarefa.prioridade === 1 ? "selected" : ""}>1 - Alta</option>
          <option value="2" ${tarefa.prioridade === 2 ? "selected" : ""}>2 - Média</option>
          <option value="3" ${tarefa.prioridade === 3 ? "selected" : ""}>3 - Baixa</option>
        </select>
        ${!tarefa.concluida 
          ? `<button class="btn-concluir" onclick="concluirTarefa(${tarefa.codigo})">Concluir</button>` 
          : `<span>✔</span>`
        }
      </div>
    `;

    lista.appendChild(li);
  });
}