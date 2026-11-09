document.addEventListener("DOMContentLoaded", () => {
    // Seleciona o container pai de todo o feed (main) para usar delegação de eventos
    const feed = document.querySelector("main");

    if (!feed) return;

    // 1. Ouvinte Global de Cliques (Delegação de Eventos)
    feed.addEventListener("click", (event) => {
        // Encontra o botão clicado ou o botão pai (caso o clique tenha sido em cima do ícone <i>)
        const targetButton = event.target.closest("button[data-action]");
        if (!targetButton) return;

        const action = targetButton.dataset.action;
        const postCard = targetButton.closest("article");

        if (action === "like") {
            handleLikeToggle(targetButton, postCard);
        } else if (action === "save") {
            handleSaveToggle(targetButton);
        }
    });

    // 2. Ouvinte Global para Clique Duplo (Double Tap nas Imagens)
    feed.addEventListener("dblclick", (event) => {
        const mediaContainer = event.target.closest("[data-component='media']");
        if (!mediaContainer) return;

        const postCard = mediaContainer.closest("article");
        const likeButton = postCard.querySelector("button[data-action='like']");

        // Executa a animação visual do coração pulando na tela
        triggerPopupHeart(mediaContainer);

        // Se o post ainda não estiver curtido, simula o clique de curtir
        if (likeButton && !likeButton.classList.contains("is-active")) {
            handleLikeToggle(likeButton, postCard);
        }
    });

    // Lógica para Alternar Curtida e Atualizar Contador Simulado
    function handleLikeToggle(button, post) {
        const icon = button.querySelector("i");
        const countElement = post.querySelector("[data-component='like-count']");
        
        button.classList.toggle("is-active");

        if (button.classList.contains("is-active")) {
            // Transforma o ícone em preenchido e muda a cor via Tailwind/CSS dinâmico
            icon.className = "bx bxs-heart text-red-500 scale-110 transition-transform";
            if (countElement) countElement.textContent = "1.001 curtidas";
        } else {
            // Retorna ao ícone de linha padrão
            icon.className = "bx bx-heart text-slate-900";
            if (countElement) countElement.textContent = "mil e poucas curtidas";
        }

        // Remove o efeito de pulo após a animação terminar
        setTimeout(() => icon.classList.remove("scale-110"), 200);
    }

    // Lógica para Alternar o Botão Salvar
    function handleSaveToggle(button) {
        const icon = button.querySelector("i");
        button.classList.toggle("is-active");

        if (button.classList.contains("is-active")) {
            icon.className = "bx bxs-bookmark text-slate-900";
        } else {
            icon.className = "bx bx-bookmark text-slate-900";
        }
    }

    // Gerador de Animação do Coração (Estilo Flash Pop-up)
    function triggerPopupHeart(container) {
        const heartOverlay = document.createElement("div");
        
        // Estilização minimalista injetada diretamente para a animação disparar isolada
        heartOverlay.innerHTML = `<i class='bx bxs-heart' style='font-size: 80px; color: #fff; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));'></i>`;
        heartOverlay.className = "absolute inset-0 flex items-center justify-center pointer-events-none z-10 animate-ping opacity-0";
        heartOverlay.style.transition = "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

        container.appendChild(heartOverlay);

        // Frame 1: Aparece e expande
        requestAnimationFrame(() => {
            heartOverlay.classList.remove("opacity-0");
            heartOverlay.classList.add("opacity-100", "scale-110");
        });

        // Frame 2: Some e se destrói
        setTimeout(() => {
            heartOverlay.classList.replace("opacity-100", "opacity-0");
            heartOverlay.classList.remove("scale-110");
            setTimeout(() => heartOverlay.remove(), 400);
        }, 500);
    }
});
