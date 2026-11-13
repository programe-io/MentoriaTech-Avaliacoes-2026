
const pessoas = [
    {
        nome: "Marlos",
        inicial: "M",
        texto: "E aí, pessoal! 👋"
    },
    {
        nome: "Isadora",
        inicial: "I",
        texto: "Um dia especial! 💖"
    },
    {
        nome: "Felpz",
        inicial: "F",
        texto: "Só vibe boa 😎"
    },
    {
        nome: "Pierre",
        inicial: "P",
        texto: "Salve, galera! ✨"
    }
];

const storiesList = document.getElementById("storiesList");
const suggestions = document.getElementById("suggestions");
const modal = document.getElementById("storyModal");
const toast = document.getElementById("toast");

// CRIAR STORIES E SUGESTÕES

pessoas.forEach(pessoa => {

    const botao = document.createElement("button");

    botao.className = "story";

    botao.innerHTML = `
        <div class="story-ring">
            <div class="avatar">${pessoa.inicial}</div>
        </div>
        <span class="story-name">${pessoa.nome}</span>
    `;

    botao.addEventListener("click", () => {
        abrirStory(pessoa);
    });

    storiesList.appendChild(botao);

    // SUGESTÕES

    if (pessoa.nome !== "Marlos") {

        const item = document.createElement("div");

        item.className = "suggestion";

        item.innerHTML = `
            <div class="avatar">${pessoa.inicial}</div>

            <div>
                <strong>${pessoa.nome}</strong>
                <small>Está no Insta Escolar</small>
            </div>

            <button class="link-btn">Seguir</button>
        `;

        const seguir = item.querySelector("button");

        seguir.addEventListener("click", () => {

            seguir.textContent =
                seguir.textContent === "Seguir"
                ? "Seguindo"
                : "Seguir";

        });

        suggestions.appendChild(item);
    }

});

// ABRIR STORIES

function abrirStory(pessoa) {

    document.getElementById("storyAvatar").textContent =
        pessoa.inicial;

    document.getElementById("storyName").textContent =
        pessoa.nome;

    document.getElementById("storyText").textContent =
        pessoa.texto;

    modal.classList.add("open");
}

// FECHAR STORIES

function fecharStory() {

    modal.classList.remove("open");

}

document.getElementById("closeStory")
    .addEventListener("click", fecharStory);

modal.addEventListener("click", event => {

    if (event.target === modal) {
        fecharStory();
    }

});

// CURTIDAS

let curtidas = 128;

document.querySelector(".like-btn")
    .addEventListener("click", event => {

        const botao = event.currentTarget;

        botao.classList.toggle("liked");

        if (botao.classList.contains("liked")) {
            curtidas++;
        } else {
            curtidas--;
        }

        document.getElementById("likes").textContent =
            curtidas;

    });

// SALVAR PUBLICAÇÃO

document.querySelector(".save-btn")
    .addEventListener("click", () => {

        mostrarAviso("Publicação salva!");

    });

// COMPARTILHAR

document.getElementById("shareBtn")
    .addEventListener("click", () => {

        mostrarAviso("Link copiado (demonstração)!");

    });

// ABRIR CAMPO DE COMENTÁRIO

document.querySelector(".comment-focus")
    .addEventListener("click", () => {

        document.getElementById("commentInput").focus();

    });

// MOSTRAR COMENTÁRIOS

document.getElementById("viewComments")
    .addEventListener("click", () => {

        document.getElementById("comments")
            .classList.toggle("show");

    });

// PUBLICAR COMENTÁRIO

document.getElementById("commentForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        const input =
            document.getElementById("commentInput");

        const texto = input.value.trim();

        if (texto === "") {
            return;
        }

        const comentario = document.createElement("p");

        const nome = document.createElement("strong");

        nome.textContent = "Marlos";

        comentario.append(
            nome,
            document.createTextNode(" " + texto)
        );

        document.getElementById("comments")
            .appendChild(comentario);

        document.getElementById("comments")
            .classList.add("show");

        input.value = "";

        mostrarAviso("Comentário publicado!");

    });

// MOSTRAR AVISOS

function mostrarAviso(mensagem) {

    toast.textContent = mensagem;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 1800);

}
