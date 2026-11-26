
let pessoas = [];
let contador = 0;

const formulario = document.getElementById("formPessoa");
const tabela = document.getElementById("tabelaPessoas");
const erro = document.getElementById("erro");

function gerarCodigo() {
    return ++contador;
}

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

function formatar(valor, casas = 2) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

function render() {
    tabela.innerHTML = "";

    if (pessoas.length === 0) {
        tabela.innerHTML = '<tr><td colspan="6">Nenhuma pessoa cadastrada ainda</td></tr>';
        return;
    }

    pessoas.forEach(pessoa => {
        const linha = document.createElement("tr");

        [
            pessoa.nome,
            pessoa.idade,
            formatar(pessoa.altura),
            formatar(pessoa.peso),
            formatar(pessoa.imc),
            pessoa.classificacao
        ].forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        tabela.appendChild(linha);
    });
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const altura = Number(document.getElementById("altura").value);
    const peso = Number(document.getElementById("peso").value);

    if (!nome || idade < 1 || altura <= 0 || peso <= 0) {
        erro.textContent = "Preencha os campos corretamente!";
        return;
    }

    const imc = calcularIMC(peso, altura);

    pessoas.push({
        id: gerarCodigo(),
        nome,
        idade,
        altura,
        peso,
        imc,
        classificacao: classificarIMC(imc)
    });

    erro.textContent = "";
    formulario.reset();
    render();
});

render();
