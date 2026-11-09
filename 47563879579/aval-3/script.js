u
// Curtir publicações
document.querySelectorAll('.like').forEach(icon => {
    icon.addEventListener('click', () => {
        icon.classList.toggle('liked');

        icon.classList.toggle(
            'bx-heart',
            !icon.classList.contains('liked')
        );

        icon.classList.toggle(
            'bxs-heart',
            icon.classList.contains('liked')
        );
    });
});

// Botões de seguir
document.querySelectorAll('.suggestion a').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        if (button.textContent === 'Seguir') {
            button.textContent = 'Seguindo';
        } else {
            button.textContent = 'Seguir';
        }
    });
});

// Botão de salvar publicação
document.querySelectorAll('.bx-bookmark').forEach(icon => {
    icon.addEventListener('click', () => {
        icon.classList.toggle('bxs-bookmark');
        icon.classList.toggle('bx-bookmark');
    });
});

// Pesquisa
const search = document.querySelector('header input');

if (search) {
    search.addEventListener('input', () => {
        console.log('Pesquisando:', search.value);
    });
}
