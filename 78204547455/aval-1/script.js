
let agendamentos = [];

function agendar() {
  const cliente = document.getElementById("cliente").value;
  const servico = document.getElementById("servico").value;
  const data = document.getElementById("data").value;

  if (!cliente || !servico || !data) {
    alert("Preencha todos os campos!");
    return;
  }

  agendamentos.push({ cliente, servico, data });
  atualizarLista();

  document.getElementById("cliente").value = "";
  document.getElementById("servico").value = "";
  document.getElementById("data").value = "";

  alert("Agendamento realizado com sucesso!");
}

function atualizarLista() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  agendamentos.forEach((a, i) => {
    const item = document.createElement("p");
    item.textContent =
      `${a.cliente} - ${a.servico} - ${a.data} `;

    const botao = document.createElement("button");
    botao.textContent = "Excluir";
    botao.onclick = () => remover(i);

    item.appendChild(botao);
    lista.appendChild(item);
  });
}

function remover(i) {
  agendamentos.splice(i, 1);
  atualizarLista();
  alert("Agendamento excluído!");
}
