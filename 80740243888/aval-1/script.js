document.addEventListener("DOMContentLoaded", () => {
    // 1. Animação suave de entrada para os artigos e barra lateral ao rolar a página
    const blocos = document.querySelectorAll("aside, article, section");

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = "1";
                entrada.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    blocos.forEach((bloco) => {
        bloco.style.opacity = "0";
        bloco.style.transform = "translateY(20px)";
        bloco.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observador.observe(bloco);
    });

    // 2. Ampliar imagens históricas ao clicar (Lightbox)
    const imagens = document.querySelectorAll("img");

    imagens.forEach((img) => {
        img.title = "Clique para ampliar a imagem";

        img.addEventListener("click", () => {
            const fundoEscuro = document.createElement("div");
            fundoEscuro.style.position = "fixed";
            fundoEscuro.style.top = "0";
            fundoEscuro.style.left = "0";
            fundoEscuro.style.width = "100vw";
            fundoEscuro.style.height = "100vh";
            fundoEscuro.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
            fundoEscuro.style.display = "flex";
            fundoEscuro.style.justifyContent = "center";
            fundoEscuro.style.alignItems = "center";
            fundoEscuro.style.zIndex = "1000";
            fundoEscuro.style.cursor = "zoom-out";
            fundoEscuro.style.padding = "20px";

            const imagemAmpliada = document.createElement("img");
            imagemAmpliada.src = img.src;
            imagemAmpliada.style.maxWidth = "90%";
            imagemAmpliada.style.maxHeight = "90%";
            imagemAmpliada.style.borderRadius = "8px";
            imagemAmpliada.style.boxShadow = "0 0 25px rgba(0,0,0,0.5)";
            imagemAmpliada.style.cursor = "zoom-out";

            fundoEscuro.appendChild(imagemAmpliada);
            document.body.appendChild(fundoEscuro);

            // Fecha ao clicar em qualquer lugar
            fundoEscuro.addEventListener("click", () => {
                document.body.removeChild(fundoEscuro);
            });
        });
    });

    // 3. Botão automático "Voltar ao topo"
    const botaoTopo = document.createElement("button");
    botaoTopo.innerText = "↑ Topo";
    botaoTopo.style.position = "fixed";
    botaoTopo.style.bottom = "25px";
    botaoTopo.style.right = "25px";
    botaoTopo.style.backgroundColor = "#1b365d";
    botaoTopo.style.color = "#ffffff";
    botaoTopo.style.border = "2px solid #c59b27";
    botaoTopo.style.borderRadius = "50px";
    botaoTopo.style.padding = "10px 18px";
    botaoTopo.style.fontSize = "14px";
    botaoTopo.style.fontWeight = "bold";
    botaoTopo.style.cursor = "pointer";
    botaoTopo.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    botaoTopo.style.display = "none";
    botaoTopo.style.zIndex = "999";

    document.body.appendChild(botaoTopo);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            botaoTopo.style.display = "block";
        } else {
            botaoTopo.style.display = "none";
        }
    });

    botaoTopo.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});