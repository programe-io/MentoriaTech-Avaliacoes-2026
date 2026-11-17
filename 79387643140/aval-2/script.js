
// Função para curtir uma publicação
function curtir(botao) {

    let post = botao.parentElement;
    let curtidas = post.querySelector(".likes");

    let quantidade = Number(
        curtidas.dataset.total || 0
    );

    if (botao.dataset.curtido === "sim") {
        quantidade--;
        botao.dataset.curtido = "nao";
        botao.innerHTML = "♡ Curtir";
    } else {
        quantidade++;
        botao.dataset.curtido = "sim";
        botao.innerHTML = "❤️ Curtido";
    }

    curtidas.dataset.total = quantidade;
    curtidas.innerHTML = quantidade + " curtidas";
}

// Função para criar publicação
function publicar() {

    let legenda = document.getElementById("legenda");
    let texto = legenda.value.trim();

    if (texto === "") {
        alert("Digite uma legenda!");
        return;
    }

    let feed = document.querySelector(".feed");

    let novaPublicacao = document.createElement("article");

    novaPublicacao.className = "post";

    novaPublicacao.innerHTML = `
        <h3>👤 Meu Perfil</h3>
        <p>${texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        <button onclick="curtir(this)">♡ Curtir</button>
        <p class="likes" data-total="0">0 curtidas</p>
    `;

    feed.prepend(novaPublicacao);

    legenda.value = "";

    alert("Publicação criada com sucesso!");
}
