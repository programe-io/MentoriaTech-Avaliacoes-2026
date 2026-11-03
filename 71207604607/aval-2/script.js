// ===== TELA =====
const ESTOQUE_BAIXO = 5;

function lerNumero(id) {
  const texto = document.getElementById(id).value;
  return texto === "" ? NaN : Number(texto);
}

function formatarMoeda(numero) {
  return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function mostrarMensagem(texto, ehErro) {
  const mensagem = document.getElementById("mensagem");
  mensagem.textContent = texto;
  mensagem.className = ehErro ? "erro" : "sucesso";
}

// Atualiza os cartões de resumo
function exibirResumo() {
  let unidades = 0;
  let valorTotal = 0;
  for (const produto of listarProdutos()) {
    unidades += produto.quantidade;
    valorTotal += produto.quantidade * produto.valor;
  }
  document.getElementById("resProdutos").textContent = listarProdutos().length;
  document.getElementById("resUnidades").textContent = unidades;
  document.getElementById("resValor").textContent = formatarMoeda(valorTotal);
}

// Cria a etiqueta de situação do estoque
function criarEtiqueta(quantidade) {
  const etiqueta = document.createElement("span");
  etiqueta.className = "etiqueta";
  if (quantidade === 0) {
    etiqueta.textContent = "Sem estoque";
    etiqueta.classList.add("zerado");
  } else if (quantidade <= ESTOQUE_BAIXO) {
    etiqueta.textContent = "Estoque baixo";
    etiqueta.classList.add("baixo");
  } else {
    etiqueta.textContent = "Em estoque";
    etiqueta.classList.add("normal");
  }
  return etiqueta;
}

// Mostra os produtos na tabela usando um laço de repetição
function exibirProdutos() {
  const corpo = document.getElementById("lista");
  corpo.innerHTML = "";

  if (listarProdutos().length === 0) {
    const linha = document.createElement("tr");
    const celula = document.createElement("td");
    celula.colSpan = 5;
    celula.className = "vazio";
    celula.textContent = "Nenhum produto cadastrado ainda.";
    linha.appendChild(celula);
    corpo.appendChild(linha);
  }

  for (const produto of listarProdutos()) {
    const linha = document.createElement("tr");
    const dados = [produto.codigo, produto.descricao, produto.quantidade, formatarMoeda(produto.valor)];
    for (const dado of dados) {
      const celula = document.createElement("td");
      celula.textContent = dado;
      linha.appendChild(celula);
    }
    const celulaSituacao = document.createElement("td");
    celulaSituacao.appendChild(criarEtiqueta(produto.quantidade));
    linha.appendChild(celulaSituacao);
    corpo.appendChild(linha);
  }

  exibirResumo();
}

// Executa uma ação: se der erro, mostra a mensagem; se der certo, atualiza a tela
function executar(acao, mensagemSucesso) {
  try {
    acao();
    mostrarMensagem(mensagemSucesso, false);
    exibirProdutos();
  } catch (erro) {
    mostrarMensagem(erro.message, true);
  }
}

function iniciar() {
  document.getElementById("btnCadastrar").addEventListener("click", () => {
    executar(() => {
      cadastrarProduto(
        document.getElementById("descricao").value,
        lerNumero("quantidade"),
        lerNumero("valor")
      );
      document.getElementById("descricao").value = "";
      document.getElementById("quantidade").value = "";
      document.getElementById("valor").value = "";
    }, "Produto cadastrado com sucesso!");
  });

  document.getElementById("btnValor").addEventListener("click", () => {
    executar(() => {
      alterarValor(lerNumero("codigo"), lerNumero("novoValor"));
      document.getElementById("novoValor").value = "";
    }, "Valor alterado com sucesso!");
  });

  document.getElementById("btnQuantidade").addEventListener("click", () => {
    executar(() => {
      alterarQuantidade(lerNumero("codigo"), lerNumero("novaQuantidade"));
      document.getElementById("novaQuantidade").value = "";
    }, "Quantidade alterada com sucesso!");
  });

  exibirProdutos();
}

// Só inicia depois que o HTML estiver carregado
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar);
} else {
  iniciar();
}