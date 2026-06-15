function calcularArea() {
    let base = Number(document.getElementById("base").value);
    let altura = Number(document.getElementById("altura").value);

    let area = base * altura;

    document.getElementById("resultado").textContent =
        "Área do retângulo: " + area;
}

function dark() {
    document.body.classList.toggle("dark");
}