// Muda o texto quando o botão é clicado
const botao = document.getElementById('meuBotao');
const titulo = document.getElementById('titulo');

botao.addEventListener('click', function() {
    alert('Você clicou no botão! 🎉');
    titulo.textContent = 'Olá! Bem-vindo!';
});