
let produtos = [];
let codigo = 1;

function validarProduto(d, q, v) {
  return d.trim() !== "" && q > 0 && v > 0;
}

function cadastrar() {
  let d = descricao.value;
  let q = Number(quantidade.value);
  let v = Number(valor.value);

  if (!validarProduto(d, q, v)) {
    alert("Preencha os dados corretamente!");
    return;
  }

  produtos.push({ codigo: codigo++, descricao: d, quantidade: q, valor: v });

  listar();
}

function listar() {
  lista.innerHTML = "";

  produtos.forEach(p => {
    lista.innerHTML += `
      <tr>
        <td>${p.codigo}</td>
        <td>${p.descricao}</td>
        <td>${p.quantidade}</td>
        <td>R$ ${p.valor.toFixed(2)}</td>
      </tr>`;
  });
}

function atualizarValor(c, v) {
  let p = produtos.find(p => p.codigo === c);
  if (p) p.valor = v;
  else alert("Produto não encontrado!");
  listar();
}

function atualizarQuantidade(c, q) {
  let p = produtos.find(p => p.codigo === c);
  if (p) p.quantidade += q;
  else alert("Produto não encontrado!");
  listar();
}
