const botaoTema = document.getElementById('btn-tema');

botaoTema.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Exemplo de interatividade ao clicar nas imagens
const imagens = document.querySelectorAll('.card img');

imagens.forEach(img => {
    img.addEventListener('click', () => {
        alert(`Você clicou na imagem: ${img.alt}`);
    });
});