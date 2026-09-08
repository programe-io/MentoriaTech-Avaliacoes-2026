// 1. Cria o elemento <a>
const meuLink = document.createElement('a');

// 2. Define o endereço de destino (URL)
meuLink.href = 'https://www.w3schools.com';

// 3. Define o texto que aparece no link
meuLink.textContent = 'Visite o site';

// 4. Adiciona o link dentro de um elemento existente na página (ex: um div com ID "container")
document.getElementById('container').appendChild(meuLink);
