```javascript
// ==========================================
// MENU MOBILE
// ==========================================

function abrirMenu() {
    const menu = document.querySelector("nav");

    if (menu) {
        menu.classList.toggle("ativo");
    }
}


// ==========================================
// AGENDAMENTO PELO WHATSAPP
// ==========================================

function agendar() {

    // TROQUE PELO SEU NÚMERO
    // Formato: 55 + DDD + número
    const telefone = "5586999999999";

    const mensagem =
        "Olá! 💅💕 Gostaria de agendar um horário no Encanto das Unhas.";

    const url =
        "https://wa.me/" +
        telefone +
        "?text=" +
        encodeURIComponent(mensagem);

    window.open(url, "_blank");
}


// ==========================================
// ANIMAÇÃO DOS CARDS
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".card");

    // Verifica se existem cards na página
    if (cards.length > 0) {

        cards.forEach(function (card) {

            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
            card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

        });


        // Verifica se o navegador suporta IntersectionObserver
        if ("IntersectionObserver" in window) {

            const observador = new IntersectionObserver(
                function (entradas) {

                    entradas.forEach(function (entrada) {

                        if (entrada.isIntersecting) {

                            entrada.target.style.opacity = "1";
                            entrada.target.style.transform = "translateY(0)";

                            observador.unobserve(entrada.target);
                        }

                    });

                },
                {
                    threshold: 0.2
                }
            );


            cards.forEach(function (card) {
                observador.observe(card);
            });

        } else {

            // Caso o navegador não suporte a animação
            cards.forEach(function (card) {

                card.style.opacity = "1";
                card.style.transform = "translateY(0)";

            });

        }
    }
});


// ==========================================
// GALERIA INTERATIVA
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const fotos = document.querySelectorAll(".foto");

    fotos.forEach(function (foto) {

        foto.addEventListener("click", function () {

            const nomeElemento = foto.querySelector("p");

            if (nomeElemento) {

                const nome = nomeElemento.textContent;

                alert(
                    "💅 Modelo selecionado: " +
                    nome +
                    "\n\nEntre em contato para solicitar esse estilo!"
                );

            }

        });

    });

});


// ==========================================
// FECHAR MENU AO CLICAR EM UM LINK
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const links = document.querySelectorAll("nav a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            const menu = document.querySelector("nav");

            if (menu) {
                menu.classList.remove("ativo");
            }

        });

    });

});


// ==========================================
// MENSAGEM NO CONSOLE
// ==========================================

console.log("💖 Encanto das Unhas carregado com sucesso!");
```
