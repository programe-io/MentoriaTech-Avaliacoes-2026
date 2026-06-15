function calcularArea() {
    let largura = Number(document.getElementById("largura").value);
    let altura = Number(document.getElementById("altura").value);

    let area = largura * altura;

    document.getElementById("resultado").textContent =
        "Área: " + area;
}