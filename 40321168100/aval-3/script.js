let contadorCodigo = 0;

function gerarCodigo() {
  return ++contadorCodigo;
}

let pessoas = [];

const tabelaPessoas = document.getElementById("tabela-pessoas");
const mensagemVazio = document.getElementById("vazio");
const mensagemErro = document.getElementById("erro");
const btnSalvar = document.getElementById("btn-salvar");

function lerNumero(valor) {
  return parseFloat(String(valor).trim().replace(",", "."));
}

function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

function classificarIMC(imc) {
  if (imc < 18.5) return { texto: "Baixo peso (Magreza)", classe: "atencao" };
  if (imc < 25) return { texto: "Peso normal (Eutrófico)", classe: "ok" };
  if (imc < 30) return { texto: "Sobrepeso", classe: "atencao" };
  if (imc < 35) return { texto: "Obesidade Grau I", classe: "alerta" };
  if (imc < 40) return { texto: "Obesidade Grau II", classe: "alerta" };
  return { texto: "Obesidade Grau III (Grave)", classe: "grave" };
}

function criarCelula(texto) {
  const td = document.createElement("td");
  td.textContent = texto;
  return td;
}

function criarLinha(pessoa) {
  const tr = document.createElement("tr");
  tr.dataset.id = pessoa.id;

  const imc = calcularIMC(pessoa.peso, pessoa.altura);
  const classificacao = classificarIMC(imc);

  tr.appendChild(criarCelula(pessoa.nome));
  tr.appendChild(criarCelula(pessoa.idade));
  tr.appendChild(criarCelula(pessoa.altura.toFixed(2).replace(".", ",") + " m"));
  tr.appendChild(criarCelula(pessoa.peso.toFixed(1).replace(".", ",") + " kg"));
  tr.appendChild(criarCelula(imc.toFixed(1).replace(".", ",")));

  const tdClassificacao = document.createElement("td");
  const badge = document.createElement("span");
  badge.className = "badge " + classificacao.classe;
  badge.textContent = classificacao.texto;
  tdClassificacao.appendChild(badge);
  tr.appendChild(tdClassificacao);

  const tdAcoes = document.createElement("td");
  const btnApagar = document.createElement("button");
  btnApagar.type = "button";
  btnApagar.className = "btn-apagar";
  btnApagar.textContent = "Apagar";
  btnApagar.addEventListener("click", () => clicarApagar(btnApagar, pessoa.id));
  tdAcoes.appendChild(btnApagar);
  tr.appendChild(tdAcoes);

  return tr;
}

function renderizarTabela() {
  tabelaPessoas.innerHTML = "";
  pessoas.forEach(pessoa => {
    tabelaPessoas.appendChild(criarLinha(pessoa));
  });
  mensagemVazio.style.display = pessoas.length === 0 ? "block" : "none";
}

// Primeiro clique pede confirmação; segundo clique apaga.
function clicarApagar(botao, id) {
  if (!botao.classList.contains("confirmar")) {
    botao.classList.add("confirmar");
    botao.textContent = "Confirmar?";
    setTimeout(() => {
      botao.classList.remove("confirmar");
      botao.textContent = "Apagar";
    }, 3000);
    return;
  }
  apagarPessoa(id);
}

function apagarPessoa(id) {
  pessoas = pessoas.filter(p => p.id !== id);
  renderizarTabela();
}

function mostrarErro(texto) {
  mensagemErro.textContent = texto;
}

function salvarPessoa() {
  const nome = document.getElementById("nome").value.trim();
  const idade = lerNumero(document.getElementById("idade").value);
  let altura = lerNumero(document.getElementById("altura").value);
  const peso = lerNumero(document.getElementById("peso").value);

  // Se digitar a altura em centímetros (ex.: 175), converte para metros
  if (altura > 3) altura = altura / 100;

  if (!nome) return mostrarErro("Digite o nome.");
  if (isNaN(idade) || idade < 0 || idade > 130) return mostrarErro("Digite uma idade válida.");
  if (isNaN(altura) || altura < 0.5 || altura > 2.5) return mostrarErro("Digite uma altura válida, como 1.75.");
  if (isNaN(peso) || peso < 1 || peso > 500) return mostrarErro("Digite um peso válido, como 70.");

  mostrarErro("");

  pessoas.push({
    id: gerarCodigo(),
    nome: nome,
    idade: Math.round(idade),
    altura: altura,
    peso: peso
  });

  renderizarTabela();

  ["nome", "idade", "altura", "peso"].forEach(campo => {
    document.getElementById(campo).value = "";
  });
  document.getElementById("nome").focus();
}

btnSalvar.addEventListener("click", salvarPessoa);

// Enter em qualquer campo também salva
document.querySelectorAll("#form-pessoa input").forEach(campo => {
  campo.addEventListener("keydown", evento => {
    if (evento.key === "Enter") salvarPessoa();
  });
});

renderizarTabela();