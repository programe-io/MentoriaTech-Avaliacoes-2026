function calcular() {
  let x = Number(document.getElementById("x").value);
  let y = 2 * x + 1;

  document.getElementById("resultado").innerHTML =
    "Resultado: f(" + x + ") = " + y;
}