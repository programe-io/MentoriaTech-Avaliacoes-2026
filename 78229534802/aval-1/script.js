const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const evaluationModal = document.getElementById('evaluationModal');

// Abrir modal
openModalBtn.addEventListener('click', () => {
    evaluationModal.style.display = 'flex';
    });

    // Fechar modal
    closeModalBtn.addEventListener('click', () => {
        evaluationModal.style.display = 'none';
        });

        // Fechar ao clicar fora do conteúdo do modal
        window.addEventListener('click', (e) => {
            if (e.target === evaluationModal) {
                    evaluationModal.style.display = 'none';
                        }
                        });
                        