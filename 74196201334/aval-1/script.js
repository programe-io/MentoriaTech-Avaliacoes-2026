// O código Java Script conta com uma única parte ao final feita pela IA para ser possível vizualizar.
let produtos = [];

function verify(descr, valor, quant) {
  if (descr.length < 5) {
    throw new Error('A descriçaõ deve ter ao mernos 5 caracteres!');
  }
  else if (valor < 0) {
    throw new Error('O valor mínimo permitido é 0!');
  }
  else if (quant < 0) {
    throw new Error('A quantidade não pode ser menor que 0!');
  }
}

function prodNovo (descr, valor, quant) {
    let novoProd = {
      "código": produtos.length + 1,
      "descr": descr,
      "valor": valor,
      "quant": quant
    }
  produtos.push(novoProd);
}

function listarProd() {
  console.log(produtos)
}

function descrUpdate (codigo, novoDescr) {
  if (novoDescr.length < 5) {
    throw new Error('A descroção não pode ter menos que 5 caracteres!');
  }
  const prod = produtos.find(p => p.código === codigo);
  if (prod) {
    prod.descr = novoDescr;
  }
  else {
    throw new Error('Produto não encontrado: ');
  }
}

function valorUpdate (codigo, novoValor) {
  if (novoValor < 0) {
    throw new Error('O valor mínimo permitido é 0!');
  }
  const prod = produtos.find(p => p.código === codigo);
  if (prod) {
    prod.valor = novoValor;
  }
  else {
    throw new Error('Produto não encontrado: ')
  }
}

function quantUpdate (codigo, novoQuant) {
  if (novoQuant < 0) {
    throw new Error('O valor mínimo permitido é 0!');
  }
  const prod = produtos.find(p => p.código === codigo);
  if (prod) {
    prod.quant = novoQuant;
  }
  else {
    throw new Error('Produto não encontrado: ');
  }
}

prodNovo('ULTRAKILL', 49.99, 35);
prodNovo('Signalis', 59.99, 10);
prodNovo('Naruto: Ultimate Ninja Storm 4', 74.99, 52);
listarProd();
descrUpdate(1, "ULTRAKILL: INFINITE HYPERDEATH");
valorUpdate(2, 34.99);
quantUpdate(3, 30);
listarProd();

const lista = document.getElementById('listaProdutos');

// PARTE INSERIDA PELA IA PARA SER POSSÍVEL VIZUALIZAR
produtos.forEach(prod => {
    lista.innerHTML += `
        <tr>
            <td>${prod.código}</td>
            <td>${prod.descr}</td>
            <td>R$ ${prod.valor.toFixed(2)}</td>
            <td>${prod.quant}</td>
        </tr>
    `;
});
// PARTE INSERIDA PELA IA PARA SER POSSÍVEL VIZUALIZAR