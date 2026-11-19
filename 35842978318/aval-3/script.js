
let nome = prompt("Digite o nome do paciente:");

if (nome === null || nome.trim() === "") {
    alert("Digite um nome válido!");
} else {
    let pesoTexto = prompt("Digite o peso em kg:");
    let alturaTexto = prompt("Digite a altura em metros:");

    let peso = parseFloat(pesoTexto.replace(",", "."));
    let altura = parseFloat(alturaTexto.replace(",", "."));

    if (
        pesoTexto === null ||
        alturaTexto === null ||
        isNaN(peso) ||
        isNaN(altura) ||
        peso <= 0 ||
        altura <= 0
    ) {
        alert("Erro! Digite valores válidos.");
    } else {
        let imc = peso / (altura * altura);

        alert(
            "CONTROLE DE IMC\n\n" +
            "Paciente: " + nome +
            "\nPeso: " + peso + " kg" +
            "\nAltura: " + altura + " m" +
            "\nIMC: " + imc.toFixed(2)
        );
    }
}
