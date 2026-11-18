
// Lista de pacientes
let pessoas = [];

let contador = 0;

const chavePessoas = "pessoas";

// Elementos do HTML
const formPessoa = document.getElementById("formPessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const tabelaPessoas = document.getElementById("tabelaPessoas");
const mensagemDeErro = document.getElementById("erro");

// Calcular IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
\}

// Classificar IMC
function classificarIMC(imc) {
    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "abaixo"
        \};
    \} else if (imc < 25) {
        return {
            texto: "Peso normal",
            classe: "normal"
        \};
    \} else if (imc < 30) {
        return {
            texto: "Sobrepeso",
            classe: "sobrepeso"
        \};
    \} else {
        return {
            texto: "Obesidade",
            classe: "obesidade"
        \};
    \}
\}

// Formatar números
function formatar(valor, casas) {
    return valor.toFixed(casas);
\}

// Ler formulário
function lerFormulario() {
    return {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    \};
\}

// Validar dados
function validarDados(dados) {
    if (dados.nome.length < 2) {
        return "Informe um nome com no mínimo duas letras.";
    \}

    if (!Number.isInteger(dados.idade) ||
        dados.idade < 1 || dados.idade > 120) {
        return "A idade deve ser um número inteiro entre 1 e 120.";
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

// Mostrar erro
function mostrarErro(mensagem) {
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.hidden = false;
\}

// Limpar erro
function limparErro() {
    mensagemDeErro.hidden = true;
    mensagemDeErro.textContent = "";
\}

// Adicionar paciente
function adicionarPessoa(dados) {
    contador++;

    pessoas.push({
        id: contador,
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    \});
\}

// Criar linha da tabela
function criarLinha(pessoa) {
    const linha = document.createElement("tr");

    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

    const valores = [
        pessoa.id,
        pessoa.nome,
        pessoa.idade,
        formatar(pessoa.altura, 2) + " m",
        formatar(pessoa.peso, 1) + " kg",
        formatar(imc, 1)
    ];

    valores.forEach(valor => {
        const td = document.createElement("td");
        td.textContent = valor;
        linha.appendChild(td);
    \});

    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");
    selo.classList.add("selo", classificacao.classe);
    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);
    linha.appendChild(tdClassificacao);

    return linha;
\}

// Mostrar pacientes na tabela
function render() {
    tabelaPessoas.innerHTML = "";

    pessoas.forEach(pessoa => {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    \});
\}

// Salvar no localStorage
function salvar() {
    localStorage.setItem(
        chavePessoas,
        JSON.stringify(pessoas)
    );
\}

// Carregar pacientes salvos
function carregarPessoas() {
    const dados = localStorage.getItem(chavePessoas);

    if (!dados) {
        return [];
    \}

    try {
        const lista = JSON.parse(dados);

        return Array.isArray(lista) ? lista : [];
    \} catch (erro) {
        console.error("Erro ao carregar pacientes:", erro);
        return [];
    \}
\}

// Ajustar contador
function ajustarContador() {
    contador = 0;

    pessoas.forEach(pessoa => {
        if (pessoa.id > contador) {
            contador = pessoa.id;
        \}
    \});
\}

// Evento de cadastro
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

// Inicializar aplicação
pessoas = carregarPessoas();

ajustarContador();

render();$0