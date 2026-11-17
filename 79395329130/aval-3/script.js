// Seleciona o link (que estilizamos como botão) e o título da página
const botao = document.querySelector('a');
const titulo = document.querySelector('h1');

// Adiciona um ouvinte de evento para detectar o clique
botao.addEventListener('click', function(evento) {
    // Impede que o link abra outra página imediatamente para vermos o efeito
    evento.preventDefault();

    // Altera o texto do título
    titulo.textContent = 'Você clicou no botão!';

    // Muda a cor de fundo da página
    document.body.style.backgroundColor = '#dff9fb';

    // Exibe um alerta simples na tela
    alert('Interatividade funcionando com JavaScript!');