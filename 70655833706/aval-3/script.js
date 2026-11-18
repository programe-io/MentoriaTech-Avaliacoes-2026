// CONTADOR DE CÓDIGOS
let contador = 0;

function gerarCodigo() {
    contador++;
    return contador;
\}

// REFERÊNCIAS DO HTML
const tabelaPessoas = document.getElementById("tabela-pessoas");
const formPessoa = document.getElementById("form-pessoa");

const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");

const mensagemDeErro = document.getElementById("erro");

// LISTA DE PESSOAS
const chavePessoas = "pessoas";

let pessoas = [];

// FUNÇÕES DE NEGÓCIO

// CALCULAR IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
\}

// CLASSIFICAR IMC
function classificarIMC(imc) {
    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "abaixo"
        \};
    \}

    if (imc < 25) {
        return {
            texto: "Peso normal",
            classe: "normal"
        \};
    \}

    if (imc < 30) {
        return {
            texto: "Sobrepeso",
            classe: "sobrepeso"
        \};
    \}

    if (imc < 35) {
        return {
            texto: "Obesidade grau 1",
            classe: "obesidade"
        \};
    \}

    if (imc < 40) {
        return {
            texto: "Obesidade grau 2",
            classe: "obesidade"
        \};
    \}

    return {
        texto: "Obesidade grau 3",
        classe: "obesidade"
    \};
\}

// FORMATAR NÚMEROS
function formatar(valor, casas) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    \});
\}

// CRIAR CÉLULA
function criarCelula(valor) {
    const td = document.createElement("td");
    td.textContent = valor;
    return td;
\}

// CRIAR LINHA
function criarLinha(pessoa) {
    const tr = document.createElement("tr");

    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

    tr.dataset.id = pessoa.id;

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg"));
    tr.appendChild(criarCelula(formatar(imc, 1)));

    // CLASSIFICAÇÃO
    const tdClassificacao = document.createElement("td");
    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);
    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);
    tr.appendChild(tdClassificacao);

    // BOTÃO APAGAR
    const tdAcoes = document.createElement("td");
    const botaoApagar = document.createElement("button");

    botaoApagar.textContent = "Apagar";
    botaoApagar.type = "button";

    botaoApagar.addEventListener("click", function() {
        apagarPessoa(pessoa.id);
    \});

    tdAcoes.appendChild(botaoApagar);
    tr.appendChild(tdAcoes);

    return tr;
\}

// RENDERIZAR TABELA
function render() {
    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 7;
        td.textContent = "Nenhuma pessoa cadastrada ainda.";

        tr.appendChild(td);
        tabelaPessoas.appendChild(tr);
        return;
    \}

    pessoas.forEach(function(pessoa) {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    \});
\}

// LER FORMULÁRIO
function lerFormulario() {
    return {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    \};
\}

// VALIDAR DADOS
function validarDados(dados) {
    if (dados.nome.length < 2) {
        return "Informe um nome com no mínimo duas letras.";
    \}

    if (!Number.isInteger(dados.idade) ||
        dados.idade < 1 || dados.idade > 120) {
        return "A idade deve ser entre 1 e 120.";
    \}

    if (!Number.isFinite(dados.altura) ||
        dados.altura < 0.5 || dados.altura > 2.5) {
        return "A altura deve estar entre 0,5 e 2,5 metros.";
    \}

    if (!Number.isFinite(dados.peso) ||
        dados.peso < 2 || dados.peso > 500) {
        return "O peso deve estar entre 2 e 500 kg.";
    \}

    return "";
\}

// MOSTRAR ERRO
function mostrarErro(mensagem) {
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.hidden = false;
\}

// LIMPAR ERRO
function limparErro() {
    mensagemDeErro.hidden = true;
    mensagemDeErro.textContent = "";
\}

// ADICIONAR PESSOA
function adicionarPessoa(dados) {
    pessoas.push({
        id: gerarCodigo(),
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    \});
\}

// SALVAR NO LOCALSTORAGE
function salvar() {
    localStorage.setItem(
        chavePessoas,
        JSON.stringify(pessoas)
    );
\}

// CARREGAR PESSOAS
function carregarPessoas() {
    const dados = localStorage.getItem(chavePessoas);

    if (!dados) {
        return [];
    \}

    try {
        const lista = JSON.parse(dados);

        if (Array.isArray(lista)) {
            return lista;
        \}

        return [];

    \} catch (erro) {
        console.error("Erro ao carregar os pacientes:", erro);
        return [];
    \}
\}

// AJUSTAR CONTADOR
function ajustarContador() {
    let maior = 0;

    pessoas.forEach(function(pessoa) {
        if (Number.isInteger(pessoa.id) && pessoa.id > maior) {
            maior = pessoa.id;
        \}
    \});

    contador = maior;
\}

// APAGAR PESSOA
function apagarPessoa(id) {
    pessoas = pessoas.filter(function(pessoa) {
        return pessoa.id !== id;
    \});

    salvar();
    render();
\}

// EVENTO DE CADASTRO
formPessoa.addEventListener("submit", function(event) {
    event.preventDefault();

    const dados = lerFormulario();
    const erro = validarDados(dados);

    if (erro !== "") {
        mostrarErro(erro);
        return;
    \}

    limparErro();

    adicionarPessoa(dados);
    salvar();
    render();

    formPessoa.reset();
    inputNome.focus();
\});

// LIMPAR MENSAGEM AO CANCELAR
formPessoa.addEventListener("reset", function() {
    limparErro();
\});

// INICIAR A APLICAÇÃO
pessoas = carregarPessoas();

ajustarContador();

render();$0