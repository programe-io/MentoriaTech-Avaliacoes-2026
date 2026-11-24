const pacientes = [];

function $(id) {
  return document.getElementById(id);
}

function formatar(numero, casas) {
  return numero.toFixed(casas).replace(".", ",");
}

function classificar(imc) {
  if (imc < 18.5) return ["Abaixo do peso", "Procure orientação nutricional para avaliar a necessidade de ganho de peso saudável."];
  if (imc < 25)   return ["Peso normal", "Parabéns! Mantenha uma alimentação equilibrada e a prática de atividades físicas."];
  if (imc < 30)   return ["Sobrepeso", "Atenção: vale rever hábitos alimentares e aumentar a atividade física."];
  if (imc < 35)   return ["Obesidade grau I", "Recomenda-se acompanhamento com médico e nutricionista."];
  if (imc < 40)   return ["Obesidade grau II", "Recomenda-se acompanhamento médico e nutricional próximo."];
  return ["Obesidade grau III", "Procure acompanhamento médico com urgência."];
}

function mostrarLista() {
  const tbody = $("lista");
  tbody.innerHTML = "";

  if (pacientes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="vazio">Nenhum paciente ainda.</td></tr>';
    return;
  }

  pacientes.forEach(function (p) {
    const linha = document.createElement("tr");
    const colunas = [
      p.nome,
      formatar(p.peso, 1) + " kg",
      formatar(p.altura, 2) + " m",
      formatar(p.imc, 1),
      p.classe
    ];
    colunas.forEach(function (texto) {
      const td = document.createElement("td");
      td.textContent = texto;
      linha.appendChild(td);
    });
    tbody.appendChild(linha);
  });
}

function calcular() {
  const nome = $("nome").value.trim();
  const peso = parseFloat($("peso").value);
  let altura = parseFloat($("altura").value);
  const erro = $("erro");
  erro.textContent = "";

  if (nome === "") {
    erro.textContent = "Informe o nome do paciente.";
    return;
  }
  if (!(peso > 0)) {
    erro.textContent = "Informe um peso válido.";
    return;
  }

  // Se digitar a altura em cm (ex.: 175), converte para metros
  if (altura > 3) {
    altura = altura / 100;
  }
  if (!(altura > 0) || altura > 3) {
    erro.textContent = "Informe uma altura válida em metros (ex.: 1.75).";
    return;
  }

  const imc = peso / (altura * altura);
  const resultado = classificar(imc);
  const classe = resultado[0];
  const mensagem = resultado[1];

  $("saudacao").textContent = "Paciente: " + nome;
  $("valor").textContent = formatar(imc, 1);
  $("classe").textContent = classe;
  $("msg").textContent = mensagem;
  $("resultado").style.display = "block";

  pacientes.push({ nome: nome, peso: peso, altura: altura, imc: imc, classe: classe });
  mostrarLista();
}

function limpar() {
  pacientes.length = 0;
  mostrarLista();
  $("resultado").style.display = "none";
}

$("calcular").addEventListener("click", calcular);
$("limpar").addEventListener("click", limpar);