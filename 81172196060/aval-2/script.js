// BOTÃO

const botao = document.getElementById(
  "btnMensagem"
);

// EVENTO

botao.addEventListener("click", function() {

  alert(
    "Olá! Você clicou no botão."
  );

});

// MENSAGEM NO CONSOLE

console.log(
  "Projeto carregado com sucesso!"
);

// ALTERAR TÍTULO APÓS 3 SEGUNDOS

setTimeout(() => {

  document.querySelector("h1").innerText =
    "Projeto Atualizado";

}, 3000);