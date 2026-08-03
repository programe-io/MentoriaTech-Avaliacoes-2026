document.addEventListener("DOMContentLoaded", () => {

    // 1. TROCA DE ABAS (SOBRE MIM, RECADOS, DEPOIMENTOS, BLOG)
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const tabTarget = button.getAttribute("data-tab");

            // Remove classe ativa de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            // Ativa a aba clicada
            button.classList.add("active");
            document.getElementById(`tab-${tabTarget}`).classList.add("active");
        });
    });

    // 2. SISTEMA INTERATIVO DE ENVIAR RECADOS (SCRAPBOOK)
    const scrapForm = document.getElementById("scrap-form");
    const scrapsContainer = document.getElementById("scraps-container");
    const scrapCountSpan = document.getElementById("scrap-count");
    let currentScrapCount = 3;

    scrapForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("scrap-name").value.trim();
        const msgInput = document.getElementById("scrap-msg").value.trim();

        if (nameInput === "" || msgInput === "") return;

        // Horário atual formatado
        const agora = new Date();
        const hora = agora.getHours().toString().padStart(2, '0');
        const min = agora.getMinutes().toString().padStart(2, '0');
        const dataStr = `Hoje às ${hora}:${min}`;

        // Avatar aleatório para o novo post
        const randomAvatarId = Math.floor(Math.random() * 50) + 10;
        const avatarUrl = `https://picsum.photos/80/80?random=${randomAvatarId}`;

        // Novo elemento HTML do Recado
        const newScrap = document.createElement("div");
        newScrap.className = "scrap-post";
        newScrap.innerHTML = `
            <div class="scrap-author">
                <img src="${avatarUrl}" alt="${nameInput}">
                <div>
                    <strong>${nameInput}</strong> <span class="scrap-date">${dataStr}</span>
                </div>
            </div>
            <div class="scrap-body">
                ${msgInput}
            </div>
        `;

        // Adiciona no topo da lista de recados
        scrapsContainer.insertBefore(newScrap, scrapsContainer.children[1]);

        // Atualiza contador de recados
        currentScrapCount++;
        scrapCountSpan.textContent = currentScrapCount;

        // Limpa formulário
        scrapForm.reset();
        alert("Recado enviado com sucesso para a Izabella! ✨");
    });

    // 3. MUDAR "SORTE DO DIA"
    const fortuneText = document.getElementById("fortune-text");
    const btnNewFortune = document.getElementById("btn-new-fortune");

    const frasesSorte = [
        '"Quem estuda na rede estadual do Piauí já nasce com diploma de guerreiro! Sorria e arrase hoje! ✨💜"',
        '"Um copo de cajuína geladinha resolve 99% dos problemas do dia! 🥤☀️"',
        '"Sua estrela vai brilhar na prova desta semana! Acredite no seu potencial! 📚⭐"',
        '"Não deixe para amanhã o recado fofo que você pode deixar no Orkut hoje! sz sz 💜"',
        '"A felicidade não é um destino, é a jornada de quem sabe dar valor aos amigos de verdade! ✨"'
    ];

    let fortuneIndex = 0;

    btnNewFortune.addEventListener("click", () => {
        fortuneIndex = (fortuneIndex + 1) % frasesSorte.length;
        fortuneText.textContent = frasesSorte[fortuneIndex];
    });

    // 4. INTERAÇÃO NOS BOTÕES DE FÃ E AMIGO
    const btnFas = document.getElementById("btn-fase-2");
    const countFas = document.getElementById("count-fas");
    let virouFa = false;

    btnFas.addEventListener("click", () => {
        let numero = parseInt(countFas.textContent);
        if (!virouFa) {
            countFas.textContent = numero + 1;
            btnFas.style.background = "linear-gradient(180deg, #e056fd 0%, #8e44ad 100%)";
            virouFa = true;
            alert("Você agora é fã da Izabella Suan no Orkut! ⭐💜");
        } else {
            countFas.textContent = numero - 1;
            btnFas.style.background = "";
            virouFa = false;
        }
    });

});