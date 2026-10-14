
const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

let selectedImage = "";
let toastTimer;

function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.remove("hidden");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.add("hidden");
    }, 2500);
}

// Tema claro e escuro
function toggleTheme() {
    document.body.classList.toggle("dark");

    const dark = document.body.classList.contains("dark");
    $("#themeBtn").textContent = dark ? "☀️" : "🌙";

    try {
        localStorage.setItem("connect-theme", dark ? "dark" : "light");
    } catch (error) {}
}

try {
    if (localStorage.getItem("connect-theme") === "dark") {
        document.body.classList.add("dark");
        $("#themeBtn").textContent = "☀️";
    }
} catch (error) {}

$("#themeBtn").addEventListener("click", toggleTheme);
$("#menuTheme").addEventListener("click", toggleTheme);

$("#notificationBtn").addEventListener("click", () => {
    showToast("Você está em dia com as notificações! 🔔");
});

$("#profileBtn").addEventListener("click", () => {
    showToast("Perfil demonstrativo 👤");
});

// Curtidas, comentários e compartilhamento
$("#feed").addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;

    const post = button.closest(".post");

    if (!post) return;

    if (button.classList.contains("like-btn")) {
        const stats = $(".likes-count", post);
        const match = stats.textContent.match(/\d+/);
        let count = match ? Number(match[0]) : 0;

        const liked = button.classList.toggle("liked");
        count += liked ? 1 : -1;

        stats.textContent = `❤️ ${count} curtidas`;
        button.textContent = liked ? "❤️ Curtido" : "🤍 Curtir";
    }

    if (button.classList.contains("comment-btn")) {
        const area = $(".comment-area", post);
        area.classList.toggle("hidden");

        if (!area.classList.contains("hidden")) {
            $("input", $(".comment-form", area)).focus();
        }
    }

    if (button.classList.contains("share-btn")) {
        const shareData = {
            title: "Connect",
            text: $(".post-text", post)?.textContent || "Veja esta publicação!"
        };

        if (navigator.share) {
            navigator.share(shareData).catch(() => {});
        } else if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(shareData.text)
                .then(() => showToast("Texto copiado! 📋"))
                .catch(() => showToast("Não foi possível copiar o texto."));
        } else {
            showToast("Compartilhamento indisponível neste navegador.");
        }
    }

    if (button.classList.contains("post-menu")) {
        showToast("Opções da publicação demonstrativa.");
    }
});

// Comentários
$("#feed").addEventListener("submit", event => {
    if (!event.target.matches(".comment-form")) return;

    event.preventDefault();

    const form = event.target;
    const input = $("input", form);
    const value = input.value.trim();

    if (!value) return;

    const post = form.closest(".post");
    const paragraph = document.createElement("p");
    const name = document.createElement("strong");

    name.textContent = "Você: ";
    paragraph.append(name, document.createTextNode(value));

    $(".comment-list", form.parentElement).append(paragraph);

    const stats = $(".comments-count", post);
    const count = Number(stats.textContent.match(/\d+/)?.[0] || 0);

    stats.textContent = `${count + 1} comentários`;
    input.value = "";

    showToast("Comentário adicionado! 💬");
});

// Escolher imagem
$("#chooseImage").addEventListener("click", () => {
    $("#imageInput").click();
});

$("#imageInput").addEventListener("change", event => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        showToast("Escolha um arquivo de imagem.");
        event.target.value = "";
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        showToast("A imagem deve ter no máximo 5 MB.");
        event.target.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        selectedImage = reader.result;
        $("#selectedFile").textContent =
            "📷 Imagem selecionada: " + file.name;
    };

    reader.onerror = () => {
        showToast("Não foi possível ler a imagem.");
    };

    reader.readAsDataURL(file);
});

// Inserir emoji
$("#emojiBtn").addEventListener("click", () => {
    const input = $("#postText");
    input.value += " 😊";
    input.focus();
});

// Criar publicação
$("#publishBtn").addEventListener("click", () => {
    const input = $("#postText");
    const text = input.value.trim();

    if (!text && !selectedImage) {
        showToast("Escreva algo ou selecione uma foto! ✍️");
        input.focus();
        return;
    }

    const post = document.createElement("article");
    post.className = "panel post";
    post.dataset.search = text.toLocaleLowerCase("pt-BR");

    const head = document.createElement("div");
    head.className = "post-head";

    const avatar = document.createElement("img");
    avatar.className = "avatar";
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.alt = "Seu perfil";

    const info = document.createElement("div");
    info.className = "post-info";

    const title = document.createElement("h3");
    title.textContent = "Meu perfil";

    const time = document.createElement("span");
    time.className = "muted";
    time.textContent = "Agora mesmo · 🌎";

    info.append(title, time);

    const options = document.createElement("button");
    options.className = "post-menu";
    options.setAttribute("aria-label", "Opções");
    options.textContent = "···";

    head.append(avatar, info, options);
    post.append(head);

    if (text) {
        const paragraph = document.createElement("p");
        paragraph.className = "post-text";
        paragraph.textContent = text;
        post.append(paragraph);
    }

    if (selectedImage) {
        const image = document.createElement("img");
        image.className = "post-image";
        image.src = selectedImage;
        image.alt = "Imagem da minha publicação";
        post.append(image);
    }

    const stats = document.createElement("div");
    stats.className = "post-stats";

    const likes = document.createElement("span");
    likes.className = "likes-count";
    likes.textContent = "❤️ 0 curtidas";

    const comments = document.createElement("span");
    comments.className = "comments-count";
    comments.textContent = "0 comentários";

    stats.append(likes, comments);
    post.append(stats);

    const actions = document.createElement("div");
    actions.className = "post-actions";

    [
        ["like-btn", "🤍 Curtir"],
        ["comment-btn", "💬 Comentar"],
        ["share-btn", "↗️ Compartilhar"]
    ].forEach(([className, label]) => {
        const button = document.createElement("button");
        button.className = className;
        button.textContent = label;
        actions.append(button);
    });

    post.append(actions);

    const area = document.createElement("div");
    area.className = "comment-area hidden";

    const list = document.createElement("div");
    list.className = "comment-list";

    const form = document.createElement("form");
    form.className = "comment-form";

    const commentInput = document.createElement("input");
    commentInput.placeholder = "Escreva um comentário...";
    commentInput.maxLength = 300;
    commentInput.required = true;

    const send = document.createElement("button");
    send.type = "submit";
    send.textContent = "Enviar";

    form.append(commentInput, send);
    area.append(list, form);
    post.append(area);

    $("#feed").prepend(post);

    input.value = "";
    selectedImage = "";
    $("#imageInput").value = "";
    $("#selectedFile").textContent = "";
    $("#noResults").classList.add("hidden");

    showToast("Publicação criada com sucesso! 🎉");

    post.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// Pesquisar publicações
$("#searchInput").addEventListener("input", event => {
    const query = event.target.value.trim().toLocaleLowerCase("pt-BR");
    const posts = $$(".post", $("#feed"));
    let visible = 0;

    posts.forEach(post => {
        const matches =
            post.textContent.toLocaleLowerCase("pt-BR").includes(query) ||
            (post.dataset.search || "").includes(query);

        post.classList.toggle("hidden", !matches);

        if (matches) visible++;
    });

    $("#noResults").classList.toggle("hidden", visible !== 0);
});

// Seguir e deixar de seguir
$$(".follow-btn").forEach(button => {
    button.addEventListener("click", () => {
        const following = button.textContent === "Seguindo";

        button.textContent = following ? "Seguir" : "Seguindo";

        showToast(
            following
                ? "Você deixou de seguir."
                : "Agora você está seguindo! ✨"
        );
    });
});

// Stories demonstrativos
$$("[data-story]").forEach(button => {
    button.addEventListener("click", () => {
        showToast("Você está vendo o story de " + button.dataset.story + " 👀");
    });
});

$("#addStory").addEventListener("click", () => {
    showToast("Os stories são demonstrativos nesta versão.");
});
