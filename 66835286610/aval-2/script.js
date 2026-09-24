```javascript
// =========================
// MENU MOBILE
// =========================

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {

    menu.classList.toggle("active");

});


// =========================
// FECHAR MENU AO CLICAR
// =========================

const links = document.querySelectorAll("#menu a");

links.forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("active");

    });

});


// =========================
// BOTÕES DAS TRILHAS
// =========================

const trilhaButtons =
    document.querySelectorAll(".trilha-btn");

trilhaButtons.forEach(button => {

    button.addEventListener("click", () => {

        const trilha =
            button.closest(".trilha-card")
            .querySelector("h3")
            .textContent;

        alert(
            `Você selecionou a trilha: ${trilha}\n\nEm breve você poderá acessar todos os conteúdos dessa trilha!`
        );

    });

});


// =========================
// ANIMAÇÃO DOS CARDS
// =========================

const cards =
    document.querySelectorAll(
        ".trilha-card, .beneficio, .depoimento"
    );


const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.15
    }

);


cards.forEach(card => {

    observer.observe(card);

});
```
