// ===== estado =====
let produtos = [];

// ===== elementos =====
const abas = document.querySelectorAll(".aba");
const paineis = {
  cadastrar: document.getElementById("painel-cadastrar"),
  listar: document.getElementById("painel-listar"),
};

const formCadastro = document.getElementById("formCadastro");
const avisoCadastro = document.getElementById("avisoCadastro");

const listaVazia = document.getElementById("listaVazia");
const tabelaEnvoltorio = document.getElementById("tabelaEnvoltorio");
const corpoTabela = document.getElementById("corpoTabela");
const totalItens = document.getElementById("totalItens");

// ===== navegação entre abas =====
abas.forEach((botao) => {
  botao.addEventListener("click", () => {
    abas.forEach((b) => b.classList.remove("ativa"));
    botao.classList.add("ativa");

    Object.values(paineis).forEach((p) => p.classList.remove("ativa"));
    paineis[botao.dataset.aba].classList.add("ativa");

    if (botao.dataset.aba === "listar") renderizarTabela();
  });
});

// ===== formatação =====
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// ===== cadastro (case "1") =====
formCadastro.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const codigo = document.getElementById("codigo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const quantidade = Number(document.getElementById("quantidade").value);
  const valor = Number(document.getElementById("valor").value);

  const jaExiste = produtos.some((p) => p.codigo === codigo);
  if (jaExiste) {
    avisoCadastro.textContent = `Já existe um produto com o código "${codigo}".`;
    avisoCadastro.classList.add("erro");
    return;
  }

  produtos.push({ codigo, descricao, quantidade, valor });

  avisoCadastro.classList.remove("erro");
  avisoCadastro.textContent = "Produto cadastrado com sucesso!";
  formCadastro.reset();
  document.getElementById("codigo").focus();

  atualizarContador();
});

// ===== listagem (case "2") =====
function renderizarTabela() {
  corpoTabela.innerHTML = "";

  if (produtos.length === 0) {
    listaVazia.style.display = "block";
    tabelaEnvoltorio.style.display = "none";
    return;
  }

  listaVazia.style.display = "none";
  tabelaEnvoltorio.style.display = "block";

  produtos.forEach((produto, indice) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td class="td-codigo">${produto.codigo}</td>
      <td>${produto.descricao}</td>
      <td>
        <span class="editavel" data-campo="quantidade" data-indice="${indice}">
          ${produto.quantidade}
        </span>
      </td>
      <td>
        <span class="editavel" data-campo="valor" data-indice="${indice}">
          ${formatarMoeda(produto.valor)}
        </span>
      </td>
      <td>
        <button class="botao-remover" data-indice="${indice}">remover</button>
      </td>
    `;

    corpoTabela.appendChild(linha);
  });
}

// ===== alterar valor / alterar quantidade (case "3" e "4") =====
corpoTabela.addEventListener("click", (evento) => {
  const alvo = evento.target;

  // clique em "remover"
  if (alvo.classList.contains("botao-remover")) {
    const indice = Number(alvo.dataset.indice);
    produtos.splice(indice, 1);
    renderizarTabela();
    atualizarContador();
    return;
  }

  // clique em um campo editável (quantidade ou valor)
  if (alvo.classList.contains("editavel")) {
    const indice = Number(alvo.dataset.indice);
    const campo = alvo.dataset.campo;
    const produto = produtos[indice];
    const valorAtual = produto[campo];

    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.step = campo === "valor" ? "0.01" : "1";
    input.value = valorAtual;

    alvo.replaceWith(input);
    input.focus();
    input.select();

    const salvar = () => {
      const novoValor = Number(input.value);
      produto[campo] = isNaN(novoValor) || novoValor < 0 ? valorAtual : novoValor;
      renderizarTabela();
    };

    input.addEventListener("blur", salvar);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") input.blur();
      if (e.key === "Escape") renderizarTabela();
    });
  }
});

// ===== contador de itens no cabeçalho =====
function atualizarContador() {
  const total = produtos.length.toString().padStart(3, "0");
  totalItens.textContent = `${total} ITEM${produtos.length === 1 ? "" : "S"}`;
}

atualizarContador();