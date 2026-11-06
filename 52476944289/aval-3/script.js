
// ==================================
// INSTAMINI - JAVASCRIPT
// ==================================

// 1. SISTEMA DE CURTIDAS
document.querySelectorAll(".like").forEach(button => {

    button.addEventListener("click", () => {

        const post = button.closest(".post");
        const count = post.querySelector(".like-count");

        let number = Number(count.textContent);

        if (button.classList.contains("liked")) {

            button.classList.remove("liked");
            button.textContent = "♡";
            count.textContent = number - 1;

        } else {

            button.classList.add("liked");
            button.textContent = "♥";
            count.textContent = number + 1;

        }

    });

});


// 2. CRIAR PUBLICAÇÕES
document.getElementById("createForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const input = document.getElementById("postText");
    const text = input.value.trim();

    if (!text) return;

    const post = document.createElement("article");
    post.className = "post";

    const head = document.createElement("div");
    head.className = "post-head";

    const user = document.createElement("b");
    user.textContent = "seu_perfil";

    head.appendChild(user);

    const content = document.createElement("div");
    content.className = "post-content";

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    content.appendChild(paragraph);

    post.appendChild(head);
    post.appendChild(content);

    document.getElementById("feed").prepend(post);

    input.value = "";

    alert("Publicação criada com sucesso!");

});


// 3. SISTEMA DE PESQUISA
document.getElementById("search")
.addEventListener("input", function() {

    const search = this.value.toLowerCase();

    document.querySelectorAll("#feed .post")
    .forEach(post => {

        const content = post.textContent.toLowerCase();

        post.style.display =
            content.includes(search) ? "block" : "none";

    });

});


// 4. SISTEMA DE COMENTÁRIOS
document.querySelectorAll(".post").forEach(post => {

    const comment = document.createElement("form");

    comment.className = "comment-form";

    comment.innerHTML = `
        <input
            type="text"
            placeholder="Adicione um comentário..."
            maxlength="120"
            required
        >

        <button type="submit">Publicar</button>
    `;

    post.appendChild(comment);

    comment.addEventListener("submit", function(event) {

        event.preventDefault();

        const input = comment.querySelector("input");
        const text = input.value.trim();

        if (!text) return;

        const paragraph = document.createElement("p");

        const username = document.createElement("b");
        username.textContent = "seu_perfil ";

        paragraph.appendChild(username);
        paragraph.appendChild(document.createTextNode(text));

        paragraph.className = "post-content";

        comment.before(paragraph);

        input.value = "";

    });

});


// 5. BOTÃO DE SEGUIR
document.querySelectorAll(".suggestion button")
.forEach(button => {

    button.addEventListener("click", () => {

        if (button.textContent === "Seguir") {

            button.textContent = "Seguindo";

        } else {

            button.textContent = "Seguir";

        }

    });

});


// 6. MENSAGEM DE COMPARTILHAMENTO
document.querySelectorAll(".post-actions button")
.forEach((button, index) => {

    if (index === 2) {

        button.addEventListener("click", () => {

            alert("Compartilhamento demonstrativo!");

        });

    }

});

console.log("InstaMini iniciado com sucesso!");
