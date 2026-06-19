function enviar() {
  let nome = document.getElementById("nome").value;

  if (nome === "") {
    document.getElementById("msg").innerText = "Digite seu nome!";
  } else {
    document.getElementById("msg").innerText = "Olá, " + nome + "!";
  }
}