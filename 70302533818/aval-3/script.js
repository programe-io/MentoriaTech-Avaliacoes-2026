
// =====================================
// DADOS DO SISTEMA
// =====================================

let contador = 0;

const pessoas = [
    {
        id: 1,
        nome: "João",
        idade: 25,
        altura: 1.75,
        peso: 70
    },
    {
        id: 2,
        nome: "Maria",
        idade: 30,
        altura: 1.60,
        peso: 65
    }
];

contador = pessoas.length;

// =====================================
// GERAÇÃO DE CÓDIGO
// =====================================

function gerarCodigo() {
    return ++contador;
}

// =====================================
// REFERÊNCIA À TABELA
// =====================================

const tabelaPessoas = document.getElementById("tabela-pessoas");

// =====================================
// CRIAÇÃO DE CÉLULAS
// =====================================

function criarCelula(valor) {
    const td = document.createElement("td");
    td.textContent = valor;

    return td;
}

// =====================================
// CRIAÇÃO DE LINHAS
// =====================================

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2)));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1)));

    const imc = calcularIMC(pessoa.peso, pessoa.altura);

    const classificacao = classificarIMC(imc);

    tr.appendChild(criarCelula(formatar(imc, 2)));
    tr.appendChild(criarCelula(classificacao.texto));

    const tdAcoes = document.createElement("td");

    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";

    tdAcoes.appendChild(botaoExcluir);

    tr.appendChild(tdAcoes);

    return tr;
}

// =====================================
// FUNÇÃO DE RENDERIZAÇÃO
// =====================================

function render() {

    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");

        const td = document.createElement("td");

        td.colSpan = 7;
        td.className = "vazio";
        td.textContent = "Nenhuma pessoa cadastrada ainda";

        tr.appendChild(td);

        tabelaPessoas.appendChild(tr);

    } else {

        pessoas.forEach(function(pessoa) {

            tabelaPessoas.appendChild(criarLinha(pessoa));

        });

    }
}

// =====================================
// FUNÇÕES DE NEGÓCIO
// =====================================

// Cálculo do IMC
function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}

// Classificação do IMC
function classificarIMC(imc) {

    if (imc < 18.5) {

        return {
            texto: "Abaixo do peso",
            classe: "abaixo"
        };

    } else if (imc < 25) {

        return {
            texto: "Peso normal",
            classe: "normal"
        };

    } else if (imc < 30) {

        return {
            texto: "Sobrepeso",
            classe: "sobrepeso"
        };

    } else if (imc < 35) {

        return {
            texto: "Obesidade grau I",
            classe: "obesidade1"
        };

    } else if (imc < 40) {

        return {
            texto: "Obesidade grau II",
            classe: "obesidade2"
        };

    } else {

        return {
            texto: "Obesidade grau III",
            classe: "obesidade3"
        };

    }

}

// Formatação de números
function formatar(valor, casas) {

    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });

}

// =====================================
// CHAMADA DA FUNÇÃO RENDER
// =====================================

render();
