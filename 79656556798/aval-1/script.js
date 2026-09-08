// 1. Cria o elemento <a>
const meuLink = document.createElement("a");

// 2. Define o endereço do link
meuLink.href = "https://google.com";

// 3. Define o texto que aparece no link
meuLink.textContent = "Acessar o Google";

// 4. Adiciona o link dentro de uma div existente no HTML
document.getElementById("container").appendChild(meuLink);
