<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Avaliações - Papelaria Art & Papel</title>
    <style>
        :root {
            --primary: #6c5ce7;
            --secondary: #a29bfe;
            --dark: #2d3436;
            --light: #f9f9fb;
            --star: #ffeaa7;
            --star-active: #fdcb6e;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--light);
            color: var(--dark);
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
        }

        .container {
            width: 100%;
            max-width: 600px;
            background: #fff;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        h1 {
            text-align: center;
            color: var(--primary);
            margin-bottom: 30px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
        }

        input, textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #dfe6e9;
            border-radius: 8px;
            box-sizing: border-box;
            font-family: inherit;
            transition: border-color 0.3s;
        }

        input:focus, textarea:focus {
            outline: none;
            border-color: var(--primary);
        }

        .stars-rating {
            display: flex;
            gap: 8px;
            font-size: 2rem;
            cursor: pointer;
        }

        .star {
            color: var(--star);
            transition: color 0.2s;
        }

        .star.active {
            color: var(--star-active);
        }

        button {
            width: 100%;
            background-color: var(--primary);
            color: white;
            border: none;
            padding: 14px;
            font-size: 1rem;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.3s;
        }

        button:hover {
            background-color: #5b4cc4;
        }

        .reviews-section {
            margin-top: 40px;
            border-top: 2px solid #eee;
            padding-top: 20px;
        }

        .review-card {
            background: #fafafa;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            border-left: 5px solid var(--primary);
        }

        .review-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        .review-name {
            font-weight: bold;
        }

        .review-stars {
            color: var(--star-active);
        }

        .review-text {
            margin: 0;
            color: #636e72;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>📝 Avaliações da Papelaria</h1>
    
    <!-- Formulário de Avaliação -->
    <form id="reviewForm">
        <div class="form-group">
            <label for="clientName">Seu Nome:</label>
            <input type="text" id="clientName" required placeholder="Ex: Maria Silva">
        </div>

        <div class="form-group">
            <label>Sua Nota:</label>
            <div class="stars-rating" id="starContainer">
                <span class="star" data-value="1">★</span>
                <span class="star" data-value="2">★</span>
                <span class="star" data-value="3">★</span>
                <span class="star" data-value="4">★</span>
                <span class="star" data-value="5">★</span>
            </div>
        </div>

        <div class="form-group">
            <label for="clientComment">Seu Comentário:</label>
            <textarea id="clientComment" rows="4" required placeholder="O que achou dos nossos cadernos, canetas e atendimento?"></textarea>
        </div>

        <button type="submit">Enviar Avaliação</button>
    </form>

    <!-- Lista de Avaliações -->
    <div class="reviews-section">
        <h2>O que os clientes dizem:</h2>
        <div id="reviewsContainer"></div>
    </div>
</div>

<script>
    // Gerenciador do Sistema de Avaliações (POO Moderna)
    class ReviewSystem {
        constructor() {
            this.reviews = JSON.parse(localStorage.getItem('papelaria_reviews')) || [];
            this.selectedRating = 0;
            
            // Elementos do DOM
            this.form = document.getElementById('reviewForm');
            this.nameInput = document.getElementById('clientName');
            this.commentInput = document.getElementById('clientComment');
            this.starContainer = document.getElementById('starContainer');
            this.reviewsContainer = document.getElementById('reviewsContainer');

            this.init();
        }

        init() {
            // Eventos das Estrelas
            this.starContainer.addEventListener('click', (e) => this.handleStarSelection(e));
            
            // Evento do Formulário
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            // Renderização Inicial
            this.renderReviews();
        }

        handleStarSelection(e) {
            if (e.target.classList.contains('star')) {
                this.selectedRating = parseInt(e.target.getAttribute('data-value'));
                this.updateStarDOM();
            }
        }

        updateStarDOM() {
            const stars = this.starContainer.querySelectorAll('.star');
            stars.forEach(star => {
                const value = parseInt(star.getAttribute('data-value'));
                star.classList.toggle('active', value <= this.selectedRating);
            });
        }

        handleSubmit(e) {
            e.preventDefault();

            if (this.selectedRating === 0) {
                alert('Por favor, selecione uma nota usando as estrelas!');
                return;
            }

            const newReview = {
                id: Date.now(),
                name: this.nameInput.value.trim(),
                comment: this.commentInput.value.trim(),
                rating: this.selectedRating
            };

            this.reviews.unshift(newReview); // Adiciona no início da lista
            this.saveToStorage();
            this.renderReviews();
            this.resetForm();
        }

        saveToStorage() {
            localStorage.setItem('papelaria_reviews', JSON.stringify(this.reviews));
        }

        resetForm() {
            this.form.reset();
            this.selectedRating = 0;
            this.updateStarDOM();
        }

        renderReviews() {
            if (this.reviews.length === 0) {
                this.reviewsContainer.innerHTML = '<p style="color: #999;">Nenhuma avaliação ainda. Seja o primeiro!</p>';
                return;
            }

            this.reviewsContainer.innerHTML = this.reviews.map(review => `
                <div class="review-card">
                    <div class="review-header">
                        <span class="review-name">${this.escapeHTML(review.name)}</span>
                        <span class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
                    </div>
                    <p class="review-text">${this.escapeHTML(review.comment)}</p>
                </div>
            `).join('');
        }

        // Proteção básica contra ataques XSS
        escapeHTML(str) {
            return str.replace(/[&<>'"]/g, 
                tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
            );
        }
    }

    // Inicializa o sistema quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', () => {
        new ReviewSystem();
    });
</script>

</body>
</html>
