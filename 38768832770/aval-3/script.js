
const lessons = [
    {
        level: "NÍVEL INICIANTE",
        icon: "🪖",
        title: "Equipamentos de proteção",
        description: "Conheça os equipamentos necessários para praticar atividades de bicicleta com maior proteção.",
        topics: [
            "Capacete adequado e bem ajustado.",
            "Luvas para proteção das mãos.",
            "Calçados fechados.",
            "Proteções para joelhos e cotovelos.",
            "Roupas confortáveis e visíveis."
        ],
        tip: "Nunca pratique manobras sem equipamentos de proteção. Prefira espaços próprios para ciclismo."
    },
    {
        level: "NÍVEL INICIANTE",
        icon: "🚲",
        title: "Conhecendo a bicicleta",
        description: "Conheça os componentes da bicicleta e entenda a importância da manutenção antes de qualquer prática.",
        topics: [
            "Quadro e estrutura.",
            "Guidão e direção.",
            "Freios e manetes.",
            "Rodas e pneus.",
            "Selim e pedais."
        ],
        tip: "Utilize uma bicicleta em boas condições, adequada ao seu tamanho e à atividade."
    },
    {
        level: "NÍVEL INICIANTE",
        icon: "⚖️",
        title: "Equilíbrio corporal",
        description: "Aprenda a reconhecer a importância do equilíbrio e da postura corporal durante a utilização da bicicleta.",
        topics: [
            "Manter postura confortável.",
            "Olhar para frente.",
            "Manter as mãos no guidão.",
            "Desenvolver coordenação motora.",
            "Praticar equilíbrio em velocidade baixa."
        ],
        tip: "Desenvolva primeiro o domínio da bicicleta com as duas rodas no chão."
    },
    {
        level: "NÍVEL INTERMEDIÁRIO",
        icon: "🎯",
        title: "Controle da bicicleta",
        description: "Conheça os fundamentos de controle da bicicleta e desenvolva movimentos coordenados em ambiente seguro.",
        topics: [
            "Manter direção estável.",
            "Controlar a velocidade.",
            "Reconhecer o funcionamento dos freios.",
            "Praticar curvas amplas.",
            "Desenvolver coordenação entre braços e pernas."
        ],
        tip: "Não tente manobras enquanto não conseguir controlar a bicicleta com segurança."
    },
    {
        level: "NÍVEL INTERMEDIÁRIO",
        icon: "🧍",
        title: "Postura e consciência corporal",
        description: "Entenda como a postura influencia a estabilidade e o controle durante a prática do ciclismo.",
        topics: [
            "Manter o corpo relaxado.",
            "Evitar movimentos bruscos.",
            "Desenvolver coordenação.",
            "Reconhecer os próprios limites.",
            "Manter atenção ao ambiente."
        ],
        tip: "Interrompa a prática se sentir cansaço, desconforto ou perda de controle."
    },
    {
        level: "NÍVEL AVANÇADO",
        icon: "🛠️",
        title: "Inspeção e manutenção",
        description: "Aprenda a identificar problemas que podem comprometer a segurança da bicicleta.",
        topics: [
            "Conferir os freios.",
            "Verificar os pneus.",
            "Conferir rodas e eixos.",
            "Verificar guidão e direção.",
            "Realizar manutenção preventiva."
        ],
        tip: "Peça a um mecânico qualificado para verificar a bicicleta antes de praticar manobras."
    },
    {
        level: "NÍVEL AVANÇADO",
        icon: "🏆",
        title: "Prática responsável",
        description: "Conheça os cuidados necessários para praticar modalidades de manobras de bicicleta em locais apropriados.",
        topics: [
            "Respeitar as regras do espaço de prática.",
            "Utilizar equipamentos completos.",
            "Contar com orientação profissional.",
            "Evitar locais com pedestres e veículos.",
            "Respeitar os limites pessoais."
        ],
        tip: "Manobras exigem treinamento presencial supervisionado. Não pratique sozinho nem em vias públicas."
    }
];

let current = 0;
let completed = [];

function renderLesson() {

    const lesson = lessons[current];

    document.getElementById("icon").innerText = lesson.icon;
    document.getElementById("level").innerText = lesson.level;
    document.getElementById("title").innerText = lesson.title;
    document.getElementById("description").innerText = lesson.description;
    document.getElementById("tip").innerText = lesson.tip;

    document.getElementById("counter").innerText =
        `Aula ${current + 1} de ${lessons.length}`;

    const topics = document.getElementById("topics");

    topics.innerHTML = "";

    lesson.topics.forEach(topic => {

        const li = document.createElement("li");

        li.innerText = topic;

        topics.appendChild(li);

    });

    const check = document.getElementById("check");

    check.checked = completed.includes(current);

    check.onchange = function() {

        if (check.checked) {

            if (!completed.includes(current)) {
                completed.push(current);
            }

        } else {

            completed = completed.filter(
                item => item !== current
            );

        }

        updateProgress();

    };

    document.getElementById("back").disabled = current === 0;

    document.getElementById("next").innerText =
        current === lessons.length - 1
        ? "Finalizar curso ✓"
        : "Próxima aula →";

    renderModules();

    updateProgress();
}

function updateProgress() {

    const percent = Math.round(
        completed.length / lessons.length * 100
    );

    document.getElementById("progress").style.width =
        percent + "%";

    document.getElementById("progressText").innerText =
        percent + "% concluído";

    renderModules();
}

function renderModules() {

    const modules = document.getElementById("modules");

    modules.innerHTML = "";

    lessons.forEach((lesson, index) => {

        const div = document.createElement("div");

        div.className = "module";

        if (current === index) {
            div.classList.add("active");
        }

        if (completed.includes(index)) {
            div.classList.add("done");
        }

        const name = document.createElement("span");

        name.innerText = `${index + 1}. ${lesson.title}`;

        const status = document.createElement("span");

        status.innerText =
            completed.includes(index) ? "✓" : "○";

        div.appendChild(name);
        div.appendChild(status);

        div.onclick = function() {
            current = index;
            renderLesson();
        };

        modules.appendChild(div);

    });
}

function nextLesson() {

    if (!completed.includes(current)) {

        alert("Conclua a aula atual antes de avançar.");

        return;

    }

    if (current < lessons.length - 1) {

        current++;

        renderLesson();

    } else {

        finishCourse();

    }
}

function previousLesson() {

    if (current > 0) {

        current--;

        renderLesson();

    }

}

function finishCourse() {

    if (completed.length !== lessons.length) {
        alert("Conclua todas as aulas primeiro.");
        return;
    }

    document.querySelector(".lesson").innerHTML = `
        <div class="finish">
            <div class="finish-icon">🏆🚴</div>

            <h2>Curso concluído!</h2>

            <p>
                Parabéns! Você concluiu o conteúdo
                educativo do Bike Wheeling.
            </p>

            <p>
                Continue aprendendo com responsabilidade
                e orientação profissional.
            </p>

            <button class="restart" onclick="resetCourse()">
                Reiniciar curso
            </button>
        </div>
    `;
}

function resetCourse() {

    current = 0;
    completed = [];

    location.reload();

}

document.getElementById("next").onclick = nextLesson;

document.getElementById("back").onclick = previousLesson;

renderLesson();
