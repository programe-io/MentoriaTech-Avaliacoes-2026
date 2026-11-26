// Mensagem de boas-vindas
window.addEventListener("load", function() {
    console.log("Bem-vindo ao meu perfil!");
    });

    // Efeito nas habilidades
    const habilidades = document.querySelectorAll(".tag");

    habilidades.forEach(function(tag) {
        tag.addEventListener("click", function() {
                alert("Você clicou em: " + tag.textContent);
                    });
                    });

                    // Mensagem no rodapé
                    const footer = document.querySelector("footer");

                    footer.addEventListener("click", function() {
                        alert("Obrigado por visitar meu perfil!");
                        });