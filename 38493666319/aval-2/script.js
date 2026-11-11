const form = document.querySelector("#form-tarefa");
const campoTitulo = document.querySelector("#titulo");
const campoPrioridade = document.querySelector("#prioridade");
const listaTarefas = document.querySelector("#lista-tarefas");
const resumo = document.querySelector("#resumo");
const mensagem = document.querySelector("#mensagem");
const CHAVE_STORAGE = "gerenciador-de-tarefas-v1";

function carregarTarefas() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_STORAGE) || "[]");
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

let tarefas = carregarTarefas();
let proximoCodigo = tarefas.reduce(
  (maior, tarefa) => Math.max(maior, Number(tarefa.codigo) || 0),
  0
) + 1;

function salvarTarefas() {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(tarefas));
}

function nomePrioridade(prioridade) {
  return { 1: "Alta", 2: "Média", 3: "Baixa" }[prioridade] || "Inválida";
}

function criarEtiqueta(texto, classe = "") {
  const etiqueta = document.createElement("span");
  etiqueta.className = `etiqueta ${classe}`.trim();
  etiqueta.textContent = texto;
  return etiqueta;
}

function renderizarTarefas() {
  listaTarefas.replaceChildren();

  if (tarefas.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "vazio";
    vazio.textContent = "Você ainda não cadastrou tarefas.";
    listaTarefas.append(vazio);
    resumo.textContent = "0 tarefas";
    return;
  }

  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
  resumo.textContent = `${tarefas.length} ${tarefas.length === 1 ? "tarefa" : "tarefas"} · ${concluidas} concluída${concluidas === 1 ? "" : "s"}`;

  for (const tarefa of tarefas) {
    const item = document.createElement("li");
    item.className = `tarefa${tarefa.concluida ? " tarefa-concluida" : ""}`;

    const informacoes = document.createElement("div");
    informacoes.className = "tarefa-info";

    const codigo = document.createElement("span");
    codigo.className = "tarefa-codigo";
    codigo.textContent = `Tarefa #${tarefa.codigo}`;

    const titulo = document.createElement("p");
    titulo.className = "tarefa-titulo";
    titulo.textContent = tarefa.titulo;

    const etiquetas = document.createElement("div");
    etiquetas.className = "etiquetas";
    etiquetas.append(
      criarEtiqueta(
        `Prioridade ${tarefa.prioridade} — ${nomePrioridade(tarefa.prioridade)}`,
        `prioridade-${tarefa.prioridade}`
      ),
      criarEtiqueta(
        tarefa.concluida ? "Concluída" : "Pendente",
        tarefa.concluida ? "status-concluida" : ""
      )
    );

    informacoes.append(codigo, titulo, etiquetas);

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const seletor = document.createElement("select");
    seletor.className = "seletor-prioridade";
    seletor.setAttribute("aria-label", `Nova prioridade da tarefa ${tarefa.codigo}`);
    for (const valor of [1, 2, 3]) {
      const opcao = document.createElement("option");
      opcao.value = String(valor);
      opcao.textContent = `${valor} — ${nomePrioridade(valor)}`;
      opcao.selected = valor === Number(tarefa.prioridade);
      seletor.append(opcao);
    }

    const botaoAlterar = document.createElement("button");
    botaoAlterar.type = "button";
    botaoAlterar.className = "botao botao-secundario";
    botaoAlterar.textContent = "Alterar prioridade";
    botaoAlterar.addEventListener("click", () => {
      tarefa.prioridade = Number(seletor.value);
      salvarTarefas();
      renderizarTarefas();
      mostrarMensagem(`Prioridade da tarefa #${tarefa.codigo} atualizada.`, false);
    });

    const botaoConcluir = document.createElement("button");
    botaoConcluir.type = "button";
    botaoConcluir.className = "botao botao-secundario";
    botaoConcluir.textContent = tarefa.concluida ? "Concluída" : "Concluir";
    botaoConcluir.disabled = Boolean(tarefa.concluida);
    botaoConcluir.addEventListener("click", () => {
      tarefa.concluida = true;
      salvarTarefas();
      renderizarTarefas();
      mostrarMensagem(`Tarefa #${tarefa.codigo} marcada como concluída.`, false);
    });

    acoes.append(seletor, botaoAlterar, botaoConcluir);
    item.append(informacoes, acoes);
    listaTarefas.append(item);
  }
}

function mostrarMensagem(texto, erro = true) {
  mensagem.textContent = texto;
  mensagem.style.color = erro ? "#b42318" : "#18794e";
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const titulo = campoTitulo.value.trim();
  const prioridade = Number(campoPrioridade.value);

  if (titulo.length < 5) {
    mostrarMensagem("O título deve ter pelo menos 5 caracteres.");
    campoTitulo.focus();
    return;
  }

  if (![1, 2, 3].includes(prioridade)) {
    mostrarMensagem("Escolha uma prioridade entre 1 e 3.");
    campoPrioridade.focus();
    return;
  }

  tarefas.push({
    codigo: proximoCodigo++,
    titulo,
    prioridade,
    concluida: false,
  });

  salvarTarefas();
  renderizarTarefas();
  form.reset();
  campoPrioridade.value = "2";
  campoTitulo.focus();
  mostrarMensagem("Tarefa cadastrada com sucesso.", false);
});

renderizarTarefas();
