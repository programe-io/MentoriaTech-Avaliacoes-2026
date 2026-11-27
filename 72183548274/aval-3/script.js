
let contadorCodigo = 0;

function gerarCodigo() {
    return ++contadorCodigo;
}

let pessoas = [
    {
        id: gerarCodigo(),
        nome: "Maria Silva",
        idade: 30,
        altura: 1.65,
        peso: 68
    },
    {
        id: gerarCodigo(),
        nome: "João Souza",
        idade: 25,
        altura: 1.75,
        peso: 80
    }
];

const tabelaPessoas = document.getElementById("tabela-pessoas");
const formulario = document.getElementById("form-pessoa");

/* Funções de criação de elementos */

function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function criarLinha(pessoa) {
    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

    tr.appendChild(criarCelula(pessoa.id));
    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2)));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1)));
    tr.appendChild(criarCelula(formatar(imc, 2)));
    tr.appendChild(criarCelula(classificacao));

    // Botão excluir
    const tdAcao = document.createElement("td");
    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add("btn-excluir");

    botaoExcluir.addEventListener("click", function () {
        excluirPessoa(pessoa.id);
    });

    tdAcao.appendChild(botaoExcluir);
    tr.appendChild(tdAcao);

    return tr;
}

/* Funções de negócio */

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function classificarIMC(imc) {
    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 25) return "Peso normal";
    if (imc < 30) return "Sobrepeso";
    if (imc < 35) return "Obesidade grau I";
    if (imc < 40) return "Obesidade grau II";

    return "Obesidade grau III";
}

function formatar(valor, casasDecimais) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casasDecimais,
        maximumFractionDigits: casasDecimais
    });
}

/* Funções de gerenciamento */

function cadastrarPessoa(nome, idade, altura, peso) {

    const pessoa = {
        id: gerarCodigo(),
        nome: nome,
        idade: idade,
        altura: altura,
        peso: peso
    };

    pessoas.push(pessoa);

    render();
}

function excluirPessoa(id) {

    pessoas = pessoas.filter(function (pessoa) {
        return pessoa.id !== id;
    });

    render();
}

/* Função responsável por atualizar a tabela */

function render() {

    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 8;
        td.classList.add("vazio");
        td.textContent = "Nenhuma pessoa cadastrada";

        tr.appendChild(td);
        tabelaPessoas.appendChild(tr);

        return;
    }

    pessoas.forEach(function (pessoa) {

        tabelaPessoas.appendChild(criarLinha(pessoa));

    });
}

/* Evento do formulário */

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const altura = Number(document.getElementById("altura").value);
    const peso = Number(document.getElementById("peso").value);

    if (!nome || idade <= 0 || altura <= 0 || peso <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    cadastrarPessoa(nome, idade, altura, peso);

    formulario.reset();

});

// Inicializa a tabela
render();
