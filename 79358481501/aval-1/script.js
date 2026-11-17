const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

// Abrir e fechar menu
menuBtn.addEventListener("click", function() {
    menu.classList.toggle("active");
    });

    // Fechar menu ao clicar em um link
    const links = document.querySelectorAll(".menu a");

    links.forEach(function(link) {
        link.addEventListener("click", function() {
                menu.classList.remove("active");
                    });
                    });

                    // Atualizar ano automaticamente
                    document.getElementById("year").textContent =
                        new Date().getFullYear();
                        