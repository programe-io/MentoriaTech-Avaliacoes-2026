
let contadorCodigo = 0;

function gerarCodigo() {
    return ++contadorCodigo;
}


const pessoas = [
    { id: gerarCodigo(), nome: "Ana Silva", idade: 28, altura: 1.65, peso: 62 },
    { id: gerarCodigo(), nome: "Carlos Souza", idade: 35, altura: 1.80, peso: 88 }
];

const tabelaPessoas = document.getElementById("tabela-pessoas");


function criarCelula(texto, classe = "") {
    const td = document.createElement("td");
    td.textContent = texto;
    if (classe) {
        td.classList.add(classe);
    }
    return td;
}

function criarLinha(pessoa) {
    const tr = document.createElement("tr");
    tr.dataset.id = pessoa.id;

    /
    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2)));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1)));

    return tr;
}

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

    pessoas.forEach((pessoa) => {
        const linha = criarLinha(pessoa);
        tabelaPessoas.appendChild(linha);
    });
}


function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function classificarIMC(imc) {
    if (imc < 18.5) {
        return { texto: "Abaixo do peso", classe: "abaixo" };
    } else if (imc < 25) {
        return { texto: "Peso normal", classe: "normal" };
    } else if (imc < 30) {
        return { texto: "Sobrepeso", classe: "sobrepeso" };
    } else if (imc < 35) {
        return { texto: "Obesidade grau I", classe: "obesidade-1" };
    } else if (imc < 40) {
        return { texto: "Obesidade grau II", classe: "obesidade-2" };
    } else {
        return { texto: "Obesidade grau III", classe: "obesidade-3" };
    }
}

function formatar(valor, casasDecimais = 2) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casasDecimais,
        maximumFractionDigits: casasDecimais
    });
}



render();