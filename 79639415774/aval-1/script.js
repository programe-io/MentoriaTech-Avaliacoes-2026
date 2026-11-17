
// BABYSTAK - CONFIGURAÇÃO DA LOJA

// Substitua pelo WhatsApp do vendedor com DDI e DDD.
// Exemplo: 5511999999999
const WHATSAPP_VENDEDOR = "5500000000000";

// Cada produto possui nome, categoria, preço e palavras
// para procurar uma fotografia relacionada ao produto.
const produtos = [
  ["Body manga curta","Roupas",29.90,"baby,onesie"],
  ["Body manga longa","Roupas",34.90,"baby,bodysuit"],
  ["Macacão de algodão","Roupas",49.90,"baby,romper"],
  ["Macacão de plush","Roupas",59.90,"baby,sleeper"],
  ["Conjunto de verão","Roupas",45.90,"baby,summer,outfit"],
  ["Conjunto de inverno","Roupas",69.90,"baby,winter,outfit"],
  ["Vestido infantil","Roupas",54.90,"baby,girl,dress"],
  ["Calça de bebê","Roupas",25.90,"baby,pants"],
  ["Short infantil","Roupas",22.90,"baby,shorts"],
  ["Pijama infantil","Roupas",44.90,"baby,pajamas"],
  ["Camiseta infantil","Roupas",27.90,"baby,tshirt"],
  ["Jaqueta de bebê","Roupas",64.90,"baby,jacket"],
  ["Casaco infantil","Roupas",58.90,"baby,coat"],
  ["Saída de maternidade","Roupas",99.90,"newborn,outfit"],
  ["Macacão com capuz","Roupas",57.90,"baby,hooded,romper"],

  ["Touca de algodão","Acessórios",19.90,"baby,hat"],
  ["Kit de meias","Acessórios",24.90,"baby,socks"],
  ["Luvas de bebê","Acessórios",16.90,"baby,mittens"],
  ["Faixa de cabelo","Acessórios",14.90,"baby,headband"],
  ["Laço infantil","Acessórios",12.90,"baby,hairbow"],
  ["Babador impermeável","Acessórios",18.90,"baby,bib"],
  ["Babador de algodão","Acessórios",15.90,"baby,cotton,bib"],
  ["Kit pente e escova","Acessórios",22.90,"baby,hairbrush"],
  ["Prendedor de chupeta","Acessórios",17.90,"baby,pacifierclip"],
  ["Chupeta","Acessórios",21.90,"baby,pacifier"],
  ["Mordedor de silicone","Acessórios",23.90,"baby,teether"],
  ["Kit de presilhas","Acessórios",13.90,"baby,hairclips"],
  ["Bolsa maternidade","Acessórios",89.90,"diaperbag"],
  ["Trocador portátil","Acessórios",39.90,"baby,changingmat"],
  ["Toalha com capuz","Acessórios",42.90,"baby,hoodedtowel"],

  ["Sapatinho de tricô","Calçados",29.90,"baby,knitbooties"],
  ["Tênis infantil","Calçados",49.90,"baby,sneakers"],
  ["Sandália de bebê","Calçados",39.90,"baby,babysandals"],
  ["Meia sapatilha","Calçados",19.90,"baby,shoes"],
  ["Botinha infantil","Calçados",44.90,"baby,boots"],
  ["Sapatinho de festa","Calçados",42.90,"baby,formalshoes"],
  ["Chinelo infantil","Calçados",25.90,"baby,slippers"],
  ["Tênis de velcro","Calçados",54.90,"baby,velcroshoes"],
  ["Sapatinho de algodão","Calçados",27.90,"baby,softshoes"],
  ["Bota de plush","Calçados",46.90,"baby,plushboots"],

  ["Manta de bebê","Quarto",49.90,"baby,blanket"],
  ["Jogo de lençol","Quarto",69.90,"baby,cribsheets"],
  ["Travesseiro infantil","Quarto",35.90,"baby,pillow"],
  ["Almofada decorativa","Quarto",39.90,"nursery,cushion"],
  ["Kit de berço decorativo","Quarto",119.90,"baby,cribbedding"],
  ["Mosquiteiro para berço","Quarto",59.90,"baby,mosquitonet"],
  ["Cobertor infantil","Quarto",55.90,"baby,quilt"],
  ["Organizador de berço","Quarto",34.90,"nursery,organizer"],
  ["Móbile decorativo","Quarto",79.90,"nursery,babymobile"],
  ["Luminária infantil","Quarto",49.90,"nursery,babylamp"],

  ["Carrinho de passeio","Passeio",399.90,"baby,stroller"],
  ["Bolsa térmica","Passeio",49.90,"baby,thermalbag"],
  ["Canguru de passeio","Passeio",129.90,"baby,babycarrier"],
  ["Capa para carrinho","Passeio",45.90,"stroller,cover"],
  ["Organizador de carrinho","Passeio",39.90,"stroller,organizer"],
  ["Kit de viagem","Passeio",59.90,"baby,travelkit"],
  ["Sombrinha para carrinho","Passeio",44.90,"stroller,canopy"],
  ["Mochila maternidade","Passeio",109.90,"diaper,backpack"],
  ["Porta mamadeira","Passeio",29.90,"baby,bottleholder"],
  ["Almofada de amamentação","Passeio",69.90,"nursing,pillow"]
];

let carrinho = [];
let categoriaAtual = "Todos";

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Cria um cartão com foto, nome, categoria e preço.
function mostrarProdutos(lista = produtos) {
  const area = document.getElementById("listaProdutos");
  area.innerHTML = "";

  document.getElementById("quantidadeProdutos").textContent =
    lista.length + " produto(s) encontrado(s)";

  lista.forEach(produto => {
    const indice = produtos.indexOf(produto);

    // Cada item usa palavras diferentes e um número exclusivo.
    const foto =
      "https://loremflickr.com/600/450/" +
      produto[3] + "?lock=" + (8000 + indice);

    const card = document.createElement("article");
    card.className = "produto";

    const imagem = document.createElement("img");
    imagem.src = foto;
    imagem.alt = produto[0];
    imagem.loading = "lazy";

    imagem.onerror = function() {
      this.onerror = null;
      this.src =
        "https://placehold.co/600x450/F8E8EC/9A7180?text=Foto+indisponivel";
    };

    const nome = document.createElement("h3");
    nome.textContent = produto[0];

    const categoria = document.createElement("p");
    categoria.textContent = produto[1];

    const preco = document.createElement("p");
    preco.className = "preco";
    preco.textContent = "R$ " + formatarMoeda(produto[2]);

    const botao = document.createElement("button");
    botao.textContent = "Adicionar ao carrinho";
    botao.onclick = () => adicionarCarrinho(indice);

    card.append(imagem, nome, categoria, preco, botao);
    area.appendChild(card);
  });
}

// Adiciona produto ao carrinho.
function adicionarCarrinho(indice) {
  const item = carrinho.find(p => p.indice === indice);

  if (item) {
    item.quantidade++;
  } else {
    carrinho.push({
      indice: indice,
      quantidade: 1
    });
  }

  atualizarCarrinho();
  alert("Produto adicionado ao carrinho!");
}

// Atualiza quantidades e valor total.
function atualizarCarrinho() {
  const area = document.getElementById("itensCarrinho");
  area.innerHTML = "";

  let total = 0;
  let quantidadeTotal = 0;

  carrinho.forEach(item => {
    const produto = produtos[item.indice];
    const subtotal = produto[2] * item.quantidade;

    total += subtotal;
    quantidadeTotal += item.quantidade;

    const linha = document.createElement("div");
    linha.className = "item-carrinho";

    const texto = document.createElement("p");
    texto.textContent =
      produto[0] + " | " +
      item.quantidade + " unidade(s) | R$ " +
      formatarMoeda(subtotal);

    const menos = document.createElement("button");
    menos.textContent = "-";
    menos.onclick = () => alterarQuantidade(item.indice, -1);

    const mais = document.createElement("button");
    mais.textContent = "+";
    mais.onclick = () => alterarQuantidade(item.indice, 1);

    const remover = document.createElement("button");
    remover.textContent = "Remover";
    remover.onclick = () => removerProduto(item.indice);

    linha.append(texto, menos, mais, remover);
    area.appendChild(linha);
  });

  if (carrinho.length === 0) {
    area.textContent = "Seu carrinho está vazio.";
  }

  document.getElementById("total").textContent =
    formatarMoeda(total);

  document.getElementById("contador").textContent =
    quantidadeTotal;
}

// Aumenta ou diminui a quantidade.
function alterarQuantidade(indice, valor) {
  const item = carrinho.find(p => p.indice === indice);
  if (!item) return;

  item.quantidade += valor;

  if (item.quantidade <= 0) {
    removerProduto(indice);
  } else {
    atualizarCarrinho();
  }
}

// Remove um produto.
function removerProduto(indice) {
  carrinho = carrinho.filter(p => p.indice !== indice);
  atualizarCarrinho();
}

// Abre e fecha o carrinho.
function abrirCarrinho() {
  document.getElementById("modalCarrinho").style.display = "block";
  atualizarCarrinho();
}

function fecharCarrinho() {
  document.getElementById("modalCarrinho").style.display = "none";
}

// Filtra os produtos por categoria e pesquisa.
function filtrarCategoria(categoria) {
  categoriaAtual = categoria;
  filtrarProdutos();
}

function filtrarProdutos() {
  const busca = document.getElementById("pesquisa")
    .value.toLowerCase();

  const resultado = produtos.filter(produto => {
    const nomeCorresponde =
      produto[0].toLowerCase().includes(busca);

    const categoriaCorresponde =
      categoriaAtual === "Todos" ||
      produto[1] === categoriaAtual;

    return nomeCorresponde && categoriaCorresponde;
  });

  mostrarProdutos(resultado);
}

// Finaliza o pedido e abre o WhatsApp do vendedor.
document.getElementById("formPedido").addEventListener(
  "submit",
  function(event) {
    event.preventDefault();

    if (carrinho.length === 0) {
      alert("Adicione produtos ao carrinho antes de finalizar.");
      return;
    }

    if (WHATSAPP_VENDEDOR === "5500000000000") {
      alert("Configure o número do vendedor no arquivo script.js.");
      return;
    }

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const pagamento = document.getElementById("pagamento").value;

    let total = 0;
    let mensagem = "Olá! Quero fazer um pedido na BabyStak.\n\n";

    mensagem += "Cliente: " + nome + "\n";
    mensagem += "Telefone: " + telefone + "\n";
    mensagem += "Endereço: " + endereco + "\n\n";
    mensagem += "Produtos escolhidos:\n";

    carrinho.forEach(item => {
      const produto = produtos[item.indice];
      const subtotal = produto[2] * item.quantidade;

      total += subtotal;

      mensagem += produto[0] +
        " | Quantidade: " + item.quantidade +
        " | R$ " + formatarMoeda(subtotal) + "\n";
    });

    mensagem += "\nTotal do pedido: R$ " + formatarMoeda(total);
    mensagem += "\nPagamento escolhido: " + pagamento;
    mensagem += "\nAguardo confirmação do pedido.";

    const link = "https://wa.me/" +
      WHATSAPP_VENDEDOR +
      "?text=" + encodeURIComponent(mensagem);

    window.open(link, "_blank");
  }
);

// Mostra todos os produtos ao abrir o site.
mostrarProdutos();
