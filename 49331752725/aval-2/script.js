
function publicar() {
    const texto = document.getElementById("textoPost").value.trim();
    const imagem = document.getElementById("imagemPost").value.trim();

    if (texto === "") {
        alert("Digite alguma coisa para publicar!");
        return;
    \}

    if (imagem) {
        try {
            const url = new URL(imagem);
            if (!["http:", "https:"].includes(url.protocol)) {
                alert("Digite uma URL válida!");
                return;
            \}
        \} catch {
            alert("Digite uma URL de imagem válida!");
            return;
        \}
    \}

    const feed = document.getElementById("feed");

    const post = document.createElement("article");
    post.className = "post";

    const nome = document.createElement("h3");
    nome.textContent = "Você";

    const conteudo = document.createElement("p");
    conteudo.textContent = texto;

    post.append(nome, conteudo);

    if (imagem) {
        const img = document.createElement("img");
        img.src = imagem;
        img.alt = "Imagem da publicação";
        post.appendChild(img);
    \}

    const botao = document.createElement("button");
    botao.innerHTML = '❤️ Curtir <span>0</span>';
    botao.onclick = function() {
        curtir(botao);
    \};

    post.appendChild(botao);

    feed.prepend(post);

    document.getElementById("textoPost").value = "";
    document.getElementById("imagemPost").value = "";
\}

function curtir(botao) {
    const contador = botao.querySelector("span");
    const curtido = botao.classList.toggle("curtido");

    let total = Number(contador.textContent);
    contador.textContent = curtido ? total + 1 : total - 1;
\}
