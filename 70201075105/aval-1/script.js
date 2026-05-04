function verificar() {
  const senha = document.getElementById("senha").value;
  const msg = document.getElementById("msg");

  if (senha === "6969") {
    msg.style.color = "lightgreen";
    msg.innerText = "Acesso liberado ✅";
  } else {
    msg.style.color = "red";
    msg.innerText = "Senha incorreta ❌";
  }
}