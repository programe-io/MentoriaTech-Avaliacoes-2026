
function somar() {
    const valor1 = document.getElementById("valor1").value;
    const valor2 = document.getElementById("valor2").value;

    if (valor1 === "" || valor2 === "") {
        alert("Digite os dois valores!");
        return;
    }

    const resultado = Number(valor1) + Number(valor2);

    document.getElementById("resultado").textContent =
        "Resultado: " + resultado;
}

const pessoas = [
    { nome: "Ana", peso: 50, altura: 1.60 },
    { nome: "Bruno", peso: 45, altura: 1.70 },
    { nome: "Carlos", peso: 80, altura: 1.70 },
    { nome: "Daniela", peso: 100, altura: 1.70 }
];

const tabela = document.getElementById("tabela");

pessoas.forEach(pessoa => {
    const imc = pessoa.peso / (pessoa.altura * pessoa.altura);

    let status;
    let classe;

    if (imc < 18.5) {
        status = "Abaixo do peso";
        classe = "abaixo";
    } else if (imc < 25) {
        status = "Normal";
        classe = "normal";
    } else if (imc < 30) {
        status = "Sobrepeso";
        classe = "sobrepeso";
    } else {
        status = "Obesidade";
        classe = "obesidade";
    }

    tabela.innerHTML += `
        <tr class="${classe}">
            <td>${pessoa.nome}</td>
            <td>${pessoa.peso}</td>
            <td>${pessoa.altura.toFixed(2)}</td>
            <td>${imc.toFixed(2)}</td>
            <td>${status}</td>
        </tr>
    `;
});
