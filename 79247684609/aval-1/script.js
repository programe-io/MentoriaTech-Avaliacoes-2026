// ESPERAR O HTML CARREGAR
document.addEventListener("DOMContentLoaded", function() {

    // 1. MENSAGEM DE BOAS-VINDAS
    console.log("Bem-vindo ao FitBlog!");

    alert("Bem-vindo ao FitBlog! Conheça os melhores tipos de treino.");


    // 2. ANIMAÇÃO DOS CARDS
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


    // 3. CLIQUE NOS CARDS
    cards.forEach(function(card) {

        card.addEventListener("click", function() {

            const titulo = card.querySelector("h3");

            if (titulo) {
                alert("Você selecionou: " + titulo.textContent +
                "\nContinue explorando o FitBlog!");
            }

        });

    });


    // 4. BOTÃO VOLTAR AO TOPO
    const botaoTopo = document.createElement("button");

    botaoTopo.textContent = "↑";
    botaoTopo.id = "voltarTopo";
    botaoTopo.setAttribute("aria-label", "Voltar ao topo");

    document.body.appendChild(botaoTopo);


    // 5. CLIQUE NO BOTÃO
    botaoTopo.addEventListener("click", function() {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // 6. MOSTRAR BOTÃO AO ROLAR A PÁGINA
    window.addEventListener("scroll", function() {

        if (window.scrollY > 300) {
            botaoTopo.style.display = "block";
        } else {
            botaoTopo.style.display = "none";
        }

    });


    // 7. ATUALIZAR ANO DO RODAPÉ
    const ano = new Date().getFullYear();

    const rodape = document.querySelector("footer p");

    if (rodape) {
        rodape.innerHTML = "© " + ano +
        ' <span>FitBlog</span> - Todos os direitos reservados.';
    }

});