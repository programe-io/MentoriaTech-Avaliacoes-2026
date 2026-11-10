// ===== Lógica do projeto (mesma estrutura da aula) =====
const tarefas = [];
let geradorDeCodigo = 0;

function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("Informe uma prioridade entre 1 e 3.");
  }
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (!tarefa) {
    throw new Error("Código não encontrado.");
  }
  return tarefa;
}

function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);
  geradorDeCodigo++;
  tarefas.push({
    codigo: geradorDeCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true // true = em andamento | false = concluída
  });
}

function listarTarefas() {
  return tarefas;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  if (!tarefa.status) {
    throw new Error("Essa tarefa já estava concluída.");
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
const nomesPrioridade = { 1: "Alta", 2: "Média", 3: "Baixa" };

function mostrarAviso(texto, ok) {
  const aviso = $("aviso");
  aviso.textContent = texto;
  aviso.className = "aviso" + (ok ? " ok" : "");
  aviso.hidden = false;
}
function limparAviso() { $("aviso").hidden = true; }

function executar(acao, mensagemOk) {
  try {
    acao();
    if (mensagemOk) mostrarAviso(mensagemOk, true); else limparAviso();
  } catch (erro) {
    mostrarAviso(erro.message, false);
  }
  renderizar();
}

function renderizar() {
  const lista = $("lista");
  lista.textContent = "";
  const todas = listarTarefas();

  $("qtdAndamento").textContent = todas.filter((t) => t.status).length;
  $("qtdConcluidas").textContent = todas.filter((t) => !t.status).length;

  if (todas.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "vazio";
    vazio.textContent = "Nenhuma tarefa por aqui. Cadastre a primeira ao lado.";
    lista.appendChild(vazio);
    return;
  }

  // Mais prioritárias primeiro; concluídas vão para o fim
  const ordenadas = [...todas].sort((a, b) =>
    (b.status - a.status) || (a.prioridade - b.prioridade) || (a.codigo - b.codigo));

  ordenadas.forEach((t) => {
    const li = document.createElement("li");
    li.className = `tarefa p${t.prioridade}` + (t.status ? "" : " feita");

    const cod = document.createElement("span");
    cod.className = "codigo";
    cod.textContent = "#" + t.codigo;

    const titulo = document.createElement("span");
    titulo.className = "titulo";
    titulo.textContent = t.titulo;

    const meta = document.createElement("div");
    meta.className = "meta";
    const selo = document.createElement("span");
    selo.className = "selo";
    selo.textContent = `Prioridade ${t.prioridade} – ${nomesPrioridade[t.prioridade]}`;
    const st = document.createElement("span");
    st.textContent = t.status ? "Em andamento" : "Concluída";
    meta.append(selo, st);

    const acoes = document.createElement("div");
    acoes.className = "acoes";
    if (t.status) {
      const sel = document.createElement("select");
      sel.setAttribute("aria-label", `Alterar prioridade da tarefa ${t.codigo}`);
      [1, 2, 3].forEach((p) => {
        const o = document.createElement("option");
        o.value = p;
        o.textContent = `${p} – ${nomesPrioridade[p]}`;
        if (p === t.prioridade) o.selected = true;
        sel.appendChild(o);
      });
      sel.addEventListener("change", () =>
        executar(() => alterarPrioridade(t.codigo, Number(sel.value)), "Prioridade atualizada."));

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-concluir";
      btn.textContent = "Concluir";
      btn.addEventListener("click", () =>
        executar(() => concluirTarefa(t.codigo), "Tarefa concluída."));
      acoes.append(sel, btn);
    } else {
      const ok = document.createElement("span");
      ok.className = "concluida-txt";
      ok.textContent = "Concluída";
      acoes.appendChild(ok);
    }

    li.append(cod, titulo, acoes, meta);
    lista.appendChild(li);
  });
}

function cadastrarDoFormulario() {
  const titulo = $("campoTitulo").value.trim();
  const prioridade = Number($("campoPrioridade").value);
  executar(() => {
    cadastrarTarefa(titulo, prioridade);
    $("campoTitulo").value = "";
    $("campoTitulo").focus();
  }, "Tarefa cadastrada.");
}

$("btnCadastrar").addEventListener("click", cadastrarDoFormulario);
$("campoTitulo").addEventListener("keydown", (e) => {
  if (e.key === "Enter") cadastrarDoFormulario();
});

renderizar();
