
// ==========================================
// FINANCE - JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // Atualizar ano automaticamente no rodapé
    const ano = document.querySelector(".copyright");

    if (ano) {
        ano.innerHTML = `© ${new Date().getFullYear()} FINANCE. Todos os direitos reservados.`;
    }

    // Rolagem suave dos links do menu
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (event) {
            const destino = document.querySelector(this.getAttribute("href"));

            if (destino) {
                event.preventDefault();

                destino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Animação de entrada das seções
    const elementos = document.querySelectorAll(
        ".sobre, .investimentos, .dicas, .planejamento, .contato, .card, .dica"
    );

    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver((entradas, observer) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("aparecer");
                    observer.unobserve(entrada.target);
                }
            });
        }, {
            threshold: 0.12
        });

        elementos.forEach(elemento => {
            observador.observe(elemento);
        });
    } else {
        elementos.forEach(elemento => elemento.classList.add("aparecer"));
    }

    // Efeito nos cartões de investimentos
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-10px) scale(1.02)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    // Botão de contato
    const formulario = document.querySelector("#formContato");

    if (formulario) {
        formulario.addEventListener("submit", event => {
            event.preventDefault();
            alert("Mensagem enviada! Obrigado por entrar em contato com a FINANCE.");
            formulario.reset();
        });
    }

    // Menu para celular
    const menu = document.querySelector(".menu");

    if (menu) {
        menu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("menu-aberto");
            });
        });
    }

    // Efeito de destaque no cabeçalho ao rolar
    const cabecalho = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (cabecalho) {
            cabecalho.classList.toggle("rolagem", window.scrollY > 50);
        }
    });

    // ==========================================
    // CALCULADORA DE INVESTIMENTOS
    // ==========================================

    const botaoCalcular = document.querySelector("#calcularInvestimento");

    if (botaoCalcular) {
        botaoCalcular.addEventListener("click", calcularInvestimento);
    }

    function calcularInvestimento() {
        const valorInicial = Number(
            document.querySelector("#valorInicial")?.value
        );

        const aporteMensal = Number(
            document.querySelector("#aporteMensal")?.value
        );

        const taxaAnual = Number(
            document.querySelector("#taxaAnual")?.value
        );

        const anos = Number(
            document.querySelector("#tempoInvestimento")?.value
        );

        const resultado = document.querySelector("#resultadoInvestimento");

        if (!resultado) return;

        if (
            !Number.isFinite(valorInicial) ||
            !Number.isFinite(aporteMensal) ||
            !Number.isFinite(taxaAnual) ||
            !Number.isFinite(anos) ||
            valorInicial < 0 ||
            aporteMensal < 0 ||
            taxaAnual < 0 ||
            anos <= 0 ||
            valorInicial + aporteMensal + anos <= 0
        ) {
            resultado.textContent = "Preencha os campos com valores válidos.";
            return;
        }

        if (anos > 100 || taxaAnual > 1000) {
            resultado.textContent = "Confira os valores informados.";
            return;
        }

        const meses = Math.round(anos * 12);
        const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;

        let montante = valorInicial;

        for (let mes = 1; mes <= meses; mes++) {
            montante = montante * (1 + taxaMensal) + aporteMensal;
        }

        const totalInvestido = valorInicial + aporteMensal * meses;
        const rendimento = montante - totalInvestido;

        const moeda = valor => valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        resultado.innerHTML = `
            <h3>Resultado da simulação</h3>
            <p><strong>Valor final estimado:</strong> ${moeda(montante)}</p>
            <p><strong>Total investido:</strong> ${moeda(totalInvestido)}</p>
            <p><strong>Rendimento estimado:</strong> ${moeda(rendimento)}</p>
            <small>Simulação ilustrativa, sem considerar impostos, taxas ou inflação. Rentabilidade não garantida.</small>
        `;
    }

});
