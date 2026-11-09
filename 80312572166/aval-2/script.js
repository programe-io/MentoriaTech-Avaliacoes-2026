function publicarPost() {
    // Captura o campo de texto e o valor digitado
    const txtArea = document.getElementById("post-input");
    const postTexto = txtArea.value.trim();

    // Validação básica para não publicar mensagens vazias
    if (postTexto === "") {
        alert("Por favor, digite alguma mensagem antes de publicar!");
        return;
    }

    // Captura o container da linha do tempo
    const timeline = document.getElementById("timeline");

    // Cria os elementos do novo post dinamicamente
    const novoPost = document.createElement("div");
    novoPost.className = "post";

    const postHeader = document.createElement("div");
    postHeader.className = "post-header";

    const autor = document.createElement("strong");
    autor.textContent = "Você";

    const tempo = document.createElement("span");
    tempo.className = "post-time";
    tempo.textContent = "Agora mesmo";

    const conteudo = document.createElement("p");
    conteudo.className = "post-content";
    conteudo.textContent = postTexto;

    // Monta a estrutura interna do post
    postHeader.appendChild(autor);
    postHeader.appendChild(tempo);
    novoPost.appendChild(postHeader);
    novoPost.appendChild(conteudo);

    // Insere o novo post no topo do feed
    timeline.insertBefore(novoPost, timeline.firstChild);

    // Limpa a caixa de texto após a publicação
    txtArea.value = "";
}