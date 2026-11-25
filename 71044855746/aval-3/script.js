const form = document.getElementById("form-imc");
const tabelaPacientes = document.getElementById("tabela-pacientes");

// Array para armazenar os pacientes cadastrados
const pacientes = [];

// Função para classificar o IMC
function classificarIMC(imc) {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Peso normal";
  if (imc < 30) return "Sobrepeso";
  if (imc < 35) return "Obesidade grau I";
  if (imc < 40) return "Obesidade grau II";
  return "Obesidade grau III";
}

// Função para renderizar a tabela na tela
function render() {
  tabelaPacientes.innerHTML = "";

  if (pacientes.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 5;
    td.classList.add("vazio");
    td.textContent = "Nenhum paciente cadastrado ainda.";
    tr.appendChild(td);
    tabelaPacientes.appendChild(tr);
    return;
  }

  pacientes.forEach((paciente) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${paciente.nome}</td>
      <td>${paciente.peso.toFixed(1)} kg</td>
      <td>${paciente.altura.toFixed(2)} m</td>
      <td><strong>${paciente.imc.toFixed(2)}</strong></td>
      <td>${paciente.classificacao}</td>
    `;

    tabelaPacientes.appendChild(tr);
  });
}

// Evento de envio do formulário
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);

  if (!nome || peso <= 0 || altura <= 0) {
    alert("Por favor, preencha todos os campos com valores válidos.");
    return;
  }

  const imc = peso / (altura * altura);
  const classificacao = classificarIMC(imc);

  pacientes.push({
    nome,
    peso,
    altura,
    imc,
    classificacao
  });

  form.reset();
  render();
});

// Renderiza o estado inicial da tabela
render();
