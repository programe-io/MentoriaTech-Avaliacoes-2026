document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feed-form');
    const postInput = document.getElementById('post-input');
    const charCounter = document.getElementById('char-counter');
    const timeline = document.getElementById('timeline');

    // Executa apenas se todos os elementos existirem na tela (Evita erros)
    if (form && postInput && charCounter && timeline) {
        
        // 1. Contador Dinâmico de Caracteres Simples
        postInput.addEventListener('input', () => {
            const remaining = 280 - postInput.value.length;
            charCounter.textContent = remaining;

            if (remaining <= 20) {
                charCounter.style.color = '#e0245e'; // Fica vermelho se estiver acabando
            } else {
                charCounter.style.color = '#536471';
            }
        });

        // 2. Publicação de Novo Post Direta e Segura
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const postText = postInput.value.trim();
            if (!postText) return;

            // Cria o novo elemento de card de forma limpa
            const newCard = document.createElement('article');
            newCard.className = 'feed-card';

            // Monta a estrutura interna tratando o texto contra injeção de scripts perigosos
            newCard.innerHTML = `
                <div class="feed-card-header">
                    <strong>Pethros L.</strong>
                    <span class="feed-card-time">• Agora mesmo</span>
                </div>
                <p class="feed-card-content"></p>
            `;

            // Adiciona o texto de forma segura usando textContent
            newCard.querySelector('.feed-card-content').textContent = postText;

            // Insere o novo post logo no topo da linha do tempo
            timeline.insertBefore(newCard, timeline.firstChild);

            // Reseta o formulário e o contador de caracteres
            form.reset();
            charCounter.textContent = '280';
            charCounter.style.color = '#536471';
        });
    }
});
