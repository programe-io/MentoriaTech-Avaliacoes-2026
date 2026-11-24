
const lessons = [
    {
        icon: "🪖",
        title: "Preparação e segurança",
        description: "Antes de começar, prepare a bicicleta e escolha um local seguro para aprender. O ideal é uma área plana, ampla, sem trânsito e sem obstáculos.",
        topics: [
            "Utilizar capacete adequado e ajustado.",
            "Usar calçados fechados.",
            "Verificar os pneus e os freios.",
            "Escolher um local plano e tranquilo.",
            "Contar com a supervisão de um adulto quando necessário."
        ],
        tip: "Nunca comece a aprender em ruas movimentadas ou descidas."
    },
    {
        icon: "🚲",
        title: "Conhecendo a bicicleta",
        description: "Conheça as principais partes da bicicleta e entenda a função de cada componente.",
        topics: [
            "Guidão: controla a direção.",
            "Selim: local onde você se senta.",
            "Pedais: ajudam a movimentar a bicicleta.",
            "Freios: permitem diminuir a velocidade e parar.",
            "Rodas: permitem o deslocamento."
        ],
        tip: "Antes de pedalar, identifique onde ficam os freios e pratique acioná-los com a bicicleta parada."
    },
    {
        icon: "🧍",
        title: "Aprendendo a manter o equilíbrio",
        description: "Comece caminhando ao lado da bicicleta. Depois, sente-se no selim e experimente impulsionar a bicicleta com os pés no chão, sem pedalar.",
        topics: [
            "Segurar o guidão com as duas mãos.",
            "Manter os olhos olhando para frente.",
            "Sentar de maneira confortável.",
            "Dar pequenos impulsos com os pés.",
            "Experimentar manter o equilíbrio em baixa velocidade."
        ],
        tip: "Não tente pedalar imediatamente. Primeiro aprenda a equilibrar a bicicleta."
    },
    {
        icon: "🦶",
        title: "Aprendendo a subir na bicicleta",
        description: "Com a bicicleta parada e os freios acionados, posicione-se ao lado dela. Passe uma perna por cima do quadro e sente-se no selim.",
        topics: [
            "Segurar firmemente o guidão.",
            "Manter a bicicleta parada.",
            "Posicionar os pés próximos aos pedais.",
            "Apoiar um pé no chão.",
            "Encontrar uma posição confortável."
        ],
        tip: "Se a bicicleta for muito alta, ajuste o selim para que você consiga apoiar os pés no chão com segurança durante o aprendizado."
    },
    {
        icon: "⚙️",
        title: "Aprendendo a pedalar",
        description: "Com a bicicleta equilibrada, coloque um pé no pedal e use o outro para iniciar um impulso suave. Comece a movimentar os pedais de maneira contínua.",
        topics: [
            "Posicionar os pés corretamente nos pedais.",
            "Começar com movimentos suaves.",
            "Manter as duas mãos no guidão.",
            "Olhar para frente.",
            "Manter uma velocidade confortável."
        ],
        tip: "Pratique em pequenos percursos e não tente ganhar velocidade rapidamente."
    },
    {
        icon: "↔️",
        title: "Aprendendo a fazer curvas",
        description: "Depois de conseguir pedalar em linha reta, pratique mudanças suaves de direção em um espaço amplo e livre.",
        topics: [
            "Olhar para onde deseja ir.",
            "Manter as duas mãos no guidão.",
            "Fazer movimentos suaves.",
            "Evitar curvas bruscas.",
            "Controlar a velocidade durante as curvas."
        ],
        tip: "Comece com curvas amplas e lentas antes de tentar mudanças de direção mais fechadas."
    },
    {
        icon: "🛑",
        title: "Aprendendo a frear",
        description: "Aprenda a utilizar os freios antes de circular sozinho. Pratique em baixa velocidade, em terreno plano e sem obstáculos.",
        topics: [
            "Identificar os manetes de freio.",
            "Acionar os freios progressivamente.",
            "Manter o controle do guidão.",
            "Reduzir a velocidade antes de parar.",
            "Apoiar os pés no chão depois da parada."
        ],
        tip: "Evite apertar bruscamente apenas um dos freios. Aprenda a utilizar os dois conforme as orientações do fabricante."
    },
    {
        icon: "🏆",
        title: "Praticando e evoluindo",
        description: "Agora que você conhece os fundamentos, continue praticando em um local seguro, sempre respeitando seus limites.",
        topics: [
            "Praticar trajetos curtos.",
            "Treinar equilíbrio e direção.",
            "Repetir os exercícios de frenagem.",
            "Aprender a olhar ao redor sem perder o controle.",
            "Respeitar as regras de trânsito antes de circular em vias públicas."
        ],
        tip: "Não tenha pressa! Cada pessoa aprende em seu próprio ritmo."
    }
];

let currentLesson = 0;
let completed = [];

function renderLesson() {

    const lesson = lessons[currentLesson];

    document.getElementById("lessonIcon").innerText =
        lesson.icon;

    document.getElementById("lessonNumber").innerText =
        "AULA " + (currentLesson + 1);

    document.getElementById("lessonTitle").innerText =
        lesson.title;

    document.getElementById("lessonDescription").innerText =
        lesson.description;

    document.getElementById("lessonTip").innerText =
        lesson.tip;

    const topics = document.getElementById("lessonTopics");

    topics.innerHTML = "";

    lesson.topics.forEach(topic => {

        const li = document.createElement("li");

        li.innerText = topic;

        topics.appendChild(li);

    });

    const check = document.getElementById("completedCheck");

    check.checked = completed.includes(currentLesson);

    check.onchange = function() {

        if (check.checked) {

            if (!completed.includes(currentLesson)) {
                completed.push(currentLesson);
            }

        } else {

            completed = completed.filter(
                item => item !== currentLesson
            );

        }

        updateProgress();

    };

    document.getElementById("backBtn").disabled =
        currentLesson === 0;

    document.getElementById("nextBtn").innerText =
        currentLesson === lessons.length - 1
        ? "Finalizar curso ✓"
        : "Próxima aula →";

    document.getElementById("stepCounter").innerText =
        `Aula ${currentLesson + 1} de ${lessons.length}`;

    renderLessonList();

    updateProgress();

}

function updateProgress() {

    const percent = Math.round(
        (completed.length / lessons.length) * 100
    );

    document.getElementById("progress").style.width =
        percent + "%";

    document.getElementById("progressText").innerText =
        percent + "% concluído";

    renderLessonList();

}

function renderLessonList() {

    const list = document.getElementById("lessonList");

    list.innerHTML = "";

    lessons.forEach((lesson, index) => {

        const item = document.createElement("div");

        item.className = "lesson-item";

        if (index === currentLesson) {
            item.classList.add("active");
        }

        if (completed.includes(index)) {
            item.classList.add("done");
        }

        const title = document.createElement("span");

        title.innerText =
            `${index + 1}. ${lesson.title}`;

        const status = document.createElement("span");

        status.innerText =
            completed.includes(index) ? "✓" : "○";

        item.appendChild(title);
        item.appendChild(status);

        item.onclick = function() {
            currentLesson = index;
            renderLesson();
        };

        list.appendChild(item);

    });

}

function nextLesson() {

    if (!completed.includes(currentLesson)) {

        alert("Conclua a aula atual antes de avançar!");

        return;

    }

    if (currentLesson < lessons.length - 1) {

        currentLesson++;

        renderLesson();

    } else {

        finishCourse();

    }

}

function previousLesson() {

    if (currentLesson > 0) {

        currentLesson--;

        renderLesson();

    }

}

function finishCourse() {

    if (completed.length !== lessons.length) {

        alert("Conclua todas as aulas para finalizar o curso.");

        return;

    }

    document.getElementById("content");

    const lessonCard = document.querySelector(".lesson");

    lessonCard.innerHTML = `
        <div class="finish">

            <div class="finish-icon">🏆🚴</div>

            <h2>Parabéns!</h2>

            <p>
                Você concluiu todas as aulas do curso
                Aprenda a Pedalar!
            </p>

            <p>
                Continue praticando com segurança
                e respeitando seu ritmo de aprendizagem.
            </p>

            <button class="btn-restart" onclick="resetCourse()">
                Reiniciar curso
            </button>

        </div>
    `;

}

function resetCourse() {

    currentLesson = 0;

    completed = [];

    location.reload();

}

document.getElementById("nextBtn").onclick =
    nextLesson;

document.getElementById("backBtn").onclick =
    previousLesson;

renderLesson();
