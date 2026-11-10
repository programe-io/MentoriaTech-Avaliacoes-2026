const App = {
    // Banco de dados histórico rico e fascinante
    timelineData: [
        { year: "Século XII - XIII", title: "Os Primeiros Pergaminhos", desc: "Surgimento dos Chōjū-giga (Pergaminhos de Animais Brincalhões), considerados por muitos historiadores os ancestrais diretos dos mangás modernos.", details: "Criados por monges budistas, esses pergaminhos usavam traços expressivos de animais agindo como humanos, satirizando a aristocracia da época." },
        { year: "1947", title: "A Revolução de Osamu Tezuka", desc: "Lançamento de 'Shin Takarajima' (A Nova Ilha do Tesouro), vendendo mais de 400 mil cópias e estabelecendo a linguagem visual cinematográfica.", details: "Tezuka introduziu as 'linhas de velocidade', closes dramáticos e a estrutura de quadros estilo storyboard que moldou todo o mercado atual." },
        { year: "1963", title: "O Primeiro Anime para TV", desc: "Estreia de 'Tetsuwan Atom' (Astro Boy) na televisão japonesa, definindo o formato de animação semanal para o público.", details: "Para viabilizar o orçamento semanal, Tezuka reduziu quadros por segundo e criou traços icônicos como olhos grandes para transmitir emoções intensas." },
        { year: "1988 - 1995", title: "A Era de Ouro Global", desc: "O lançamento de obras-primas como Akira (1988) e Neon Genesis Evangelion (1995) que abriram as portas do ocidente para a animação japonesa.", details: "Evangelion revolucionou a psicologia dos personagens de mechas, enquanto Akira provou que animações podiam ter profundidade filosófica adulta e alta complexidade técnica." }
    ],

    pioneersData: [
        { name: "Osamu Tezuka", role: "O Deus do Mangá", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500", bio: "Criador de Astro Boy, Black Jack e Kimba. Responsável por institucionalizar a indústria como a conhecemos." },
        { name: "Hayao Miyazaki", role: "Mestre da Animação", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500", bio: "Cofundador do Studio Ghibli e vencedor do Oscar, conhecido por obras como A Viagem de Chihiro e Meu Amigo Totoro." },
        { name: "Akira Toriyama", role: "Lenda do Shonen", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500", bio: "O gênio por trás de Dragon Ball e Dr. Slump, cujos traços influenciaram gerações inteiras de mangakás no mundo todo." }
    ],

    curiositiesData: [
        { year: "Manga vs Comic", title: "Sentido de Leitura", desc: "Os mangás são lidos da direita para a esquerda porque o sentido tradicional da caligrafia japonesa kanji era vertical, de cima para baixo e da direita para a esquerda." },
        { year: "Indústria Gigante", title: "Consumo de Papel", desc: "No Japão, a quantidade de papel gasta anualmente para imprimir revistas de mangá como a Shonen Jump supera a quantidade de papel higiênico consumida no país." },
        { year: "O Termo 'Otaku'", title: "Etimologia", desc: "A palavra 'otaku' originalmente era um pronome formal japonês que significava 'sua casa'. O termo evoluiu na cultura pop para designar entusiastas dedicados." }
    ],

    quizData: [
        { question: "Quem é conhecido mundialmente como o 'Deus do Mangá'?", options: ["Hayao Miyazaki", "Osamu Tezuka", "Akira Toriyama", "Eiichiro Oda"], correct: 1 },
        { question: "Qual foi o primeiro anime de grande sucesso exibido semanalmente na TV em 1963?", options: ["Dragon Ball", "Astro Boy (Tetsuwan Atom)", "Speed Racer", "Sailor Moon"], correct: 1 },
        { question: "Por que os mangás tradicionais são lidos da direita para a esquerda?", options: ["Por causa do sentido da escrita vertical tradicional japonesa", "Para economizar tinta nas impressões", "Foi uma imposição de leis governamentais", "Para diferenciar dos livros ocidentais"], correct: 0 }
    ],

    currentQuizIndex: 0,
    score: 0,
    isSoundPlaying: false,

    init() {
        this.renderTimeline();
        this.renderPioneers();
        this.renderCuriosities();
        this.loadQuizQuestion();
    },

    switchTab(tabId, element) {
        document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));

        document.getElementById(`${tabId}-tab`).classList.add("active");
        if (element) element.classList.add("active");
    },

    renderTimeline() {
        const grid = document.getElementById("timelineGrid");
        grid.innerHTML = this.timelineData.map((item, idx) => `
            <div class="history-card" onclick="App.openModal('timeline', ${idx})">
                <span class="card-year">${item.year}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
        `).join('');
    },

    renderPioneers() {
        const grid = document.getElementById("pioneersGrid");
        grid.innerHTML = this.pioneersData.map((item, idx) => `
            <div class="pioneer-card" onclick="App.openModal('pioneers', ${idx})">
                <img src="${item.img}" alt="${item.name}" class="pioneer-img">
                <div class="pioneer-info">
                    <h3>${item.name}</h3>
                    <span>${item.role}</span>
                    <p>${item.bio}</p>
                </div>
            </div>
        `).join('');
    },

    renderCuriosities() {
        const grid = document.getElementById("curiositiesGrid");
        grid.innerHTML = this.curiositiesData.map((item, idx) => `
            <div class="history-card" onclick="App.openModal('curiosities', ${idx})">
                <span class="card-year">${item.year}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
        `).join('');
    },

    openModal(type, index) {
        const modal = document.getElementById("detailModal");
        const contentBox = document.getElementById("modalContent");
        let data;

        if (type === 'timeline') data = this.timelineData[index];
        if (type === 'pioneers') data = this.pioneersData[index];
        if (type === 'curiosities') data = this.curiositiesData[index];

        contentBox.innerHTML = `
            <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 12px; color: var(--accent-red);">${data.title || data.name}</h2>
            <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6; margin-bottom: 20px;">${data.details || data.bio || data.desc}</p>
            <button class="btn-glow" onclick="App.closeModal()">Entendido</button>
        `;
        modal.style.display = "flex";
    },

    closeModal(e) {
        if (!e || e.target.id === 'detailModal' || e.target.classList.contains('modal-close') || e.target.tagName === 'BUTTON') {
            document.getElementById("detailModal").style.display = "none";
        }
    },

    loadQuizQuestion() {
        if (this.currentQuizIndex >= this.quizData.length) {
            document.getElementById("quizQuestionBox").style.display = "none";
            document.getElementById("quizResultBox").style.display = "block";
            document.getElementById("quizScoreText").innerText = `Você acertou ${this.score} de ${this.quizData.length} questões com sucesso!`;
            return;
        }

        const q = this.quizData[this.currentQuizIndex];
        document.getElementById("quizCounter").innerText = `Questão ${this.currentQuizIndex + 1} de ${this.quizData.length}`;
        document.getElementById("quizQuestionText").innerText = q.question;

        const optionsBox = document.getElementById("quizOptions");
        optionsBox.innerHTML = q.options.map((opt, idx) => `
            <button class="quiz-option-btn" onclick="App.answerQuiz(${idx})">${opt}</button>
        `).join('');
    },

    answerQuiz(selectedIdx) {
        const q = this.quizData[this.currentQuizIndex];
        if (selectedIdx === q.correct) {
            this.score++;
            this.showToast("Resposta Correta! 🎉");
        } else {
            this.showToast("Resposta Incorreta! ❌");
        }
        this.currentQuizIndex++;
        this.loadQuizQuestion();
    },

    restartQuiz() {
        this.currentQuizIndex = 0;
        this.score = 0;
        document.getElementById("quizQuestionBox").style.display = "block";
        document.getElementById("quizResultBox").style.display = "none";
        this.loadQuizQuestion();
    },

    toggleSound() {
        this.isSoundPlaying = !this.isSoundPlaying;
        const icon = document.getElementById("soundIcon");
        const status = document.getElementById("audioStatus");

        if (this.isSoundPlaying) {
            icon.className = "fa-solid fa-pause";
            status.innerText = "Reproduzindo Lo-Fi Longe";
            this.showToast("Atmosfera Sonora Ativada 🎶");
        } else {
            icon.className = "fa-solid fa-play";
            status.innerText = "Clique para ativar som";
            this.showToast("Áudio Pausado");
        }
    },

    showToast(msg) {
        const t = document.getElementById("toastAlert");
        t.innerText = msg;
        t.classList.add("show");
        setTimeout(() => t.classList.remove("show"), 3000);
    }
};

document.addEventListener("DOMContentLoaded", () => App.init());