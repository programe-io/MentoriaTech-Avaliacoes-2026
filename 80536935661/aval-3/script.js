
// SELECIONAR TODAS AS PUBLICAÇÕES
const posts = document.querySelectorAll(".post");

// CURTIR PUBLICAÇÕES
posts.forEach(post => {

    const actions = post.querySelectorAll(".actions span");

    if (actions.length > 0) {

        const likeButton = actions[0];

        likeButton.addEventListener("click", function() {

            if (this.classList.contains("liked")) {
                this.classList.remove("liked");
                this.textContent = "♡";
            } else {
                this.classList.add("liked");
                this.textContent = "♥";
            }

        });

        // SALVAR PUBLICAÇÃO
        const saveButton = post.querySelector(".save");

        if (saveButton) {
            saveButton.addEventListener("click", function() {

                this.classList.toggle("saved");

                if (this.classList.contains("saved")) {
                    this.textContent = "▣";
                    alert("Publicação salva!");
                } else {
                    this.textContent = "♧";
                    alert("Publicação removida dos salvos!");
                }

            });
        }

        // COMENTÁRIOS
        if (actions[1]) {
            actions[1].addEventListener("click", function() {

                const comentario = prompt("Digite seu comentário:");

                if (comentario && comentario.trim() !== "") {
                    alert("Comentário enviado: " + comentario);
                }

            });
        }

        // COMPARTILHAR
        if (actions[2]) {
            actions[2].addEventListener("click", async function() {

                try {
                    await navigator.clipboard.writeText(
                        window.location.href
                    );

                    alert("Link copiado para compartilhar!");
                } catch (error) {
                    alert("Não foi possível copiar o link.");
                }

            });
        }

    }

});

// MENU DE NAVEGAÇÃO
const menuItems = document.querySelectorAll("nav span");

menuItems.forEach((item, index) => {

    item.addEventListener("click", function() {

        const nomes = [
            "Página inicial",
            "Pesquisar",
            "Criar publicação",
            "Curtidas",
            "Perfil"
        ];

        alert("Você clicou em: " + nomes[index]);

    });

});

// MENU DO CABEÇALHO
const menu = document.querySelector("header span");

if (menu) {
    menu.addEventListener("click", function() {
        alert("Menu do Instagram");
    });
}

// ADICIONAR STORY
const addStory = document.querySelector(".add");

if (addStory) {
    addStory.addEventListener("click", function() {
        alert("Adicionar um novo Story!");
    });
}
