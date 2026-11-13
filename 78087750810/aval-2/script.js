
/* =====================================
   1. CONFIGURAÇÕES INICIAIS
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Projeto iniciado com sucesso!");

    /* =====================================
       2. MENU DE NAVEGAÇÃO
    ===================================== */

    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.addEventListener("click", event => {
            const destino = link.getAttribute("href");

            if (destino && destino.startsWith("#")) {
                const secao = document.querySelector(destino);

                if (secao) {
                    event.preventDefault();

                    secao.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    /* =====================================
       3. MODO ESCURO E CLARO
    ===================================== */

    const botaoTema = document.querySelector("#botao-tema");

    if (botaoTema) {
        botaoTema.addEventListener("click", () => {
            document.body.classList.toggle("modo-claro");

            const modoClaro = document.body.classList.contains("modo-claro");

            localStorage.setItem("tema", modoClaro ? "claro" : "escuro");

            botaoTema.textContent = modoClaro
                ? "🌙 Modo escuro"
                : "☀️ Modo claro";
        });

        const temaSalvo = localStorage.getItem("tema");

        if (temaSalvo === "claro") {
            document.body.classList.add("modo-claro");
            botaoTema.textContent = "🌙 Modo escuro";
        }
    }

    /* =====================================
       4. BOTÃO TESTE GRÁTIS
    ===================================== */

    const botoesTeste = document.querySelectorAll(".btn-teste");

    botoesTeste.forEach(botao => {
        botao.addEventListener("click", () => {
            alert("Bem-vindo! Seu teste grátis está disponível.");
        });
    });

    /* =====================================
       5. CONTRATAÇÃO DOS PLANOS
    ===================================== */

    const botoesContratar = document.querySelectorAll(".btn-contratar");

    botoesContratar.forEach(botao => {
        botao.addEventListener("click", () => {
            const card = botao.closest(".card");

            const plano = card
                ? card.querySelector("h3")?.textContent
                : "Plano selecionado";

            alert("Você selecionou: " + plano);
        });
    });

    /* =====================================
       6. CALL TO ACTION
    ===================================== */

    const botaoCadastro = document.querySelector("#criar-conta");

    if (botaoCadastro) {
        botaoCadastro.addEventListener("click", () => {
            const nome = prompt("Digite seu nome:");

            if (nome && nome.trim() !== "") {
                alert("Olá, " + nome + "! Seja bem-vindo ao Meu App!");
            } else {
                alert("Cadastro não realizado.");
            }
        });
    }

    /* =====================================
       7. MENU LATERAL DA DASHBOARD
    ===================================== */

    const botoesMenu = document.querySelectorAll(".sidebar a");

    botoesMenu.forEach(botao => {
        botao.addEventListener("click", () => {

            botoesMenu.forEach(item => {
                item.classList.remove("ativo");
            });

            botao.classList.add("ativo");
        });
    });

    /* =====================================
       8. NOTIFICAÇÕES
    ===================================== */

    const botaoNotificacao = document.querySelector("#notificacoes");

    if (botaoNotificacao) {
        botaoNotificacao.addEventListener("click", () => {
            alert("Você não possui novas notificações.");
        });
    }

    /* =====================================
       9. EXIBIR E OCULTAR ELEMENTOS
    ===================================== */

    const botoesOcultar = document.querySelectorAll(".btn-ocultar");

    botoesOcultar.forEach(botao => {
        botao.addEventListener("click", () => {
            const elemento = document.querySelector(
                botao.dataset.alvo
            );

            if (elemento) {
                elemento.classList.toggle("hidden");
            }
        });
    });

    /* =====================================
       10. ATUALIZAR ESTATÍSTICAS
    ===================================== */

    const estatisticas = document.querySelectorAll(".estatistica-card h3");

    estatisticas.forEach(estatistica => {
        const valor = Number(estatistica.dataset.valor);

        if (!Number.isNaN(valor) && estatistica.dataset.valor !== undefined) {
            estatistica.textContent = valor;
        }
    });

    /* =====================================
       11. ANIMAÇÃO DOS CARDS
    ===================================== */

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-5px)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0)";
        });
    });

    /* =====================================
       12. BOTÃO VOLTAR AO TOPO
    ===================================== */

    const voltarTopo = document.querySelector("#voltar-topo");

    if (voltarTopo) {
        voltarTopo.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});
