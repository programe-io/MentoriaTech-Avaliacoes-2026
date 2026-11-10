
// MENU RESPONSIVO
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
});

// FECHAR MENU AO CLICAR EM UM LINK
const links = document.querySelectorAll("#menu a");

links.forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
    });
});

// PESQUISA DE ARTIGOS
const search = document.getElementById("search");
const posts = document.querySelectorAll(".post");
const noResults = document.getElementById("noResults");

search.addEventListener("input", () => {
    const value = search.value.toLowerCase();
    let found = 0;

    posts.forEach(post => {
        const content = post.innerText.toLowerCase();

        if (content.includes(value)) {
            post.style.display = "";
            found++;
        } else {
            post.style.display = "none";
        }
    });

    noResults.hidden = found !== 0;
});

// BOTÕES LEIA MAIS
const buttons = document.querySelectorAll(".read-more");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const title = button
            .closest(".post")
            .querySelector("h3")
            .innerText;

        alert("Você selecionou o artigo: " + title);
    });
});
