// Lista principal de tarefas
let tarefas = [];

// ==========================================
// FUNÇÕES DE REGRA DE NEGÓCIO
// ==========================================

function validarTitulo(titulo) {
  if (!titulo || titulo.trim().length < 5) {
    throw new Error("O título deve ter, no mínimo, 5 caracteres.");
  }
}

function validarPrioridade(prioridade) {
  if (isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
  }
}

function buscarTarefaPorCodigo(codigoTarefa) {
  return tarefas.find((tarefa) => tarefa.codigo === codigoTarefa);
}

// 1. Cadastrar nova tarefa
function cadastrarTarefa(titulo, prioridade) {
  validarTitulo(titulo);
  validarPrioridade(prioridade);

  const novaTarefa = {
    codigo: tarefas.length + 1,
    titulo: titulo.trim(),
    prioridade: prioridade,
    concluida: false
  };

  tarefas.push(novaTarefa);
}

// 2. Marcar uma tarefa como concluída
function concluirTarefa(codigoTarefa) {
  const tarefa = buscarTarefaPorCodigo(codigoTarefa);

  if (!tarefa) {
    throw new Error("Tarefa não encontrada.");
  }

  if (tarefa.concluida) {
    throw new Error(`A tarefa #${codigoTarefa} já está concluída.`);
  }

  tarefa.concluida = true;
}

// 3. Alterar a prioridade de uma tarefa
function alterarPrioridade(codigoTarefa, novaPrioridade) {
  validarPrioridade(novaPrioridade);

  const tarefa = buscarTarefaPorCodigo(codigoTarefa);

  if (!tarefa) {
    throw new Error("Tarefa não encontrada.");
  }

  tarefa.prioridade = novaPrioridade;
}

// ==========================================
// MANIPULAÇÃO DO DOM E EVENTOS DA INTERFACE
// ==========================================

function exibirMensagem(texto, tipo) {
  const box = document.getElementById("mensagem");
  box.textContent = texto;
  box.className = `mensagem ${tipo}`;
}

function formatarPrioridade(valor) {
  const mapa = {
    1: "1 - Alta",
    2: "2 - Média",
    3: "3 - Baixa"
  };
  return mapa[valor] || valor;
}

// 4. Listar as tarefas cadastradas
function listarTarefas() {
  console.log(tarefas);

  const tbody = document.getElementById("lista-tarefas");
  const avisoVazio = document.getElementById("aviso-vazio");
  tbody.innerHTML = "";

  if (tarefas.length === 0) {
    avisoVazio.style.display = "block";
    return;
  }

  avisoVazio.style.display = "none";

  tarefas.forEach((tarefa) => {
    const tr = document.createElement("tr");
    if (tarefa.concluida) {
      tr.classList.add("tarefa-concluida");
    }

    const textoStatus = tarefa.concluida ? "Concluída" : "Pendente";
    const classeStatus = tarefa.concluida ? "status-concluida" : "status-pendente";

    tr.innerHTML = `
      <td><strong>#${tarefa.codigo}</strong></td>
      <td class="titulo-col">${tarefa.titulo}</td>
      <td><span class="badge prio-${tarefa.prioridade}">${formatarPrioridade(tarefa.prioridade)}</span></td>
      <td class="${classeStatus}">${textoStatus}</td>
      <td>
        ${
          !tarefa.concluida
            ? `<button type="button" class="btn-tabela" onclick="concluirPeloBotao(${tarefa.codigo})">Concluir</button>`
            : "—"
        }
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// Ação direta pelo botão da tabela
function concluirPeloBotao(codigo) {
  try {
    concluirTarefa(codigo);
    listarTarefas();
    exibirMensagem(`Tarefa #${codigo} marcada como concluída!`, "sucesso");
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
}

// Evento: Cadastrar Tarefa
document.getElementById("form-cadastro").addEventListener("submit", function (event) {
  event.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const prioridade = Number(document.getElementById("prioridade").value);

  try {
    cadastrarTarefa(titulo, prioridade);
    listarTarefas();
    exibirMensagem("Tarefa cadastrada com sucesso!", "sucesso");
    event.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
});

// Evento: Concluir Tarefa pelo formulário de código
document.getElementById("form-concluir").addEventListener("submit", function (event) {
  event.preventDefault();

  const codigo = Number(document.getElementById("codigo-concluir").value);

  try {
    concluirTarefa(codigo);
    listarTarefas();
    exibirMensagem(`Tarefa #${codigo} marcada como concluída!`, "sucesso");
    event.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
});

// Evento: Alterar Prioridade
document.getElementById("form-prioridade").addEventListener("submit", function (event) {
  event.preventDefault();

  const codigo = Number(document.getElementById("codigo-prioridade").value);
  const novaPrioridade = Number(document.getElementById("nova-prioridade").value);

  try {
    alterarPrioridade(codigo, novaPrioridade);
    listarTarefas();
    exibirMensagem(`Prioridade da tarefa #${codigo} atualizada!`, "sucesso");
    event.target.reset();
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
});

// Inicializa a listagem ao abrir a página
listarTarefas();