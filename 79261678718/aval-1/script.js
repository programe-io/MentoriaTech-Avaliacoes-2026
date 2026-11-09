---

### 3. Novo Código JavaScript (`script.js`)

```javascript
// --- SISTEMA DE FILTRO ULTRA COLORIDO ---
const filterButtons = document.querySelectorAll('.btn-tag');
const cards = document.querySelectorAll('.card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Altera estados visuais das tags ativos
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        cards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-fairy') === filterValue) {
                card.style.display = 'flex';
                card.style.animation = 'scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// --- CONTROLO DOS PORTAIS DE LEITURA (MODAL) ---
function openPost(postId) {
    const databaseElement = document.getElementById(postId);
    if (databaseElement) {
        const content = databaseElement.innerHTML;
        document.getElementById('modalTarget').innerHTML = content;
        
        const modalOverlay = document.getElementById('modalOverlay');
        modalOverlay.style.display = 'flex';
        
        // Aplica uma animação explosiva de cor na abertura do modal
        const modalContent = modalOverlay.querySelector('.modal-content');
        modalContent.style.animation = 'scaleUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
    }
}

function closeModal(event) {
    // Só fecha se clicar estritamente fora da caixa do pergaminho
    if (event.target.id === 'modalOverlay') {
        document.getElementById('modalOverlay').style.display = 'none';
    }