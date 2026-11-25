const inputNome = document.getElementById("nome");
const inputPeso = document.getElementById("peso");
const inputAltura = document.getElementById("altura");
const erro = document.getElementById("erro");
const btnCalcular = document.getElementById("calcular");
const btnLimpar = document.getElementById("limpar");

const resultado = document.getElementById("resultado");
const resNome = document.getElementById("res-nome");
const resImc = document.getElementById("res-imc");
const resClasse = document.getElementById("res-classe");
const resMsg = document.getElementById("res-msg");

const linhasTabela = document.querySelectorAll("#tabela tr");
const lista = document.getElementById("lista");

function paraNumero(texto) {
  return parseFloat(texto.replace(",", ".").trim());
}

function classificar(imc) {
  if (imc < 18.5) {
    return { faixa: 0, texto: "Abaixo do peso", msg: "Procure acompanhamento para avaliar a alimentação e a saúde." };
  } else if (imc < 25) {
    return { faixa: 1, texto: "Peso normal", msg: "Parabéns! Mantenha hábitos saudáveis." };
  } else if (imc < 30) {
    return { faixa: 2, texto: "Sobrepeso", msg: "Atenção à alimentação e à prática de atividade física." };
  } else if (imc < 35) {
    return { faixa: 3, texto: "Obesidade grau I", msg: "Recomenda-se acompanhamento com profissional de saúde." };
  } else if (imc < 40) {
    return { faixa: 4, texto: "Obesidade grau II", msg: "Procure acompanhamento médico e nutricional." };
  } else {
    return { faixa: 5, texto: "Obesidade grau III", msg: "Procure atendimento médico o quanto antes." };
  }
}

function destacarFaixa(faixa) {
  linhasTabela.forEach(function (linha) {
    linha.classList.remove("ativa");
  });
  linhasTabela[faixa].classList.add("ativa");
}

function adicionarHistorico(nome, imc, classe) {
  const vazio = lista.querySelector(".vazio");
  if (vazio) vazio.remove();

  const item = document.createElement("li");
  const strong = document.createElement("strong");
  const span = document.createElement("span");
  strong.textContent = nome;
  span.textContent = "IMC " + imc + " - " + classe;
  item.appendChild(strong);
  item.appendChild(span);
  lista.prepend(item);
}

function calcular() {
  const nome = inputNome.value.trim();
  const peso = paraNumero(inputPeso.value);
  let altura = paraNumero(inputAltura.value);

  erro.textContent = "";

  if (nome === "") {
    erro.textContent = "Informe o nome do paciente.";
    return;
  }

  if (isNaN(peso) || peso <= 0) {
    erro.textContent = "Informe um peso válido (ex.: 70,5).";
    return;
  }

  if (isNaN(altura) || altura <= 0) {
    erro.textContent = "Informe uma altura válida (ex.: 1,75).";
    return;
  }


  if (altura > 3) {
    altura = altura / 100;
  }

  const imc = peso / (altura * altura);
  const imcTexto = imc.toFixed(1).replace(".", ",");
  const info = classificar(imc);

  resNome.textContent = nome;
  resImc.textContent = imcTexto;
  resClasse.textContent = info.texto;
  resMsg.textContent = info.msg;
  resultado.classList.remove("oculto");

  destacarFaixa(info.faixa);
  adicionarHistorico(nome, imcTexto, info.texto);
}

function limpar() {
  inputNome.value = "";
  inputPeso.value = "";
  inputAltura.value = "";
  erro.textContent = "";
  resultado.classList.add("oculto");
  linhasTabela.forEach(function (linha) {
    linha.classList.remove("ativa");
  });
  inputNome.focus();
}

btnCalcular.addEventListener("click", calcular);
btnLimpar.addEventListener("click", limpar);

[inputNome, inputPeso, inputAltura].forEach(function (campo) {
  campo.addEventListener("keydown", function (e) {
    if (e.key === "Enter") calcular();
  });
});