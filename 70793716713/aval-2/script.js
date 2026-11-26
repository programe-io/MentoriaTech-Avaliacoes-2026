const CHAVE_STORAGE = "gerenciador_tarefas_v1";

let tarefas = JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [
  {
    id: crypto.randomUUID(),
    titulo: "Preparar apresentação do projeto",
    prioridade: "Alta",
    prazo: "2026-11-28",
    concluida: false
  },
  {
    id: crypto.randomUUID(),
    titulo: "Organizar anotações de estudo",
    prioridade: "Média",
    prazo: "",
    concluida: true
  }
];

const form = document.getElementById("form-tarefa");
const listaTarefas = document.getElementById("lista-tarefas");
const filtroStatus = document.getElementById("filtro-status");
const buscaInput = document.getElementById("busca");

const elTotal = document.getElementById("total-tarefas");
const elPendentes = document.getElementById("tarefas-pendentes");
const elConcluidas = document.getElementById("tarefas-concluidas");

function salvar() {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(tarefas));
}

function classePrioridade(prioridade) {
  if (prioridade === "Alta") return "badge-alta";
  if (prioridade === "Baixa") return "badge-baixa";
  return "badge-media";
}

function formatarData(dataISO) {
  if (!dataISO) return "";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

function atualizarKPIs() {
  const concluidas = tarefas.filter((t) => t.concluida).length;
  elTotal.textContent = tarefas.length;
  elConcluidas.textContent = concluidas;
  elPendentes.textContent = tarefas.length - concluidas;
}

function renderizar() {
  const status = filtroStatus.value;
  const termo = buscaInput.value.trim().toLowerCase();

  const filtradas = tarefas.filter((tarefa) => {
    const matchStatus =
      status === "todas" ||
      (status === "pendentes" && !tarefa.concluida) ||
      (status === "concluidas" && tarefa.concluida);

    const matchBusca = tarefa.titulo.toLowerCase().includes(termo);
    return matchStatus && matchBusca;
  });

  listaTarefas.innerHTML = "";

  if (filtradas.length === 0) {
    listaTarefas.innerHTML = `<li class="vazio">Nenhuma tarefa encontrada.</li>`;
    atualizarKPIs();
    return;
  }

  filtradas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.className = `item-tarefa ${tarefa.concluida ? "tarefa-concluida" : ""}`;

    const prazoFormatado = tarefa.prazo ? `<span>Prazo: ${formatarData(tarefa.prazo)}</span>` : "";

    li.innerHTML = `
      <div class="item-principal">
        <input
          type="checkbox"
          ${tarefa.concluida ? "checked" : ""}
          onchange="alternarConclusao('${tarefa.id}')"
          aria-label="Marcar tarefa como concluída"
        />
        <div>
          <span class="titulo-tarefa">${tarefa.titulo}</span>
          <div class="meta-tarefa">
            <span class="badge ${classePrioridade(tarefa.prioridade)}">${tarefa.prioridade}</span>
            ${prazoFormatado}
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-excluir" onclick="removerTarefa('${tarefa.id}')">Excluir</button>
    `;

    listaTarefas.appendChild(li);
  });

  atualizarKPIs();
}

function alternarConclusao(id) {
  const tarefa = tarefas.find((t) => t.id === id);
  if (!tarefa) return;
  tarefa.concluida = !tarefa.concluida;
  salvar();
  renderizar();
}

function removerTarefa(id) {
  tarefas = tarefas.filter((t) => t.id !== id);
  salvar();
  renderizar();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const prioridade = document.getElementById("prioridade").value;
  const prazo = document.getElementById("prazo").value;

  if (!titulo) return;

  tarefas.unshift({
    id: crypto.randomUUID(),
    titulo,
    prioridade,
    prazo,
    concluida: false
  });

  salvar();
  renderizar();
  form.reset();
  document.getElementById("titulo").focus();
});

filtroStatus.addEventListener("change", renderizar);
buscaInput.addEventListener("input", renderizar);

renderizar();