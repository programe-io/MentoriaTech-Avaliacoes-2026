const tarefas = [];
let proximoCodigo = 0;

function validarDadosDaTarefa(titulo, prioridade) {
  if (typeof titulo !== "string" || titulo.trim().length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }

  if (!Number.isInteger(prioridade) || prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve ser um número entre 1 e 3.");
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
  return tarefa;
}

function listarTarefas() {
  return tarefas;
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find(
    item => item.codigo === Number(codigo)
  );

  if (!tarefa) {
    throw new Error("Tarefa não encontrada.");
  }

  return tarefa;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (!tarefa.status) {
    throw new Error("Essa tarefa já está concluída.");
  }

  tarefa.status = false;
  return tarefa;
}

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
  tarefa.prioridade = novaPrioridade;

  return tarefa;
}

function exibirMensagem(texto, erro = false) {
  const elemento = document.getElementById("mensagem");
  elemento.textContent = texto;
  elemento.classList.toggle("erro", erro);
}

function adicionarTarefa() {
  const campoTitulo = document.getElementById("titulo");
  const campoPrioridade = document.getElementById("prioridade");

  try {
    const tarefa = cadastrarTarefa(
      campoTitulo.value,
      Number(campoPrioridade.value)
    );

    campoTitulo.value = "";
    campoPrioridade.value = "2";

    exibirMensagem(`Tarefa #${tarefa.codigo} adicionada com sucesso.`);
    campoTitulo.focus();
    desenharTarefas();
  } catch (erro) {
    exibirMensagem(erro.message, true);
    campoTitulo.focus();
  }
}

function desenharTarefas() {
  const lista = document.getElementById("lista");
  const filtro = document.getElementById("filtro").value;

  const visiveis = listarTarefas().filter(tarefa => {
    if (filtro === "andamento") return tarefa.status;
    if (filtro === "concluidas") return !tarefa.status;
    return true;
  });

  lista.replaceChildren();

  visiveis.forEach(tarefa => {
    const item = document.createElement("li");
    item.className = tarefa.status
      ? "tarefa"
      : "tarefa concluida";

    const descricao = document.createElement("div");

    const titulo = document.createElement("span");
    titulo.className = "titulo";
    titulo.textContent = `#${tarefa.codigo} — ${tarefa.titulo}`;

    const status = document.createElement("span");
    status.className = "status";
    status.textContent = tarefa.status
      ? "Em andamento"
      : "Concluída";

    descricao.append(titulo, status);

    const seletor = document.createElement("select");
    seletor.setAttribute(
      "aria-label",
      `Prioridade de ${tarefa.titulo}`
    );

    [1, 2, 3].forEach(numero => {
      const opcao = document.createElement("option");
      opcao.value = String(numero);
      opcao.textContent = `Prioridade ${numero}`;
      opcao.selected = tarefa.prioridade === numero;
      seletor.append(opcao);
    });

    seletor.disabled = !tarefa.status;

    seletor.addEventListener("change", () => {
      try {
        alterarPrioridade(tarefa.codigo, Number(seletor.value));
        exibirMensagem("Prioridade alterada.");
        desenharTarefas();
      } catch (erro) {
        exibirMensagem(erro.message, true);
      }
    });

    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = tarefa.status ? "Concluir" : "Concluída";
    botao.disabled = !tarefa.status;

    botao.addEventListener("click", () => {
      try {
        concluirTarefa(tarefa.codigo);
        exibirMensagem("Tarefa concluída!");
        desenharTarefas();
      } catch (erro) {
        exibirMensagem(erro.message, true);
      }
    });

    item.append(descricao, seletor, botao);
    lista.append(item);
  });

  const concluidas = tarefas.filter(
    tarefa => !tarefa.status
  ).length;

  document.getElementById("total").textContent =
    String(tarefas.length);

  document.getElementById("concluidas").textContent =
    String(concluidas);

  document.getElementById("andamento").textContent =
    String(tarefas.length - concluidas);

  document.getElementById("vazia").hidden =
    visiveis.length > 0;
}

desenharTarefas();
