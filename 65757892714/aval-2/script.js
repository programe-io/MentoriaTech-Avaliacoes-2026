
function calcular() {
  const n1 = Number(document.getElementById("numero1").value);
  const n2 = Number(document.getElementById("numero2").value);

  document.getElementById("resultado").textContent =
    "Resultado: " + (n1 + n2);
}
