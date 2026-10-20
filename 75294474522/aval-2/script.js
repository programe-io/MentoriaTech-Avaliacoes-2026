console.log("Projeto Flexbox funcionando!");

document.querySelectorAll(".caixa").forEach(function(caixa) {
  caixa.addEventListener("click", function() {
    alert("Você clicou em " + caixa.textContent);
  });
});