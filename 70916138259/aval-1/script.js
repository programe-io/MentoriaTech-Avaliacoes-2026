<!-- Lógica Interativa de Acabamento e Performance -->
<script>
    document.addEventListener("DOMContentLoaded", () => {
        
        // ==========================================
        // 1. FECHAR OUTRAS ABAS AUTOMATICAMENTE (ACORDEÃO)
        // ==========================================
        const todosDetails = document.querySelectorAll("main details");

        todosDetails.forEach((item) => {
            // Escuta o clique no botão de expansão (summary)
            item.querySelector("summary").addEventListener("click", (e) => {
                // Se a aba já estiver aberta, deixa o navegador fechar normalmente
                if (item.hasAttribute("open")) return;

                // Caso contrário, fecha todas as outras abas antes de abrir a atual
                todosDetails.forEach((outroItem) => {
                    if (outroItem !== item) {
                        outroItem.removeAttribute("open");
                    }
                });
            });
        });

        // ==========================================
        // 2. CRIAR E CONTROLAR A BARRA DE PROGRESSO
        // ==========================================
        // Cria dinamicamente o elemento visual no topo da página
        const barraProgresso = document.createElement("div");
        barraProgresso.style.position = "fixed";
        barraProgresso.style.top = "0";
        barraProgresso.style.left = "0";
        barraProgresso.style.height = "5px";
        barraProgresso.style.backgroundColor = "#ccff00"; // Amarelo Neon do tema
        barraProgresso.style.width = "0%";
        barraProgresso.style.zIndex = "9999";
        barraProgresso.style.transition = "width 0.1s ease-out";
        document.body.appendChild(barraProgresso);

        // Atualiza a largura da barra com base no scroll do utilizador
        window.addEventListener("scroll", () => {
            const pixelScroolado = window.scrollY;
            const alturaTotalJanela = document.documentElement.scrollHeight - window.innerHeight;
            
            if (alturaTotalJanela > 0) {
                const percentagem = (pixelScroolado / alturaTotalJanela) * 100;
                barraProgresso.style.width = `${percentagem}%`;
            }
        });

        // ==========================================
        // 3. ANIMAÇÃO SCROLL REVEAL (EFEITO DE CARGA)
        // ==========================================
        // Configura o observador para detetar quando os elementos entram no ecrã
        const observadorOpcoes = {
            root: null,
            threshold: 0.15 // Ativa quando 15% do elemento está visível
        };

        const observador = new IntersectionObserver((entradas, observador) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    // Adiciona os estilos de animação diretamente no elemento
                    entrada.target.style.opacity = "1";
                    entrada.target.style.transform = "translateY(0)";
                    entrada.target.style.transition = "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
                    // Desliga o observador para este elemento já animado
                    observador.unobserve(entrada.target);
                }
            });
        }, observadorOpcoes);

        // Aplica o estado inicial escondido e começa a observar os blocos
        todosDetails.forEach(elemento => {
            elemento.style.opacity = "0";
            elemento.style.transform = "translateY(30px)";
            observador.observe(elemento);
        });
    });
</script>
