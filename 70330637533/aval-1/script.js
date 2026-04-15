document.getElementById('book-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Capturando valores
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const rating = document.getElementById('rating').value;
    const review = document.getElementById('review').value;

    // Criar o card do livro
    addBookToGrid(title, author, rating, review);

    // Limpar formulário
    this.reset();
});

function addBookToGrid(title, author, rating, review) {
    const container = document.getElementById('books-container');

    const card = document.createElement('div');
    card.classList.add('book-card');

    card.innerHTML = `
        <h3>${title}</h3>
        <p><strong>Autor:</strong> ${author}</p>
        <span class="rating-tag">⭐ ${rating}/5</span>
        <p class="review-text">"${review}"</p>
    `;

    container.prepend(card); // Adiciona o livro no topo da lista
}