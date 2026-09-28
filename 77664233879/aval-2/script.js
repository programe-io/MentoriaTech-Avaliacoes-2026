function publicar() {

    let texto = document.getElementById("textoPost").value;

    if (texto == "") {
        alert("Escreva alguma coisa!");
        return;
    }

    let feed = document.getElementById("feed");

    let post = document.createElement("article");

    post.className = "post";

    post.innerHTML = `
        <div class="cabecalho-post">

            <img src="https://instagram.fpnz9-1.fna.fbcdn.net/v/t51.2885-19/462363736_1080118450371097_196227837614665409_n.jpg?stp=cp0_dst-jpg_s110x80_tt6&_nc_cat=107&_nc_map=urlgen_bucketless&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=jUxO2mlDcNAQ7kNvwFNIh1f&_nc_oc=AdrKeeH5LXfroKfbHgRzqooiJDMLbAjxm1Ouv2vch7-9lpn4awC9nLqrMVr3pebPDEE&_nc_zt=24&_nc_ht=instagram.fpnz9-1.fna&_nc_ss=7baaf&oh=00_AQKvAuya7G88QMHaZAWJMhMwoy7eKZH6HdETfmAhClbE5Q&oe=6AB75235">

            <div>
                <strong>Elsomar</strong>
                <small>Agora</small>
            </div>

        </div>

        <p>${texto}</p>

        <div class="acoes">

            <button onclick="curtir(this)">
                ❤️ Curtir <span>0</span>
            </button>

            <button>
                💬 Comentar
            </button>

            <button onclick="excluir(this)">
                🗑️ Excluir
            </button>

        </div>
    `;

    feed.prepend(post);

    document.getElementById("textoPost").value = "";
}


function curtir(botao) {

    let numero = botao.querySelector("span");

    numero.innerText = Number(numero.innerText) + 1;
}


function excluir(botao) {

    let post = botao.closest(".post");

    post.remove();

}