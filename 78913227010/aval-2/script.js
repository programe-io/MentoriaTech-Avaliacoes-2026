
// =================================
// MUSIC NEWS BY CLARA BEATRIZ
// =================================


// 1. SISTEMA DE CURTIDAS

function like(button) {

    if (button.classList.contains("liked")) {

        button.classList.remove("liked");
        button.innerHTML = "♡ Curtir";
        button.style.background = "#e83e8c";

    } else {

        button.classList.add("liked");
        button.innerHTML = "♥ Curtido";
        button.style.background = "#9b3bd1";

    }

}


// 2. SISTEMA DE PESQUISA DE NOTÍCIAS

const search = document.getElementById("search");

const cards = document.querySelectorAll(".card");

search.addEventListener("input", function() {

    const value = search.value.toLowerCase();

    cards.forEach(card => {

        const content = card.innerText.toLowerCase();

        if (content.includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});


// 3. MENSAGEM DE BOAS-VINDAS

console.log(
    "🎵 Bem-vindo ao Music News by Clara Beatriz!"
);


// 4. ANIMAÇÃO DOS CARDS

cards.forEach(card => {

    card.addEventListener("mouseenter", function() {

        card.style.transition = "0.3s";

    });

});


// 5. VOLTAR AO TOPO

window.addEventListener("scroll", function() {

    const topButton = document.getElementById("backTop");

    if (topButton) {

        if (window.scrollY > 300) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }

    }

});

function backToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}
