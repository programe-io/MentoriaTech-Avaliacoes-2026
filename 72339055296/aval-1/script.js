function calcularArea() {
    let base = Number(document.getElementById("base").value);
    let altura = Number(document.getElementById("altura").value);

    let area = base * altura;

    document.getElementById("resultado").innerHTML =
        `A área do retângulo é ${area} m²`;
}