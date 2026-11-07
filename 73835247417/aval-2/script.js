// ===== Dados =====
const tarefas = [];
let proximoCodigo = 1;

const NOMES_PRIORIDADE = { 1: "Alta", 2: "Média", 3: "Baixa" };

// ===== Regras de validação =====
function validarTitulo(titulo) {
  return typeof titulo === "string" && titulo.trim().length >= 5;
}

function validarPrioridade(prioridade) {
  return Number.isInteger(prioridade) && prioridade >= 1 && prioridade <= 3;
}

// ===== Funções principais =====
function cadastrarTarefa(titulo, prioridade) {
  if (!validarTitulo(titulo)) {
    return { ok: false, mensagem: "O título deve ter no mínimo 5 caracteres." };
  }
  if (!validarPrioridade(prioridade)) {
    return { ok: false, mensagem: "A prioridade deve ser entre 1 (alta) e 3 (baixa)." };
  }
  const tarefa = {
    codigo: proximoCodigo++,
    titulo: titulo.trim(),
    prioridade: prioridade,
    concluida: false
  };
  tarefas.push(tarefa);
  return { ok: true, mensagem: "Tarefa cadastrada com sucesso!" };
}

function listarTarefas() {
  return tarefas;
}

function concluirTarefa(codigo) {
  const tarefa = tarefas.find(function (t) { return t.codigo === codigo; });
  if (!tarefa) return { ok: false, mensagem: "Tarefa não encontrada." };
  if (tarefa.concluida) return { ok: false, mensagem: "Essa tarefa já está concluída." };
  tarefa.concluida = true;
  return { ok: true, mensagem: "Tarefa marcada como concluída!" };
}

function alterarPrioridade(codigo, novaPrioridade) {
  if (!validarPrioridade(novaPrioridade)) {
    return { ok: false, mensagem: "A prioridade deve ser entre 1 (alta) e 3 (baixa)." };
  }
  const tarefa = tarefas.find(function (t) { return t.codigo === codigo; });
  if (!tarefa) return { ok: false, mensagem: "Tarefa não encontrada." };
  tarefa.prioridade = novaPrioridade;
  return { ok: true, mensagem: "Prioridade alterada com sucesso!" };
}

// ===== Interface =====
const form = document.getElementById("form-tarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const mensagem = document.getElementById("mensagem");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");

function mostrarMensagem(resultado) {
  mensagem.textContent = resultado.mensagem;
  mensagem.className = resultado.ok ? "sucesso" : "erro";
}

function renderizar() {
  lista.innerHTML = "";
  const todas = listarTarefas();

  contador.textContent = todas.length + (todas.length === 1 ? " tarefa" : " tarefas");

  if (todas.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "vazio";
    vazio.textContent = "Nenhuma tarefa cadastrada ainda.";
    lista.appendChild(vazio);
    return;
  }

  todas.forEach(function (tarefa) {
    const li = document.createElement("li");
    li.className = "tarefa p" + tarefa.prioridade + (tarefa.concluida ? " concluida" : "");

    const codigo = document.createElement("span");
    codigo.className = "codigo";
    codigo.textContent = "#" + tarefa.codigo;

    const titulo = document.createElement("span");
    titulo.className = "titulo";
    titulo.textContent = tarefa.titulo;

    const status = document.createElement("span");
    status.className = "status";
    status.textContent = tarefa.concluida ? "Concluída" : "Pendente";

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const seletor = document.createElement("select");
    seletor.setAttribute("aria-label", "Alterar prioridade");
    [1, 2, 3].forEach(function (p) {
      const op = document.createElement("option");
      op.value = p;
      op.textContent = p + " - " + NOMES_PRIORIDADE[p];
      if (p === tarefa.prioridade) op.selected = true;
      seletor.appendChild(op);
    });
    seletor.addEventListener("change", function () {
      mostrarMensagem(alterarPrioridade(tarefa.codigo, Number(seletor.value)));
      renderizar();
    });

    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = tarefa.concluida ? "Concluída ✓" : "Concluir";
    botao.disabled = tarefa.concluida;
    botao.addEventListener("click", function () {
      mostrarMensagem(concluirTarefa(tarefa.codigo));
      renderizar();
    });

    acoes.appendChild(seletor);
    acoes.appendChild(botao);
    li.appendChild(codigo);
    li.appendChild(titulo);
    li.appendChild(status);
    li.appendChild(acoes);
    lista.appendChild(li);
  });
}

form.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const resultado = cadastrarTarefa(campoTitulo.value, Number(campoPrioridade.value));
  mostrarMensagem(resultado);
  if (resultado.ok) {
    campoTitulo.value = "";
    campoPrioridade.value = "2";
    renderizar();
  }
  campoTitulo.focus();
});

renderizar();