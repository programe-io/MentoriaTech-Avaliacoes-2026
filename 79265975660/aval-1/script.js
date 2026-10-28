/* =========================================
   CEMNL — SCRIPT
========================================= */


/* =========================================
   ANO AUTOMÁTICO
========================================= */

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =========================================
   IDIOMA
========================================= */

const languageButton = document.getElementById("languageButton");

let currentLanguage =
    localStorage.getItem("cemnl-language") || "pt";

function updateLanguage() {

    const elements = document.querySelectorAll("[data-pt][data-en]");

    elements.forEach(element => {

        const text =
            currentLanguage === "pt"
                ? element.dataset.pt
                : element.dataset.en;

        element.textContent = text;
    });

    languageButton.textContent =
        currentLanguage === "pt"
            ? "EN"
            : "PT";

    document.documentElement.lang =
        currentLanguage === "pt"
            ? "pt-BR"
            : "en";
}

languageButton.addEventListener("click", () => {

    currentLanguage =
        currentLanguage === "pt"
            ? "en"
            : "pt";

    localStorage.setItem(
        "cemnl-language",
        currentLanguage
    );

    updateLanguage();
});

updateLanguage();


/* =========================================
   REVEAL ON SCROLL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   STOP-MOTION
========================================= */

const collageElements =
    document.querySelectorAll(
        ".photo, .visual-card"
    );

collageElements.forEach((element, index) => {

    setTimeout(() => {

        element.classList.add("stop-motion");

    }, index * 180);

});


/* =========================================
   MODAL
========================================= */

const modal =
    document.getElementById("postModal");

const modalClose =
    document.getElementById("modalClose");

const modalBackground =
    document.querySelector(".modal-background");

const modalTitle =
    document.getElementById("modalTitle");

const modalLabel =
    document.getElementById("modalLabel");

const modalText =
    document.getElementById("modalText");


const posts = {

    music: {

        label: {
            pt: "NOTA / MÚSICA",
            en: "NOTE / MUSIC"
        },

        title: {
            pt: "Música é uma linguagem.",
            en: "Music is a language."
        },

        text: {

            pt: `
                <p>
                    Algumas coisas são difíceis de explicar usando palavras.
                    Às vezes uma música consegue dizer exatamente aquilo que
                    estava faltando.
                </p>

                <p>
                    Talvez seja por isso que eu sempre volto para música.
                    Ela consegue guardar momentos, ideias e referências de
                    uma forma que nenhuma outra coisa consegue.
                </p>

                <p>
                    Uma música pode ser uma fotografia de uma época.
                    Você escuta anos depois e, de repente, lembra de tudo.
                </p>
            `,

            en: `
                <p>
                    Some things are difficult to explain using words.
                    Sometimes a song can say exactly what was missing.
                </p>

                <p>
                    Maybe that's why I always come back to music.
                    It can hold moments, ideas and references in a way
                    nothing else can.
                </p>

                <p>
                    A song can be a photograph of a certain time.
                    You listen years later and suddenly remember everything.
                </p>
            `
        }

    },


    random: {

        label: {
            pt: "NOTA / RANDOM",
            en: "NOTE / RANDOM"
        },

        title: {
            pt: "Coisas aleatórias que fazem sentido.",
            en: "Random things that make sense."
        },

        text: {

            pt: `
                <p>
                    Nem tudo precisa ter uma categoria.
                </p>

                <p>
                    Às vezes eu vejo uma imagem, escuto uma música,
                    encontro uma roupa, assisto alguma coisa ou descubro
                    uma pessoa interessante e simplesmente guardo aquilo.
                </p>

                <p>
                    Este blog também é sobre isso: juntar pequenas coisas
                    que, de algum jeito, acabam formando uma identidade.
                </p>
            `,

            en: `
                <p>
                    Not everything needs a category.
                </p>

                <p>
                    Sometimes I see an image, listen to a song, find an outfit,
                    watch something or discover an interesting person and
                    simply keep it.
                </p>

                <p>
                    This blog is also about that: collecting small things
                    that somehow end up forming an identity.
                </p>
            `
        }

    }

};


/* =========================================
   ABRIR POST
========================================= */

const readButtons =
    document.querySelectorAll(".read-button");

readButtons.forEach(button => {

    button.addEventListener("click", () => {

        const postId =
            button.dataset.post;

        const post =
            posts[postId];

        if (!post) return;

        modalLabel.textContent =
            post.label[currentLanguage];

        modalTitle.textContent =
            post.title[currentLanguage];

        modalText.innerHTML =
            post.text[currentLanguage];

        modal.classList.add("active");

        document.body.style.overflow = "hidden";
    });

});


/* =========================================
   FECHAR MODAL
========================================= */

function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";
}


modalClose.addEventListener(
    "click",
    closeModal
);

modalBackground.addEventListener(
    "click",
    closeModal
);


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);


/* =========================================
   ATUALIZAR MODAL QUANDO TROCAR IDIOMA
========================================= */

languageButton.addEventListener("click", () => {

    if (!modal.classList.contains("active")) {
        return;
    }

    const activeButton =
        document.querySelector(
            ".read-button.active"
        );

    if (!activeButton) {
        return;
    }

});


/* =========================================
   MOVIMENTO DO MOUSE
========================================= */

const hero =
    document.querySelector(".hero");

if (hero) {

    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left)
                / rect.width
                - 0.5;

            const y =
                (event.clientY - rect.top)
                / rect.height
                - 0.5;

            document.documentElement.style.setProperty(
                "--mouse-x",
                `${x}`
            );

            document.documentElement.style.setProperty(
                "--mouse-y",
                `${y}`
            );

        }
    );

}


/* =========================================
   PARALLAX SUAVE NAS FOTOS
========================================= */

window.addEventListener(
    "scroll",
    () => {

        const scroll =
            window.scrollY;

        const photos =
            document.querySelectorAll(
                ".hero-collage .photo"
            );

        photos.forEach(
            (photo, index) => {

                const movement =
                    scroll * (0.015 + index * 0.006);

                photo.style.marginTop =
                    `${movement}px`;

            }
        );

    },
    { passive: true }
);