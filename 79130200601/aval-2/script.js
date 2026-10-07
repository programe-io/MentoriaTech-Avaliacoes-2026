// Seleciona todos os botões de Curtir
const likeButtons = document.querySelectorAll('.btn-like');
const publishButton = document.getElementById('btn-publish');

// Adiciona funcionalidade aos botões de Curtir
likeButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Alterna a cor para indicar que foi curtido
        if (this.style.color === 'blue') {
            this.style.color = '#65676b';
            this.textContent = 'Curtir';
        } else {
            this.style.color = 'blue';
            this.textContent = 'Descurtir';
        }
    });
});

// Funcionalidade simples para o botão Publicar
if (publishButton) {
    publishButton.addEventListener('click', () => {
        alert('Funcionalidade de publicação seria implementada aqui!');
    });
}

console.log('Mini Feed carregado com sucesso!');