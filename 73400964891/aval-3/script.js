// Array para armazenar as pessoas
let pessoas = [];

// Contador de identificadores
let contadorCodigo = 0;

// Referência à tabela
const tabelaPessoas = document.getElementById("tabelaPessoas");

// Função para gerar código
function gerarCodigo() {
    return ++contadorCodigo;
}

// Função para criar célula
function criarCelula(valor) {
    const td = document.createElement("td");
    td.textContent = valor;
    return td;
}

// Função para calcular IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Função para classificar IMC (referência para adultos)
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
            classe: "obesidade"
        };
    } else if (imc < 40) {
        return {
            texto: "Obesidade grau II",
            classe: "obesidade"
        };
    } else {
        return {
            texto: "Obesidade grau III",
            classe: "obesidade"
        };
    }
}

// Função para formatar números
function formatar(valor, casas = 2) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

// Função para criar linha
function criarLinha(pessoa) {
    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura)));
    tr.appendChild(criarCelula(formatar(pessoa.peso)));
    tr.appendChild(criarCelula(formatar(imc)));

    const tdClassificacao = criarCelula(classificacao.texto);
    tr.appendChild(tdClassificacao);

    const tdAcoes = document.createElement("td");
    tdAcoes.textContent = "-";

    tr.appendChild(tdAcoes);

    return tr;
}

// Função de renderização
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

        return;
    }

    pessoas.forEach(function(pessoa) {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    });
}

// Funções de negócio

// Função para cadastrar pessoa
function cadastrarPessoa(nome, idade, altura, peso) {
    if (nome.trim().length === 0) {
        throw new Error("Informe o nome.");
    }

    if (idade < 1 || idade > 120) {
        throw new Error("Informe uma idade válida.");
    }

    if (altura <= 0 || peso <= 0) {
        throw new Error("Altura e peso devem ser positivos.");
    }

    const pessoa = {
        id: gerarCodigo(),
        nome: nome,
        idade: idade,
        altura: altura,
        peso: peso
    };

    pessoas.push(pessoa);
}

// Função para limpar formulário
function limparFormulario() {
    document.getElementById("formPessoa").reset();
    document.getElementById("erro").textContent = "";
}

// Evento de cadastro
document.getElementById("formPessoa").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const idade = Number(document.getElementById("idade").value);
    const altura = Number(document.getElementById("altura").value);
    const peso = Number(document.getElementById("peso").value);

    const erro = document.getElementById("erro");

    try {
        cadastrarPessoa(nome, idade, altura, peso);

        erro.textContent = "";

        render();
        limparFormulario();

    } catch (ex) {
        erro.textContent = ex.message;
    }
});

// Evento de cancelar
document.getElementById("btnCancelar").addEventListener("click", function() {
    limparFormulario();
});

// Chamada inicial da renderização
render();