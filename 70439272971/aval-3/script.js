const formulario = document.getElementById("form-pessoa");
const tabelaPessoas = document.getElementById("tabela-pessoas");
const campoNome = document.getElementById("input-nome");
const campoIdade = document.getElementById("input-idade");
const campoAltura = document.getElementById("input-altura");
const campoPeso = document.getElementById("input-peso");
const tituloFormulario = document.getElementById("titulo-formulario");
const botaoSalvar = document.getElementById("btn-salvar");
const botaoCancelar = document.getElementById("btn-cancelar");
const mensagemErro = document.getElementById("erro");

let proximoId = 3;
let idEmEdicao = null;

let pessoas = [
  { id: 1, nome: "Maria Silva", idade: 30, altura: 1.65, peso: 60 },
  { id: 2, nome: "João Souza", idade: 45, altura: 1.80, peso: 95 }
];

function calcularImc(peso, altura) {
  return peso / (altura * altura);
}

function classificarImc(imc) {
  if (imc < 18.5) return { texto: "Abaixo do peso", classe: "abaixo" };
  if (imc < 25) return { texto: "Peso normal", classe: "normal" };
  if (imc < 30) return { texto: "Sobrepeso", classe: "sobrepeso" };
  if (imc < 35) return { texto: "Obesidade grau I", classe: "obesidade" };
  if (imc < 40) return { texto: "Obesidade grau II", classe: "obesidade" };
  return { texto: "Obesidade grau III", classe: "obesidade" };
}

function formatar(valor, casas) {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas
  });
}

function criarCelula(texto) {
  const td = document.createElement("td");
  td.textContent = texto;
  return td;
}

function criarBotao(texto, classe, acao, id, rotulo) {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = texto;
  botao.className = `acao ${classe}`.trim();
  botao.setAttribute("aria-label", `${rotulo} ${texto === "Editar" ? "de" : ""} ${rotulo === "pessoa" ? "" : rotulo}`.trim());
  botao.addEventListener("click", () => acao(id));
  return botao;
}

function criarLinha(pessoa) {
  const tr = document.createElement("tr");
  tr.dataset.id = pessoa.id;

  tr.appendChild(criarCelula(pessoa.nome));
  tr.appendChild(criarCelula(String(pessoa.idade)));
  tr.appendChild(criarCelula(formatar(pessoa.altura, 2)));
  tr.appendChild(criarCelula(formatar(pessoa.peso, 1)));

  const imc = calcularImc(pessoa.peso, pessoa.altura);
  tr.appendChild(criarCelula(formatar(imc, 2)));

  const tdClassificacao = document.createElement("td");
  if (pessoa.idade < 20) {
    tdClassificacao.textContent = "Requer avaliação específica";
  } else {
    const classificacao = classificarImc(imc);
    const selo = document.createElement("span");
    selo.className = `selo ${classificacao.classe}`;
    selo.textContent = classificacao.texto;
    tdClassificacao.appendChild(selo);
  }
  tr.appendChild(tdClassificacao);

  const tdAcoes = document.createElement("td");
  tdAcoes.className = "acoes";

  const editar = document.createElement("button");
  editar.type = "button";
  editar.className = "acao";
  editar.textContent = "Editar";
  editar.addEventListener("click", () => iniciarEdicao(pessoa.id));

  const remover = document.createElement("button");
  remover.type = "button";
  remover.className = "acao remover";
  remover.textContent = "Excluir";
  remover.addEventListener("click", () => excluirPessoa(pessoa.id));

  tdAcoes.append(editar, remover);
  tr.appendChild(tdAcoes);

  if (pessoa.id === idEmEdicao) tr.classList.add("em-edicao");
  return tr;
}

function renderizar() {
  tabelaPessoas.replaceChildren();

  if (pessoas.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 7;
    td.className = "vazio";
    td.textContent = "Nenhuma pessoa cadastrada ainda.";
    tr.appendChild(td);
    tabelaPessoas.appendChild(tr);
    return;
  }

  pessoas.forEach((pessoa) => {
    tabelaPessoas.appendChild(criarLinha(pessoa));
  });
}

function mostrarErro(mensagem) {
  mensagemErro.textContent = mensagem;
  mensagemErro.hidden = false;
}

function limparErro() {
  mensagemErro.textContent = "";
  mensagemErro.hidden = true;
  [campoNome, campoIdade, campoAltura, campoPeso].forEach((campo) => {
    campo.classList.remove("invalido");
  });
}

function cancelarEdicao() {
  idEmEdicao = null;
  formulario.reset();
  limparErro();
  tituloFormulario.textContent = "Nova pessoa";
  botaoSalvar.textContent = "Salvar";
  botaoCancelar.hidden = true;
  renderizar();
}

function iniciarEdicao(id) {
  const pessoa = pessoas.find((item) => item.id === id);
  if (!pessoa) return;

  idEmEdicao = id;
  campoNome.value = pessoa.nome;
  campoIdade.value = pessoa.idade;
  campoAltura.value = pessoa.altura;
  campoPeso.value = pessoa.peso;

  tituloFormulario.textContent = "Editar pessoa";
  botaoSalvar.textContent = "Salvar alterações";
  botaoCancelar.hidden = false;
  limparErro();
  renderizar();
  campoNome.focus();
}

function excluirPessoa(id) {
  pessoas = pessoas.filter((pessoa) => pessoa.id !== id);
  if (idEmEdicao === id) cancelarEdicao();
  else renderizar();
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  limparErro();

  const nome = campoNome.value.trim();
  const idade = Number(campoIdade.value);
  const altura = Number(campoAltura.value);
  const peso = Number(campoPeso.value);

  const campos = [
    [campoNome, nome.length > 0],
    [campoIdade, Number.isInteger(idade) && idade >= 1 && idade <= 120],
    [campoAltura, Number.isFinite(altura) && altura >= 0.5 && altura <= 2.5],
    [campoPeso, Number.isFinite(peso) && peso >= 2 && peso <= 500]
  ];

  const campoInvalido = campos.find(([, valido]) => !valido);
  if (campoInvalido) {
    campoInvalido[0].classList.add("invalido");
    mostrarErro("Preencha todos os campos com valores válidos.");
    campoInvalido[0].focus();
    return;
  }

  const dados = { nome, idade, altura, peso };

  if (idEmEdicao !== null) {
    pessoas = pessoas.map((pessoa) =>
      pessoa.id === idEmEdicao ? { ...pessoa, ...dados } : pessoa
    );
  } else {
    pessoas.push({ id: proximoId++, ...dados });
  }

  cancelarEdicao();
});

botaoCancelar.addEventListener("click", cancelarEdicao);

renderizar();
