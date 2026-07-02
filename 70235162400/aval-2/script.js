const botao = document.querySelector(".btn");

botao.addEventListener("click", function () {
  alert("Prepare-se para explorar o universo de Dragon Ball!");
});

const links = document.querySelectorAll("nav a");

links.forEach(function (link) {
  link.addEventListener("click", function () {
    console.log("Você clicou em: " + link.textContent);
  });
});