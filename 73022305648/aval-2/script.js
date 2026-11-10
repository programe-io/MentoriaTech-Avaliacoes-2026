// Cria o link
let link = document.createElement("a");
link.href = "https://www.youtube.com";
link.textContent = "Clique aqui para ir para o YouTube";
link.target = "_blank";

// Quando clicar, mostra um aviso
link.addEventListener("click", function() {
  alert("Você vai para o YouTube!");
  });

  // Coloca o link na tela
  document.body.appendChild(link);