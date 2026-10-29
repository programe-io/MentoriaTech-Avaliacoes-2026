const tarefas = [];
let geradorDeCodigo = 0;

function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) throw new Error("O título deve ter no mínimo 5 caracteres.");
  if (prioridade < 1 || prioridade > 3) throw new Error("A prioridade deve estar entre 1 e 3.");
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find(t => t.codigo === codigo);
  if (!tarefa) throw new Error("Código " + codigo + " não encontrado.");
  return tarefa;
}

function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);
  const tarefa = { codigo: ++geradorDeCodigo, titulo, prioridade, status: true }; // true = em execução
  tarefas.push(tarefa);
  return tarefa;
}

function listarTarefas() {
  return tarefas;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  if (!tarefa.status) throw new Error("A tarefa já estava concluída.");
  tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
  tarefa.prioridade = novaPrioridade;
}

/* ---------- Interface ---------- */
const $ = id => document.getElementById(id);

function aviso(texto, tipo) {
  $("msg").textContent = texto;
  $("msg").className = tipo;
}

function executar(acao, mensagemOk) {
  try { acao(); aviso(mensagemOk, "sucesso"); }
  catch (e) { aviso(e.message, "erro"); }
  render();
}

function render() {
  $("lista").innerHTML = "";
  listarTarefas().forEach(t => {
    const li = document.createElement("li");
    if (!t.status) li.className = "feita";
    li.innerHTML = `
      <div class="t">
        <b>#${t.codigo} ${t.titulo.replace(/</g, "&lt;")}</b>
        <small>${t.status ? "Em execução" : "Concluída"}</small>
      </div>
      <select>
        ${[1, 2, 3].map(p => `<option value="${p}" ${p === t.prioridade ? "selected" : ""}>Prioridade ${p}</option>`).join("")}
      </select>
      <button>Concluir</button>`;
    li.querySelector("select").onchange = e =>
      executar(() => alterarPrioridade(t.codigo, +e.target.value), "Prioridade alterada!");
    li.querySelector("button").onclick = () =>
      executar(() => concluirTarefa(t.codigo), "Tarefa concluída!");
    $("lista").appendChild(li);
  });
}

$("form").onsubmit = e => {
  e.preventDefault();
  executar(() => {
    cadastrarTarefa($("titulo").value.trim(), +$("prioridade").value);
    $("titulo").value = "";
  }, "Tarefa cadastrada!");
};