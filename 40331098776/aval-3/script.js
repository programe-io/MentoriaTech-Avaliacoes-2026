'use strict';

const CHAVE_PESSOAS = 'pessoas';
let contadorCodigo = 0;
let pessoas = [];

const formPessoa = document.getElementById('form-pessoa');
const inputNome = document.getElementById('nome');
const inputIdade = document.getElementById('idade');
const inputAltura = document.getElementById('altura');
const inputPeso = document.getElementById('peso');
const tabelaPessoas = document.getElementById('tabela-pessoas');
const mensagemDeErro = document.getElementById('erro');

// Gerar código único
function gerarCodigo() {
    contadorCodigo++;
    return contadorCodigo;
\}

// Criar célula da tabela
function criarCelula(conteudo) {
    const td = document.createElement('td');
    td.textContent = conteudo;
    return td;
\}

// Calcular IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
\}

// Classificar IMC
function classificarIMC(imc) {
    if (imc < 18.5) {
        return { texto: 'Abaixo do peso', classe: 'abaixo-peso' \};
    \}

    if (imc < 25) {
        return { texto: 'Peso normal', classe: 'peso-normal' \};
    \}

    if (imc < 30) {
        return { texto: 'Sobrepeso', classe: 'sobrepeso' \};
    \}

    if (imc < 35) {
        return { texto: 'Obesidade grau I', classe: 'obesidade' \};
    \}

    if (imc < 40) {
        return { texto: 'Obesidade grau II', classe: 'obesidade' \};
    \}

    return { texto: 'Obesidade grau III', classe: 'obesidade' \};
\}

// Formatar números
function formatar(valor, casasDecimais) {
    return valor.toLocaleString('pt-BR', {
        minimumFractionDigits: casasDecimais,
        maximumFractionDigits: casasDecimais
    \});
\}

// Criar linha da tabela
function criarLinha(pessoa) {
    const tr = document.createElement('tr');
    tr.dataset.id = pessoa.id;

    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(String(pessoa.idade)));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + ' m'));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + ' kg'));
    tr.appendChild(criarCelula(formatar(imc, 1)));

    const tdClassificacao = document.createElement('td');
    const selo = document.createElement('span');

    selo.classList.add('selo', classificacao.classe);
    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);
    tr.appendChild(tdClassificacao);

    const tdAcoes = document.createElement('td');
    const botaoApagar = document.createElement('button');

    botaoApagar.type = 'button';
    botaoApagar.className = 'botao-apagar';
    botaoApagar.textContent = 'Apagar';

    botaoApagar.addEventListener('click', function () {
        apagarPessoa(pessoa.id);
    \});

    tdAcoes.appendChild(botaoApagar);
    tr.appendChild(tdAcoes);

    return tr;
\}

// Atualizar tabela
function render() {
    tabelaPessoas.innerHTML = '';

    if (pessoas.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');

        td.colSpan = 7;
        td.className = 'vazio';
        td.textContent = 'Nenhuma pessoa cadastrada ainda';

        tr.appendChild(td);
        tabelaPessoas.appendChild(tr);
        return;
    \}

    pessoas.forEach(function (pessoa) {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    \});
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
        return 'Informe o nome com no mínimo duas letras.';
    \}

    if (!Number.isInteger(dados.idade) ||
        dados.idade < 1 || dados.idade > 120) {
        return 'A idade deve ser um número inteiro entre 1 e 120.';
    \}

    if (!Number.isFinite(dados.altura) ||
        dados.altura < 0.5 || dados.altura > 2.5) {
        return 'A altura deve estar entre 0,5 m e 2,5 m.';
    \}

    if (!Number.isFinite(dados.peso) ||
        dados.peso < 2 || dados.peso > 500) {
        return 'O peso deve estar entre 2 kg e 500 kg.';
    \}

    return '';
\}

// Mostrar erro
function mostrarErro(mensagem) {
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.hidden = false;
\}

// Limpar erro
function limparErro() {
    mensagemDeErro.textContent = '';
    mensagemDeErro.hidden = true;
\}

// Adicionar pessoa
function adicionarPessoa(dados) {
    pessoas.push({
        id: gerarCodigo(),
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    \});
\}

// Salvar dados
function salvar() {
    try {
        localStorage.setItem(CHAVE_PESSOAS, JSON.stringify(pessoas));
    \} catch (erro) {
        mostrarErro('Não foi possível salvar os dados.');
        console.error(erro);
    \}
\}

// Carregar pessoas
function carregarPessoas() {
    try {
        const dadosSalvos = localStorage.getItem(CHAVE_PESSOAS);

        if (!dadosSalvos) {
            return [];
        \}

        const dados = JSON.parse(dadosSalvos);

        return Array.isArray(dados) ? dados : [];

    \} catch (erro) {
        console.error('Erro ao carregar pessoas:', erro);
        return [];
    \}
\}

// Ajustar contador
function ajustarContadorCodigo() {
    let maior = 0;

    pessoas.forEach(function (pessoa) {
        const id = Number(pessoa.id);

        if (Number.isInteger(id) && id > maior) {
            maior = id;
        \}
    \});

    contadorCodigo = maior;
\}

// Apagar pessoa
function apagarPessoa(id) {
    pessoas = pessoas.filter(function (pessoa) {
        return pessoa.id !== id;
    \});

    salvar();
    render();
\}

// Inicialização
pessoas = carregarPessoas();

ajustarContadorCodigo();
render();

// Cadastrar pessoa
formPessoa.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const dados = lerFormulario();
    const erro = validarDados(dados);

    if (erro !== '') {
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

// Limpar formulário
formPessoa.addEventListener('reset', function () {
    limparErro();
\});$0