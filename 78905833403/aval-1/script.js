// Cria a tag <a>
const link = document.createElement('a');

// Define o endereço e o texto do link
link.href = 'https://www.exemplo.com';
link.textContent = 'Visitar Site';
link.target = '_blank'; // Abre em uma nova aba

// Adiciona o link ao elemento HTML (ex: body)
document.body.appendChild(link);