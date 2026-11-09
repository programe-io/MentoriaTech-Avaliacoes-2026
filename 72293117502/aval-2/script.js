function curtir(botao) {
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    let total = Number(likes.textContent);

    if (botao.classList.contains("curtido")) {
        botao.classList.remove("curtido");
        botao.textContent = "♡";
        total--;
    \} else {
        botao.classList.add("curtido");
        botao.textContent = "♥";
        total++;
    \}

    likes.textContent = total;
\}

// 💬 FOCAR NO COMENTÁRIO
function focarComentario(botao) {
    const post = botao.closest(".post");
    post.querySelector("input").focus();
\}

// 💬 ADICIONAR COMENTÁRIO
function comentar(event, input) {
    if (event.key === "Enter" && input.value.trim() !== "") {

        const post = input.closest(".post");
        const area = post.querySelector(".comentario");

        const novoComentario = document.createElement("p");

        novoComentario.textContent = "👤 Você: " + input.value;

        area.appendChild(novoComentario);

        input.value = "";
    \}
\}

// 📤 COMPARTILHAR PUBLICAÇÃO
function compartilhar() {
    if (navigator.share) {
        navigator.share({
            title: "Messi Social",
            text: "Confira esta publicação sobre Messi!"
        \});
    \} else {
        alert("Compartilhe o Messi Social com seus amigos!");
    \}
\}

// 📸 CRIAR NOVA PUBLICAÇÃO
function publicar() {

    const texto = document.getElementById("textoPost").value.trim();
    const imagem = document.getElementById("imagemPost").value.trim();

    if (!texto) {
        alert("Digite alguma coisa para publicar!");
        return;
    \}

    const post = document.createElement("div");
    post.className = "post";

    // Cabeçalho
    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";
    cabecalho.textContent = "👤 Você • Agora";

    post.appendChild(cabecalho);

    // Imagem
    if (imagem) {
        try {
            const url = new URL(imagem);

            if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error("URL inválida");
            \}

            const img = document.createElement("img");

            img.className = "post-image";
            img.src = url.href;
            img.alt = "Imagem da publicação";

            img.onerror = () => img.remove();

            post.appendChild(img);

        \} catch {
            alert("Digite um link de imagem válido!");
            return;
        \}
    \}

    // Conteúdo
    const conteudo = document.createElement("div");
    conteudo.className = "post-content";

    const textoPost = document.createElement("p");
    textoPost.textContent = texto;

    // Botões
    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const curtirBtn = document.createElement("button");
    curtirBtn.textContent = "♡";
    curtirBtn.onclick = () => curtir(curtirBtn);

    acoes.appendChild(curtirBtn);

    // Curtidas
    const likes = document.createElement("p");

    likes.innerHTML =
        '<strong><span class="likes">0</span> curtidas</strong>';

    // Comentários
    const comentario = document.createElement("div");
    comentario.className = "comentario";

    const input = document.createElement("input");
    input.placeholder = "Escreva um comentário...";

    input.onkeydown = (event) => comentar(event, input);

    conteudo.append(
        textoPost,
        acoes,
        likes,
        comentario,
        input
    );

    post.appendChild(conteudo);

    // Adicionar ao feed
    document.getElementById("novosPosts").prepend(post);

    // Limpar campos
    document.getElementById("textoPost").value = "";
    document.getElementById("imagemPost").value = "";

    alert("Publicação criada com sucesso!");
\}$0