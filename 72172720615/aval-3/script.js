
let pessoas = [];
let contador = 0;

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
    if (imc < 35) return "Obesidade grau 1";
    if (imc < 40) return "Obesidade grau 2";
    return "Obesidade grau 3";
}

function salvar() {
    let nome = document.getElementById("nome").value;
    let idade = Number(document.getElementById("idade").value);
    let altura = Number(document.getElementById("altura").value);
    let peso = Number(document.getElementById("peso").value);

    if (!nome || idade < 1 || altura <= 0 || peso <= 0) {
        document.getElementById("erro").innerText = "Dados inválidos!";
        return;
    }

    pessoas.push({
        id: gerarCodigo(),
        nome, idade, altura, peso,
        imc: calcularIMC(peso, altura)
    });

    document.getElementById("erro").innerText = "";
    render();
    cancelar();
}

function cancelar() {
    document.querySelectorAll("input").forEach(campo => campo.value = "");
}

function render() {
    let tabela = document.getElementById("tabelaPessoas");
    tabela.innerHTML = "";

    pessoas.forEach(p => {
        tabela.innerHTML += `
            <tr>
                <td>${p.nome}</td>
                <td>${p.idade}</td>
                <td>${p.altura}</td>
                <td>${p.peso}</td>
                <td>${p.imc.toFixed(2)}</td>
                <td>${classificarIMC(p.imc)}</td>
            </tr>
        `;
    });
}

render();
