const CHAVE_STORAGE = "painel_tarefas_v2";

const pesoPrioridade = {
  urgente: 3,
  normal: 2,
  leve: 1
};

const rotuloPrioridade = {
  urgente: "Urgente",
  normal: "Normal",
  leve: "Leve"
};

const form = document.getElementById("novoItemForm");
const tituloInput = document.getElementById("tituloInput");
const nivelInput = document.getElementById("nivelInput");
const prazoInput = document.getElementById("prazoInput");
const listaEl = document.getElementById("listaItens");
const vazioMsg = document.getElementById("vazioMsg");
const contadorTexto = document.getElementById("contadorTexto");
const percentualTexto = document.getElementById("percentualTexto");
const progressBarFill = document.getElementById("progressBarFill");
const ordenarSelect = document.getElementById("ordenarSelect");
const limparFeitasBtn = document.getElementById("limparFeitasBtn");
const tabs = document.querySelectorAll(".tab");

let filtroAtual = "todas";
let tarefas = carregar();

function carregar() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_STORAGE));
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

function persistir() {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(tarefas));
}

function hojeISO() {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function formatarDataBR(iso) {
  if (!iso) return "";
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

function escapar(texto) {
  const span = document.createElement("span");
  span.textContent = texto;
  return span.innerHTML;
}

function atualizarProgresso() {
  const total = tarefas.length;
  const feitas = tarefas.filter((t) => t.feita).length;
  const pct = total === 0 ? 0 : Math.round((feitas / total) * 100);

  contadorTexto.textContent = `${feitas} de ${total} concluídas`;
  percentualTexto.textContent = `${pct}%`;
  progressBarFill.style.width = `${pct}%`;
}

function obterTarefasExibidas() {
  let resultado = tarefas.filter((t) => {
    if (filtroAtual === "abertas") return !t.feita;
    if (filtroAtual === "feitas") return t.feita;
    return true;
  });

  const criterio = ordenarSelect.value;

  if (criterio === "prioridade") {
    resultado.sort((a, b) => pesoPrioridade[b.nivel] - pesoPrioridade[a.nivel]);
  } else if (criterio === "prazo") {
    resultado.sort((a, b) => {
      if (!a.prazo && !b.prazo) return 0;
      if (!a.prazo) return 1;
      if (!b.prazo) return -1;
      return a.prazo.localeCompare(b.prazo);
    });
  } else {
    resultado.sort((a, b) => b.criadoEm - a.criadoEm);
  }

  return resultado;
}

function renderizar() {
  atualizarProgresso();
  const itens = obterTarefasExibidas();
  const hoje = hojeISO();

  listaEl.innerHTML = "";
  vazioMsg.classList.toggle("hidden", itens.length > 0);

  for (const tarefa of itens) {
    const vencida = !tarefa.feita && tarefa.prazo && tarefa.prazo < hoje;
    const li = document.createElement("li");
    li.className = `todo-item ${tarefa.feita ? "feita" : ""}`;

    li.innerHTML = `
      <div class="todo-esq">
        <input
          type="checkbox"
          class="todo-check"
          data-acao="alternar"
          data-id="${tarefa.id}"
          ${tarefa.feita ? "checked" : ""}
        />
        <div class="todo-info">
          <span class="todo-titulo">${escapar(tarefa.titulo)}</span>
          <div class="todo-tags">
            <span class="tag tag-${tarefa.nivel}">${rotuloPrioridade[tarefa.nivel]}</span>
            ${
              tarefa.prazo
                ? `<span class="prazo-txt ${vencida ? "vencido" : ""}">Prazo: ${formatarDataBR(tarefa.prazo)}${vencida ? " (Vencida)" : ""}</span>`
                : ""
            }
          </div>
        </div>
      </div>
      <div class="todo-acoes">
        <button type="button" class="icon-btn" data-acao="renomear" data-id="${tarefa.id}">Editar</button>
        <button type="button" class="icon-btn del" data-acao="excluir" data-id="${tarefa.id}">Excluir</button>
      </div>
    `;

    listaEl.appendChild(li);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = tituloInput.value.trim();
  if (!titulo) return;

  tarefas.push({
    id: crypto.randomUUID(),
    titulo,
    nivel: nivelInput.value,
    prazo: prazoInput.value,
    feita: false,
    criadoEm: Date.now()
  });

  persistir();
  renderizar();
  tituloInput.value = "";
  prazoInput.value = "";
  tituloInput.focus();
});

listaEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-acao]");
  if (!btn) return;

  const { acao, id } = btn.dataset;
  const alvo = tarefas.find((t) => t.id === id);
  if (!alvo) return;

  if (acao === "alternar") {
    alvo.feita = !alvo.feita;
  } else if (acao === "renomear") {
    const novoTitulo = prompt("Editar tarefa:", alvo.titulo);
    if (novoTitulo !== null && novoTitulo.trim() !== "") {
      alvo.titulo = novoTitulo.trim();
    }
  } else if (acao === "excluir") {
    tarefas = tarefas.filter((t) => t.id !== id);
  }

  persistir();
  renderizar();
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    filtroAtual = tab.dataset.filtro;
    renderizar();
  });
});

ordenarSelect.addEventListener("change", renderizar);

limparFeitasBtn.addEventListener("click", () => {
  tarefas = tarefas.filter((t) => !t.feita);
  persistir();
  renderizar();
});

renderizar();