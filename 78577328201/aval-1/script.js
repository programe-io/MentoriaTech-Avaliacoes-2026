/* ==========================================================================
   1. TELEMETRIA E CONFIGURAÇÕES DO PRÓXIMO GP (COUNTDOWN)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initCountdown();
    initTelemetryScroll();
    initTeamFilters();
    init3DTiltEffect();
});

function initCountdown() {
    // Cria uma seção de cronômetro dinâmico logo abaixo do cabeçalho
    const header = document.querySelector("header");
    const countdownContainer = document.createElement("div");
    countdownContainer.style.cssText = `
        background: rgba(255, 24, 1, 0.1);
        border: 1px solid rgba(255, 24, 1, 0.3);
        backdrop-filter: blur(10px);
        display: inline-flex;
        gap: 20px;
        padding: 15px 30px;
        border-radius: 8px;
        margin-top: 25px;
        font-family: 'Orbitron', sans-serif;
        box-shadow: 0 0 20px rgba(255, 24, 1, 0.15);
        transform: skewX(-10deg);
    `;

    // Define a data alvo simulando a próxima corrida da temporada de 2026
    const dataProximoGP = new Date("November 8, 2026 14:00:00").getTime();

    function atualizarRelogio() {
        const agora = new Date().getTime();
        const diferenca = dataProximoGP - agora;

        if (diferenca < 0) {
            countdownContainer.innerHTML = "<div>LUZES APAGADAS! CORRIDA EM ANDAMENTO</div>";
            return;
        }

        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        countdownContainer.innerHTML = `
            <div style="text-align:center"><span style="display:block; font-size:1.5rem; font-weight:900; color:#fff;">${dias}D</span><small style="font-size:0.7rem; color:#ff1801;">DIAS</small></div>
            <div style="text-align:center"><span style="display:block; font-size:1.5rem; font-weight:900; color:#fff;">${horas}H</span><small style="font-size:0.7rem; color:#ff1801;">HORAS</small></div>
            <div style="text-align:center"><span style="display:block; font-size:1.5rem; font-weight:900; color:#fff;">${minutos}M</span><small style="font-size:0.7rem; color:#ff1801;">MIN</small></div>
            <div style="text-align:center"><span style="display:block; font-size:1.5rem; font-weight:900; color:#fff; animation: blink 1s infinite;">${segundos}S</span><small style="font-size:0.7rem; color:#ff1801;">SEG</small></div>
        `;
    }

    // Injeta estilo de piscar sutil para o efeito de segundos ativos
    const style = document.createElement('style');
    style.innerHTML = `@keyframes blink { 50% { opacity: 0.6; } }`;
    document.head.appendChild(style);

    header.appendChild(countdownContainer);
    setInterval(atualizarRelogio, 1000);
    atualizarRelogio();
}

/* ==========================================================================
   2. INTERPOLAÇÃO DE SCROLL (PARALLAX AERODINÂMICO)
   ========================================================================== */
function initTelemetryScroll() {
    const headerTitle = document.querySelector("header h1");
    const headerDesc = document.querySelector("header p");

    window.addEventListener("scroll", () => {
        let scrollValue = window.scrollY;
        
        // Desloca os textos de forma suave simulando profundidade tridimensional
        if (scrollValue < 400) {
            headerTitle.style.transform = `translateY(${scrollValue * 0.4}px)`;
            headerDesc.style.transform = `translateY(${scrollValue * 0.2}px)`;
            headerTitle.style.opacity = `${1 - scrollValue * 0.003}`;
        }
    });
}

/* ==========================================================================
   3. FILTRAGEM DINÂMICA DE EQUIPES (INTERATIVIDADE NO GRID)
   ========================================================================== */
function initTeamFilters() {
    const equipesSection = document.getElementById("equipes");
    if (!equipesSection) return;

    // Criando a barra de botões de filtro estilo painel de controle
    const filterBar = document.createElement("div");
    filterBar.style.cssText = `
        display: flex;
        gap: 10px;
        margin-bottom: 30px;
        flex-wrap: wrap;
    `;

    const categorias = ["Todas", "Motores Mercedes", "Motores Ferrari", "Outros"];
    
    categorias.forEach(cat => {
        const btn = document.createElement("button");
        btn.innerText = cat;
        btn.style.cssText = `
            background: rgba(255,255,255,0.05);
            color: #9fa0aa;
            border: 1px solid rgba(255,255,255,0.1);
            padding: 8px 18px;
            font-family: 'Orbitron', sans-serif;
            font-size: 0.8rem;
            text-transform: uppercase;
            cursor: pointer;
            border-radius: 4px;
            transform: skewX(-10deg);
            transition: all 0.3s ease;
        `;

        btn.addEventListener("mouseenter", () => {
            btn.style.background = "rgba(255, 24, 1, 0.2)";
            btn.style.color = "#fff";
        });
        btn.addEventListener("mouseleave", () => {
            if(!btn.classList.contains("active-filter")) {
                btn.style.background = "rgba(255,255,255,0.05)";
                btn.style.color = "#9fa0aa";
            }
        });

        btn.addEventListener("click", () => {
            document.querySelectorAll("#equipes button").forEach(b => {
                b.classList.remove("active-filter");
                b.style.background = "rgba(255,255,255,0.05)";
                b.style.borderColor = "rgba(255,255,255,0.1)";
            });
            btn.classList.add("active-filter");
            btn.style.borderColor = "#ff1801";
            filtrarGrid(cat);
        });

        filterBar.appendChild(btn);
    });

    const grid = document.querySelector(".grid-equipes");
    equipesSection.insertBefore(filterBar, grid);
}

function filtrarGrid(categoria) {
    const cards = document.querySelectorAll(".card-equipe");
    
    cards.forEach(card => {
        const nomeEquipe = card.querySelector("h3").innerText.toLowerCase();
        card.style.transition = "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
        
        if (categoria === "Todas") {
            card.style.opacity = "1";
            card.style.transform = "scale(1) translateY(0)";
            card.style.pointerEvents = "auto";
        } else if (categoria === "Motores Mercedes" && (nomeEquipe.includes("mclaren") || nomeEquipe.includes("mercedes") || nomeEquipe.includes("aston martin"))) {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
            card.style.pointerEvents = "auto";
        } else if (categoria === "Motores Ferrari" && (nomeEquipe.includes("ferrari"))) {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
            card.style.pointerEvents = "auto";
        } else if (categoria === "Outros" && (nomeEquipe.includes("red bull") || nomeEquipe.includes("alpine"))) {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
            card.style.pointerEvents = "auto";
        } else {
            card.style.opacity = "0.15";
            card.style.transform = "scale(0.95) translateY(5px)";
            card.style.pointerEvents = "none";
        }
    });
}

/* ==========================================================================
   4. EFEITO GYRO/TILT 3D NOS CARDS (EFEITO INCLINAÇÃO CINÉTICA)
   ========================================================================== */
function init3DTiltEffect() {
    const cards = document.querySelectorAll(".card-equipe, .tecnica-item");

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const cardRect = card.getBoundingClientRect();
            
            // Calcula as coordenadas do mouse relativas ao centro do card
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            const mouseX = e.clientX - cardRect.left - cardWidth / 2;
            const mouseY = e.clientY - cardRect.top - cardHeight / 2;
            
            // Converte a força do movimento em graus de rotação (ângulo máximo de 10 graus)
            const rotateX = (mouseY / cardHeight) * -10;
            const rotateY = (mouseX / cardWidth) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener("mouseleave", () => {
            // Restaura o objeto suavemente à estabilidade original
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });
}=