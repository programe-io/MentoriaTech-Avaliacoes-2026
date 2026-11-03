// ================= DADOS =================
const CHAVE = "estoque-pro";
const ESTOQUE_BAIXO = 5;
const MAX_HISTORICO = 10;

let produtos = [];       // coleção central
let historico = [];      // últimas movimentações
let ultimoCodigo = 0;    // gerador independente: nunca repete códigos
let ordem = { campo: "codigo", crescente: true };
let confirmandoRemocao = null;
let temporizadorMensagem;

function salvarDados() {
  try { localStorage.setItem(CHAVE, JSON.stringify({ produtos, historico, ultimoCodigo })); }
  catch (e) { /* sem armazenamento: segue em memória */ }
}

function carregarDados() {
  try {
    const d = JSON.parse(localStorage.getItem(CHAVE));
    if (d && Array.isArray(d.produtos)) {
      produtos = d.produtos;
      historico = d.historico || [];
      ultimoCodigo = d.ultimoCodigo || 0;
    }
  } catch (e) { /* ignora dados corrompidos */ }
}

// ================= VALIDAÇÕES =================
function validarDescricao(descricao) {
  const texto = descricao.trim();
  if (texto.length < 3) throw new Error("A descrição deve ter no mínimo 3 caracteres.");
  if (produtos.some((p) => p.descricao.toLowerCase() === texto.toLowerCase())) {
    throw new Error("Já existe um produto com essa descrição.");
  }
}

function validarValor(valor) {
  if (isNaN(valor) || valor <= 0) throw new Error("O valor deve ser um número maior que zero.");
}

function validarQuantidade(quantidade) {
  if (!Number.isInteger(quantidade) || quantidade < 0) {
    throw new Error("A quantidade deve ser um número inteiro maior ou igual a zero.");
  }
}

function validarDadosDoProduto(descricao, quantidade, valor) {
  validarDescricao(descricao);
  validarQuantidade(quantidade);
  validarValor(valor);
}

// ================= FUNÇÕES DO SISTEMA =================
function registrarHistorico(texto) {
  historico.unshift({ hora: new Date().toLocaleString("pt-BR"), texto });
  historico = historico.slice(0, MAX_HISTORICO);
}

function buscarProduto(codigo) {
  if (!Number.isInteger(codigo)) throw new Error("Selecione um produto.");
  const produto = produtos.find((p) => p.codigo === codigo);
  if (!produto) throw new Error("Produto com código " + codigo + " não encontrado.");
  return produto;
}

function cadastrarProduto(descricao, quantidade, valor) {
  validarDadosDoProduto(descricao, quantidade, valor);
  ultimoCodigo++;
  const produto = { codigo: ultimoCodigo, descricao: descricao.trim(), quantidade, valor };
  produtos.push(produto);
  registrarHistorico("Cadastrado: " + produto.descricao + " (" + quantidade + " un.)");
  return produto;
}

function situacaoDoProduto(produto) {
  if (produto.quantidade === 0) return "zerado";
  if (produto.quantidade <= ESTOQUE_BAIXO) return "baixo";
  return "normal";
}

function valorParaOrdenar(produto, campo) {
  if (campo === "subtotal") return produto.quantidade * produto.valor;
  if (campo === "situacao") return produto.quantidade;
  return produto[campo];
}

function listarProdutos(filtro = "", situacao = "todos", ord = ordem) {
  const termo = filtro.trim().toLowerCase();
  const lista = produtos.filter((p) => {
    const bateBusca = termo === "" || p.descricao.toLowerCase().includes(termo) || String(p.codigo) === termo;
    const bateSituacao = situacao === "todos" || situacaoDoProduto(p) === situacao;
    return bateBusca && bateSituacao;
  });
  lista.sort((a, b) => {
    const x = valorParaOrdenar(a, ord.campo);
    const y = valorParaOrdenar(b, ord.campo);
    const r = typeof x === "string" ? x.localeCompare(y, "pt-BR") : x - y;
    return ord.crescente ? r : -r;
  });
  return lista;
}

function alterarValor(codigo, novoValor) {
  const produto = buscarProduto(codigo);
  validarValor(novoValor);
  registrarHistorico("Valor de " + produto.descricao + ": " + formatarMoeda(produto.valor) + " → " + formatarMoeda(novoValor));
  produto.valor = novoValor;
  return produto;
}

function alterarQuantidade(codigo, novaQuantidade) {
  const produto = buscarProduto(codigo);
  validarQuantidade(novaQuantidade);
  registrarHistorico("Quantidade de " + produto.descricao + ": " + produto.quantidade + " → " + novaQuantidade);
  produto.quantidade = novaQuantidade;
  return produto;
}

function movimentarEstoque(codigo, tipo, quantidade) {
  const produto = buscarProduto(codigo);
  if (!Number.isInteger(quantidade) || quantidade <= 0) {
    throw new Error("A quantidade da movimentação deve ser um inteiro maior que zero.");
  }
  if (tipo === "saida" && quantidade > produto.quantidade) {
    throw new Error("Saída maior que o estoque disponível (" + produto.quantidade + " un.).");
  }
  produto.quantidade += tipo === "entrada" ? quantidade : -quantidade;
  registrarHistorico((tipo === "entrada" ? "Entrada de " : "Saída de ") + quantidade + " un. de " + produto.descricao);
  return produto;
}

function removerProduto(codigo) {
  const produto = buscarProduto(codigo);
  produtos = produtos.filter((p) => p.codigo !== codigo);
  registrarHistorico("Removido: " + produto.descricao);
  return produto;
}

function calcularResumo() {
  return {
    totalProdutos: produtos.length,
    totalUnidades: produtos.reduce((s, p) => s + p.quantidade, 0),
    valorTotal: produtos.reduce((s, p) => s + p.quantidade * p.valor, 0),
    alertas: produtos.filter((p) => situacaoDoProduto(p) !== "normal").length
  };
}

// ================= INTERFACE =================
const $ = (id) => document.getElementById(id);
const ROTULOS = { normal: "Normal", baixo: "Estoque baixo", zerado: "Sem estoque" };

function formatarMoeda(n) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function lerNumero(id) {
  const t = $(id).value;
  return t === "" ? NaN : Number(t);
}

function lerCodigo(idSelect) {
  const t = $(idSelect).value;
  return t === "" ? NaN : Number(t);
}

function limpar(...ids) { ids.forEach((id) => ($(id).value = "")); }

function exibirMensagem(texto, ehErro) {
  const el = $("mensagem");
  el.textContent = texto;
  el.className = ehErro ? "erro" : "sucesso";
  clearTimeout(temporizadorMensagem);
  temporizadorMensagem = setTimeout(() => { el.textContent = ""; el.className = ""; }, 4500);
}

function celula(conteudo) {
  const td = document.createElement("td");
  if (conteudo instanceof Node) td.appendChild(conteudo);
  else td.textContent = conteudo;
  return td;
}

function etiqueta(produto) {
  const s = situacaoDoProduto(produto);
  const span = document.createElement("span");
  span.className = "etiqueta " + s;
  span.textContent = ROTULOS[s];
  return span;
}

function atualizarResumo() {
  const r = calcularResumo();
  $("resProdutos").textContent = r.totalProdutos;
  $("resUnidades").textContent = r.totalUnidades;
  $("resTotal").textContent = formatarMoeda(r.valorTotal);
  $("resAlertas").textContent = r.alertas;
}

function atualizarSelects() {
  ["selAlterar", "selMov"].forEach((id) => {
    const select = $(id);
    const atual = select.value;
    select.innerHTML = "";
    const padrao = document.createElement("option");
    padrao.value = "";
    padrao.textContent = produtos.length ? "Selecione o produto" : "Nenhum produto cadastrado";
    select.appendChild(padrao);
    produtos.forEach((p) => {
      const op = document.createElement("option");
      op.value = p.codigo;
      op.textContent = p.codigo + " - " + p.descricao;
      select.appendChild(op);
    });
    if (produtos.some((p) => String(p.codigo) === atual)) select.value = atual;
  });
}

function atualizarCabecalhos() {
  document.querySelectorAll("th[data-campo]").forEach((th) => {
    th.textContent = th.textContent.replace(/ [▲▼]$/, "");
    if (th.dataset.campo === ordem.campo) th.textContent += ordem.crescente ? " ▲" : " ▼";
  });
}

function atualizarTabela() {
  const corpo = $("listaProdutos");
  corpo.innerHTML = "";
  const lista = listarProdutos($("busca").value, $("filtroSituacao").value);

  if (lista.length === 0) {
    const tr = document.createElement("tr");
    tr.className = "vazio";
    const td = celula(produtos.length ? "Nenhum produto encontrado." : "Nenhum produto cadastrado ainda.");
    td.colSpan = 7;
    tr.appendChild(td);
    corpo.appendChild(tr);
  }

  lista.forEach((p) => {
    const tr = document.createElement("tr");
    const botao = document.createElement("button");
    const confirmando = confirmandoRemocao === p.codigo;
    botao.type = "button";
    botao.className = "remover" + (confirmando ? " confirmar" : "");
    botao.textContent = confirmando ? "Confirmar?" : "Remover";
    botao.addEventListener("click", (e) => { e.stopPropagation(); aoClicarRemover(p.codigo); });

    [p.codigo, p.descricao, p.quantidade, formatarMoeda(p.valor),
     formatarMoeda(p.quantidade * p.valor), etiqueta(p), botao]
      .forEach((c) => tr.appendChild(celula(c)));

    tr.addEventListener("click", () => { $("selAlterar").value = p.codigo; $("selMov").value = p.codigo; });
    corpo.appendChild(tr);
  });
}

function atualizarHistorico() {
  const ul = $("historico");
  ul.innerHTML = "";
  if (historico.length === 0) {
    const li = document.createElement("li");
    li.className = "vazio";
    li.textContent = "Nenhuma movimentação ainda.";
    ul.appendChild(li);
    return;
  }
  historico.forEach((h) => {
    const li = document.createElement("li");
    const hora = document.createElement("time");
    hora.textContent = h.hora;
    li.appendChild(hora);
    li.appendChild(document.createTextNode(h.texto));
    ul.appendChild(li);
  });
}

function atualizarTela() {
  atualizarResumo();
  atualizarSelects();
  atualizarCabecalhos();
  atualizarTabela();
  atualizarHistorico();
}

// Executa uma ação, trata erros, salva e redesenha a tela
function executar(acao, mensagemSucesso) {
  try {
    acao();
    salvarDados();
    exibirMensagem(mensagemSucesso, false);
  } catch (erro) {
    exibirMensagem(erro.message, true);
  }
  atualizarTela();
}

// Remoção em dois cliques (sem confirm(), que pode ser bloqueado)
function aoClicarRemover(codigo) {
  if (confirmandoRemocao === codigo) {
    confirmandoRemocao = null;
    executar(() => removerProduto(codigo), "Produto removido com sucesso!");
    return;
  }
  confirmandoRemocao = codigo;
  atualizarTabela();
  setTimeout(() => {
    if (confirmandoRemocao === codigo) { confirmandoRemocao = null; atualizarTabela(); }
  }, 3000);
}

// ================= EVENTOS =================
$("formCadastro").addEventListener("submit", (e) => {
  e.preventDefault();
  executar(() => {
    cadastrarProduto($("descricao").value, lerNumero("quantidade"), lerNumero("valor"));
    limpar("descricao", "quantidade", "valor");
    $("descricao").focus();
  }, "Produto cadastrado com sucesso!");
});

$("btnValor").addEventListener("click", () => {
  executar(() => {
    alterarValor(lerCodigo("selAlterar"), lerNumero("novoValor"));
    limpar("novoValor");
  }, "Valor alterado com sucesso!");
});

$("btnQuantidade").addEventListener("click", () => {
  executar(() => {
    alterarQuantidade(lerCodigo("selAlterar"), lerNumero("novaQuantidade"));
    limpar("novaQuantidade");
  }, "Quantidade alterada com sucesso!");
});

$("formMov").addEventListener("submit", (e) => {
  e.preventDefault();
  executar(() => {
    movimentarEstoque(lerCodigo("selMov"), $("tipoMov").value, lerNumero("qtdMov"));
    limpar("qtdMov");
  }, "Movimentação registrada!");
});

$("busca").addEventListener("input", atualizarTabela);
$("filtroSituacao").addEventListener("change", atualizarTabela);

document.querySelectorAll("th[data-campo]").forEach((th) => {
  th.addEventListener("click", () => {
    const campo = th.dataset.campo;
    ordem = { campo, crescente: ordem.campo === campo ? !ordem.crescente : true };
    atualizarCabecalhos();
    atualizarTabela();
  });
});

// ================= INÍCIO =================
carregarDados();
atualizarTela()