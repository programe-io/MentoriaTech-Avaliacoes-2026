// Cria o link
let link = document.createElement("a");
link.href = "https://www.google.com";
link.textContent = "Clique aqui para ir para o Google";
link.target = "_blank";

// Coloca o link na tela
document.body.appendChild(link);