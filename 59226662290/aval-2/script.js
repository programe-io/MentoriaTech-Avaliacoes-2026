// Aguarda o carregamento da página
document.addEventListener("DOMContentLoaded", () => {
    // Atualiza o ano automaticamente no rodapé
    const ano = document.getElementById("ano");
    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

    // Mensagens rotativas no destaque
    const destaque = document.getElementById("destaque");
    const mensagens = [
        "Nova Coleção 2026",
        "Tendências que inspiram você",
        "Moda com elegância e estilo",
        "Descubra seu novo visual"
    ];

    let indice = 0;

    if (destaque) {
        setInterval(() => {
            indice = (indice + 1) % mensagens.length;
            destaque.textContent = mensagens[indice];
        }, 3000);
    }

    // Botão "Ver Coleção"
    const botao = document.querySelector(".botao");

    if (botao) {
        botao.addEventListener("click", (event) => {
            event.preventDefault();

            alert(
                "👗 Bem-vindo à nossa coleção!\n\n" +
                "Explore as últimas tendências e encontre o estilo perfeito para você."
            );
        });
    }

    // Efeito ao passar o mouse sobre os cards
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.03)";
            card.style.transition = "transform 0.3s ease";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });
    });
});