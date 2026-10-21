
const tarefas = [];
let proximoCodigo = 0;

const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");

function validarDadosDaTarefa(titulo, prioridade) {
  if (typeof titulo !== "string" || titulo.trim().length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }

  if (!Number.isInteger(prioridade) ||
      prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve estar entre 1 e 3.");
  }
}

function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  const tarefa = {
    codigo: ++proximoCodigo,
    titulo: titulo.trim(),
    prioridade: prioridade,
    status: true
  };

  tarefas.push(tarefa);
  listarTarefas();

  return tarefa;
}

function listarTarefas() {
  listaTarefas.replaceChildren();

  contador.textContent =
    `${tarefas.length} tarefa(s) cadastrada(s).`;

  if (tarefas.length === 0) {
    const mensagem = document.createElement("p");
    mensagem.className = "vazia";
    mensagem.textContent = "Nenhuma tarefa cadastrada.";
    listaTarefas.appendChild(mensagem);
    return tarefas;
  }

  tarefas.forEach(function(tarefa) {
    const card = document.createElement("article");
    card.className = "tarefa";

    if (!tarefa.status) {
      card.classList.add("concluida");
    }

    const titulo = document.createElement("h3");
    titulo.textContent = `${tarefa.codigo} - ${tarefa.titulo}`;

    const prioridade = document.createElement("p");
    const nomesPrioridade = {
      1: "Alta",
      2: "Média",
      3: "Baixa"
    };

    prioridade.textContent =
      `Prioridade: ${tarefa.prioridade} - ${nomesPrioridade[tarefa.prioridade]}`;

    const status = document.createElement("p");
    status.textContent = tarefa.status
      ? "Status: Em andamento"
      : "Status: Concluída";

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const botaoConcluir = document.createElement("button");
    botaoConcluir.className = "concluir";
    botaoConcluir.textContent = "Concluir";
    botaoConcluir.disabled = !tarefa.status;
    botaoConcluir.addEventListener("click", function() {
      try {
        concluirTarefa(tarefa.codigo);
      } catch (erro) {
        alert(erro.message);
      }
    });

    const botaoPrioridade = document.createElement("button");
    botaoPrioridade.className = "alterar";
    botaoPrioridade.textContent = "Alterar prioridade";
    botaoPrioridade.addEventListener("click", function() {
      const resposta = prompt(
        "Digite a nova prioridade: 1 (alta), 2 (média) ou 3 (baixa)"
      );

      if (resposta === null || resposta.trim() === "") {
        return;
      }

      const novaPrioridade = Number(resposta);

      try {
        alterarPrioridade(tarefa.codigo, novaPrioridade);
      } catch (erro) {
        alert(erro.message);
      }
    });

    acoes.append(botaoConcluir, botaoPrioridade);
    card.append(titulo, prioridade, status, acoes);
    listaTarefas.appendChild(card);
  });

  return tarefas;
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find(function(item) {
    return item.codigo === codigo;
  });

  if (!tarefa) {
    throw new Error("Tarefa não encontrada.");
  }

  return tarefa;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (!tarefa.status) {
    throw new Error("Esta tarefa já foi concluída.");
  }

  tarefa.status = false;
  listarTarefas();

  return tarefa;
}

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
  listarTarefas();

  return tarefa;
}

formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();

  const titulo = campoTitulo.value;
  const prioridade = Number(campoPrioridade.value);

  try {
    cadastrarTarefa(titulo, prioridade);
    formulario.reset();
    campoPrioridade.value = "2";
    campoTitulo.focus();
  } catch (erro) {
    alert(erro.message);
  }
});

listarTarefas();
