
function enviar(numero) {
  const campo = document.getElementById("link" + numero);
  const status = document.getElementById("status" + numero);
  const link = campo.value.trim();

  if (link === "") {
    status.textContent = "Digite o link da avaliação!";
    status.style.color = "red";
  } else {
    status.textContent = "Link enviado com sucesso!";
    status.style.color = "green";
  }
}
