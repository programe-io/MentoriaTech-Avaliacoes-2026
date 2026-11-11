const form = document.querySelector("#form-produto");
const campoDescricao = document.querySelector("#descricao");
const campoQuantidade = document.querySelector("#quantidade");
const campoValor = document.querySelector("#valor");
const listaProdutos = document.querySelector("#lista-produtos");
const resumo = document.querySelector("#resumo");
const mensagem = document.querySelector("#mensagem");
const CHAVE_STORAGE = "gerenciador-de-estoque-v1";
const formatoMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function carregarProdutos() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_STORAGE) || "[]");
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

let produtos = carregarProdutos();
let proximoCodigo = produtos.reduce(
  (maior, produto) => Math.max(maior, Number(produto.codigo) || 0),
  0
) + 1;

function salvarProdutos() {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(produtos));
}

function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.style.color = erro ? "#b42318" : "#18794e";
}

function criarCampoEdicao(rotulo, valor, tipo, passo, ariaLabel) {
  const grupo = document.createElement("div");
  grupo.className = "grupo-edicao";

  const label = document.createElement("label");
  label.textContent = rotulo;

  const input = document.createElement("input");
  input.type = "number";
  input.min = "0";
  input.step = passo;
  input.value = String(valor);
  input.setAttribute("aria-label", ariaLabel);
  input.required = true;

  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "botao botao-secundario";
  botao.textContent = "Salvar";
  botao.addEventListener("click", () => {
    const novoValor = input.valueAsNumber;
    if (!Number.isFinite(novoValor) || novoValor < 0 || (tipo === "quantidade" && !Number.isInteger(novoValor))) {
      mostrarMensagem(
        tipo === "quantidade"
          ? "A quantidade deve ser um número inteiro igual ou maior que zero."
          : "O valor deve ser um número igual ou maior que zero.",
        true
      );
      input.focus();
      return;
    }

    const produto = produtos.find((item) => item.codigo === Number(ariaLabel.match(/#(\d+)/)?.[1]));
    if (!produto) return;

    produto[tipo] = novoValor;
    salvarProdutos();
    renderizarProdutos();
    mostrarMensagem(`${rotulo} do produto #${produto.codigo} atualizado.`);
  });

  grupo.append(label, input, botao);
  return grupo;
}

function renderizarProdutos() {
  listaProdutos.replaceChildren();

  if (produtos.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "vazio";
    vazio.textContent = "Ainda não há produtos cadastrados no estoque.";
    listaProdutos.append(vazio);
    resumo.textContent = "0 produtos";
    return;
  }

  const unidades = produtos.reduce((total, produto) => total + Number(produto.quantidade || 0), 0);
  resumo.textContent = `${produtos.length} ${produtos.length === 1 ? "produto" : "produtos"} · ${unidades} ${unidades === 1 ? "unidade" : "unidades"} no estoque`;

  for (const produto of produtos) {
    const item = document.createElement("li");
    item.className = "produto";

    const informacoes = document.createElement("div");
    informacoes.className = "produto-info";

    const codigo = document.createElement("span");
    codigo.className = "produto-codigo";
    codigo.textContent = `Produto #${produto.codigo}`;

    const descricao = document.createElement("p");
    descricao.className = "produto-descricao";
    descricao.textContent = produto.descricao;

    const dados = document.createElement("div");
    dados.className = "produto-dados";
    const quantidade = document.createElement("span");
    quantidade.className = "etiqueta";
    quantidade.textContent = `Quantidade: ${produto.quantidade}`;
    const valor = document.createElement("span");
    valor.className = "etiqueta";
    valor.textContent = `Valor: ${formatoMoeda.format(produto.valor)}`;
    dados.append(quantidade, valor);
    informacoes.append(codigo, descricao, dados);

    const acoes = document.createElement("div");
    acoes.className = "produto-acoes";
    acoes.append(
      criarCampoEdicao(
        "Alterar quantidade",
        produto.quantidade,
        "quantidade",
        "1",
        `Nova quantidade do produto #${produto.codigo}`
      ),
      criarCampoEdicao(
        "Alterar valor (R$)",
        produto.valor,
        "valor",
        "0.01",
        `Novo valor do produto #${produto.codigo}`
      )
    );

    item.append(informacoes, acoes);
    listaProdutos.append(item);
  }
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const descricao = campoDescricao.value.trim();
  const quantidade = campoQuantidade.valueAsNumber;
  const valor = campoValor.valueAsNumber;

  if (!descricao) {
    mostrarMensagem("Informe a descrição do produto.", true);
    campoDescricao.focus();
    return;
  }
  if (!Number.isInteger(quantidade) || quantidade < 0) {
    mostrarMensagem("A quantidade deve ser um número inteiro igual ou maior que zero.", true);
    campoQuantidade.focus();
    return;
  }
  if (!Number.isFinite(valor) || valor < 0) {
    mostrarMensagem("O valor deve ser um número igual ou maior que zero.", true);
    campoValor.focus();
    return;
  }

  produtos.push({
    codigo: proximoCodigo++,
    descricao,
    quantidade,
    valor,
  });

  salvarProdutos();
  renderizarProdutos();
  form.reset();
  campoDescricao.focus();
  mostrarMensagem("Produto cadastrado com sucesso.");
});

renderizarProdutos();
