document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab-btn");
    const topicsContainer = document.getElementById("topics-container");
    const form = document.getElementById("new-topic-form");

    // 1. SISTEMA DE ABAS (FILTRAR POR GERAÇÃO)
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove classe ativa de todos e adiciona no clicado
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const genFilter = tab.getAttribute("data-gen");
            const cards = document.querySelectorAll(".topic-card");

            cards.forEach(card => {
                const cardGen = card.getAttribute("data-generation");
                if (genFilter === "all" || cardGen === genFilter) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 2. SISTEMA DE CURTIDAS (BOTÃO DE INCÊNDIO 🔥)
    topicsContainer.addEventListener("click", (e) => {
        // Encontra o botão de curtir mais próximo, caso clique no emoji ou número
        const likeBtn = e.target.closest(".like-btn");
        if (!likeBtn) return;

        const countSpan = likeBtn.querySelector(".like-count");
        let currentLikes = parseInt(countSpan.textContent);
        
        // Simulação simples de Toggle (Adiciona ou tira 1 curtida)
        if (likeBtn.classList.contains("liked")) {
            likeBtn.classList.remove("liked");
            likeBtn.style.background = "#2a2a2a";
            countSpan.textContent = currentLikes - 1;
        } else {
            likeBtn.classList.add("liked");
            likeBtn.style.background = "#ff5500";
            countSpan.textContent = currentLikes + 1;
        }
    });

    // 3. ADICIONAR NOVO TÓPICO DINAMICAMENTE
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("topic-title").value;
        const gen = document.getElementById("topic-gen").value;
        const user = document.getElementById("topic-user").value;

        // Formata o nome da label baseado no valor selecionado
        const genLabelMap = {
            'gen1': 'Geração 1',
            'gen2': 'Geração 2',
            'gen3': 'Geração 3'
        };

        // Cria a estrutura HTML do novo elemento de tópico
        const newCard = document.createElement("article");
        newCard.classList.add("topic-card");
        newCard.setAttribute("data-generation", gen);
        
        // Define a borda esquerda com base na geração para combinar com o CSS
        if(gen === 'gen1') newCard.style.borderLeftColor = '#ff0055';
        if(gen === 'gen2') newCard.style.borderLeftColor = '#00a2ff';
        if(gen === 'gen3') newCard.style.borderLeftColor = '#b500ff';

        newCard.innerHTML = `
            <div class="topic-info">
                <span class="badge ${gen}">${genLabelMap[gen]}</span>
                <h3>${title}</h3>
                <p>Iniciado por <strong>${user.startsWith('@') ? user : '@' + user}</strong> &bull; Agora mesmo</p>
            </div>
            <div class="topic-stats">
                <span>💬 0 respostas</span>
                <button class="like-btn">🔥 <span class="like-count">0</span></button>
            </div>
        `;

        // Adiciona no topo da lista e limpa o formulário
        topicsContainer.prepend(newCard);
        form.reset();

        // Volta o filtro para "Todas as Eras" para garantir que o novo post apareça
        document.querySelector('[data-gen="all"]').click();
    });
});
