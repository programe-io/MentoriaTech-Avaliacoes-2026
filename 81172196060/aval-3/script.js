// NÚMEROS DINÂMICOS
let vendas = 0;
let usuarios = 0;

// ELEMENTOS
const vendasEl = document.getElementById("vendas");
const usuariosEl = document.getElementById("usuarios");

// ATUALIZA DADOS
function atualizarDados() {

  vendas += Math.floor(Math.random() * 10);
  usuarios += Math.floor(Math.random() * 5);

  vendasEl.innerText = vendas;
  usuariosEl.innerText = usuarios;
}

// ATUALIZA A CADA 2 SEGUNDOS
setInterval(atualizarDados, 2000);

// TEMA ESCURO
const temaBtn = document.getElementById("temaBtn");

temaBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark");

});