

const produtos = [
  {
    id: 1, nome: "Prato feito", categoria: "almoco",
    descricao: "Arroz, feijão, carne e salada.",
    preco: 22, imagem: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600"
  },
  {
    id: 2, nome: "Frango grelhado", categoria: "almoco",
    descricao: "Frango grelhado com acompanhamentos.",
    preco: 25, imagem: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600"
  },
  {
    id: 3, nome: "Lasanha", categoria: "almoco",
    descricao: "Lasanha com molho especial.",
    preco: 28, imagem: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600"
  },
  {
    id: 4, nome: "Hambúrguer", categoria: "lanche",
    descricao: "Pão, carne, queijo e salada.",
    preco: 20, imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
  },
  {
    id: 5, nome: "Pizza", categoria: "lanche",
    descricao: "Pizza com queijo e molho especial.",
    preco: 32, imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600"
  },
  {
    id: 6, nome: "Batata frita", categoria: "lanche",
    descricao: "Porção crocante e saborosa.",
    preco: 15, imagem: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600"
  },
  {
    id: 7, nome: "Bolo de chocolate", categoria: "sobremesa",
    descricao: "Bolo fofinho com cobertura.",
    preco: 12, imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"
  },
  {
    id: 8, nome: "Sorvete", categoria: "sobremesa",
    descricao: "Sorvete cremoso.",
    preco: 10, imagem: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600"
  },
  {
    id: 9, nome: "Pudim", categoria: "sobremesa",
    descricao: "Pudim com calda de caramelo.",
    preco: 9, imagem: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600"
  },
  {
    id: 10, nome: "Refrigerante", categoria: "bebida",
    descricao: "Lata de 350 ml.",
    preco: 6, imagem: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600"
  },
  {
    id: 11, nome: "Suco natural", categoria: "bebida",
    descricao: "Suco natural gelado.",
    preco: 8, imagem: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600"
  },
  {
    id: 12, nome: "Água mineral", categoria: "bebida",
    descricao: "Garrafa de água mineral.",
    preco: 4, imagem: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600"
  }
];

let carrinho = [];
let categoriaAtual = "todos";

const areaProdutos = document.getElementById("produtos");
const busca = document.getElementById("busca");
const modalCarrinho = document.getElementById("modalCarrinho");
const modalFinalizar = document.getElementById("modalFinalizar");

function moeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function mostrarProdutos() {
  const termo = busca.value.toLowerCase();

  const filtrados = produtos.filter(produto => {
    const combinaCategoria =
      categoriaAtual === "todos" ||
      produto.categoria === categoriaAtual;

    const combinaBusca =
      produto.nome.toLowerCase().includes(termo) ||
      produto.descricao.toLowerCase().includes(termo);

    return combinaCategoria && combinaBusca;
  });

  areaProdutos.innerHTML = "";

  if (filtrados.length === 0) {
    areaProdutos.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }

  filtrados.forEach(produto => {
    areaProdutos.innerHTML += `
      <article class="produto">
        <img src="${produto.imagem}" alt="${produto.nome}">
        <div class="produto-info">
          <h3>${produto.nome}</h3>
          <p>${produto.descricao}</p>
          <span class="preco">${moeda(produto.preco)}</span>
          <button class="adicionar" data-id="${produto.id}">
            + Adicionar ao carrinho
          </button>
        </div>
      </article>
    `;
  });
}

areaProdutos.addEventListener("click", evento => {
  const botao = evento.target.closest(".adicionar");
  if (!botao) return;

  const id = Number(botao.dataset.id);
  const item = carrinho.find(produto => produto.id === id);

  if (item) {
    item.quantidade++;
  } else {
    const produto = produtos.find(produto => produto.id === id);
    carrinho.push({ ...produto, quantidade: 1 });
  }

  atualizarCarrinho();
});

function atualizarCarrinho() {
  const itens = document.getElementById("itensCarrinho");
  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade, 0
  );

  const quantidade = carrinho.reduce(
    (soma, item) => soma + item.quantidade, 0
  );

  document.getElementById("quantidadeCarrinho").textContent = quantidade;
  document.getElementById("totalCarrinho").textContent = moeda(total);
  document.getElementById("totalFinal").textContent = moeda(total);

  itens.innerHTML = "";

  if (carrinho.length === 0) {
    itens.innerHTML = "<p>Seu carrinho está vazio.</p>";
  }

  carrinho.forEach(item => {
    itens.innerHTML += `
      <div class="item-carrinho">
        <div>
          <strong>${item.nome}</strong><br>
          ${item.quantidade} x ${moeda(item.preco)}
        </div>
        <button class="remover" data-id="${item.id}">
          Remover
        </button>
      </div>
    `;
  });
}

document.getElementById("itensCarrinho").addEventListener("click", evento => {
  const botao = evento.target.closest(".remover");
  if (!botao) return;

  const id = Number(botao.dataset.id);
  carrinho = carrinho.filter(item => item.id !== id);
  atualizarCarrinho();
});

document.getElementById("abrirCarrinho").onclick = () => {
  modalCarrinho.classList.add("aberto");
};

document.getElementById("fecharCarrinho").onclick = () => {
  modalCarrinho.classList.remove("aberto");
};

document.getElementById("fecharFinalizar").onclick = () => {
  modalFinalizar.classList.remove("aberto");
};

document.getElementById("fecharPedido").onclick = () => {
  if (carrinho.length === 0) {
    alert("Adicione produtos ao carrinho antes de fechar o pedido!");
    return;
  }

  modalCarrinho.classList.remove("aberto");
  atualizarCarrinho();
  modalFinalizar.classList.add("aberto");
};

document.getElementById("formPedido").addEventListener("submit", evento => {
  evento.preventDefault();

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    modalFinalizar.classList.remove("aberto");
    return;
  }

  const nome = document.getElementById("nomeCliente").value.trim();
  const endereco = document.getElementById("enderecoCliente").value.trim();
  const pagamento = document.getElementById("pagamento").value;
  const observacao = document.getElementById("observacao").value.trim();

  if (!nome || !endereco || !pagamento) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade, 0
  );

  let mensagem = `Olá! Gostaria de fazer um pedido no Sabor & Arte.%0A%0A`;
  mensagem += `*DADOS DO CLIENTE*%0A`;
  mensagem += `Nome: ${encodeURIComponent(nome)}%0A`;
  mensagem += `Endereço: ${encodeURIComponent(endereco)}%0A`;
  mensagem += `Pagamento: ${encodeURIComponent(pagamento)}%0A%0A`;
  mensagem += `*MEU PEDIDO*%0A`;

  carrinho.forEach(item => {
    mensagem += `${encodeURIComponent(item.quantidade + "x " + item.nome)} - ${encodeURIComponent(moeda(item.preco * item.quantidade))}%0A`;
  });

  mensagem += `%0A*TOTAL: ${encodeURIComponent(moeda(total))}*`;

  if (observacao) {
    mensagem += `%0AObservações: ${encodeURIComponent(observacao)}`;
  }

  // Troque pelo número real da loja, com código do país e DDD.
  const telefone = "5500000000000";
  const url = `https://wa.me/${telefone}?text=${mensagem}`;

  window.open(url, "_blank");
});

document.querySelectorAll(".filtro").forEach(botao => {
  botao.addEventListener("click", () => {
    document.querySelector(".filtro.ativo").classList.remove("ativo");
    botao.classList.add("ativo");
    categoriaAtual = botao.dataset.categoria;
    mostrarProdutos();
  });
});

busca.addEventListener("input", mostrarProdutos);

[modalCarrinho, modalFinalizar].forEach(modal => {
  modal.addEventListener("click", evento => {
    if (evento.target === modal) {
      modal.classList.remove("aberto");
    }
  });
});

mostrarProdutos();
atualizarCarrinho();
