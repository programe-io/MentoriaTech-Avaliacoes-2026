const formulario = document.getElementById("formulario");
const corpo = document.getElementById("tabela-corpo");
const vazio = document.getElementById("vazio");
const mensagem = document.getElementById("mensagem");
const botaoLimpar = document.getElementById("limpar");

const CHAVE = "fichaAnamneseIMC";
let registros = carregar();

function carregar() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE)) || [];
  } catch (e) {
    return [];
  }
}

function salvarStorage() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(registros));
  } catch (e) {}
}

function paraNumero(texto) {
  return parseFloat(String(texto).replace(",", "."));
}

function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

function classificar(imc) {
  if (imc < 18.5) return { texto: "Abaixo do peso", classe: "abaixo" };
  if (imc < 25) return { texto: "Peso normal", classe: "normal" };
  if (imc < 30) return { texto: "Sobrepeso", classe: "sobre" };
  if (imc < 35) return { texto: "Obesidade grau I", classe: "obeso1" };
  if (imc < 40) return { texto: "Obesidade grau II", classe: "obeso2" };
  return { texto: "Obesidade grau III", classe: "obeso3" };
}

function renderizar() {
  corpo.innerHTML = "";

  registros.forEach((r) => {
    const c = classificar(r.imc);
    const tr = document.createElement("tr");

    const valores = [
      r.nome,
      r.idade,
      r.altura.toFixed(2) + " m",
      r.peso.toFixed(1) + " kg",
      r.imc.toFixed(2),
    ];
    valores.forEach((v) => {
      const td = document.createElement("td");
      td.textContent = v;
      tr.appendChild(td);
    });

    const tdClasse = document.createElement("td");
    const span = document.createElement("span");
    span.className = "etiqueta " + c.classe;
    span.textContent = c.texto;
    tdClasse.appendChild(span);
    tr.appendChild(tdClasse);

    corpo.appendChild(tr);
  });

  vazio.style.display = registros.length ? "none" : "block";
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  mensagem.textContent = "";

  const nome = document.getElementById("nome").value.trim();
  const idade = parseInt(document.getElementById("idade").value, 10);
  const altura = paraNumero(document.getElementById("altura").value);
  const peso = paraNumero(document.getElementById("peso").value);

  if (!nome) {
    mensagem.textContent = "Informe o nome.";
    return;
  }
  if (!idade || idade < 1 || idade > 120) {
    mensagem.textContent = "Informe uma idade válida.";
    return;
  }
  if (!altura || altura < 0.5 || altura > 2.5) {
    mensagem.textContent = "Informe a altura em metros (ex.: 1.75).";
    return;
  }
  if (!peso || peso < 10 || peso > 400) {
    mensagem.textContent = "Informe o peso em kg (ex.: 70).";
    return;
  }

  registros.push({ nome, idade, altura, peso, imc: calcularIMC(peso, altura) });
  salvarStorage();
  renderizar();
  formulario.reset();
  document.getElementById("nome").focus();
});

botaoLimpar.addEventListener("click", () => {
  if (registros.length && confirm("Apagar todos os registros?")) {
    registros = [];
    salvarStorage();
    renderizar();
  }
});

renderizar();