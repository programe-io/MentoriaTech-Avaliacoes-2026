JavaScript
// ============================================================================
// 1. ARRAY DE ARMAZENAMENTO E GERADOR INDEPENDENTE DE CÓDIGOS (Seção 7)
// ============================================================================
const tarefas = [];
let ultimoCodigo = 0;

// ============================================================================
// 2. FUNÇÕES ORGANIZADAS POR RESPONSABILIDADE ÚNICA (Seções 6 a 12)
// ============================================================================

/**
 * Valida título, prioridade (entre 1 e 3), quantidade (> 0) e valor (>= 0).
 * Gera um erro interrompendo o fluxo caso qualquer dado seja inválido.
 */
function validarDadosDaTarefa(titulo, prioridade, quantidade, valor) {
  if (typeof titulo !== "string" || titulo.trim() === "") {
    throw new Error("Título do produto inválido! Informe o nome do produto.");
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

  if (
    typeof quantidade !== "number" ||
    Number.isNaN(quantidade) ||
    !Number.isInteger(quantidade) ||
    quantidade < 1
  ) {
    throw new Error("Quantidade inválida! Informe uma quantidade inteira maior que zero.");
  \}

  if (typeof valor !== "number" || Number.isNaN(valor) || valor < 0) {
    throw new Error("Valor inválido! Informe um valor maior ou igual a zero.");
  \}
\}

/**
 * Localiza um item pelo código utilizando find e negação lógica para erro.
 */
function buscarTarefa(codigo) {
  const itemEncontrado = tarefas.find((item) => item.codigo === codigo);

  if (!itemEncontrado) {
    throw new Error(`Código \${codigo\} não foi encontrado no cadastro.`);
  \}

  return itemEncontrado;
\}

/**
 * Valida os dados, incrementa o gerador independente de código, cria o objeto
 * completo com status inicial true e insere no array com push.
 */
function cadastrarTarefa(titulo, prioridade, quantidade, valor) {
  validarDadosDaTarefa(titulo, prioridade, quantidade, valor);

  ultimoCodigo++;

  const novoItem = {
    codigo: ultimoCodigo,
    titulo: titulo.trim(),
    prioridade: prioridade,
    quantidade: quantidade,
    valor: valor,
    status: true // true = em execução / ativo | false = concluído
  \};

  tarefas.push(novoItem);
  return novoItem;
\}

/**
 * Retorna o array cadastrado (separando retorno de exibição).
 */
function listarTarefas() {
  return tarefas;
\}

/**
 * Busca o item pelo código, impede conclusão duplicada e altera status para false.
 */
function concluirTarefa(codigo) {
  const item = buscarTarefa(codigo);

  if (!item.status) {
    throw new Error(`O item "\${item.titulo\}" (código #\${codigo\}) já estava concluído.`);
  \}

  item.status = false;
\}

/**
 * Localiza o item pelo código e reaproveita validarDadosDaTarefa para validar
 * a nova prioridade antes de atualizar o objeto.
 */
function alterarPrioridade(codigo, novaPrioridade) {
  const item = buscarTarefa(codigo);

  validarDadosDaTarefa(item.titulo, novaPrioridade, item.quantidade, item.valor);

  item.prioridade = novaPrioridade;
\}

/**
 * Atualiza o valor unitário do produto (substitui o valor atual).
 */
function atualizarValor(codigo, novoValor) {
  const item = buscarTarefa(codigo);

  validarDadosDaTarefa(item.titulo, item.prioridade, item.quantidade, novoValor);

  item.valor = novoValor;
\}

/**
 * Atualiza a quantidade do produto (soma ao estoque existente).
 */
function atualizarQuantidade(codigo, quantidadeAdicionar) {
  const item = buscarTarefa(codigo);

  validarDadosDaTarefa(item.titulo, item.prioridade, quantidadeAdicionar, item.valor);

  item.quantidade = item.quantidade + quantidadeAdicionar;
\}

/**
 * Remove um item pelo código para demonstrar que ultimoCodigo nunca repete IDs.
 */
function removerTarefa(codigo) {
  buscarTarefa(codigo);
  const indice = tarefas.findIndex((item) => item.codigo === codigo);
  tarefas.splice(indice, 1);
\}

// ============================================================================
// 3. PRODUTOS JÁ CADASTRADOS COM VALORES, QUANTIDADES E PRIORIDADES
// ============================================================================
cadastrarTarefa("Notebook Dell Inspiron 15", 1, 8, 3899.90);
cadastrarTarefa("Monitor LG Ultrawide 29\\"", 1, 14, 1249.00);
cadastrarTarefa("Teclado Mecânico HyperX", 2, 25, 329.50);
cadastrarTarefa("Mouse Sem Fio Logitech MX", 2, 32, 449.00);
cadastrarTarefa("Cadeira Ergonômica Presidente", 3, 6, 1150.00);
cadastrarTarefa("Headset USB com Cancelamento", 3, 19, 279.90);

// Marca o item #6 como concluído inicialmente para demonstrar status false
concluirTarefa(6);

// Exibição no console usando o retorno de listarTarefas() (Seção 8)
console.log("Lista inicial retornada por listarTarefas():", listarTarefas());

// ============================================================================
// 4. INTEGRAÇÃO COM A INTERFACE (DOM)
// ============================================================================
const feedbackEl = document.getElementById("feedback");
const tabelaCorpoEl = document.getElementById("tabela-corpo");
const saidaLoopEl = document.getElementById("saida-loop");

const resumoItensEl = document.getElementById("resumo-itens");
const resumoQtdEl = document.getElementById("resumo-quantidade");
const resumoValorEl = document.getElementById("resumo-valor");

const formCadastro = document.getElementById("form-cadastro");
const formPrioridade = document.getElementById("form-prioridade");
const formEstoque = document.getElementById("form-estoque");

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  \});
\}

function formatarPrioridade(prioridade) {
  const mapa = {
    1: "1 - Alta",
    2: "2 - Média",
    3: "3 - Baixa"
  \};
  return mapa[prioridade] || prioridade;
\}

function mostrarFeedback(mensagem, tipo) {
  feedbackEl.textContent = mensagem;
  feedbackEl.className = `feedback \${tipo\}`;
\}

/**
 * Percorre o array com estrutura de repetição for...of (Seção 13 da aula).
 */
function gerarListagemFormatada() {
  const lista = listarTarefas();
  if (lista.length === 0) {
    return "Nenhum produto cadastrado.";
  \}

  let relatorio = "";
  for (const item of lista) {
    const statusTexto = item.status ? "Em execução (true)" : "Concluída (false)";
    const subtotal = formatarMoeda(item.quantidade * item.valor);
    relatorio += `Código: #\${item.codigo\} | Produto: \${item.titulo\} | Qtd: \${item.quantidade\} | Valor: \${formatarMoeda(item.valor)\} | Subtotal: \${subtotal\} | Prioridade: \${item.prioridade\} | Status: \${statusTexto\}\\n`;
  \}
  return relatorio.trim();
\}

function renderizarInterface() {
  const lista = listarTarefas();
  tabelaCorpoEl.innerHTML = "";

  let somaQuantidade = 0;
  let somaValorTotal = 0;

  for (const item of lista) {
    const subtotal = item.quantidade * item.valor;
    somaQuantidade += item.quantidade;
    somaValorTotal += subtotal;

    const tr = document.createElement("tr");
    if (!item.status) {
      tr.classList.add("linha-concluida");
    \}

    const textoStatus = item.status ? "Em execução" : "Concluída";
    const classeBotaoConcluir = item.status
      ? "btn-tabela btn-concluir"
      : "btn-tabela btn-concluir ja-concluida";

    tr.innerHTML = `
      <td><span class="codigo-pill">#\${item.codigo\}</span></td>
      <td><strong>\${item.titulo\}</strong></td>
      <td>\${item.quantidade\} un.</td>
      <td>\${formatarMoeda(item.valor)\}</td>
      <td><strong>\${formatarMoeda(subtotal)\}</strong></td>
      <td><span class="badge prio-\${item.prioridade\}">\${formatarPrioridade(item.prioridade)\}</span></td>
      <td><span class="badge status-\${item.status\}">\${textoStatus\}</span></td>
      <td>
        <div class="grupo-acoes">
          <button type="button" class="\${classeBotaoConcluir\}" data-acao="concluir" data-codigo="\${item.codigo\}">
            \${item.status ? "Concluir" : "Concluída"\}
          </button>
          <button type="button" class="btn-tabela btn-excluir" data-acao="excluir" data-codigo="\${item.codigo\}">
            Excluir
          </button>
        </div>
      </td>
    `;

    tabelaCorpoEl.appendChild(tr);
  \}

  resumoItensEl.textContent = lista.length;
  resumoQtdEl.textContent = `\${somaQuantidade\} un.`;
  resumoValorEl.textContent = formatarMoeda(somaValorTotal);
  saidaLoopEl.textContent = gerarListagemFormatada();
\}

// Delegação de eventos para os botões da tabela
tabelaCorpoEl.addEventListener("click", (event) => {
  const botao = event.target.closest("button");
  if (!botao) return;

  const codigo = Number(botao.dataset.codigo);
  const acao = botao.dataset.acao;

  try {
    if (acao === "concluir") {
      concluirTarefa(codigo);
      mostrarFeedback(`Produto #\${codigo\} marcado como concluído (status = false).`, "sucesso");
    \} else if (acao === "excluir") {
      removerTarefa(codigo);
      mostrarFeedback(
        `Produto #\${codigo\} removido. O próximo cadastro receberá o código #\${ultimoCodigo + 1\}.`,
        "sucesso"
      );
    \}
    renderizarInterface();
  \} catch (erro) {
    mostrarFeedback(erro.message, "erro");
  \}
\});

// Evento: Cadastrar Produto
formCadastro.addEventListener("submit", (event) => {
  event.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const qtdVal = document.getElementById("quantidade").value;
  const valorVal = document.getElementById("valor").value;
  const prioVal = document.getElementById("prioridade").value;

  const quantidade = qtdVal === "" ? NaN : Number(qtdVal);
  const valor = valorVal === "" ? NaN : Number(valorVal);
  const prioridade = prioVal === "" ? NaN : Number(prioVal);

  try {
    const criado = cadastrarTarefa(titulo, prioridade, quantidade, valor);
    mostrarFeedback(
      `Produto "\${criado.titulo\}" cadastrado com código #\${criado.codigo\} (\${criado.quantidade\} un. a \${formatarMoeda(criado.valor)\})!`,
      "sucesso"
    );
    formCadastro.reset();
    document.getElementById("prioridade").value = 1;
    renderizarInterface();
  \} catch (erro) {
    mostrarFeedback(erro.message, "erro");
  \}
\});

// Evento: Alterar Prioridade
formPrioridade.addEventListener("submit", (event) => {
  event.preventDefault();

  const codigo = Number(document.getElementById("codigo-prioridade").value);
  const prioVal = document.getElementById("nova-prioridade").value;
  const novaPrioridade = prioVal === "" ? NaN : Number(prioVal);

  try {
    alterarPrioridade(codigo, novaPrioridade);
    mostrarFeedback(`Prioridade do produto #\${codigo\} atualizada para \${novaPrioridade\}.`, "sucesso");
    formPrioridade.reset();
    renderizarInterface();
  \} catch (erro) {
    mostrarFeedback(erro.message, "erro");
  \}
\});

// Evento: Atualizar Valor (substitui) e/ou Quantidade (soma)
formEstoque.addEventListener("submit", (event) => {
  event.preventDefault();

  const codigo = Number(document.getElementById("codigo-estoque").value);
  const novoValorStr = document.getElementById("novo-valor").value;
  const addQtdStr = document.getElementById("adicionar-qtd").value;

  try {
    if (novoValorStr === "" && addQtdStr === "") {
      throw new Error("Informe um novo valor ou uma quantidade para adicionar.");
    \}

    if (novoValorStr !== "") {
      atualizarValor(codigo, Number(novoValorStr));
    \}

    if (addQtdStr !== "") {
      atualizarQuantidade(codigo, Number(addQtdStr));
    \}

    const atualizado = buscarTarefa(codigo);
    mostrarFeedback(
      `Produto #\${codigo\} atualizado: \${atualizado.quantidade\} un. | Valor unitário: \${formatarMoeda(atualizado.valor)\}.`,
      "sucesso"
    );
    formEstoque.reset();
    renderizarInterface();
  \} catch (erro) {
    mostrarFeedback(erro.message, "erro");
  \}
\});

// Renderiza a tabela e o painel de loop ao abrir a página
renderizarInterface();$0