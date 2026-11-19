// ==========================================
// VARIÁVEIS DO SISTEMA
// ==========================================

let contador = 0;
let pessoas = [];

const formulario = document.getElementById("form-pessoa");
const tabela = document.getElementById("tabela-pessoas");
const mensagemErro = document.getElementById("erro");


// ==========================================
// GERAÇÃO AUTOMÁTICA DE IDENTIFICADOR
// ==========================================

function gerarCodigo() {
    contador++;
    return contador;
\}


// ==========================================
// FUNÇÕES DE NEGÓCIO
// ==========================================

// Calcula o IMC do paciente
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
\}


// Classifica o resultado do IMC
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

    \} else if (imc < 35) {
        return {
            texto: "Obesidade grau I",
            classe: "obesidade"
        \};

    \} else if (imc < 40) {
        return {
            texto: "Obesidade grau II",
            classe: "obesidade"
        \};

    \} else {
        return {
            texto: "Obesidade grau III",
            classe: "obesidade"
        \};
    \}
\}


// Formata os valores numéricos para pt-BR
function formatar(valor, casas = 2) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    \});
\}


// ==========================================
// CRIAÇÃO DE CÉLULAS E LINHAS
// ==========================================

// Cria uma célula da tabela
function criarCelula(texto, classe = "") {
    const td = document.createElement("td");

    td.textContent = texto;

    if (classe) {
        td.className = classe;
    \}

    return td;
\}


// Cria uma linha com os dados do paciente
function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    const classificacao = classificarIMC(pessoa.imc);

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade.toString()));
    tr.appendChild(criarCelula(formatar(pessoa.altura) + " m"));
    tr.appendChild(criarCelula(formatar(pessoa.peso) + " kg"));
    tr.appendChild(criarCelula(formatar(pessoa.imc)));
    tr.appendChild(
        criarCelula(
            classificacao.texto,
            classificacao.classe
        )
    );

    // Botão de excluir
    const tdAcoes = document.createElement("td");
    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "btn-excluir";
    botaoExcluir.type = "button";

    botaoExcluir.addEventListener("click", function() {
        excluirPessoa(pessoa.id);
    \});

    tdAcoes.appendChild(botaoExcluir);
    tr.appendChild(tdAcoes);

    return tr;
\}


// ==========================================
// FUNÇÃO DE RENDERIZAÇÃO
// ==========================================

function render() {

    // Limpa a tabela antes de reconstruir
    tabela.innerHTML = "";

    // Verifica se existem pacientes cadastrados
    if (pessoas.length === 0) {

        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 7;
        td.textContent = "Nenhuma pessoa cadastrada ainda.";
        td.className = "vazio";

        tr.appendChild(td);
        tabela.appendChild(tr);

        return;
    \}

    // Cria uma linha para cada paciente
    pessoas.forEach(function(pessoa) {

        const linha = criarLinha(pessoa);

        tabela.appendChild(linha);
    \});
\}


// ==========================================
// CADASTRO DE PACIENTES
// ==========================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    mensagemErro.textContent = "";

    // Captura os valores do formulário
    const nome = document.getElementById("nome").value.trim();

    const idade = Number(document.getElementById("idade").value);

    const altura = Number(document.getElementById("altura").value);

    const peso = Number(document.getElementById("peso").value);

    // Validação dos dados
    if (!nome || nome.length > 50) {
        mensagemErro.textContent = "Informe um nome válido.";
        return;
    \}

    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {
        mensagemErro.textContent = "Informe uma idade entre 1 e 120.";
        return;
    \}

    if (!Number.isFinite(altura) || altura <= 0) {
        mensagemErro.textContent = "Informe uma altura válida.";
        return;
    \}

    if (!Number.isFinite(peso) || peso <= 0) {
        mensagemErro.textContent = "Informe um peso válido.";
        return;
    \}

    // Gera o identificador
    const id = gerarCodigo();

    // Calcula o IMC
    const imc = calcularIMC(peso, altura);

    // Cria o objeto do paciente
    const pessoa = {
        id: id,
        nome: nome,
        idade: idade,
        altura: altura,
        peso: peso,
        imc: imc
    \};

    // Adiciona o paciente ao array
    pessoas.push(pessoa);

    // Atualiza a tabela
    render();

    // Limpa o formulário
    formulario.reset();

\});


// ==========================================
// EXCLUSÃO DE PACIENTES
// ==========================================

function excluirPessoa(id) {

    pessoas = pessoas.filter(function(pessoa) {
        return pessoa.id !== id;
    \});

    render();
\}


// ==========================================
// BOTÃO CANCELAR
// ==========================================

formulario.addEventListener("reset", function() {
    mensagemErro.textContent = "";
\});


// ==========================================
// INICIALIZAÇÃO DO SISTEMA
// ==========================================

render();$0