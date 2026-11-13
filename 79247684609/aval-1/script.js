
// =====================================
// 1. CARREGAMENTO DA PÁGINA
// =====================================

document.addEventListener("DOMContentLoaded", function() {

    console.log("FitBlog carregado com sucesso!");

    alert("Bem-vindo ao FitBlog! Conheça os melhores tipos de treino.");


    // =====================================
    // 2. ANIMAÇÃO DOS CARDS
    // =====================================

    const cards = document.querySelectorAll(".card");

    if ("IntersectionObserver" in window) {

        const observador = new IntersectionObserver(function(entradas) {

            entradas.forEach(function(entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("mostrar");

                    observador.unobserve(entrada.target);

                }

            });

        }, {
            threshold: 0.2
        });

        cards.forEach(function(card) {

            card.classList.add("aparecer");

            observador.observe(card);

        });

    } else {

        cards.forEach(function(card) {
            card.classList.add("mostrar");
        });

    }


    // =====================================
    // 3. CLIQUE NOS CARDS DE TREINO
    // =====================================

    cards.forEach(function(card) {

        card.addEventListener("click", function() {

            const titulo = card.querySelector("h3");

            if (titulo) {

                alert(
                    "Você selecionou: " +
                    titulo.textContent +
                    "\n\nContinue explorando o FitBlog!"
                );

            }

        });

    });


    // =====================================
    // 4. BOTÃO VOLTAR AO TOPO
    // =====================================

    const botaoTopo = document.getElementById("voltarTopo");

    if (botaoTopo) {

        botaoTopo.addEventListener("click", function() {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });


        // =====================================
        // 5. MOSTRAR BOTÃO AO ROLAR A PÁGINA
        // =====================================

        window.addEventListener("scroll", function() {

            if (window.scrollY > 300) {

                botaoTopo.style.display = "block";

            } else {

                botaoTopo.style.display = "none";

            }

        });

    }


    // =====================================
    // 6. ATUALIZAR ANO AUTOMATICAMENTE
    // =====================================

    const elementoAno = document.getElementById("ano");

    if (elementoAno) {

        const anoAtual = new Date().getFullYear();

        elementoAno.textContent = anoAtual;

    }

});
