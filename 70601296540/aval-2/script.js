function calcular() {
    let x = Number(document.getElementById("valorX").value);
    let y = 2 * x + 3;

    document.getElementById("resultado").textContent =
        "Resultado: f(" + x + ") = " + y;
}