// Projeto Prático: Controle de IMC
// Passo 1: receber o nome do paciente
// Passo 2: receber peso e altura
// Passo 3: calcular o IMC
// Passo 4: exibir as informações sobre o IMC do paciente

// Faixas de classificação do IMC para adultos
const FAIXAS = [
  { ate: 18.5, nome: "Abaixo do peso", faixa: "Menos de 18,5", texto: "O IMC está abaixo da faixa considerada normal. Vale conversar com um profissional de saúde." },
  { ate: 25, nome: "Peso normal", faixa: "18,5 a 24,9", texto: "O IMC está dentro da faixa considerada normal para adultos." },
  { ate: 30, nome: "Sobrepeso", faixa: "25,0 a 29,9", texto: "O IMC está acima da faixa considerada normal. Um profissional de saúde pode orientar." },
  { ate: 35, nome: "Obesidade grau I", faixa: "30,0 a 34,9", texto: "O IMC está bem acima da faixa considerada normal. Procure orientação de um profissional de saúde." },
  { ate: 40, nome: "Obesidade grau II", faixa: "35,0 a 39,9", texto: "O IMC está bem acima da faixa considerada normal. Procure orientação de um profissional de saúde." },
  { ate: Infinity, nome: "Obesidade grau III", faixa: "40,0 ou mais", texto: "O IMC está bem acima da faixa considerada normal. Procure orientação de um profissional de saúde." }
];

// ---------- Passo 1: receber o nome do paciente ----------
function receberNome() {
  return document.getElementById("nome").value.trim();
}

// ---------- Passo 2: receber peso e altura ----------
function paraNumero(texto) {
  return parseFloat(String(texto).replace(",", "."));
}

function receberPesoEAltura() {
  const peso = paraNumero(document.getElementById("peso").value);
  let altura = paraNumero(document.getElementById("altura").value);
  if (altura > 3) {
    altura = altura / 100; // aceita altura em centímetros (ex.: 175)
  }
  return { peso, altura };
}

function validar(nome, peso, altura) {
  if (!nome) return "Informe o nome do paciente.";
  if (!(peso >= 1 && peso <= 500)) return "Informe um peso válido, entre 1 e 500 kg.";
  if (!(altura >= 0.5 && altura <= 2.8)) return "Informe uma altura válida, entre 0,5 e 2,8 m (ou em centímetros, como 175).";
  return "";
}

// ---------- Passo 3: calcular o IMC ----------
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

function classificarIMC(imc) {
  return FAIXAS.find(function (f) { return imc < f.ate; });
}

function faixaDePesoNormal(altura) {
  return { min: 18.5 * altura * altura, max: 24.9 * altura * altura };
}

// ---------- Passo 4: exibir as informações ----------
function formatar(numero, casas) {
  return numero.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
}

function exibirInformacoes(nome, peso, altura, imc) {
  const valor = Math.round(imc * 10) / 10; // o mesmo valor que aparece na tela define a classificação
  const faixa = classificarIMC(valor);
  const normal = faixaDePesoNormal(altura);

  document.getElementById("rNome").textContent = nome;
  document.getElementById("rDados").textContent = formatar(peso, 1) + " kg e " + formatar(altura, 2) + " m";
  document.getElementById("rImc").textContent = formatar(valor, 1);
  document.getElementById("rClasse").textContent = faixa.nome;
  document.getElementById("rTexto").textContent = faixa.texto;
  document.getElementById("rIdeal").textContent =
    "Para essa altura, a faixa de peso considerada normal vai de " + formatar(normal.min, 1) + " kg a " + formatar(normal.max, 1) + " kg.";
  document.getElementById("tabela").innerHTML = FAIXAS.map(function (f) {
    return '<tr' + (f === faixa ? ' class="atual"' : '') + '><td>' + f.nome + '</td><td>' + f.faixa + '</td></tr>';
  }).join("");
  document.getElementById("resultado").hidden = false;
}

// ---------- Junta os 4 passos ----------
function processar() {
  const erro = document.getElementById("erro");
  const nome = receberNome();                    // passo 1
  const dados = receberPesoEAltura();            // passo 2
  const problema = validar(nome, dados.peso, dados.altura);

  if (problema) {
    erro.textContent = problema;
    erro.hidden = false;
    document.getElementById("resultado").hidden = true;
    return;
  }

  erro.hidden = true;
  const imc = calcularIMC(dados.peso, dados.altura); // passo 3
  exibirInformacoes(nome, dados.peso, dados.altura, imc); // passo 4
}

document.getElementById("calcular").addEventListener("click", processar);
["nome", "peso", "altura"].forEach(function (id) {
  document.getElementById(id).addEventListener("keydown", function (e) {
    if (e.key === "Enter") processar();
  });
});