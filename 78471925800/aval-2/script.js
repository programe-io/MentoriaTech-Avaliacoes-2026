// ==========================
// CURTIDAS
// ==========================

const likeButtons = document.querySelectorAll(".like");

likeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const counter = button.querySelector("span");

        let likes = Number(counter.textContent);

        if (button.classList.contains("liked")) {

            likes--;

            button.classList.remove("liked");

            button.style.color = "";

        } else {

            likes++;

            button.classList.add("liked");

            button.style.color = "#2563eb";

        }

        counter.textContent = likes;

    });

});


// ==========================
// PESQUISA
// ==========================

const search = document.getElementById("search");
const posts = document.querySelectorAll(".post");

search.addEventListener("input", () => {

    const term = search.value.toLowerCase();

    posts.forEach(post => {

        const content = post.textContent.toLowerCase();

        if (content.includes(term)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }

    });

});


// ==========================
// FILTRO
// ==========================

const filter = document.getElementById("filter");

filter.addEventListener("change", () => {

    const selected = filter.value;

    posts.forEach(post => {

        const category = post.dataset.category;

        if (
            selected === "todos" ||
            category === selected
        ) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }

    });

});


// ==========================
// MODAL
// ==========================

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

const readButtons = document.querySelectorAll(".read-more");

readButtons.forEach(button => {

    button.addEventListener("click", () => {

        modalTitle.textContent =
            button.dataset.title;

        modalText.textContent =
            button.dataset.text;

        modal.classList.add("show");

    });

});

closeModal.addEventListener("click", () => {

    modal.classList.remove("show");

});


modal.addEventListener("click", event => {

    if (event.target === modal) {
        modal.classList.remove("show");
    }

});


// ==========================
// TEMA ESCURO
// ==========================

const themeButton =
    document.getElementById("themeButton");

let darkMode = false;

themeButton.addEventListener("click", () => {

    darkMode = !darkMode;

    if (darkMode) {

        document.body.style.background = "#0f172a";
        document.body.style.color = "#e2e8f0";

        document
            .querySelectorAll(".post, .trending, .about, .category-grid div")
            .forEach(element => {

                element.style.background = "#1e293b";
                element.style.borderColor = "#334155";

            });

        themeButton.textContent = "☀️";

    } else {

        location.reload();

    }

});
