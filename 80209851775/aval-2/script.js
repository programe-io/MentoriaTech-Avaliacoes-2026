
// CURTIR PUBLICAÇÃO
function like(button) {
    button.classList.toggle("like");

    if (button.classList.contains("like")) {
        button.innerHTML = "♥";
    } else {
        button.innerHTML = "♡";
    }
}

// FOCAR NO CAMPO DE COMENTÁRIO
function focusComment(button) {
    const post = button.closest(".post");
    post.querySelector("input").focus();
}

// PUBLICAR COMENTÁRIO
function comment(button) {
    const post = button.closest(".post");
    const input = post.querySelector("input");
    const comments = post.querySelector(".comments");

    const texto = input.value.trim();

    if (texto !== "") {
        const p = document.createElement("p");

        const usuario = document.createElement("strong");
        usuario.textContent = "seu_usuario";

        p.appendChild(usuario);
        p.appendChild(document.createTextNode(" " + texto));

        comments.after(p);

        input.value = "";
    }
}

// SEGUIR E DEIXAR DE SEGUIR
function follow(button) {
    if (button.innerText === "Seguir") {
        button.innerText = "Seguindo";
    } else {
        button.innerText = "Seguir";
    }
}

// SALVAR PUBLICAÇÃO
function savePost(button) {
    button.classList.toggle("saved");

    if (button.classList.contains("saved")) {
        button.innerHTML = "🔖";
    } else {
        button.innerHTML = "♧";
    }
}

// COMPARTILHAR PUBLICAÇÃO
function sharePost() {
    if (navigator.share) {
        navigator.share({
            title: "Instagram",
            text: "Confira esta publicação!"
        });
    } else {
        alert("Compartilhamento não disponível neste navegador.");
    }
}

// PESQUISAR
function searchUser() {
    const search = document.getElementById("search");

    if (search && search.value.trim() !== "") {
        alert("Pesquisando: " + search.value);
    }
}

// CRIAR PUBLICAÇÃO COM IMAGEM
function previewImage(event) {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Selecione uma imagem válida!");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const img = document.getElementById("preview");

        if (img) {
            img.src = e.target.result;
            img.style.display = "block";
        }
    };

    reader.readAsDataURL(file);
}
