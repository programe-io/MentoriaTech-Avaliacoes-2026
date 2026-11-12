JavaScript
// ============================================================================
// ARMAZENAMENTO E GERADOR DE CÓDIGO INDEPENDENTE (Seção 7)
// ============================================================================
const tarefas = [];
let geradorDeCodigo = 0;

// ============================================================================
// FUNÇÕES DO PROJETO COM RESPONSABILIDADE ÚNICA (Seções 6 a 12)
// ============================================================================

/**
 * Valida título e prioridade (1 a 3), interrompendo o fluxo com erro se inválido.
 */
function validarDadosDaTarefa(titulo, prioridade) {
  if (typeof titulo !== "string" || titulo.trim() === "") {
    throw new Error("O título da tarefa é obrigatório e não pode ficar vazio.");
  \}

  if (
    typeof prioridade !== "number" ||
    Number.isNaN(prioridade) ||
    !Number.isInteger(prioridade) ||
    prioridade < 1 ||
    prioridade > 3
  ) {
    throw new Error("Prioridade inválida! Solicite uma prioridade entre 1 e 3.");
  \}
\}

/**
 * Localiza uma tarefa pelo código utilizando find e negação lógica para erros.
 */
function buscarTarefa(codigo) {
  const tarefa = tarefas.find((item) => item.codigo === codigo);

  if (!tarefa) {
    throw new Error(`Erro: nenhuma tarefa foi encontrada com o código \${codigo\}.`);
  \}

  return tarefa;
\}

/**
 * Valida os dados, incrementa o código independente, monta o objeto
 * com status inicial true e adiciona ao array tarefas com push.
 */
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  geradorDeCodigo++;

  const novaTarefa = {
    codigo: geradorDeCodigo,
    titulo: titulo.trim(),
    prioridade: prioridade,
    status: true // true = em execução | false = concluída
  \};

  tarefas.push(novaTarefa);
  return novaTarefa;
\}

/**
 * Retorna o array tarefas sem acoplar a lógica de exibição.
 */
function listarTarefas() {
  return tarefas;
\}

/**
 * Localiza a tarefa e altera status de true para false, bloqueando duplicidade.
 */
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (!tarefa.status) {
    throw new Error(`Operação bloqueada: a tarefa #\${codigo\} já estava concluída.`);
  \}

  tarefa.status = false;
\}

/**
 * Localiza a tarefa, reaproveita validarDadosDaTarefa e atualiza a prioridade.
 */
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
\}

// ============================================================================
// EVOLUÇÕES SUGERIDAS NA AULA (Seção 13: Remoção e Listagem com Loop)
// ============================================================================

/**
 * Remove uma tarefa existente para demonstrar que geradorDeCodigo nunca repete IDs.
 */
function removerTarefa(codigo) {
  buscarTarefa(codigo); // Garante erro caso o código não exista
  const indice = tarefas.findIndex((item) => item.codigo === codigo);
  tarefas.splice(indice, 1);
\}

/**
 * Percorre o array com estrutura de repetição para formatar cada objeto.
 */
function formatarListagemComLoop() {
  const lista = listarTarefas();

  if (lista.length === 0) {
    return "Nenhuma tarefa cadastrada no momento.";
  \}

  let texto = "";
  for (const tarefa of lista) {
    const estado = tarefa.status ? "Em execução" : "Concluída";
    texto += `[#\${tarefa.codigo\}] \${tarefa.titulo\} | Prioridade: \${tarefa.prioridade\} | Status: \${estado\}\\n`;
  \}
  return texto.trim();
\}

// ============================================================================
// DADOS PRÉ-CADASTRADOS PARA INICIAR O SISTEMA POPULADO
// ============================================================================
cadastrarTarefa("Configurar ambiente do projeto", 1);
cadastrarTarefa("Criar validação de título e prioridade", 1);
cadastrarTarefa("Implementar busca por código com find", 2);
cadastrarTarefa("Refatorar alteração de prioridade", 3);
cadastrarTarefa("Documentar funções no README", 3);

// Testes iniciais executando as próprias funções do algoritmo
concluirTarefa(1);
alterarPrioridade(4, 2);

console.log("=== Retorno bruto de listarTarefas() ===");
console.log(listarTarefas());

console.log("=== Listagem formatada com loop ===");
console.log(formatarListagemComLoop());

// ============================================================================
// CONTROLE DA INTERFACE (DOM)
// ============================================================================
const alertaEl = document.getElementById("alerta");
const resumoEl = document.getElementById("resumo-status");
const containerTarefasEl = document.getElementById("container-tarefas");
const saidaConsoleEl = document.getElementById("saida-console");
const formCadastrar = document.getElementById("form-cadastrar");
const formPrioridade = document.getElementById("form-prioridade");

function mostrarFeedback(mensagem, tipo) {
  alertaEl.textContent = mensagem;
  alertaEl.className = `alerta \${tipo\}`;
\}

function descricaoPrioridade(nivel) {
  if (nivel === 1) return "Prioridade 1 (Alta)";
  if (nivel === 2) return "Prioridade 2 (Média)";
  return "Prioridade 3 (Baixa)";
\}

function atualizarTela() {
  const lista = listarTarefas();
  containerTarefasEl.innerHTML = "";

  let ativas = 0;
  let concluidas = 0;

  for (const tarefa of lista) {
    if (tarefa.status) {
      ativas++;
    \} else {
      concluidas++;
    \}

    const card = document.createElement("article");
    card.className = `tarefa-item \${tarefa.status ? "" : "concluida"\}`;

    const info = document.createElement("div");
    info.className = "tarefa-info";

    const cabecalho = document.createElement("div");
    cabecalho.className = "tarefa-cabecalho";

    const codigoSpan = document.createElement("span");
    codigoSpan.className = "codigo-tag";
    codigoSpan.textContent = `#\${tarefa.codigo\}`;

    const tituloSpan = document.createElement("span");
    tituloSpan.className = "tarefa-titulo";
    tituloSpan.textContent = tarefa.titulo;

    cabecalho.append(codigoSpan, tituloSpan);

    const badges = document.createElement("div");
    badges.className = "tarefa-badges";

    const prioTag = document.createElement("span");
    prioTag.className = `tag prio-\${tarefa.prioridade\}`;
    prioTag.textContent = descricaoPrioridade(tarefa.prioridade);

    const statusTag = document.createElement("span");
    statusTag.className = `tag status-\${tarefa.status\}`;
    statusTag.textContent = tarefa.status ? "Status: true (Em execução)" : "Status: false (Concluída)";

    badges.append(prioTag, statusTag);
    info.append(cabecalho, badges);

    const acoes = document.createElement("div");
    acoes.className = "tarefa-acoes";

    const btnConcluir = document.createElement("button");
    btnConcluir.type = "button";
    btnConcluir.className = `btn-acao btn-concluir \${tarefa.status ? "" : "inativo"\}`;
    btnConcluir.textContent = tarefa.status ? "Concluir" : "Concluída";
    btnConcluir.addEventListener("click", () => {
      try {
        concluirTarefa(tarefa.codigo);
        mostrarFeedback(`Tarefa #\${tarefa.codigo\} marcada como concluída (status = false).`, "sucesso");
        atualizarTela();
      \} catch (erro) {
        mostrarFeedback(erro.message, "erro");
      \}
    \});

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.className = "btn-acao btn-remover";
    btnRemover.textContent = "Excluir";
    btnRemover.addEventListener("click", () => {
      try {
        removerTarefa(tarefa.codigo);
        mostrarFeedback(
          `Tarefa #\${tarefa.codigo\} excluída. O próximo cadastro receberá o código #\${geradorDeCodigo + 1\}.`,
          "sucesso"
        );
        atualizarTela();
      \} catch (erro) {
        mostrarFeedback(erro.message, "erro");
      \}
    \});

    acoes.append(btnConcluir, btnRemover);
    card.append(info, acoes);
    containerTarefasEl.appendChild(card);
  \}

  if (lista.length === 0) {
    const aviso = document.createElement("p");
    aviso.className = "vazio";
    aviso.textContent = "Nenhuma tarefa cadastrada.";
    containerTarefasEl.appendChild(aviso);
  \}

  resumoEl.textContent = `\${ativas\} ativa\${ativas === 1 ? "" : "s"\} • \${concluidas\} concluída\${concluidas === 1 ? "" : "s"\}`;
  saidaConsoleEl.textContent = formatarListagemComLoop();
\}

formCadastrar.addEventListener("submit", (event) => {
  event.preventDefault();

  const titulo = document.getElementById("input-titulo").value;
  const valorPrioridade = document.getElementById("input-prioridade").value;
  const prioridade = valorPrioridade === "" ? NaN : Number(valorPrioridade);

  try {
    const criada = cadastrarTarefa(titulo, prioridade);
    mostrarFeedback(`Tarefa #\${criada.codigo\} ("\${criada.titulo\}") cadastrada com sucesso!`, "sucesso");
    formCadastrar.reset();
    atualizarTela();
  \} catch (erro) {
    mostrarFeedback(erro.message, "erro");
  \}
\});

formPrioridade.addEventListener("submit", (event) => {
  event.preventDefault();

  const codigo = Number(document.getElementById("input-codigo").value);
  const valorNovaPrioridade = document.getElementById("input-nova-prioridade").value;
  const novaPrioridade = valorNovaPrioridade === "" ? NaN : Number(valorNovaPrioridade);

  try {
    alterarPrioridade(codigo, novaPrioridade);
    mostrarFeedback(`Prioridade da tarefa #\${codigo\} alterada para \${novaPrioridade\}.`, "sucesso");
    formPrioridade.reset();
    atualizarTela();
  \} catch (erro) {
    mostrarFeedback(erro.message, "erro");
  \}
\});

// Inicializa a interface
atualizarTela();$0