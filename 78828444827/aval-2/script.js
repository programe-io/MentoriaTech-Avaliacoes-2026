/* =========================
CURTIR
========================= */

function ativarCurtida(botao) {

```
botao.addEventListener("click", function () {

    const contador = botao.querySelector("span");

    let curtidas = Number(contador.textContent);

    curtidas++;

    contador.textContent = curtidas;

});
```

}

/* Ativa o botão Curtir dos posts existentes */

const botoesCurtir = document.querySelectorAll(".like-button");

botoesCurtir.forEach(function (botao) {

```
ativarCurtida(botao);
```

});

/* =========================
COMENTAR
========================= */

function ativarComentario(botao) {

```
botao.addEventListener("click", function () {

    const comentario = prompt("Digite seu comentário:");

    if (comentario === null) {
        return;
    }

    if (comentario.trim() === "") {
        alert("Digite algum comentário.");
        return;
    }

    alert("Comentário enviado! 💬");

});
```

}

const botoesComentar = document.querySelectorAll(".comment-button");

botoesComentar.forEach(function (botao) {

```
ativarComentario(botao);
```

});

/* =========================
NOVA PUBLICAÇÃO
========================= */

const publicarButton = document.querySelector("#publishButton");

publicarButton.addEventListener("click", function () {

```
const texto = prompt("O que você está pensando?");

if (texto === null || texto.trim() === "") {
    return;
}


const main = document.querySelector("main");

const novoPost = document.createElement("article");

novoPost.classList.add("post");


novoPost.innerHTML = `

    <div class="post-header">

        <img
            class="profile-photo"
            src="https://static.wikia.nocookie.net/dublagem/images/6/6e/Homem-Aranha_Cl%C3%A1ssico.png/revision/latest?cb=20231224151143&path-prefix=pt-br"
            alt="Foto de perfil do Gabriel"
        >

        <div>

            <strong>Gabriel</strong>

            <span>agora</span>

        </div>

    </div>


    <p class="post-text">
        ${texto}
    </p>


    <div class="post-actions">

        <button class="like-button">
            ❤️ Curtir <span>0</span>
        </button>

        <button class="comment-button">
            💬 Comentar
        </button>

    </div>

`;


main.appendChild(novoPost);


/* Ativa Curtir do novo post */

const novoBotaoCurtir =
    novoPost.querySelector(".like-button");

ativarCurtida(novoBotaoCurtir);


/* Ativa Comentar do novo post */

const novoBotaoComentar =
    novoPost.querySelector(".comment-button");

ativarComentario(novoBotaoComentar);
```

});
