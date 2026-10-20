
function selecionar(nome, preco) {
  const mensagem = document.getElementById("mensagem");

  const valor = preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  mensagem.textContent =
    "Você escolheu " + nome + " (" + valor +
    "). Entre em contato para consultar a disponibilidade!";
}
