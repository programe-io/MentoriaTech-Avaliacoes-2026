
const formulario = document.getElementById("formulario");
const tabelaCorpo = document.getElementById("tabelaCorpo");

let pessoas = [];
let proximoId = 1;

/* Funções de criação */

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
    tr.appendChild(criarCelula(pessoa.altura));
    tr.appendChild(criarCelula(pessoa.peso));
    tr.appendChild(criarCelula(imc.toFixed(2)));

    const tdClassificacao = criarCelula(classificacao.texto);
    tdClassificacao.classList.add(classificacao.classe);

    tr.appendChild(tdClassificacao);

    return tr;
}

/* Funções de negócio */

function calcularImc(peso, altura) {
    return peso / (altura * altura);
}

function classificarImc(imc) {
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

/* Atualizar tabela */

function atualizarTabela() {
    tabelaCorpo.innerHTML = "";

    pessoas.forEach(function(pessoa) {
        tabelaCorpo.appendChild(criarLinha(pessoa));
    });
}

/* Cadastrar pessoa */

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const altura = Number(document.getElementById("altura").value);
    const peso = Number(document.getElementById("peso").value);

    if (!nome || idade <= 0 || altura <= 0 || peso <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const pessoa = {
        id: proximoId++,
        nome: nome,
        idade: idade,
        altura: altura,
        peso: peso
    };

    pessoas.push(pessoa);

    atualizarTabela();

    formulario.reset();
});
