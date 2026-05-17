// muda texto do título
function mudarTexto(){
  document.getElementById("titulo").innerText =
  "Bem-vindo ao meu projeto JavaScript!";
}

// ativa/desativa modo escuro
function modoEscuro(){
  document.body.classList.toggle("dark");
}