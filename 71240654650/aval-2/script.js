let tarefas = [];
let proximoCodigo = 0;

function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve estar entre 1 e 3.");
  }
}

function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  const novaTarefa = {
    codigo: proximoCodigo++,
    titulo: titulo,
    prioridade: Number(prioridade),
    status: true // true = Em execução / não concluída
  };

  tarefas.push(novaTarefa);
  renderizarTarefas();
}

function concluirTarefa(codigo) {
  const tarefa = tarefas.find(t => t.codigo === codigo);
  if (!tarefa) {
    throw new Error("Código não encontrado.");
  }
  if (!tarefa.status) {
    throw new Error("A tarefa já estava concluída.");
  }
  tarefa.status = false;
  renderizarTarefas();
}

function renderizarTarefas() {
  const listaEl = document.getElementById("lista-tarefas");
  listaEl.innerHTML = "";

  tarefas.forEach(tarefa => {
    const li = document.createElement("li");
    if (!tarefa.status) {
      li.classList.add("concluida");
    }

    li.innerHTML = `
      <div>
        <strong>[#${tarefa.codigo}] ${tarefa.titulo}</strong> 
        <br><small>Prioridade: ${tarefa.prioridade} | Status: ${tarefa.status ? 'Em execução' : 'Concluída'}</small>
      </div>
      ${tarefa.status ? `<button class="btn-concluir" onclick="tratarConclusao(${tarefa.codigo})">Concluir</button>` : ''}
    `;

    listaEl.appendChild(li);
  });
}

// Manipulação do Formulário
document.getElementById("form-tarefa").addEventListener("submit", function(event) {
  event.preventDefault();
  const erroEl = document.getElementById("mensagem-erro");
  erroEl.textContent = "";

  const titulo = document.getElementById("titulo").value;
  const prioridade = document.getElementById("prioridade").value;

  try {
    cadastrarTarefa(titulo, prioridade);
    document.getElementById("titulo").value = "";
  } catch (erro) {
    erroEl.textContent = erro.message;
  }
});

function tratarConclusao(codigo) {
  const erroEl = document.getElementById("mensagem-erro");
  erroEl.textContent = "";

  try {
    concluirTarefa(codigo);
  } catch (erro) {
    erroEl.textContent = erro.message;
  }
}