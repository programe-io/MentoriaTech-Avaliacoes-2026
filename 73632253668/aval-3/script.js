
let pessoas = [];
let codigo = 0;

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

    if (nome.length < 3 || idade < 1 || altura <= 0 || peso <= 0) {
        alert("Preencha os dados corretamente!");
        return;
    }

    pessoas.push({ codigo: ++codigo, nome, idade, altura, peso });
    render();
    cancelar();
}

function render() {
    let tabela = document.getElementById("tabela");
    tabela.innerHTML = "";

    pessoas.forEach(p => {
        let imc = calcularIMC(p.peso, p.altura);

        tabela.innerHTML += `<tr>
            <td>${p.nome}</td>
            <td>${p.idade}</td>
            <td>${p.altura}</td>
            <td>${p.peso}</td>
            <td>${imc.toFixed(2)}</td>
            <td>${classificarIMC(imc)}</td>
        </tr>`;
    });
}

function cancelar() {
    document.querySelectorAll("input").forEach(c => c.value = "");
}

render();
