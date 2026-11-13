
function somar() {

    let n1 = Number(document.getElementById("numero1").value);
    let n2 = Number(document.getElementById("numero2").value);

    let resultado = n1 + n2;

    document.getElementById("resultado").innerHTML =
        "Resultado: " + resultado;
}

function subtrair() {

    let n1 = Number(document.getElementById("numero1").value);
    let n2 = Number(document.getElementById("numero2").value);

    let resultado = n1 - n2;

    document.getElementById("resultado").innerHTML =
        "Resultado: " + resultado;
}

function multiplicar() {

    let n1 = Number(document.getElementById("numero1").value);
    let n2 = Number(document.getElementById("numero2").value);

    let resultado = n1 * n2;

    document.getElementById("resultado").innerHTML =
        "Resultado: " + resultado;
}

function dividir() {

    let n1 = Number(document.getElementById("numero1").value);
    let n2 = Number(document.getElementById("numero2").value);

    if (n2 === 0) {
        alert("Não é possível dividir por zero!");
        return;
    }

    let resultado = n1 / n2;

    document.getElementById("resultado").innerHTML =
        "Resultado: " + resultado;
}
