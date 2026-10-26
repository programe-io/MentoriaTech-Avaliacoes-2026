
const CHAVE = "gerenciador_tarefas";

let tarefas = [];

try {
  const dados = JSON.parse(localStorage.getItem(CHAVE));
  tarefas = Array.isArray(dados) ? dados : [];
} catch {
  tarefas = [];
}

const formulario = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");

function salvarDados() {
  localStorage.setItem(CHAVE, JSON.stringify(tarefas));
}

function atualizarDashboard() {
  document.getElementById("total").textContent = tarefas.length;

  document.getElementById("pendentes").textContent =
    tarefas.filter(t => !t.concluida).length;

  document.getElementById("concluidas").textContent =
    tarefas.filter(t => t.concluida).length;
}

function criarBotao(texto, classe, acao) {
  const botao = document.createElement("button");
  botao.textContent = texto;
  botao.className = classe;
  botao.type = "button";
  botao.addEventListener("click", acao);
  return botao;
}

function criarTexto(tag, texto) {
  const elemento = document.createElement(tag);
  elemento.textContent = texto;
  return elemento;
}

function formatarData(data) {
  if (!data) return "Sem prazo";
  return new Date(data + "T12:00:00")
    .toLocaleDateString("pt-BR");
}

function listarTarefas() {
  lista.replaceChildren();

  const pesquisa = document.getElementById("pesquisa")
    .value.toLowerCase();

  const filtro = document.getElementById("filtroStatus").value;

  const filtradas = tarefas.filter(tarefa => {
    const correspondePesquisa =
      tarefa.titulo.toLowerCase().includes(pesquisa);

    const correspondeStatus =
      filtro === "todas" ||
      (filtro === "pendentes" && !tarefa.concluida) ||
      (filtro === "concluidas" && tarefa.concluida);

    return correspondePesquisa && correspondeStatus;
  });

  if (filtradas.length === 0) {
    lista.appendChild(
      criarTexto("p", "Nenhuma tarefa encontrada.")
    );
    atualizarDashboard();
    return;
  }

  filtradas.forEach(tarefa => {
    const div = document.createElement("div");
    div.className = "tarefa";

    if (tarefa.concluida) {
      div.classList.add("concluida");
    }

    div.appendChild(criarTexto("h3", tarefa.titulo));
    div.appendChild(criarTexto("p", tarefa.descricao));

    const prioridade = criarTexto(
      "span",
      tarefa.prioridade === 1 ? "Alta" :
      tarefa.prioridade === 2 ? "Média" : "Baixa"
    );

    prioridade.className = "prioridade " +
      (tarefa.prioridade === 1 ? "alta" :
       tarefa.prioridade === 2 ? "media" : "baixa");

    div.appendChild(prioridade);

    const data = criarTexto(
      "p",
      "📅 Prazo: " + formatarData(tarefa.data)
    );
    div.appendChild(data);

    const status = criarTexto(
      "p",
      tarefa.concluida ? "✅ Concluída" : "⏳ Pendente"
    );
    div.appendChild(status);

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    acoes.appendChild(
      criarBotao(
        tarefa.concluida ? "Reabrir" : "Concluir",
        "btn-concluir",
        () => alternarStatus(tarefa.id)
      )
    );

    acoes.appendChild(
      criarBotao(
        "Editar",
        "btn-editar",
        () => editarTarefa(tarefa.id)
      )
    );

    acoes.appendChild(
      criarBotao(
        "Excluir",
        "btn-excluir",
        () => excluirTarefa(tarefa.id)
      )
    );

    div.appendChild(acoes);
    lista.appendChild(div);
  });

  atualizarDashboard();
}

formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();

  const id = document.getElementById("tarefaId").value;
  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const prioridade = Number(
    document.getElementById("prioridade").value
  );
  const data = document.getElementById("data").value;

  if (titulo.length < 5) {
    alert("O título deve ter no mínimo 5 caracteres.");
    return;
  }

  if (![1, 2, 3].includes(prioridade)) {
    alert("A prioridade deve ser entre 1 e 3.");
    return;
  }

  if (id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) return;

    tarefa.titulo = titulo;
    tarefa.descricao = descricao;
    tarefa.prioridade = prioridade;
    tarefa.data = data;
  } else {
    tarefas.push({
      id: crypto.randomUUID(),
      titulo,
      descricao,
      prioridade,
      data,
      concluida: false
    });
  }

  salvarDados();
  cancelarEdicao();
  listarTarefas();

  alert("Tarefa salva com sucesso!");
});

function alternarStatus(id) {
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) return;

  tarefa.concluida = !tarefa.concluida;

  salvarDados();
  listarTarefas();
}

function editarTarefa(id) {
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) return;

  document.getElementById("tarefaId").value = tarefa.id;
  document.getElementById("titulo").value = tarefa.titulo;
  document.getElementById("descricao").value = tarefa.descricao;
  document.getElementById("prioridade").value = tarefa.prioridade;
  document.getElementById("data").value = tarefa.data;

  document.getElementById("tituloFormulario").textContent =
    "Editar Tarefa";

  document.getElementById("cancelarEdicao").hidden = false;

  formulario.scrollIntoView({ behavior: "smooth" });
}

function excluirTarefa(id) {
  if (!confirm("Deseja realmente excluir esta tarefa?")) {
    return;
  }

  tarefas = tarefas.filter(t => t.id !== id);

  salvarDados();
  listarTarefas();
}

function cancelarEdicao() {
  formulario.reset();

  document.getElementById("tarefaId").value = "";
  document.getElementById("tituloFormulario").textContent =
    "Cadastrar Nova Tarefa";

  document.getElementById("cancelarEdicao").hidden = true;
}

document.getElementById("cancelarEdicao")
  .addEventListener("click", cancelarEdicao);

document.getElementById("pesquisa")
  .addEventListener("input", listarTarefas);

document.getElementById("filtroStatus")
  .addEventListener("change", listarTarefas);

listarTarefas();
