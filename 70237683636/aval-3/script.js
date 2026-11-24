const imcForm = document.getElementById("imc-form");
const pesoInput = document.getElementById("peso");
const alturaInput = document.getElementById("altura");
const imcResultado = document.getElementById("imc-resultado");

const tarefaForm = document.getElementById("tarefa-form");
const tarefaInput = document.getElementById("tarefa-input");
const listaTarefas = document.getElementById("lista-tarefas");

let tarefas = JSON.parse(localStorage.getItem("tarefas_imc")) || [];

function classificarIMC(imc) {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Peso normal";
  if (imc < 30) return "Sobrepeso";
  if (imc < 35) return "Obesidade grau I";
  if (imc < 40) return "Obesidade grau II";
  return "Obesidade grau III";
}

imcForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const peso = parseFloat(pesoInput.value);
  const altura = parseFloat(alturaInput.value);

  if (!peso || !altura || altura <= 0) {
    imcResultado.textContent = "Informe valores válidos.";
    return;
  }

  const imc = peso / (altura * altura);
  const classificacao = classificarIMC(imc);
  imcResultado.textContent = `IMC: ${imc.toFixed(2)} — ${classificacao}`;
});

function salvarTarefas() {
  localStorage.setItem("tarefas_imc", JSON.stringify(tarefas));
}

function renderizarTarefas() {
  listaTarefas.innerHTML = "";

  tarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    if (tarefa.concluida) li.classList.add("concluida");

    const span = document.createElement("span");
    span.textContent = tarefa.texto;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const btnConcluir = document.createElement("button");
    btnConcluir.type = "button";
    btnConcluir.textContent = tarefa.concluida ? "Desfazer" : "Concluir";
    btnConcluir.addEventListener("click", () => {
      tarefa.concluida = !tarefa.concluida;
      salvarTarefas();
      renderizarTarefas();
    });

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.className = "remover";
    btnRemover.textContent = "Excluir";
    btnRemover.addEventListener("click", () => {
      tarefas = tarefas.filter((item) => item.id !== tarefa.id);
      salvarTarefas();
      renderizarTarefas();
    });

    acoes.append(btnConcluir, btnRemover);
    li.append(span, acoes);
    listaTarefas.appendChild(li);
  });
}

tarefaForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const texto = tarefaInput.value.trim();
  if (!texto) return;

  tarefas.push({
    id: Date.now(),
    texto,
    concluida: false
  });

  tarefaInput.value = "";
  salvarTarefas();
  renderizarTarefas();
});

renderizarTarefas();
