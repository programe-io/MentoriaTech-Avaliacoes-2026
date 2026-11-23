
// Array que armazena os pacientes
let pessoas = [];

// Contador para gerar identificadores
let contador = 0;

// Referência ao formulário e à tabela
const formPessoa = document.getElementById("form-pessoa");
const tabelaPessoas = document.getElementById("tabela-pessoas");
const mensagemErro = document.getElementById("erro");

// Gera um código automático
function gerarCodigo() {
    return ++contador;
}

// Calcula o IMC
function calcularIMC(peso, altura) {
    return peso / (altura ** 2);
}

// Classifica o IMC
function classificarIMC(imc) {

    if (imc < 18.5) {
        return "Abaixo do peso";
    } else if (imc < 25) {
        return "Peso normal";
    } else if (imc < 30) {
        return "Sobrepeso";
    } else if (imc < 35) {
        return "Obesidade grau 1";
    } else if (imc < 40) {
        return "Obesidade grau 2";
    } else {
        return "Obesidade grau 3";
    }
}

// Formata os números no padrão brasileiro
function formatar(valor, casas = 2) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

// Cria uma célula da tabela
function criarCelula(valor) {
    const td = document.createElement("td");
    td.textContent = valor;
    return td;
}

// Cria uma linha da tabela
function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura)));
    tr.appendChild(criarCelula(formatar(pessoa.peso)));
    tr.appendChild(criarCelula(formatar(pessoa.imc)));
    tr.appendChild(criarCelula(pessoa.classificacao));

    const tdAcoes = document.createElement("td");

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "excluir";

    botaoExcluir.addEventListener("click", function() {
        excluirPessoa(pessoa.id);
    });

    tdAcoes.appendChild(botaoExcluir);
    tr.appendChild(tdAcoes);

    return tr;
}

// Exibe os pacientes na tabela
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

// Salva um paciente
formPessoa.addEventListener("submit", function(event) {

    event.preventDefault();

    mensagemErro.textContent = "";

    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const altura = Number(document.getElementById("altura").value);
    const peso = Number(document.getElementById("peso").value);

    // Validação dos dados
    if (!nome || !Number.isFinite(idade) ||
        !Number.isFinite(altura) || !Number.isFinite(peso) ||
        idade < 1 || idade > 120 ||
        altura < 0.5 || altura > 2.5 ||
        peso < 1 || peso > 500) {

        mensagemErro.textContent = "Preencha todos os campos corretamente.";
        return;
    }

    // Cria o objeto do paciente
    const pessoa = {
        id: gerarCodigo(),
        nome: nome,
        idade: idade,
        altura: altura,
        peso: peso,
        imc: calcularIMC(peso, altura)
    };

    pessoa.classificacao = classificarIMC(pessoa.imc);

    // Adiciona ao array
    pessoas.push(pessoa);

    // Atualiza a tabela
    render();

    // Limpa o formulário
    formPessoa.reset();
});

// Exclui um paciente
function excluirPessoa(id) {

    pessoas = pessoas.filter(function(pessoa) {
        return pessoa.id !== id;
    });

    render();
}

// Botão cancelar
formPessoa.addEventListener("reset", function() {
    mensagemErro.textContent = "";
});

// Primeira renderização
render();
