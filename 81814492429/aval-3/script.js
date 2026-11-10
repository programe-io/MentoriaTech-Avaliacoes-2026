
/* BOTÕES DO PERFIL */

const seguirBtn = document.getElementById("seguirBtn");
const mensagemBtn = document.getElementById("mensagemBtn");

let seguindo = false;


/* BOTÃO SEGUIR */

seguirBtn.addEventListener("click", function() {

    seguindo = !seguindo;

    if (seguindo) {

        seguirBtn.textContent = "Seguindo ✓";

        seguirBtn.style.background = "#efefef";
        seguirBtn.style.color = "#262626";

    } else {

        seguirBtn.textContent = "Seguir";

        seguirBtn.style.background = "#0095f6";
        seguirBtn.style.color = "#ffffff";

    }

});


/* BOTÃO MENSAGEM */

mensagemBtn.addEventListener("click", function() {

    alert("Esta é uma demonstração de perfil. A função de mensagens não está conectada.");

});


/* NAVEGAÇÃO DAS ABAS */

const navItems = document.querySelectorAll(".nav-item");
const postsGrid = document.getElementById("postsGrid");

navItems.forEach(function(item) {

    item.addEventListener("click", function() {

        navItems.forEach(function(nav) {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        const tab = item.dataset.tab;

        if (tab === "posts") {

            postsGrid.style.display = "grid";

        } else {

            postsGrid.style.display = "none";

        }

    });

});


/* EFEITO NAS PUBLICAÇÕES */

const posts = document.querySelectorAll(".post");

posts.forEach(function(post) {

    post.addEventListener("click", function() {

        console.log("Publicação selecionada!");

    });

});
