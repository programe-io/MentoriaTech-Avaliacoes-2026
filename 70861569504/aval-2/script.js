/* =========================================================
   Rotina – gerenciador de tarefas recorrentes
   - Cada tarefa tem nome, período do dia e dias da semana.
   - As conclusões são guardadas por data: { "2026-11-18": [ids] }
   - A sequência (streak) conta dias seguidos em que a tarefa
     estava programada e foi concluída.
   ========================================================= */

// ---------- Constantes ----------
const PERIODOS = [
  { id: "manha", nome: "Manhã" },
  { id: "tarde", nome: "Tarde" },
  { id: "noite", nome: "Noite" }
];
const DIAS_ABREV = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const PRESETS = {
  todos: [0, 1, 2, 3, 4, 5, 6],
  uteis: [1, 2, 3, 4, 5],
  fds: [0, 6]
};
const CHAVE_STORAGE = "rotina-dados";

// ---------- Datas ----------
function chaveData(data) {
  const a = data.getFullYear();
  const m = String(data.getMonth() + 1).padStart(2, "0");
  const d = String(data.getDate()).padStart(2, "0");
  return `${a}-${m}-${d}`;
}

function dataDaChave(chave) {
  const [a, m, d] = chave.split("-").map(Number);
  return new Date(a, m - 1, d, 12);
}

function somarDias(chave, n) {
  const d = dataDaChave(chave);
  d.setDate(d.getDate() + n);
  return chaveData(d);
}

const HOJE = chaveData(new Date());

// ---------- Estado ----------
let { tarefas, concluidas } = carregar();
let dataSel = HOJE;

function carregar() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_STORAGE));
    if (dados && Array.isArray(dados.tarefas)) {
      return { tarefas: dados.tarefas, concluidas: dados.concluidas || {} };
    }
  } catch (e) { /* ignora e usa exemplos */ }

  // primeira visita: algumas tarefas de exemplo
  return {
    tarefas: [
      { id: 1, nome: "Beber um copo de água", periodo: "manha", dias: PRESETS.todos, criada: HOJE },
      { id: 2, nome: "Alongar por 10 minutos", periodo: "manha", dias: PRESETS.uteis, criada: HOJE },
      { id: 3, nome: "Revisar a lista de compromissos", periodo: "tarde", dias: PRESETS.uteis, criada: HOJE },
      { id: 4, nome: "Ler 20 páginas", periodo: "noite", dias: PRESETS.todos, criada: HOJE }
    ],
    concluidas: {}
  };
}

function salvar() {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify({ tarefas, concluidas }));
  } catch (e) { /* ignora */ }
}

// ---------- Regras ----------
function tarefasDoDia(chave) {
  const diaSemana = dataDaChave(chave).getDay();
  return tarefas.filter((t) => t.dias.includes(diaSemana) && t.criada <= chave);
}

function estaFeita(id, chave) {
  return (concluidas[chave] || []).includes(id);
}

function alternar(id, chave) {
  const lista = concluidas[chave] || [];
  concluidas[chave] = lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id];
  salvar();
  renderizar();
}

function progressoDoDia(chave) {
  const doDia = tarefasDoDia(chave);
  const feitas = doDia.filter((t) => estaFeita(t.id, chave)).length;
  return { feitas, total: doDia.length };
}

function sequenciaDaTarefa(tarefa) {
  let seq = 0;
  let chave = HOJE;

  while (chave >= tarefa.criada) {
    const diaSemana = dataDaChave(chave).getDay();
    if (tarefa.dias.includes(diaSemana)) {
      if (estaFeita(tarefa.id, chave)) seq++;
      else if (chave !== HOJE) break;   // hoje ainda pode ser feita
    }
    chave = somarDias(chave, -1);
  }
  return seq;
}

function adicionarTarefa(nome, periodo, dias) {
  const id = tarefas.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  tarefas.push({ id, nome, periodo, dias, criada: HOJE });
  salvar();
  renderizar();
}

function excluirTarefa(id) {
  tarefas = tarefas.filter((t) => t.id !== id);
  for (const chave of Object.keys(concluidas)) {
    concluidas[chave] = concluidas[chave].filter((x) => x !== id);
  }
  salvar();
  renderizar();
}

// ---------- Renderização ----------
function renderizarCabecalho() {
  const data = dataDaChave(dataSel);
  const ehHoje = dataSel === HOJE;

  document.getElementById("titulo-data").textContent = ehHoje
    ? "Hoje"
    : data.toLocaleDateString("pt-BR", { weekday: "long" });

  document.getElementById("subtitulo-data").textContent =
    data.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });

  const { feitas, total } = progressoDoDia(dataSel);
  const anel = document.getElementById("anel");
  const graus = total === 0 ? 0 : (feitas / total) * 360;

  anel.style.setProperty("--graus", `${graus}deg`);
  anel.classList.toggle("completo", total > 0 && feitas === total);
  anel.setAttribute("aria-label", `${feitas} de ${total} tarefas feitas`);
  document.getElementById("anel-numero").textContent = `${feitas}/${total}`;
}

function renderizarSemana() {
  const nav = document.getElementById("semana");
  nav.innerHTML = "";

  const domingo = somarDias(HOJE, -dataDaChave(HOJE).getDay());

  for (let i = 0; i < 7; i++) {
    const chave = somarDias(domingo, i);
    const { feitas, total } = progressoDoDia(chave);
    const pct = total === 0 ? 0 : Math.round((feitas / total) * 100);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dia" + (chave === HOJE ? " hoje" : "");
    btn.setAttribute("aria-pressed", String(chave === dataSel));
    btn.setAttribute("aria-label", `${dataDaChave(chave).toLocaleDateString("pt-BR", { weekday: "long", day: "numeric" })}: ${pct}% concluído`);
    btn.innerHTML = `
      <span class="dia-nome">${DIAS_ABREV[i]}</span>
      <span class="dia-numero">${dataDaChave(chave).getDate()}</span>
      <span class="dia-barra"><i style="width:${pct}%"></i></span>
    `;
    btn.addEventListener("click", () => {
      dataSel = chave;
      renderizar();
    });
    nav.appendChild(btn);
  }
}

function renderizarLista() {
  const container = document.getElementById("lista-periodos");
  const msg = document.getElementById("msg-vazio");
  container.innerHTML = "";

  const doDia = tarefasDoDia(dataSel);
  const { feitas, total } = progressoDoDia(dataSel);
  const futuro = dataSel > HOJE;

  if (total === 0) {
    msg.hidden = false;
    msg.textContent = "Nenhuma tarefa para este dia. Use o formulário para criar uma rotina.";
    return;
  }

  msg.hidden = feitas !== total;
  if (feitas === total) msg.textContent = "Tudo feito neste dia. Bom trabalho!";

  PERIODOS.forEach((periodo) => {
    const grupo = doDia.filter((t) => t.periodo === periodo.id);
    if (grupo.length === 0) return;

    const feitasGrupo = grupo.filter((t) => estaFeita(t.id, dataSel)).length;

    const secao = document.createElement("div");
    secao.className = "periodo";
    secao.innerHTML = `<h3 class="periodo-titulo">${periodo.nome} <small>${feitasGrupo} de ${grupo.length}</small></h3>`;

    const ul = document.createElement("ul");
    ul.className = "lista-tarefas";

    grupo.forEach((t) => {
      const feita = estaFeita(t.id, dataSel);
      const li = document.createElement("li");
      li.className = "tarefa" + (feita ? " feita" : "");

      const label = document.createElement("label");
      const check = document.createElement("input");
      check.type = "checkbox";
      check.checked = feita;
      check.disabled = futuro;
      check.addEventListener("change", () => alternar(t.id, dataSel));

      const nome = document.createElement("span");
      nome.className = "tarefa-nome";
      nome.textContent = t.nome;   // textContent evita injeção de HTML

      label.append(check, nome);
      li.appendChild(label);

      const seq = sequenciaDaTarefa(t);
      if (seq >= 2) {
        const badge = document.createElement("span");
        badge.className = "sequencia";
        badge.textContent = `${seq} dias seguidos`;
        li.appendChild(badge);
      }

      const excluir = document.createElement("button");
      excluir.type = "button";
      excluir.className = "btn-excluir";
      excluir.textContent = "Excluir";
      excluir.setAttribute("aria-label", `Excluir a tarefa ${t.nome}`);
      excluir.addEventListener("click", () => {
        if (confirm(`Excluir "${t.nome}" da sua rotina?`)) excluirTarefa(t.id);
      });
      li.appendChild(excluir);

      ul.appendChild(li);
    });

    secao.appendChild(ul);
    container.appendChild(secao);
  });
}

function renderizar() {
  renderizarCabecalho();
  renderizarSemana();
  renderizarLista();
}

// ---------- Formulário ----------
const chipsDias = document.getElementById("chips-dias");

DIAS_ABREV.forEach((nome, i) => {
  const label = document.createElement("label");
  label.innerHTML = `<input type="checkbox" value="${i}" ${PRESETS.uteis.includes(i) ? "checked" : ""}><span>${nome}</span>`;
  chipsDias.appendChild(label);
});

document.querySelectorAll(".chip-atalho").forEach((btn) => {
  btn.addEventListener("click", () => {
    const dias = PRESETS[btn.dataset.preset];
    chipsDias.querySelectorAll("input").forEach((inp) => {
      inp.checked = dias.includes(Number(inp.value));
    });
  });
});

document.getElementById("form-tarefa").addEventListener("submit", (e) => {
  e.preventDefault();

  const campoNome = document.getElementById("campo-nome");
  const erro = document.getElementById("erro-form");
  const nome = campoNome.value.trim();
  const periodo = document.getElementById("campo-periodo").value;
  const dias = [...chipsDias.querySelectorAll("input:checked")].map((i) => Number(i.value));

  if (!nome) {
    erro.textContent = "Escreva o nome da tarefa.";
    erro.hidden = false;
    return;
  }
  if (dias.length === 0) {
    erro.textContent = "Escolha pelo menos um dia da semana.";
    erro.hidden = false;
    return;
  }

  erro.hidden = true;
  adicionarTarefa(nome, periodo, dias);
  campoNome.value = "";
  campoNome.focus();
});

// ---------- Início ----------
renderizar();