
function calculeaarea() {
    let base = Number(document.getElementById("base").value);
    let altura = Number(document.getElementById("altura").value);

    let area = base * altura;

    document.getElementById("resultado").innerHTML =
        "Área do retângulo: " + area;
}

function dark() {
    document.body.classList.toggle("dark");
}