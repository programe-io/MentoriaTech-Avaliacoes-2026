function somar() {
  let n1 = Number(document.getElementById("numero1").value);
  let n2 = Number(document.getElementById("numero2").value);

  let resultado = n1 + n2;

  document.getElementById("resultado").innerText = "Resultado: " + resultado;
}