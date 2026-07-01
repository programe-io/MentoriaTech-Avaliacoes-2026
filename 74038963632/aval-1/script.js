document.addEventListener("DOMContentLoaded", () => {
        
            // --- 1. FONDO DE PARTÍCULAS (CANVAS) ---
                const canvas = document.getElementById("cyber-canvas");
                    const ctx = canvas.getContext("2d");

                        function redimensionar() {
                                canvas.width = window.innerWidth;
                                        canvas.height = window.innerHeight;
                                            }
                                                redimensionar();
                                                    window.addEventListener("resize", redimensionar);

                                                        const particulas = [];
                                                            for (let i = 0; i < 40; i++) {
                                                                    particulas.push({
                                                                                x: Math.random() * canvas.width,
                                                                                            y: Math.random() * canvas.height,
                                                                                                        velY: Math.random() * 0.8 + 0.2,
                                                                                                                    tamanho: Math.random() * 2 + 1
                                                                                                                            });
                                                                                                                                }

                                                                                                                                    function animar() {
                                                                                                                                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                                                                                                                                                    ctx.fillStyle = "rgba(0, 242, 254, 0.15)";

                                                                                                                                                            particulas.forEach(p => {
                                                                                                                                                                        ctx.beginPath();
                                                                                                                                                                                    ctx.arc(p.x, p.y, p.tamanho, 0, Math.PI * 2);
                                                                                                                                                                                                ctx.fill();

                                                                                                                                                                                                            p.y += p.velY;
                                                                                                                                                                                                                        if (p.y > canvas.height) {
                                                                                                                                                                                                                                        p.y = 0;
                                                                                                                                                                                                                                                        p.x = Math.random() * canvas.width;
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                    requestAnimationFrame(animar);
                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                            animar();

                                                                                                                                                                                                                                                                                                // --- 2. LOGICA DE INTERAÇÃO DOS BOTÕES (ABAS/FILTROS) ---
                                                                                                                                                                                                                                                                                                    const botoesAba = document.querySelectorAll(".aba-btn");
                                                                                                                                                                                                                                                                                                        const conteudosAba = document.querySelectorAll(".conteudo-aba");

                                                                                                                                                                                                                                                                                                            botoesAba.forEach(botao => {
                                                                                                                                                                                                                                                                                                                    botao.addEventListener("click", () => {
                                                                                                                                                                                                                                                                                                                                // Remove estado ativo de todos os botões e conteúdos
                                                                                                                                                                                                                                                                                                                                            botoesAba.forEach(b => b.classList.remove("active"));
                                                                                                                                                                                                                                                                                                                                                        conteudosAba.forEach(c => c.classList.remove("active"));

                                                                                                                                                                                                                                                                                                                                                                    // Adiciona classe ativa ao botão clicado
                                                                                                                                                                                                                                                                                                                                                                                botao.classList.add("active");

                                                                                                                                                                                                                                                                                                                                                                                            // Ativa o container correspondente baseado no atributo data-aba
                                                                                                                                                                                                                                                                                                                                                                                                        const idAbaAlvo = botao.getAttribute("data-aba");
                                                                                                                                                                                                                                                                                                                                                                                                                    document.getElementById(idAbaAlvo).classList.add("active");
                                                                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                                                                
})