
const btnCalcular = document.getElementById("btn-calcular");
const campoNome = document.getElementById("nome");
const campoPeso = document.getElementById("peso");
const campoAltura = document.getElementById("altura");
const erro = document.getElementById("erro");
const btnLimpar = document.getElementById("btn-limpar");

const vazio = document.getElementById("vazio");
const conteudo = document.getElementById("conteudo");
const resNome = document.getElementById("res-nome");
const resImc = document.getElementById("res-imc");
const resClasse = document.getElementById("res-classe");
const resMsg = document.getElementById("res-msg");
const resFaixa = document.getElementById("res-faixa");
const marcador = document.getElementById("marcador");

const lista = document.getElementById("lista");
const histVazio = document.getElementById("hist-vazio");
const btnApagar = document.getElementById("btn-apagar");


let pacientes = [];


function classificar(imc) {
  if (imc < 18.5) {
    return { nome: "Abaixo do peso", alerta: true,
      msg: "O IMC está abaixo do ideal. Vale conversar com um profissional sobre alimentação e acompanhamento." };
  }
  if (imc < 25) {
    return { nome: "Peso normal", alerta: false,
      msg: "O IMC está na faixa considerada saudável. Continue mantendo bons hábitos." };
  }
  if (imc < 30) {
    return { nome: "Sobrepeso", alerta: true,
      msg: "O IMC está um pouco acima do ideal. Pequenos ajustes de rotina já ajudam." };
  }
  if (imc < 35) {
    return { nome: "Obesidade grau I", alerta: true,
      msg: "O IMC indica obesidade leve. Recomenda-se avaliação e orientação profissional." };
  }
  if (imc < 40) {
    return { nome: "Obesidade grau II", alerta: true,
      msg: "O IMC indica obesidade moderada. Procure acompanhamento de saúde." };
  }
  return { nome: "Obesidade grau III", alerta: true,
    msg: "O IMC indica obesidade grave. Procure atendimento de saúde o quanto antes." };
}


function lerNumero(texto) {
 
  return parseFloat(String(texto).trim().replace(",", "."));
}

function formatar(numero, casas) {
  return numero.toFixed(casas).replace(".", ",");
}

function mostrarErro(mensagem, ...campos) {
  erro.textContent = mensagem;
  campos.forEach((c) => c.classList.add("invalido"));
}

function limparErros() {
  erro.textContent = "";
  [campoNome, campoPeso, campoAltura].forEach((c) => c.classList.remove("invalido"));
}


function calcularIMC(peso, alturaEmMetros) {
  return peso / (alturaEmMetros * alturaEmMetros);
}


function exibirResultado(paciente) {
  const { nome, imc, classe, alturaM } = paciente;

  resNome.textContent = nome;
  resImc.textContent = formatar(imc, 1);
  resClasse.textContent = classe.nome;
  resClasse.classList.toggle("alerta", classe.alerta);
  resMsg.textContent = classe.msg;

  const minimo = 18.5 * alturaM * alturaM;
  const maximo = 24.9 * alturaM * alturaM;
  resFaixa.textContent =
    "Para " + formatar(alturaM, 2) + " m, a faixa de peso normal vai de " +
    formatar(minimo, 1) + " kg a " + formatar(maximo, 1) + " kg.";

 
  const limitado = Math.min(Math.max(imc, 15), 40);
  const posicao = ((limitado - 15) / 25) * 100;
  marcador.style.left = posicao + "%";

  vazio.hidden = true;
  conteudo.hidden = false;
}

function desenharLista() {
  lista.innerHTML = "";

  pacientes.forEach((p) => {
    const li = document.createElement("li");
    li.className = "item";

    const dados = document.createElement("span");
    dados.className = "nome";
    dados.textContent = p.nome;
    const detalhe = document.createElement("span");
    detalhe.className = "detalhe";
    detalhe.textContent = formatar(p.peso, 1) + " kg · " + formatar(p.alturaM, 2) + " m";
    dados.appendChild(detalhe);

    const valor = document.createElement("span");
    valor.className = "imc";
    valor.textContent = formatar(p.imc, 1);

    const tag = document.createElement("span");
    tag.className = "tag" + (p.classe.alerta ? " alerta" : "");
    tag.textContent = p.classe.nome;

    li.append(dados, valor, tag);
    lista.appendChild(li);
  });

  const temPacientes = pacientes.length > 0;
  histVazio.hidden = temPacientes;
  btnApagar.hidden = !temPacientes;
}

function calcular() {
  limparErros();

  const nome = campoNome.value.trim();
  const peso = lerNumero(campoPeso.value);
  let altura = lerNumero(campoAltura.value);

  if (nome === "") {
    mostrarErro("Informe o nome do paciente.", campoNome);
    return;
  }
  if (isNaN(peso) || peso <= 0 || peso > 500) {
    mostrarErro("Informe um peso válido em quilos. Exemplo: 68,5.", campoPeso);
    return;
  }
  if (isNaN(altura) || altura <= 0) {
    mostrarErro("Informe uma altura válida. Exemplo: 1,70 ou 170.", campoAltura);
    return;
  }


  if (altura > 3) {
    altura = altura / 100;
  }
  if (altura < 0.5 || altura > 2.5) {
    mostrarErro("A altura deve ficar entre 0,50 m e 2,50 m.", campoAltura);
    return;
  }

  const imc = calcularIMC(peso, altura);
  const paciente = { nome, peso, alturaM: altura, imc, classe: classificar(imc) };

  pacientes.unshift(paciente);
  exibirResultado(paciente);
  desenharLista();
}

btnCalcular.addEventListener("click", calcular);


[campoNome, campoPeso, campoAltura].forEach((c) =>
  c.addEventListener("keydown", (e) => {
    if (e.key === "Enter") calcular();
  })
);

btnLimpar.addEventListener("click", () => {
  campoNome.value = "";
  campoPeso.value = "";
  campoAltura.value = "";
  limparErros();
  conteudo.hidden = true;
  vazio.hidden = false;
  campoNome.focus();
});

btnApagar.addEventListener("click", () => {
  pacientes = [];
  desenharLista();
});

[campoNome, campoPeso, campoAltura].forEach((c) =>
  c.addEventListener("input", limparErros)
);

desenharLista();