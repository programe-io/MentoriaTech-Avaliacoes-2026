
"use strict";
// O nome deve ser app.js pra funcionar corretamente
// Usa uma chave própria para não misturar dados com versões antigas.
const CHAVE_STORAGE = "estoque-produtos-v2";
const CHAVE_ANTIGA = "estoque-produtos";

let produtos = [];
let proximoCodigo = 1;

const form = document.getElementById("form-produto");
const campoCodigo = document.getElementById("codigo");
const campoDescricao = document.getElementById("descricao");
const campoQuantidade = document.getElementById("quantidade");
const campoValor = document.getElementById("valor");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");
const tituloForm = document.getElementById("titulo-form");
const mensagem = document.getElementById("mensagem");
const listaProdutos = document.getElementById("lista-produtos");
const vazio = document.getElementById("vazio");
const resumo = document.getElementById("resumo");

const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

function mostrarMensagem(texto, sucesso = false) {
  mensagem.textContent = texto;
  mensagem.classList.toggle("sucesso", sucesso);
  mensagem.hidden = false;
}

function limparMensagem() {
  mensagem.hidden = true;
  mensagem.classList.remove("sucesso");
  [campoDescricao, campoQuantidade, campoValor].forEach(campo =>
    campo.classList.remove("invalido")
  );
}

function carregar() {
  try {
    let bruto = localStorage.getItem(CHAVE_STORAGE);
    let migrandoDadosAntigos = false;

    // Se ainda não existe a chave nova, tenta recuperar os produtos antigos.
    if (!bruto) {
      bruto = localStorage.getItem(CHAVE_ANTIGA);
      migrandoDadosAntigos = Boolean(bruto);
    }

    if (!bruto) {
      produtos = [];
      proximoCodigo = 1;
      return;
    }

    const dados = JSON.parse(bruto);
    const listaSalva = Array.isArray(dados)
      ? dados
      : dados && Array.isArray(dados.produtos)
        ? dados.produtos
        : null;

    if (!listaSalva) {
      throw new Error("Formato de dados inválido.");
    }

    produtos = listaSalva
      .filter(p =>
        p &&
        Number.isInteger(Number(p.codigo)) && Number(p.codigo) > 0 &&
        typeof p.descricao === "string" &&
        Number.isInteger(Number(p.quantidade)) && Number(p.quantidade) >= 0 &&
        Number.isFinite(Number(p.valor)) && Number(p.valor) >= 0
      )
      .map(p => ({
        codigo: Number(p.codigo),
        descricao: p.descricao,
        quantidade: Number(p.quantidade),
        valor: Number(p.valor)
      }));

    const maiorCodigo = produtos.reduce((max, p) => Math.max(max, p.codigo), 0);
    proximoCodigo = Math.max(Number(dados.proximoCodigo) || 1, maiorCodigo + 1);

    if (migrandoDadosAntigos) {
      salvar();
    }
  } catch (erro) {
    console.error("Falha ao carregar estoque:", erro);
    produtos = [];
    proximoCodigo = 1;
    mostrarMensagem("Não foi possível ler os dados salvos. O estoque foi aberto vazio; não salve por cima se precisar recuperar dados antigos.");
  }
}

function salvar() {
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify({ produtos, proximoCodigo }));
    return true;
  } catch (erro) {
    console.error("Falha ao salvar estoque:", erro);
    mostrarMensagem("Não foi possível salvar os dados neste navegador. Verifique as configurações de armazenamento.");
    return false;
  }
}

function validarDados(descricao, quantidade, valor) {
  if (!descricao.trim()) {
    throw { campo: campoDescricao, mensagem: "Informe a descrição do produto." };
  }
  if (!Number.isInteger(quantidade) || quantidade < 0) {
    throw { campo: campoQuantidade, mensagem: "A quantidade deve ser um número inteiro igual ou maior que zero." };
  }
  if (!Number.isFinite(valor) || valor < 0) {
    throw { campo: campoValor, mensagem: "O valor deve ser um número igual ou maior que zero." };
  }
}

function cadastrarProduto(descricao, quantidade, valor) {
  validarDados(descricao, quantidade, valor);
  const produto = {
    codigo: proximoCodigo++,
    descricao: descricao.trim(),
    quantidade,
    valor
  };
  produtos.push(produto);
  return produto;
}

function editarProduto(codigo, descricao, quantidade, valor) {
  validarDados(descricao, quantidade, valor);
  const produto = produtos.find(p => p.codigo === codigo);
  if (!produto) {
    throw { campo: null, mensagem: "Produto não encontrado. Atualize a página e tente novamente." };
  }
  produto.descricao = descricao.trim();
  produto.quantidade = quantidade;
  produto.valor = valor;
}

function sairDoModoEdicao() {
  form.reset();
  campoCodigo.value = "";
  tituloForm.textContent = "Novo produto";
  btnSalvar.textContent = "Cadastrar produto";
  btnCancelar.hidden = true;
}

function entrarNoModoEdicao(produto) {
  limparMensagem();
  campoCodigo.value = String(produto.codigo);
  campoDescricao.value = produto.descricao;
  campoQuantidade.value = String(produto.quantidade);
  campoValor.value = String(produto.valor);
  tituloForm.textContent = `Editar produto #${produto.codigo}`;
  btnSalvar.textContent = "Salvar alterações";
  btnCancelar.hidden = false;
  renderizar();
  campoDescricao.focus();
  form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function excluirProduto(codigo) {
  const produto = produtos.find(p => p.codigo === codigo);
  if (!produto) {
    mostrarMensagem("Produto não encontrado. Atualize a página e tente novamente.");
    return;
  }
  if (!confirm(`Deseja excluir "${produto.descricao}"?`)) return;

  const anteriores = produtos;
  produtos = produtos.filter(p => p.codigo !== codigo);

  if (!salvar()) {
    produtos = anteriores;
    renderizar();
    return;
  }

  if (Number(campoCodigo.value) === codigo) sairDoModoEdicao();
  renderizar();
  mostrarMensagem("Produto excluído com sucesso.", true);
}

function criarBotao(texto, classe, acao) {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = `btn btn-pequeno ${classe}`;
  botao.textContent = texto;
  botao.addEventListener("click", acao);
  return botao;
}

function criarCelula(texto, classe = "") {
  const celula = document.createElement("td");
  celula.textContent = String(texto);
  if (classe) celula.className = classe;
  return celula;
}

function renderizar() {
  listaProdutos.replaceChildren();

  produtos.forEach(produto => {
    const linha = document.createElement("tr");
    if (Number(campoCodigo.value) === produto.codigo) {
      linha.classList.add("em-edicao");
    }

    linha.appendChild(criarCelula(produto.codigo));
    linha.appendChild(criarCelula(produto.descricao));
    linha.appendChild(criarCelula(
      produto.quantidade,
      produto.quantidade === 0 ? "num estoque-zerado" : "num"
    ));
    linha.appendChild(criarCelula(moeda.format(produto.valor), "num"));
    linha.appendChild(criarCelula(
      moeda.format(produto.quantidade * produto.valor), "num"
    ));

    const acoes = document.createElement("td");
    acoes.className = "col-acoes";
    const grupo = document.createElement("div");
    grupo.className = "acoes-tabela";

    grupo.appendChild(criarBotao("Editar", "btn-editar", () => entrarNoModoEdicao(produto)));
    grupo.appendChild(criarBotao("Excluir", "btn-perigo", () => excluirProduto(produto.codigo)));

    acoes.appendChild(grupo);
    linha.appendChild(acoes);
    listaProdutos.appendChild(linha);
  });

  vazio.hidden = produtos.length > 0;

  const unidades = produtos.reduce((soma, p) => soma + p.quantidade, 0);
  const total = produtos.reduce((soma, p) => soma + p.quantidade * p.valor, 0);

  resumo.textContent = produtos.length
    ? `${produtos.length} produto(s) · ${unidades} unidade(s) · ${moeda.format(total)} em estoque`
    : "";
}

form.addEventListener("submit", evento => {
  evento.preventDefault();
  limparMensagem();

  const descricao = campoDescricao.value;
  const quantidade = campoQuantidade.valueAsNumber;
  const valor = campoValor.valueAsNumber;
  const codigoTexto = campoCodigo.value.trim();
  const codigo = codigoTexto === "" ? null : Number(codigoTexto);

  // Evita tentar editar um código inválido.
  if (codigoTexto !== "" && (!Number.isInteger(codigo) || codigo <= 0)) {
    mostrarMensagem("Código de edição inválido. Cancele a edição e tente novamente.");
    return;
  }

  try {
    // Guarda cópia para reverter se o armazenamento falhar.
    const produtosAntes = JSON.stringify(produtos);
    const codigoAntes = proximoCodigo;

    if (codigo !== null) {
      editarProduto(codigo, descricao, quantidade, valor);
    } else {
      cadastrarProduto(descricao, quantidade, valor);
    }

    if (!salvar()) {
      produtos = JSON.parse(produtosAntes);
      proximoCodigo = codigoAntes;
      renderizar();
      return;
    }

    sairDoModoEdicao();
    renderizar();
    mostrarMensagem(
      codigo !== null ? "Produto atualizado com sucesso." : "Produto cadastrado com sucesso.",
      true
    );
  } catch (erro) {
    if (erro && erro.mensagem) {
      if (erro.campo) {
        erro.campo.classList.add("invalido");
        erro.campo.focus();
      }
      mostrarMensagem(erro.mensagem);
    } else {
      console.error("Erro inesperado:", erro);
      mostrarMensagem("Ocorreu um erro inesperado. Consulte o Console do navegador.");
    }
  }
});

btnCancelar.addEventListener("click", () => {
  limparMensagem();
  sairDoModoEdicao();
  renderizar();
});

[campoDescricao, campoQuantidade, campoValor].forEach(campo => {
  campo.addEventListener("input", () => campo.classList.remove("invalido"));
});

carregar();
renderizar();
