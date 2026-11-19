javascript

// Lista que armazena os pacientes cadastrados
let pacientes = [];

// Identificador automático dos pacientes
let proximoId = 1;

// Elementos do HTML
const formulario = document.getElementById("formPaciente");
const listaPacientes = document.getElementById("listaPacientes");
const mensagemVazia = document.getElementById("mensagemVazia");

// Função para calcular o IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
\}

// Função para classificar o IMC
function classificarIMC(imc) {

    if (imc < 18.5) {
        return "Abaixo do peso";

    \} else if (imc < 25) {
        return "Peso normal";

    \} else if (imc < 30) {
        return "Sobrepeso";

    \} else if (imc < 35) {
        return "Obesidade grau I";

    \} else if (imc < 40) {
        return "Obesidade grau II";

    \} else {
        return "Obesidade grau III";
    \}
\}

// Função para formatar valores numéricos
function formatarNumero(valor) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    \});
\}

// Cadastro de pacientes
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Captura dos dados
    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const altura = Number(document.getElementById("altura").value);
    const peso = Number(document.getElementById("peso").value);

    // Validação dos dados
    if (
        nome === "" ||
        !Number.isInteger(idade) ||
        idade <= 0 ||
        !Number.isFinite(altura) ||
        altura <= 0 ||
        !Number.isFinite(peso) ||
        peso <= 0
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    \}

    // Cálculo do IMC
    const imc = calcularIMC(peso, altura);

    // Classificação
    const classificacao = classificarIMC(imc);

    // Criação do paciente
    const paciente = {
        id: proximoId,
        nome: nome,
        idade: idade,
        altura: altura,
        peso: peso,
        imc: imc,
        classificacao: classificacao
    \};

    // Adiciona o paciente à lista
    pacientes.push(paciente);

    // Incrementa o identificador
    proximoId++;

    // Atualiza a tabela
    atualizarTabela();

    // Limpa o formulário
    formulario.reset();

\});

// Função para atualizar a tabela
function atualizarTabela() {

    // Limpa o conteúdo anterior
    listaPacientes.innerHTML = "";

    // Verifica se existem pacientes
    if (pacientes.length === 0) {
        mensagemVazia.style.display = "block";
        return;
    \}

    mensagemVazia.style.display = "none";

    // Percorre a lista de pacientes
    pacientes.forEach(function(paciente) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>\${paciente.id\}</td>
            <td></td>
            <td>\${paciente.idade\}</td>
            <td>\${formatarNumero(paciente.altura)\} m</td>
            <td>\${formatarNumero(paciente.peso)\} kg</td>
            <td>\${formatarNumero(paciente.imc)\}</td>
            <td></td>
        `;

        // Insere os textos com segurança
        linha.children[1].textContent = paciente.nome;
        linha.children[6].textContent = paciente.classificacao;

        listaPacientes.appendChild(linha);

    \});

\}

// Exibe a tabela inicialmente vazia
atualizarTabela();$0