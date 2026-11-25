let pessoas = [];
let contador = 0;

/* Funções de Interface */

function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function criarLinha(pessoa) {
    const imc = calcularImc(pessoa.peso, pessoa.altura);
    const classificacao = classificarImc(imc);

    const tr = document.createElement("tr");
    tr.dataset.id = pessoa.id;

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
    tr.appendChild(criarCelula(pessoa.peso + " kg"));
    tr.appendChild(criarCelula(formatar(imc, 2)));
    tr.appendChild(criarCelula(classificacao));

    return tr;
}

/* Funções de Negócio */

function calcularImc(peso, altura) {
    return peso / (altura * altura);
}

function classificarImc(imc) {
    if (imc < 18.5) {
        return "Abaixo do peso";
    } else if (imc < 25) {
        return "Peso normal";
    } else if (imc < 30) {
        return "Sobrepeso";
    } else {
        return "Obesidade";
    }
}

function formatar(valor, casas) {
    return valor.toFixed(casas);
}

/* Adicionar pessoas */

function adicionarPessoa() {
    const nome = document.getElementById("nome").value;
    const idade = Number(document.getElementById("idade").value);
    const altura = Number(document.getElementById("altura").value);
    const peso = Number(document.getElementById("peso").value);

    if (!nome || !idade || !altura || !peso ||
        idade <= 0 || altura <= 0 || peso <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const pessoa = {
        id: contador++,
        nome: nome,
        idade: idade,
        altura: altura,
        peso: peso
    };

    pessoas.push(pessoa);

    const linha = criarLinha(pessoa);
    document.getElementById("tabela").appendChild(linha);

    limparCampos();
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("peso").value = "";
}