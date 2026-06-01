// Seleciona o elemento do botão e o elemento do texto
const botao = document.getElementById('meuBotao');
const texto = document.getElementById('meuTexto');

// Adiciona um evento de clique ao botão
botao.addEventListener('click', () => {
    texto.textContent = 'Olá! O JavaScript alterou este texto com sucesso. 🎉';
    texto.style.color = '#007BFF'; // Altera a cor do texto para azul
});