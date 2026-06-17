document.addEventListener("DOMContentLoaded", () => {
    const botoes = document.querySelectorAll(".btn-filtro");
    const caixasAnime = document.querySelectorAll(".anime-box");

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            // Remove a classe 'active' de todos os botões para limpar a marcação
            botoes.forEach(b => b.classList.remove("active"));
            
            // Adiciona a classe 'active' apenas no botão que acabou de ser clicado
            botao.classList.add("active");

            const categoriaAlvo = botao.getAttribute("data-categoria");

            caixasAnime.forEach(box => {
                const identificadorAnime = box.getAttribute("data-anime");

                // Filtra as áreas personalizadas na tela com efeito visual limpo
                if (categoriaAlvo === "todos" || identificadorAnime === categoriaAlvo) {
                    box.style.display = "block";
                } else {
                    box.style.display = "none";
                }
            });
        });
    });
});