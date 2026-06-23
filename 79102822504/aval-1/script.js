function somar() {
    const n1 = Number(document.getElementById("n1").value);
    const n2 = Number(document.getElementById("n2").value);

    const resultado = n1 + n2;

    document.getElementById("resultado").textContent =
        `Resultado: ${resultado}`;
}