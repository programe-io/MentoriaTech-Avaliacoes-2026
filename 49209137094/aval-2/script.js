function curtir(botao) {
    const contador = botao.nextElementSibling;

    let curtidas = Number(
        contador.dataset.curtidas || 0
    );

    const curtido = botao.dataset.curtido === "true";

    if (curtido) {
        curtidas--;
        botao.dataset.curtido = "false";
        botao.textContent = "❤️ Curtir";
    \} else {
        curtidas++;
        botao.dataset.curtido = "true";
        botao.textContent = "💜 Curtido";
    \}

    contador.dataset.curtidas = curtidas;
    contador.textContent = curtidas + " curtidas";
\}

function comentar(botao) {
    const area = botao.parentElement;
    const input = area.querySelector("input");
    const lista = area.querySelector(".lista-comentarios");

    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    \}

    const comentario = document.createElement("p");
    comentario.textContent = texto;

    lista.appendChild(comentario);

    input.value = "";
\}

function criarPost() {
    const input = document.getElementById("textoPost");
    const texto = input.value.trim();

    if (texto === "") {
        alert("Escreva alguma coisa!");
        return;
    \}

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="usuario">
            <img src="https://i.pravatar.cc/100?img=12">
            <strong>Você</strong>
        </div>

        <p></p>

        <div class="acoes">
            <button onclick="curtir(this)">❤️ Curtir</button>
            <span>0 curtidas</span>
        </div>

        <div class="comentarios">
            <input type="text" placeholder="Escreva um comentário...">
            <button onclick="comentar(this)">Enviar</button>
            <div class="lista-comentarios"></div>
        </div>
    `;

    post.querySelector("p").textContent = texto;

    const feed = document.getElementById("feed");
    feed.prepend(post);

    input.value = "";
\}$0