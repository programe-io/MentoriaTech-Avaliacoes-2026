let produtos = [];
let proximoCodigo = 1;

const $ = (id) => document.getElementById(id);
const moeda = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function aviso(msg, erro = false) {
  const t = $("toast");
  t.textContent = msg;
  t.className = "show" + (erro ? " erro" : "");
  clearTimeout(aviso.timer);
  aviso.timer = setTimeout(() => (t.className = ""), 2400);
}

function escapar(txt) {
  const d = document.createElement("div");
  d.textContent = txt;
  return d.innerHTML;
}

function render() {
  const tbody = $("tabela");
  if (produtos.length === 0) {
    tbody.innerHTML = '<tr><td class="empty" colspan="6">Nenhum produto cadastrado ainda. Use o formulário acima para começar.</td></tr>';
  } else {
    tbody.innerHTML = produtos.map((p) => `
      <tr>
        <td class="code">#${p.codigo}</td>
        <td>${escapar(p.descricao)}</td>
        <td>${p.quantidade}</td>
        <td>${moeda(p.valor)}</td>
        <td>${moeda(p.valor * p.quantidade)}</td>
        <td><button class="del" onclick="remover(${p.codigo})">Excluir</button></td>
      </tr>`).join("");
  }
  $("contador").textContent = produtos.length + (produtos.length === 1 ? " produto" : " produtos");
  $("totalGeral").textContent = moeda(produtos.reduce((s, p) => s + p.valor * p.quantidade, 0));
}

function buscar(codigo) {
  return produtos.find((p) => p.codigo === Number(codigo));
}

$("btnCadastrar").onclick = () => {
  const descricao = $("desc").value.trim();
  const quantidade = parseInt($("qtd").value);
  const valor = parseFloat($("valor").value);
  if (!descricao || isNaN(quantidade) || isNaN(valor) || quantidade < 0 || valor < 0) {
    return aviso("Preencha descrição, quantidade e valor corretamente.", true);
  }
  produtos.push({ codigo: proximoCodigo++, descricao, quantidade, valor });
  ["desc", "qtd", "valor"].forEach((id) => ($(id).value = ""));
  render();
  aviso("Produto cadastrado.");
};

$("btnValor").onclick = () => {
  const p = buscar($("codValor").value);
  const novo = parseFloat($("novoValor").value);
  if (!p) return aviso("Código não encontrado.", true);
  if (isNaN(novo) || novo < 0) return aviso("Informe um valor válido.", true);
  p.valor = novo;
  $("codValor").value = $("novoValor").value = "";
  render();
  aviso("Valor atualizado.");
};

$("btnQtd").onclick = () => {
  const p = buscar($("codQtd").value);
  const add = parseInt($("addQtd").value);
  if (!p) return aviso("Código não encontrado.", true);
  if (isNaN(add) || add < 1) return aviso("Informe uma quantidade válida.", true);
  p.quantidade += add;
  $("codQtd").value = $("addQtd").value = "";
  render();
  aviso("Quantidade adicionada.");
};

function remover(codigo) {
  produtos = produtos.filter((p) => p.codigo !== codigo);
  render();
  aviso("Produto excluído.");
}

render();