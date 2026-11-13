
// BLOG PESSOAL - GENIVAL FILHO
// USERNAME: @filhow

// Mensagem de boas-vindas
document.addEventListener("DOMContentLoaded", () => {

    console.log("Bem-vindo ao blog de Genival Filho!");

    // Atualizar ano automaticamente no rodapé
    const ano = document.getElementById("ano");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

    // Efeito de entrada nas seções
    const secoes = document.querySelectorAll(
        ".profile, section"
    );

    secoes.forEach((secao, index) => {
        secao.style.opacity = "0";
        secao.style.transform = "translateY(20px)";

        setTimeout(() => {
            secao.style.transition = "all 0.7s ease";
            secao.style.opacity = "1";
            secao.style.transform = "translateY(0)";
        }, 200 * index);
    });

    // Destaque da música em reprodução
    const players = document.querySelectorAll("audio");

    players.forEach(player => {

        player.addEventListener("play", () => {
            players.forEach(outroPlayer => {
                if (outroPlayer !== player) {
                    outroPlayer.pause();
                }
            });
        });

    });

    // Mensagem ao clicar nos links sociais
    const links = document.querySelectorAll(".social a");

    links.forEach(link => {
        link.addEventListener("click", (event) => {

            if (link.getAttribute("href") === "#") {
                event.preventDefault();
                alert("Link ainda não configurado!");
            }

        });
    });

});
