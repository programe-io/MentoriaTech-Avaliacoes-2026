
// CURTIR PUBLICAÇÃO

function likePost(button) {

    const icon = button.querySelector("i");
    const post = button.closest(".post");
    const likes = post.querySelector(".likes");

    let count = Number(likes.dataset.count || 1250);

    if (icon.classList.contains("fa-regular")) {

        icon.classList.replace("fa-regular", "fa-solid");
        button.classList.add("liked");

        count++;

    } else {

        icon.classList.replace("fa-solid", "fa-regular");
        button.classList.remove("liked");

        count--;

    }

    likes.dataset.count = count;
    likes.innerText = count.toLocaleString("pt-BR") + " curtidas";
}


// FOCAR NO CAMPO DE COMENTÁRIO

function focusComment(button) {

    const post = button.closest(".post");

    post.querySelector(".comment-area input").focus();

}


// ADICIONAR COMENTÁRIO

function addComment(button) {

    const area = button.closest(".comment-area");
    const input = area.querySelector("input");

    const text = input.value.trim();

    if (text === "") {
        alert("Digite um comentário!");
        return;
    }

    const post = button.closest(".post");

    const comment = document.createElement("p");

    comment.className = "caption";

    const username = document.createElement("strong");
    username.textContent = " clarabeatriz ";

    comment.appendChild(username);
    comment.appendChild(document.createTextNode(text));

    post.insertBefore(comment, area);

    input.value = "";

}


// SALVAR PUBLICAÇÃO

document.querySelectorAll(".save").forEach(button => {

    button.addEventListener("click", function() {

        const icon = this.querySelector("i");

        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");

        alert("Publicação atualizada nos salvos! ♡");

    });

});


// CRIAR PUBLICAÇÃO COM FOTO

const photoInput = document.getElementById("photoInput");

photoInput.addEventListener("change", function() {

    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Selecione uma imagem válida!");
        return;
    }

    const imageURL = URL.createObjectURL(file);

    const post = document.createElement("article");

    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=47">
            <strong>clarabeatriz</strong>
            <span>• agora</span>
        </div>

        <img class="post-image" src="${imageURL}" alt="Nova publicação">

        <div class="actions">
            <button onclick="likePost(this)">
                <i class="fa-regular fa-heart"></i>
            </button>
            <button onclick="focusComment(this)">
                <i class="fa-regular fa-comment"></i>
            </button>
            <button>
                <i class="fa-regular fa-paper-plane"></i>
            </button>
            <button class="save">
                <i class="fa-regular fa-bookmark"></i>
            </button>
        </div>

        <p class="likes" data-count="0">0 curtidas</p>

        <p class="caption">
            <strong>clarabeatriz</strong>
            Minha nova publicação! 💗
        </p>

        <div class="comment-area">
            <input type="text" placeholder="Adicione um comentário...">
            <button onclick="addComment(this)">Publicar</button>
        </div>
    `;

    document.getElementById("feed").prepend(post);

    this.value = "";

    alert("Sua publicação foi adicionada! 💗");

});
