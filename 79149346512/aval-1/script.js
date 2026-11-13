document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. NAVEGAÇÃO DO MENU (ROLAGEM SUAVE)
    // ==========================================
    const linksMenu = document.querySelectorAll("nav a");

    linksMenu.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Evita o salto padrão do '#'
            const textoLink = link.textContent.trim().toLowerCase();

            if (textoLink === "inicio") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } 
            else if (textoLink === "galeria") {
                const galeria = document.querySelector("aside");
                galeria.scrollIntoView({ behavior: "smooth" });
            } 
            else if (textoLink === "colunas") {
                const artigos = document.querySelector("main");
                artigos.scrollIntoView({ behavior: "smooth" });
            } 
            else if (textoLink === "contato") {
                const email = prompt("Quer falar sobre GTA 6 com a Julia? Digite seu e-mail para contato:");
                if (email && email.includes("@")) {
                    alert(`Obrigada! Entraremos em contato pelo e-mail: ${email}`);
                } else if (email !== null) {
                    alert("Por favor, digite um e-mail válido.");
                }
            }
        });
    });

    // ==========================================
    // 2. INTERATIVIDADE NA GALERIA (.img-fake)
    // ==========================================
    const caixasGaleria = document.querySelectorAll(".img-fake");
    const legendasGTA = [
        "Vice City Neon - Preview",
        "Lucia & Jason - Gameplay",
        "Carros Clássicos - Leonida"
    ];

    caixasGaleria.forEach((caixa, index) => {
        caixa.style.cursor = "pointer";
        caixa.style.display = "flex";
        caixa.style.alignItems = "center";
        caixa.style.justifyContent = "center";
        caixa.style.fontWeight = "bold";
        caixa.style.transition = "transform 0.3s ease, background-color 0.3s ease";

        caixa.addEventListener("click", () => {
            const ativo = caixa.classList.toggle("ativa");
            if (ativo) {
                caixa.textContent = legendasGTA[index] || "Imagem Destacada";
                caixa.style.backgroundColor = "#cf5797"; // Rosa do seu hover
                caixa.style.transform = "scale(1.03)";
            } else {
                caixa.textContent = "Imagem";
                caixa.style.backgroundColor = "#AF9AC9"; // Cor original do seu CSS
                caixa.style.transform = "scale(1)";
            }
        });
    });

    // ==========================================
    // 3. BOTÃO DE CURTIR E "LER MAIS" NOS ARTIGOS
    // ==========================================
    const artigos = document.querySelectorAll("main article");

    artigos.forEach((artigo) => {
        const paragrafos = artigo.querySelectorAll("p:not(.autor)");

        // Esconde o segundo parágrafo inicialmente se houver mais de um
        if (paragrafos.length > 1) {
            const segundoParagrafo = paragrafos[1];
            segundoParagrafo.style.display = "none";

            const btnLerMais = document.createElement("button");
            btnLerMais.textContent = "Ler mais";
            btnLerMais.style.cssText = `
                background-color: #4b40e4;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 5px;
                cursor: pointer;
                margin-right: 10px;
                margin-top: 10px;
            `;

            btnLerMais.addEventListener("click", () => {
                const oculto = segundoParagrafo.style.display === "none";
                segundoParagrafo.style.display = oculto ? "block" : "none";
                btnLerMais.textContent = oculto ? "Mostrar menos" : "Ler mais";
            });

            artigo.appendChild(btnLerMais);
        }

        // Cria botão de Curtir para cada post
        let curtidas = 0;
        const btnCurtir = document.createElement("button");
        btnCurtir.textContent = `❤️ Curtir (${curtidas})`;
        btnCurtir.style.cssText = `
            background-color: #cf5797;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        `;

        btnCurtir.addEventListener("click", () => {
            curtidas++;
            btnCurtir.textContent = `❤️ Curtir (${curtidas})`;
        });

        artigo.appendChild(btnCurtir);
    });

    // ==========================================
    // 4. EFEITO NO HEADER AO ROLAR A PÁGINA
    // ==========================================
    const nav = document.querySelector("nav");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.style.backgroundColor = "rgba(41, 62, 134, 0.92)";
            nav.style.zIndex = "1000";
        } else {
            nav.style.backgroundColor = "rgb(41, 62, 134)";
        }
    });

});