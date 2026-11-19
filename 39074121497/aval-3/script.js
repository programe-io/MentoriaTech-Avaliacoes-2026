// 1. Cálculo e classificação do IMC
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

function classificarIMC(imc) {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Peso normal";
  if (imc < 30) return "Sobrepeso";
  return "Obesidade";
}

function classeDoSelo(classificacao) {
  if (classificacao === "Abaixo do peso") return "abaixo-peso";
  if (classificacao === "Peso normal") return "peso-normal";
  if (classificacao === "Sobrepeso") return "sobrepeso";
  return "obesidade";
}

// 2. Formatação da altura e do peso
function formatarAltura(altura) {
  return altura.toFixed(2) + " m";
}
function formatarPeso(peso) {
  return peso.toFixed(1) + " KG";
}

// 3. Criar linha da tabela
function criarLinha(pessoa) {
  const tr = document.createElement("tr");
  const imc = calcularIMC(pessoa.peso, pessoa.altura);
  const classificacao = classificarIMC(imc);

  tr.innerHTML = `
    <td>${pessoa.id}</td>
    <td>${pessoa.nome}</td>
    <td>${pessoa.idade}</td>
    <td>${formatarAltura(pessoa.altura)}</td>
    <td>${formatarPeso(pessoa.peso)}</td>
    <td>${imc.toFixed(2)}</td>
    <td><span class="selo ${classeDoSelo(classificacao)}">${classificacao}</span></td>
    <td><button class="btn-apagar" data-id="${pessoa.id}">Apagar</button></td>
  `;
  return tr;
}

function renderizar() {
  const tbody = document.getElementById("tabela-pessoas");
  tbody.innerHTML = "";
  pessoas.forEach(p => tbody.appendChild(criarLinha(p)));
}

// 4. Ler formulário
function lerFormulario() {
  return {
    nome: document.getElementById("nome").value.trim(),
    idade: Number(document.getElementById("idade").value),
    altura: Number(document.getElementById("altura").value),
    peso: Number(document.getElementById("peso").value)
  };
}

// 5. Validar dados
function validarDados(dados) {
  if (dados.nome.length < 2) return "Informe o nome com no mínimo duas letras";
  if (!Number.isInteger(dados.idade) || dados.idade < 1 || dados.idade > 120) return "A idade deve ser um número inteiro entre 1 e 120";
  if (dados.altura < 0.5 || dados.altura > 2.5) return "A altura deve ser entre 0.5 e 2.5";
  if (dados.peso < 2.5 || dados.peso > 500) return "O peso deve ser entre 2.5 e 500";
  return "";
}

// 6. Mensagens de erro
function mostrarErro(mensagem) {
  const erro = document.getElementById("erro");
  erro.textContent = mensagem;
  erro.hidden = false;
}
function limparErro() {
  const erro = document.getElementById("erro");
  erro.textContent = "";
  erro.hidden = true;
}

// 7. localStorage - Salvar e Carregar
function salvarPessoas() {
  localStorage.setItem("pessoas", JSON.stringify(pessoas));
}

function carregarPessoas() {
  try {
    const texto = localStorage.getItem("pessoas");
    if (!texto) return [];
    const dados = JSON.parse(texto);
    if (!Array.isArray(dados)) return [];
    return dados;
  } catch (e) {
    mostrarErro("Erro ao carregar dados salvos");
    return [];
  }
}

// 8. Ajuste do contador de código
let maior = 0;
function ajustarContador() {
  maior = 0;
  pessoas.forEach(p => { if (p.id > maior) maior = p.id; });
}

// 9. Adicionar pessoa
function adicionarPessoa(dados) {
  maior++;
  const novaPessoa = { id: maior, ...dados };
  pessoas.push(novaPessoa);
  salvarPessoas();
  renderizar();
}

// 10. Inicialização
let pessoas = carregarPessoas();
ajustarContador();
renderizar();

// 11. Evento de envio do formulário
document.getElementById("formulario").addEventListener("submit", function(evento) {
  evento.preventDefault();
  const dados = lerFormulario();
  const erro = validarDados(dados);
  if (erro !== "") {
    mostrarErro(erro);
    return;
  }
  limparErro();
  adicionarPessoa(dados);
  evento.target.reset();
  document.getElementById("nome").focus();
});

// 12. Apagar uma pessoa (Desafio da Conclusão)
document.getElementById("tabela-pessoas").addEventListener("click", function(e) {
  if (e.target.classList.contains("btn-apagar")) {
    const id = Number(e.target.dataset.id);
    pessoas = pessoas.filter(p => p.id !== id);
    salvarPessoas();
    renderizar();
  }
});

// 13. Apagar todos os dados do localStorage
document.getElementById("btn-limpar-tudo").addEventListener("click", function() {
  pessoas = [];
  maior = 0;
  localStorage.removeItem("pessoas");
  renderizar();
});