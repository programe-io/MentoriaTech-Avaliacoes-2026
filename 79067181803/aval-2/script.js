```javascript
const textoPost = document.getElementById("textoPost");
const btnPublicar = document.getElementById("btnPublicar");
const feed = document.getElementById("feed");

btnPublicar.addEventListener("click", publicarPost);

function publicarPost() {
    const texto = textoPost.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.classList.add("post");

    post.innerHTML = `
        <div class="post-topo">
            <span class="usuario">@usuario</span>
            <span class="data">Agora</span>
        </div>

        <p>${texto}</p>

        <div class="acoes">
            <button class="btn-curtir">
                ❤️ Curtir <span>0</span>
            </button>

            <button class="btn-excluir">
                🗑️ Excluir
            </button>
        </div>
    `;

    const btnCurtir = post.querySelector(".btn-curtir");
    const contador = btnCurtir.querySelector("span");
    const btnExcluir = post.querySelector(".btn-excluir");

    let curtidas = 0;

    btnCurtir.addEventListener("click", () => {
        if (btnCurtir.classList.contains("curtido")) {
            curtidas--;
            btnCurtir.classList.remove("curtido");
        } else {
            curtidas++;
            btnCurtir.classList.add("curtido");
        }

        contador.textContent = curtidas;
    });

    btnExcluir.addEventListener("click", () => {
        post.remove();
    });

    feed.prepend(post);

    textoPost.value = "";
}
```
