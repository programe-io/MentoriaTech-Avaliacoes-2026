function mostrar() {
  let nome = document.getElementById("nome").value;

  if (nome === "") {
    document.getElementById("resultado").innerText = "Digite um nome.";
  } else {
    document.getElementById("resultado").innerText = "Olá, " + nome + "!";
  }
}