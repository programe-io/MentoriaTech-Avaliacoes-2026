```javascript
/* =========================================
   VARIÁVEIS
========================================= */

let lessons =
    JSON.parse(
        localStorage.getItem("aulas")
    ) || [];

let currentLesson = null;


/* =========================================
   AULA INICIAL
========================================= */

if (lessons.length === 0) {

    lessons = [

        {
            id: 1,

            title:
                "Introdução à Função Quadrática",

            subject:
                "Matemática",

            url:
                "https://www.youtube.com/watch?v=example",

            description:
                "Aprenda os conceitos básicos da função quadrática.",

            completed: false,

            score: null,

            quiz: [

                {
                    question:
                        "Qual é a forma geral de uma função quadrática?",

                    options: [

                        "f(x) = ax² + bx + c",

                        "f(x) = ax + b",

                        "f(x) = a/x",

                        "f(x) = x + y"

                    ],

                    answer: 0
                },


                {
                    question:
                        "Qual é o maior expoente da variável em uma função quadrática?",

                    options: [

                        "1",

                        "2",

                        "3",

                        "4"

                    ],

                    answer: 1
                }

            ]
        }

    ];

    save();
}


/* =========================================
   SALVAR NO LOCALSTORAGE
========================================= */

function save() {

    localStorage.setItem(
        "aulas",
        JSON.stringify(lessons)
    );
}


/* =========================================
   CONVERTER LINK DO YOUTUBE
========================================= */

function youtubeEmbed(url) {

    let videoId = "";


    if (url.includes("youtu.be/")) {

        videoId =
            url
                .split("youtu.be/")[1]
                .split("?")[0];

    }


    else if (url.includes("watch?v=")) {

        videoId =
            url
                .split("watch?v=")[1]
                .split("&")[0];

    }


    else if (url.includes("/shorts/")) {

        videoId =
            url
                .split("/shorts/")[1]
                .split("?")[0];

    }


    if (!videoId) {

        return "";
    }


    return `
        https://www.youtube.com/embed/${videoId}
    `;
}


/* =========================================
   MOSTRAR AULAS
========================================= */

function renderLessons() {

    const container =
        document.getElementById("lessons");


    const search =
        document
            .getElementById("search")
            .value
            .toLowerCase();


    const filter =
        document
            .getElementById("filter")
            .value;


    container.innerHTML = "";


    const filtered =
        lessons.filter(lesson => {

            const matchesSearch =

                lesson.title
                    .toLowerCase()
                    .includes(search)

                ||

                lesson.subject
                    .toLowerCase()
                    .includes(search);


            const matchesFilter =

                filter === "all"

                ||

                lesson.subject === filter;


            return (
                matchesSearch &&
                matchesFilter
            );

        });


    filtered.forEach(lesson => {

        const embed =
            youtubeEmbed(lesson.url);


        const card =
            document.createElement("article");


        card.className =
            "lesson";


        card.innerHTML = `

            ${
                embed

                ?

                `
                <iframe
                    src="${embed}"
                    allowfullscreen>
                </iframe>
                `

                :

                `
                <div class="video-placeholder">
                    Vídeo do YouTube
                </div>
                `
            }


            <div class="lesson-content">

                <div class="subject">
                    ${lesson.subject}
                </div>


                <h3>
                    ${lesson.title}
                </h3>


                <p>
                    ${lesson.description}
                </p>


                ${
                    lesson.completed

                    ?

                    `
                    <p
                        style="
                        color:#16a34a;
                        font-weight:bold;
                        ">
                        ✓ Aula concluída
                    </p>
                    `

                    :

                    ""
                }


                ${
                    lesson.score !== null

                    ?

                    `
                    <div>
                        Quiz:
                        <strong>
                            ${lesson.score}%
                        </strong>
                    </div>


                    <div class="progress">

                        <div
                            class="progress-bar"
                            style="
                            width:${lesson.score}%;
                            ">
                        </div>

                    </div>
                    `

                    :

                    ""
                }


                <br>


                <div class="lesson-buttons">

                    <button
                        class="btn btn-primary"
                        onclick="openQuiz(${lesson.id})">

                        🧠 Fazer Quiz

                    </button>


                    <button
                        class="btn btn-success"
                        onclick="completeLesson(${lesson.id})">

                        ${
                            lesson.completed
                            ? "↩ Reabrir"
                            : "✓ Concluir"
                        }

                    </button>


                    <button
                        class="btn btn-danger"
                        onclick="deleteLesson(${lesson.id})">

                        🗑 Excluir

                    </button>

                </div>

            </div>

        `;


        container.appendChild(card);

    });


    updateDashboard();
}


/* =========================================
   ATUALIZAR DASHBOARD
========================================= */

function updateDashboard() {

    document.getElementById(
        "totalLessons"
    ).textContent =
        lessons.length;


    document.getElementById(
        "completedLessons"
    ).textContent =

        lessons.filter(
            lesson => lesson.completed
        ).length;


    const quizLessons =

        lessons.filter(
            lesson => lesson.score !== null
        );


    document.getElementById(
        "quizCount"
    ).textContent =
        quizLessons.length;


    if (quizLessons.length > 0) {

        const average =

            quizLessons.reduce(
                (sum, lesson) =>
                    sum + lesson.score,
                0
            )
            /
            quizLessons.length;


        document.getElementById(
            "averageScore"
        ).textContent =
            Math.round(average) + "%";

    }

    else {

        document.getElementById(
            "averageScore"
        ).textContent =
            "0%";
    }
}


/* =========================================
   MODAL DE AULA
========================================= */

function openLessonModal() {

    document.getElementById(
        "lessonModal"
    ).style.display =
        "flex";
}


function closeLessonModal() {

    document.getElementById(
        "lessonModal"
    ).style.display =
        "none";
}


/* =========================================
   ADICIONAR AULA
========================================= */

function addLesson() {

    const title =
        document.getElementById(
            "lessonTitle"
        ).value.trim();


    const subject =
        document.getElementById(
            "lessonSubject"
        ).value.trim();


    const url =
        document.getElementById(
            "lessonUrl"
        ).value.trim();


    const description =
        document.getElementById(
            "lessonDescription"
        ).value.trim();


    if (
        !title ||
        !subject ||
        !url
    ) {

        alert(
            "Preencha título, disciplina e link do YouTube."
        );

        return;
    }


    const newLesson = {

        id: Date.now(),

        title,

        subject,

        url,

        description,

        completed: false,

        score: null,

        quiz: [

            {
                question:
                    "Qual foi o principal assunto apresentado nesta aula?",

                options: [

                    "O conteúdo apresentado durante a aula",

                    "Um assunto diferente",

                    "Nenhuma das alternativas",

                    "Não sei"

                ],

                answer: 0
            },


            {
                question:
                    "Qual alternativa representa melhor o conteúdo estudado?",

                options: [

                    "O assunto explicado na aula",

                    "Um assunto completamente diferente",

                    "Nenhuma das alternativas",

                    "Não sei"

                ],

                answer: 0
            }

        ]

    };


    lessons.push(newLesson);


    save();


    closeLessonModal();


    document.getElementById(
        "lessonTitle"
    ).value = "";


    document.getElementById(
        "lessonSubject"
    ).value = "";


    document.getElementById(
        "lessonUrl"
    ).value = "";


    document.getElementById(
        "lessonDescription"
    ).value = "";


    renderLessons();
}


/* =========================================
   CONCLUIR AULA
========================================= */

function completeLesson(id) {

    const lesson =
        lessons.find(
            lesson => lesson.id === id
        );


    if (!lesson) {
        return;
    }


    lesson.completed =
        !lesson.completed;


    save();

    renderLessons();
}


/* =========================================
   EXCLUIR AULA
========================================= */

function deleteLesson(id) {

    const confirmDelete =
        confirm(
            "Deseja realmente excluir esta aula?"
        );


    if (!confirmDelete) {
        return;
    }


    lessons =
        lessons.filter(
            lesson => lesson.id !== id
        );


    save();

    renderLessons();
}


/* =========================================
   ABRIR QUIZ
========================================= */

function openQuiz(id) {

    currentLesson =
        lessons.find(
            lesson => lesson.id === id
        );


    if (!currentLesson) {
        return;
    }


    document.getElementById(
        "quizTitle"
    ).textContent =
        "🧠 Quiz — " +
        currentLesson.title;


    const content =
        document.getElementById(
            "quizContent"
        );


    content.innerHTML = "";


    currentLesson.quiz.forEach(
        (question, index) => {

            const div =
                document.createElement("div");


            div.className =
                "question";


            let html = `

                <h4>
                    ${index + 1}.
                    ${question.question}
                </h4>

            `;


            question.options.forEach(
                (option, optionIndex) => {

                    html += `

                        <label class="option">

                            <input
                                type="radio"
                                name="question${index}"
                                value="${optionIndex}"
                            >

                            ${option}

                        </label>

                    `;

                }
            );


            div.innerHTML =
                html;


            content.appendChild(div);

        }
    );


    const button =
        document.createElement(
            "button"
        );


    button.className =
        "btn btn-primary";


    button.style.width =
        "100%";


    button.textContent =
        "Enviar respostas";


    button.onclick =
        finishQuiz;


    content.appendChild(button);


    document.getElementById(
        "quizModal"
    ).style.display =
        "flex";
}


/* =========================================
   FINALIZAR QUIZ
========================================= */

function finishQuiz() {

    let correct = 0;


    currentLesson.quiz.forEach(
        (question, index) => {

            const selected =
                document.querySelector(
                    `input[name="question${index}"]:checked`
                );


            if (

                selected &&

                Number(selected.value)
                === question.answer

            ) {

                correct++;

            }

        }
    );


    const total =
        currentLesson.quiz.length;


    const score =
        Math.round(
            (correct / total) * 100
        );


    currentLesson.score =
        score;


    currentLesson.completed =
        true;


    save();


    document.getElementById(
        "quizContent"
    ).innerHTML = `

        <div class="result">

            <h2>
                🎉 Quiz concluído!
            </h2>


            <p>
                Você acertou:
            </p>


            <strong>
                ${correct}/${total}
            </strong>


            <p>
                questões
            </p>


            <br>


            <p>
                Sua pontuação:
            </p>


            <strong>
                ${score}%
            </strong>


            <br><br>


            ${
                score >= 70

                ?

                `
                <p>
                    🌟 Muito bem!
                    Você demonstrou
                    um bom domínio
                    do conteúdo.
                </p>
                `

                :

                `
                <p>
                    📖 Continue estudando
                    e tente novamente!
                </p>
                `
            }


            <br>


            <button
                class="btn btn-primary"
                onclick="closeQuiz()">

                Voltar para as aulas

            </button>

        </div>

    `;


    renderLessons();
}


/* =========================================
   FECHAR QUIZ
========================================= */

function closeQuiz() {

    document.getElementById(
        "quizModal"
    ).style.display =
        "none";
}


/* =========================================
   FECHAR MODAIS CLICANDO FORA
========================================= */

window.addEventListener(
    "click",
    function(event) {

        const lessonModal =
            document.getElementById(
                "lessonModal"
            );


        const quizModal =
            document.getElementById(
                "quizModal"
            );


        if (
            event.target ===
            lessonModal
        ) {

            closeLessonModal();

        }


        if (
            event.target ===
            quizModal
        ) {

            closeQuiz();

        }

    }
);


/* =========================================
   INICIALIZAÇÃO
========================================= */

renderLessons();
```
