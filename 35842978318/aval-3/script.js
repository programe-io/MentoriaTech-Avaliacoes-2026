
let nome = prompt("Digite o nome do paciente:");

let peso = Number(prompt("Digite o peso em kg:"));

let altura = Number(prompt("Digite a altura em metros:"));

if (nome === null || nome.trim() === "") {
    alert("Nome inválido!");
} else if (peso <= 0 || altura <= 0 || isNaN(peso) || isNaN(altura)) {
    alert("Digite valores válidos para peso e altura!");
} else {
    let imc = peso / (altura * altura);

    let resultado = "Paciente: " + nome +
        "\nPeso: " + peso + " kg" +
        "\nAltura: " + altura + " m" +
        "\nIMC: " + imc.toFixed(2);

    alert("RESULTADO DO IMC\n\n" + resultado);
}
