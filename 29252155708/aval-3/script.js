// Dados iniciais com base na imagem de exemplo
const dadosIniciais = [
  { nome: "Maria", peso: 72.0, altura: 1.65 },
  { nome: "Joaquim", peso: 65.0, altura: 1.68 }
];

// Seleção dos elementos do DOM
const tabelaCorpo = document.getElementById("tabelaCorpo");
const form = document.getElementById("imcForm");

// Função para calcular o IMC
function calcularIMC(peso, altura) {
  return (peso / (altura * altura)).toFixed(1);
}

// Função para determinar o status e o estilo CSS da situação
function obterStatusIMC(imc) {
  if (imc < 18.5) {
    return { situacao: "Abaixo do peso", classe: "badge-abaixo" };
  } else if (imc >= 18.5 && imc <= 24.9) {
    return { situacao: "Normal", classe: "badge-normal" };
  } else if (imc >= 25.0 && imc <= 29.9) {
    return { situacao: "Sobrepeso", classe: "badge-sobrepeso" };
  } else {
    return { situacao: "Obesidade", classe: "badge-obesidade" };
  }
}

// Função para renderizar a tabela na tela
function renderizarTabela() {
  tabelaCorpo.innerHTML = "";

  dadosIniciais.forEach((pessoa, index) => {
    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const { situacao, classe } = obterStatusIMC(Number(imc));

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${pessoa.nome}</td>
      <td>${pessoa.peso.toFixed(1)}</td>
      <td>${pessoa.altura.toFixed(2)}</td>
      <td>${imc}</td>
      <td><span class="badge ${classe}">${situacao}</span></td>
      <td><button class="btn-delete" onclick="removerPessoa(${index})">Excluir</button></td>
    `;

    tabelaCorpo.appendChild(tr);
  });
}

// Função para adicionar uma nova pessoa pelo formulário
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const peso = Number(document.getElementById("peso").value);
  const altura = Number(document.getElementById("altura").value);

  if (!nome || !Number.isFinite(peso) || peso <= 0 || !Number.isFinite(altura) || altura <= 0) {
    alert("Preencha nome, peso e altura com valores válidos.");
    return;
  }

  dadosIniciais.push({ nome, peso, altura });
  renderizarTabela();
  form.reset();
});

// Função para remover uma linha
function removerPessoa(index) {
  dadosIniciais.splice(index, 1);
  renderizarTabela();
}

// Renderização inicial
renderizarTabela();