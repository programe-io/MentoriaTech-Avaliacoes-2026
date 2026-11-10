const link = document.createElement("a");
link.href = "https://go.programe.io/programa-de-mentoria";
link.textContent = "Clique aqui para acessar o Programa de Mentoria";
link.target = "_blank";

document.body.appendChild(link);

link.addEventListener("click", function() {
  console.log("Você clicou no link!");
  });