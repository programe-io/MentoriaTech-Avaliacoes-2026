
// CONTADOR DE CODIGO

let contador = 0;

function gerarCodigo() {
    contador++;
    return contador;
}


// REFERENCIAS DO HTML

const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");

const tabelaPessoas = document.getElementById("tabela-pessoas");
const mensagemDeErro = document.getElementById("erro");


// LISTA DE PESSOAS

const chavePessoas = "pessoas";

let pessoas = [];


// FUNCOES DE NEGOCIO

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}


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

    if (imc < 35) {
        return {
            texto: "Obesidade grau I",
            classe: "obesidade"
        };
    }

    if (imc < 40) {
        return {
            texto: "Obesidade grau II",
            classe: "obesidade"
        };
    }

    return {
        texto: "Obesidade grau III",
        classe: "obesidade"
    };
}


// FORMATAR NUMEROS

function formatar(valor, casas) {

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });

}


// CRIAR CELULA

function criarCelula(valor) {

    const td = document.createElement("td");

    td.textContent = valor;

    return td;
}


// CRIAR LINHA

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    const imc = calcularIMC(pessoa.peso, pessoa.altura);

    const classificacao = classificarIMC(imc);

    tr.appendChild(criarCelula(pessoa.nome));

    tr.appendChild(criarCelula(pessoa.idade));

    tr.appendChild(
        criarCelula(formatar(pessoa.altura, 2) + " m")
    );

    tr.appendChild(
        criarCelula(formatar(pessoa.peso, 1) + " KG")
    );

    tr.appendChild(
        criarCelula(formatar(imc, 1))
    );


    // COLUNA DE CLASSIFICACAO

    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);


    // COLUNA DE ACOES

    const tdAcoes = document.createElement("td");

    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";

    botaoExcluir.classList.add("excluir");

    botaoExcluir.addEventListener("click", function () {

        excluirPessoa(pessoa.id);

    });

    tdAcoes.appendChild(botaoExcluir);

    tr.appendChild(tdAcoes);

    return tr;

}


// RENDERIZAR TABELA

function render() {

    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");

        const td = document.createElement("td");

        td.colSpan = 7;

        td.classList.add("vazio");

        td.textContent = "Nenhuma pessoa cadastrada ainda";

        tr.appendChild(td);

        tabelaPessoas.appendChild(tr);

        return;
    }

    pessoas.forEach(function (pessoa) {

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);

    });

}


// LER FORMULARIO

function lerFormulario() {

    return {

        nome: inputNome.value.trim(),

        idade: Number(inputIdade.value),

        altura: Number(inputAltura.value),

        peso: Number(inputPeso.value)

    };

}


// VALIDAR DADOS

function validarDados(dados) {

    if (dados.nome.length < 2) {

        return "Informe o nome com no mínimo duas letras.";

    }

    if (
        !Number.isInteger(dados.idade) ||
        dados.idade < 1 ||
        dados.idade > 120
    ) {

        return "A idade deve ser um número inteiro entre 1 e 120.";

    }

    if (
        !Number.isFinite(dados.altura) ||
        dados.altura < 0.5 ||
        dados.altura > 2.5
    ) {

        return "A altura deve estar entre 0,5 e 2,5 metros.";

    }

    if (
        !Number.isFinite(dados.peso) ||
        dados.peso < 2 ||
        dados.peso > 500
    ) {

        return "O peso deve estar entre 2 e 500 KG.";

    }

    return "";

}


// MOSTRAR ERRO

function mostrarErro(mensagem) {

    mensagemDeErro.textContent = mensagem;

    mensagemDeErro.hidden = false;

}


// LIMPAR ERRO

function limparErro() {

    mensagemDeErro.hidden = true;

    mensagemDeErro.textContent = "";

}


// ADICIONAR PESSOA

function adicionarPessoa(dados) {

    const pessoa = {

        id: gerarCodigo(),

        nome: dados.nome,

        idade: dados.idade,

        altura: dados.altura,

        peso: dados.peso

    };

    pessoas.push(pessoa);

}


// SALVAR NO LOCALSTORAGE

function salvar() {

    localStorage.setItem(
        chavePessoas,
        JSON.stringify(pessoas)
    );

}


// CARREGAR PESSOAS

function carregarPessoas() {

    const dadosSalvos = localStorage.getItem(chavePessoas);

    if (dadosSalvos === null) {

        return [];

    }

    try {

        const dados = JSON.parse(dadosSalvos);

        if (Array.isArray(dados)) {

            return dados;

        }

        return [];

    } catch (erro) {

        console.error("Erro ao carregar os pacientes:", erro);

        return [];

    }

}


// AJUSTAR CONTADOR DE CODIGO

function ajustarContador() {

    let maior = 0;

    pessoas.forEach(function (pessoa) {

        if (Number(pessoa.id) > maior) {

            maior = Number(pessoa.id);

        }

    });

    contador = maior;

}


// EXCLUIR PESSOA

function excluirPessoa(id) {

    pessoas = pessoas.filter(function (pessoa) {

        return pessoa.id !== id;

    });

    salvar();

    render();

}


// EVENTO DE ENVIO DO FORMULARIO

formPessoa.addEventListener("submit", function (e) {

    e.preventDefault();

    const dados = lerFormulario();

    const erro = validarDados(dados);

    if (erro !== "") {

        mostrarErro(erro);

        return;

    }

    limparErro();

    adicionarPessoa(dados);

    salvar();

    render();

    formPessoa.reset();

    inputNome.focus();

});


// EVENTO DE CANCELAR

formPessoa.addEventListener("reset", function () {

    limparErro();

});


// INICIALIZACAO DO SISTEMA

pessoas = carregarPessoas();

ajustarContador();

render();
