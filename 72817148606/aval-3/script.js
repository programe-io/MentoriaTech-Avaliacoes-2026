let movimentacoes = [];

function adicionar() {
  const descricao = document.getElementById("descricao").value.trim();
  const valor = Number(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  if (!descricao || !Number.isFinite(valor) || valor <= 0) {
    alert("Preencha os dados corretamente!");
    return;
  }

  movimentacoes.push({
    descricao,
    valor,
    tipo
  });

  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";

  mostrar();
}

function mostrar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  let saldo = 0;

  movimentacoes.forEach((item, i) => {
    if (item.tipo === "entrada") {
      saldo += item.valor;
    } else {
      saldo -= item.valor;
    }

    const div = document.createElement("div");
    div.className = "item";

    const texto = document.createElement("span");
    texto.textContent =
      item.descricao + " - " +
      (item.tipo === "entrada" ? "+ R$ " : "- R$ ") +
      item.valor.toFixed(2);

    const excluir = document.createElement("button");
    excluir.textContent = "Excluir";
    excluir.onclick = () => {
      movimentacoes.splice(i, 1);
      mostrar();
    };

    div.append(texto, excluir);
    lista.appendChild(div);
  });

  document.getElementById("saldo").textContent =
    "Saldo: R$ " + saldo.toFixed(2).replace(".", ",");
}