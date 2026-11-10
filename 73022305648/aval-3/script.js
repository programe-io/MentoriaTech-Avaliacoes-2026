// Cria o link
let link = document.createElement("a");
link.href = "https://www.youtube.com";
link.textContent = "Ir para o YouTube";
link.target = "_blank";

// Coloca o link na tela
document.body.appendChild(link);