// Array que armazena as pessoas
let pessoas = [];
let contador = 0;

// Referência ao corpo da tabela
const tabelaPessoas = document.getElementById("tabelaPessoas");
const formPessoa = document.getElementById("formPessoa");
const erro = document.getElementById("erro");

// Gera código automático
function gerarCodigo() {
    return ++contador;
}

// Cria uma célula da tabela
function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

// Cria uma linha da tabela
function criarLinha(pessoa) {
    const tr = document.createElement("tr");
    tr.dataset.id = pessoa.id;

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg"));
    tr.appendChild(criarCelula(formatar(pessoa.imc, 2)));
    tr.appendChild(criarCelula(pessoa.classificacao));

    const tdAcoes = document.createElement("td");
    const btnExcluir = document.createElement("button");

    btnExcluir.textContent = "Excluir";
    btnExcluir.onclick = () => excluirPessoa(pessoa.id);

    tdAcoes.appendChild(btnExcluir);
    tr.appendChild(tdAcoes);

    return tr;
}

// Renderiza a tabela
function render() {
    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 7;
        td.className = "vazio";
        td.textContent = "Nenhuma pessoa cadastrada ainda.";

        tr.appendChild(td);
        tabelaPessoas.appendChild(tr);
        return;
    }

    pessoas.forEach(pessoa => {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    });
}

// Calcula o IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Classifica o IMC (faixas convencionais para adultos)
function classificarIMC(imc) {
    if (imc < 18.5) {
        return "Abaixo de 18,5";
    } else if (imc < 25) {
        return "Entre 18,5 e 24,9";
    } else if (imc < 30) {
        return "Entre 25 e 29,9";
    } else if (imc < 35) {
        return "Entre 30 e 34,9";
    } else if (imc < 40) {
        return "Entre 35 e 39,9";
    } else {
        return "40 ou mais";
    }
}

// Formata valores numéricos
function formatar(valor, casas) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

// Salva uma pessoa
function salvarPessoa(nome, idade, altura, peso) {
    const imc = calcularIMC(peso, altura);
    const classificacao = classificarIMC(imc);

    const pessoa = {
        id: gerarCodigo(),
        nome: nome,
        idade: idade,
        altura: altura,
        peso: peso,
        imc: imc,
        classificacao: classificacao
    };

    pessoas.push(pessoa);
    render();
}

// Exclui uma pessoa
function excluirPessoa(id) {
    pessoas = pessoas.filter(pessoa => pessoa.id !== id);
    render();
}

// Evento do formulário
formPessoa.addEventListener("submit", function(event) {
    event.preventDefault();

    erro.textContent = "";

    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const altura = Number(document.getElementById("altura").value);
    const peso = Number(document.getElementById("peso").value);

    if (!nome || idade < 1 || altura <= 0 || peso <= 0) {
        erro.textContent = "Preencha todos os campos corretamente.";
        return;
    }

    salvarPessoa(nome, idade, altura, peso);
    formPessoa.reset();
});

// Evento do botão cancelar
document.getElementById("cancelar").addEventListener("click", function() {
    formPessoa.reset();
    erro.textContent = "";
});

// Chama a renderização inicial
render();