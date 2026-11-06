// ===== Lógica do projeto (funções da aula) =====
const tarefas = [];
let geradorDeCodigo = 0;

function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve ser um valor entre 1 e 3.");
  }
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (!tarefa) {
    throw new Error("Tarefa com o código " + codigo + " não encontrada.");
  }
  return tarefa;
}

function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);
  geradorDeCodigo++;
  const novaTarefa = {
    codigo: geradorDeCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true // true = em execução, false = concluída
  };
  tarefas.push(novaTarefa);
}

function listarTarefas() {
  return tarefas;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  if (!tarefa.status) {
    throw new Error("A tarefa " + codigo + " já estava concluída.");
  }
  tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
  tarefa.prioridade = novaPrioridade;
}

// ===== Interface =====
const $ = (id) => document.getElementById(id);
const rotulo = { 1: "Alta", 2: "Média", 3: "Baixa" };

function mostrarErro(e) {
  const box = $("erro");
  box.textContent = e.message;
  box.style.display = "block";
}

function limparErro() {
  $("erro").style.display = "none";
}

function executar(acao) {
  try {
    acao();
    limparErro();
  } catch (e) {
    mostrarErro(e);
  }
  desenhar();
}

function desenhar() {
  const ul = $("lista");
  ul.innerHTML = "";
  const dados = listarTarefas();

  if (dados.length === 0) {
    ul.innerHTML = '<li class="vazio">Nenhuma tarefa cadastrada. Preencha o formulário acima para criar a primeira.</li>';
    return;
  }

  for (const t of dados) {
    const li = document.createElement("li");
    if (!t.status) li.className = "feita";

    const cod = document.createElement("span");
    cod.className = "cod";
    cod.textContent = "#" + t.codigo;

    const tit = document.createElement("span");
    tit.className = "tit";
    tit.textContent = t.titulo;

    const badge = document.createElement("span");
    badge.className = "badge p" + t.prioridade;
    badge.textContent = "P" + t.prioridade + " " + rotulo[t.prioridade];

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const sel = document.createElement("select");
    sel.setAttribute("aria-label", "Alterar prioridade da tarefa " + t.codigo);
    [1, 2, 3].forEach((p) => {
      const o = document.createElement("option");
      o.value = p;
      o.textContent = "Prioridade " + p;
      if (p === t.prioridade) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener("change", () =>
      executar(() => alterarPrioridade(t.codigo, Number(sel.value)))
    );

    const btn = document.createElement("button");
    btn.className = "sec";
    btn.textContent = t.status ? "Concluir" : "Concluída";
    btn.disabled = !t.status;
    btn.addEventListener("click", () => executar(() => concluirTarefa(t.codigo)));

    acoes.append(sel, btn);
    li.append(cod, tit, badge, acoes);
    ul.appendChild(li);
  }
}

$("form").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const titulo = $("titulo").value.trim();
  const prioridade = Number($("prioridade").value);
  try {
    cadastrarTarefa(titulo, prioridade);
    $("titulo").value = "";
    limparErro();
  } catch (e) {
    mostrarErro(e);
  }
  desenhar();
});

// Exemplos iniciais
cadastrarTarefa("Estudar arrays e objetos", 1);
cadastrarTarefa("Revisar funções em JavaScript", 2);
desenhar();