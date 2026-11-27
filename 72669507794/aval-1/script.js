let itens = [
  { nome: "Caderno", qtd: 10 },
  { nome: "Caneta", qtd: 4 }
];

let termoBusca = "";

function pegarStatus(qtd) {
  if (qtd === 0) {
    return { texto: "Sem estoque", classe: "status-baixo" };
  } else if (qtd <= 5) {
    return { texto: "Estoque baixo", classe: "status-baixo" };
  } else {
    return { texto: "Estoque ok", classe: "status-ok" };
  }
}

function renderizar() {
  let lista = document.getElementById("listaProdutos");
  lista.innerHTML = "";

  let exibidos = 0;

  for (let i = 0; i < itens.length; i++) {
    let item = itens[i];
    let bateBusca =
      termoBusca === "" ||
      item.nome.toLowerCase().includes(termoBusca.toLowerCase());

    if (bateBusca) {
      exibidos++;
      let status = pegarStatus(item.qtd);

      let card = document.createElement("div");
      card.className = "produto-card";

      card.innerHTML =
        "<div>" +
          "<strong>" + item.nome + "</strong> - Qtd: " + item.qtd +
          " <span class='" + status.classe + "'>(" + status.texto + ")</span>" +
        "</div>" +
        "<div class='botoes'>" +
          "<button type='button' onclick='mudarQtd(" + i + ", 1)'>+1</button>" +
          "<button type='button' onclick='mudarQtd(" + i + ", -1)'>-1</button>" +
          "<button type='button' onclick='apagarItem(" + i + ")'>Excluir</button>" +
        "</div>";

      lista.appendChild(card);
    }
  }

  if (exibidos === 0) {
    lista.innerHTML = "<p>Nenhum item encontrado.</p>";
  }
}

function adicionarItem() {
  let nomeCampo = document.getElementById("produtoInput");
  let qtdCampo = document.getElementById("qtdInput");
  let aviso = document.getElementById("aviso");

  let nome = nomeCampo.value.trim();
  let qtd = parseInt(qtdCampo.value, 10);

  if (nome === "" || isNaN(qtd) || qtd < 0) {
    aviso.textContent = "Digite o nome do produto e uma quantidade valida.";
    return;
  }

  aviso.textContent = "";

  let posicao = -1;
  for (let i = 0; i < itens.length; i++) {
    if (itens[i].nome.toLowerCase() === nome.toLowerCase()) {
      posicao = i;
      break;
    }
  }

  if (posicao >= 0) {
    itens[posicao].qtd += qtd;
  } else {
    itens.push({ nome: nome, qtd: qtd });
  }

  nomeCampo.value = "";
  qtdCampo.value = "";
  renderizar();
}

function mudarQtd(indice, variacao) {
  let novaQtd = itens[indice].qtd + variacao;
  if (novaQtd < 0) {
    document.getElementById("aviso").textContent = "A quantidade nao pode ser menor que 0.";
    return;
  }
  document.getElementById("aviso").textContent = "";
  itens[indice].qtd = novaQtd;
  renderizar();
}

function apagarItem(indice) {
  itens.splice(indice, 1);
  renderizar();
}

function aplicarFiltro() {
  termoBusca = document.getElementById("filtroInput").value.trim();
  renderizar();
}

function mostrarTudo() {
  document.getElementById("filtroInput").value = "";
  termoBusca = "";
  renderizar();
}

renderizar();