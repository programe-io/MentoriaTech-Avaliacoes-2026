// ========================================
// CONFIGURAÇÕES INICIAIS
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Site carregado com sucesso!");

    // ========================================
    // ANO AUTOMÁTICO NO RODAPÉ
    // ========================================

    const anoAtual = new Date().getFullYear();
    const rodape = document.querySelector(".footer-bottom p");

    if (rodape) {
        rodape.innerHTML =
            `&copy; ${anoAtual} MeuSite. Todos os direitos reservados.`;
    }


    // ========================================
    // MENU DE NAVEGAÇÃO
    // ========================================

    const links = document.querySelectorAll(".nav-menu a");

    links.forEach(link => {

        link.addEventListener("click", function(event) {

            const destino = this.getAttribute("href");

            if (destino && destino.startsWith("#")) {

                const elemento = document.querySelector(destino);

                if (elemento) {

                    event.preventDefault();

                    elemento.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            }
        });

    });


    // ========================================
    // FORMULÁRIO DE CONTATO
    // ========================================

    const formulario = document.querySelector(".form");

    if (formulario) {

        formulario.addEventListener("submit", function(event) {

            event.preventDefault();

            const nome = document.querySelector("#nome").value.trim();
            const email = document.querySelector("#email").value.trim();
            const assunto = document.querySelector("#assunto").value;
            const mensagem = document.querySelector("#mensagem").value.trim();


            // Verificar nome

            if (nome.length < 3) {

                mostrarMensagem(
                    "Digite um nome válido.",
                    "erro"
                );

                return;
            }


            // Verificar email

            if (!validarEmail(email)) {

                mostrarMensagem(
                    "Digite um email válido.",
                    "erro"
                );

                return;
            }


            // Verificar assunto

            if (assunto === "") {

                mostrarMensagem(
                    "Selecione um assunto.",
                    "erro"
                );

                return;
            }


            // Verificar mensagem

            if (mensagem.length < 10) {

                mostrarMensagem(
                    "A mensagem deve ter pelo menos 10 caracteres.",
                    "erro"
                );

                return;
            }


            // Formulário válido

            mostrarMensagem(
                `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`,
                "sucesso"
            );

            formulario.reset();

        });

    }


    // ========================================
    // FUNÇÃO PARA VALIDAR EMAIL
    // ========================================

    function validarEmail(email) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);

    }


    // ========================================
    // SISTEMA DE MENSAGENS
    // ========================================

    function mostrarMensagem(texto, tipo) {

        const mensagemAntiga =
            document.querySelector(".mensagem-js");

        if (mensagemAntiga) {
            mensagemAntiga.remove();
        }


        const mensagem =
            document.createElement("div");

        mensagem.classList.add("mensagem-js");


        if (tipo === "sucesso") {

            mensagem.style.backgroundColor = "#dcfce7";
            mensagem.style.color = "#166534";

        } else {

            mensagem.style.backgroundColor = "#fee2e2";
            mensagem.style.color = "#991b1b";

        }


        mensagem.style.padding = "15px";
        mensagem.style.marginBottom = "20px";
        mensagem.style.borderRadius = "8px";
        mensagem.style.fontWeight = "bold";


        mensagem.textContent = texto;


        if (formulario) {
            formulario.prepend(mensagem);
        }


        // Remover mensagem depois de 5 segundos

        setTimeout(() => {

            mensagem.style.opacity = "0";
            mensagem.style.transition = "0.5s";

            setTimeout(() => {
                mensagem.remove();
            }, 500);

        }, 5000);

    }


    // ========================================
    // ANIMAÇÃO DOS CARDS
    // ========================================

    const cards =
        document.querySelectorAll(".card");


    const observador =
        new IntersectionObserver((elementos) => {

            elementos.forEach(elemento => {

                if (elemento.isIntersecting) {

                    elemento.target.style.opacity = "1";
                    elemento.target.style.transform =
                        "translateY(0)";

                }

            });

        }, {
            threshold: 0.2
        });


    cards.forEach(card => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(30px)";

        card.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observador.observe(card);

    });


    // ========================================
    // EFEITO NO CABEÇALHO AO ROLAR
    // ========================================

    const header =
        document.querySelector("header");


    window.addEventListener("scroll", () => {

        if (!header) return;


        if (window.scrollY > 50) {

            header.style.backgroundColor =
                "#020617";

            header.style.transition =
                "0.3s";

        } else {

            header.style.backgroundColor =
                "#111827";

        }

    });


    // ========================================
    // BOTÃO "VOLTAR AO TOPO"
    // ========================================

    const botaoTopo =
        document.createElement("button");

    botaoTopo.textContent = "↑";

    botaoTopo.setAttribute(
        "aria-label",
        "Voltar ao topo"
    );


    botaoTopo.style.position = "fixed";
    botaoTopo.style.bottom = "25px";
    botaoTopo.style.right = "25px";
    botaoTopo.style.width = "50px";
    botaoTopo.style.height = "50px";
    botaoTopo.style.border = "none";
    botaoTopo.style.borderRadius = "50%";
    botaoTopo.style.backgroundColor = "#0284c7";
    botaoTopo.style.color = "white";
    botaoTopo.style.fontSize = "25px";
    botaoTopo.style.cursor = "pointer";
    botaoTopo.style.display = "none";
    botaoTopo.style.zIndex = "999";


    document.body.appendChild(botaoTopo);


    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            botaoTopo.style.display = "block";

        } else {

            botaoTopo.style.display = "none";

        }

    });


    botaoTopo.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // ========================================
    // CONTADOR DE CARACTERES
    // ========================================

    const campoMensagem =
        document.querySelector("#mensagem");


    if (campoMensagem) {

        const contador =
            document.createElement("small");

        contador.style.display = "block";
        contador.style.marginTop = "5px";
        contador.style.color = "#6b7280";


        campoMensagem.parentNode.appendChild(contador);


        campoMensagem.addEventListener("input", () => {

            const quantidade =
                campoMensagem.value.length;

            contador.textContent =
                `${quantidade} caracteres`;

        });

    }


    // ========================================
    // EFEITO DE DIGITAÇÃO
    // ========================================

    const titulo =
        document.querySelector(".hero h1");


    if (titulo) {

        const textoOriginal =
            titulo.textContent.trim();

        titulo.textContent = "";

        let indice = 0;


        function escrever() {

            if (indice < textoOriginal.length) {

                titulo.textContent +=
                    textoOriginal.charAt(indice);

                indice++;

                setTimeout(escrever, 70);

            }

        }


        escrever();

    }

});