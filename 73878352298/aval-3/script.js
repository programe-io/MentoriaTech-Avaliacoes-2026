
function calcularIMC() {
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    if (peso <= 0 || altura <= 0) {
        document.getElementById("resultado").innerHTML =
            "Digite valores válidos!";
        return;
    }

    let imc = peso / (altura * altura);

    document.getElementById("resultado").innerHTML =
        "Seu IMC é: " + imc.toFixed(2);
}
