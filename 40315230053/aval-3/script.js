
const form = document.getElementById("form-imc");

const inputNome = document.getElementById("nome");
const inputPeso = document.getElementById("peso");
const inputAltura = document.getElementById("altura");

const tabelaResultado = document.getElementById("tabela-resultado");
const mensagemErro = document.getElementById("erro");


// Função para calcular o IMC
function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}


// Função para classificar o IMC
function classificarIMC(imc) {

    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "abaixo"
        };
    }

    if (imc < 25) {
        return {
            texto: "Peso normal",
            classe: "normal"
        };
    }

    if (imc < 30) {
        return {
            texto: "Sobrepeso",
            classe: "sobrepeso"
        };
    }

    return {
        texto: "Obesidade",
        classe: "obesidade"
    };

}


// Função para formatar números
function formatar(valor, casas) {

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });

}


// Criar célula da tabela
function criarCelula(texto) {

    const td = document.createElement("td");

    td.textContent = texto;

    return td;

}


// Exibir resultado
function exibirResultado(nome, peso, altura, imc) {

    const classificacao = classificarIMC(imc);

    const tr = document.createElement("tr");

    tr.appendChild(criarCelula(nome));

    tr.appendChild(
        criarCelula(formatar(altura, 2) + " m")
    );

    tr.appendChild(
        criarCelula(formatar(peso, 1) + " kg")
    );

    tr.appendChild(
        criarCelula(formatar(imc, 1))
    );


    // Criar classificação
    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);


    // Limpar resultado anterior
    tabelaResultado.innerHTML = "";

    // Adicionar novo resultado
    tabelaResultado.appendChild(tr);

}


// Evento do formulário
form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Receber os dados
    const nome = inputNome.value.trim();

    const peso = Number(inputPeso.value);

    const altura = Number(inputAltura.value);


    // Validar nome
    if (nome.length < 2) {

        mostrarErro("Informe o nome do paciente.");

        return;
    }


    // Validar peso
    if (inputPeso.value === "" || !Number.isFinite(peso) ||
        peso <= 0) {

        mostrarErro("Informe um peso válido.");

        return;
    }


    // Validar altura
    if (inputAltura.value === "" || !Number.isFinite(altura) ||
        altura <= 0) {

        mostrarErro("Informe uma altura válida.");

        return;
    }


    // Calcular IMC
    const imc = calcularIMC(peso, altura);


    // Exibir resultado
    limparErro();

    exibirResultado(nome, peso, altura, imc);

});


// Mostrar mensagem de erro
function mostrarErro(mensagem) {

    mensagemErro.textContent = mensagem;

    mensagemErro.hidden = false;

}


// Limpar mensagem de erro
function limparErro() {

    mensagemErro.textContent = "";

    mensagemErro.hidden = true;

}

const form = document.getElementById("form-imc");

const inputNome = document.getElementById("nome");
const inputPeso = document.getElementById("peso");
const inputAltura = document.getElementById("altura");

const tabelaResultado = document.getElementById("tabela-resultado");
const mensagemErro = document.getElementById("erro");


// Receber os dados
function lerFormulario() {

    return {
        nome: inputNome.value.trim(),
        peso: Number(inputPeso.value.replace(",", ".")),
        altura: Number(inputAltura.value.replace(",", "."))
    };

}


// Calcular IMC
function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}


// Classificar IMC
function classificarIMC(imc) {

    if (imc < 18.5) {
        return { texto: "Abaixo do peso", classe: "abaixo" };
    }

    if (imc < 25) {
        return { texto: "Peso normal", classe: "normal" };
    }

    if (imc < 30) {
        return { texto: "Sobrepeso", classe: "sobrepeso" };
    }

    return { texto: "Obesidade", classe: "obesidade" };

}


// Formatar números
function formatar(valor, casas) {

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });

}


// Criar célula
function criarCelula(texto) {

    const td = document.createElement("td");

    td.textContent = texto;

    return td;

}


// Exibir resultado
function exibirResultado(dados, imc) {

    const classificacao = classificarIMC(imc);

    const tr = document.createElement("tr");

    tr.appendChild(criarCelula(dados.nome));

    tr.appendChild(
        criarCelula(formatar(dados.altura, 2) + " m")
    );

    tr.appendChild(
        criarCelula(formatar(dados.peso, 1) + " kg")
    );

    tr.appendChild(
        criarCelula(formatar(imc, 1))
    );


    // Criar classificação
    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);


    // Mostrar na tabela
    tabelaResultado.innerHTML = "";

    tabelaResultado.appendChild(tr);

}


// Mostrar erro
function mostrarErro(mensagem) {

    mensagemErro.textContent = mensagem;

    mensagemErro.hidden = false;

}


// Limpar erro
function limparErro() {

    mensagemErro.textContent = "";

    mensagemErro.hidden = true;

}


// Evento do botão calcular
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const dados = lerFormulario();


    // Validar nome
    if (dados.nome.length < 2) {

        mostrarErro("Digite o nome do paciente.");

        return;

    }


    // Validar peso
    if (
        inputPeso.value.trim() === "" ||
        !Number.isFinite(dados.peso) ||
        dados.peso <= 0
    ) {

        mostrarErro("Digite um peso válido.");

        return;

    }


    // Validar altura
    if (
        inputAltura.value.trim() === "" ||
        !Number.isFinite(dados.altura) ||
        dados.altura <= 0
    ) {

        mostrarErro("Digite uma altura válida.");

        return;

    }


    // Calcular
    const imc = calcularIMC(dados.peso, dados.altura);


    // Exibir resultado
    limparErro();

    exibirResultado(dados, imc);

});
