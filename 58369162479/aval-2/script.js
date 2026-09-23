function publicar() {

    const nome =
        document.getElementById("nome").value.trim();

    const esporte =
        document.getElementById("esporte").value;

    const texto =
        document.getElementById("textoPost").value.trim();


    // Verificar se os campos foram preenchidos

    if (nome === "" || texto === "") {

        alert(
            "Preencha seu nome e escreva uma publicação!"
        );

        return;
    }


    // Pegar a lista de posts

    const listaPosts =
        document.getElementById("listaPosts");


    // Criar o post

    const post =
        document.createElement("article");

    post.classList.add("post");


    // Primeira letra do nome

    const inicial =
        nome.charAt(0).toUpperCase();


    // Montar o HTML do post

    post.innerHTML = `

        <div class="post-topo">

            <div class="avatar">
                ${inicial}
            </div>

            <div>

                <strong>
                    ${nome}
                </strong>

                <small>
                    ${esporte} • Agora
                </small>

            </div>

        </div>


        <p>
            ${texto}
        </p>


        <div class="acoes">

            <button onclick="curtir(this)">
                ❤️ Curtir <span>0</span>
            </button>

            <button onclick="excluirPost(this)">
                🗑️ Excluir
            </button>

        </div>

    `;


    // Colocar o novo post no começo do feed

    listaPosts.prepend(post);


    // Limpar os campos

    document.getElementById("nome").value = "";

    document.getElementById("textoPost").value = "";

}


/* CURTIR POST */

function curtir(botao) {

    const contador =
        botao.querySelector("span");


    let curtidas =
        Number(contador.textContent);


    curtidas++;


    contador.textContent =
        curtidas;
}


/* EXCLUIR POST */

function excluirPost(botao) {

    const post =
        botao.closest(".post");


    post.remove();
}