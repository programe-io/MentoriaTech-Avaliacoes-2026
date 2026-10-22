
const publicar = document.getElementById("publicar");
const nome = document.getElementById("nome");
const texto = document.getElementById("texto");
const feed = document.getElementById("feed");

function ativarCurtidas(botao) {
    botao.addEventListener("click", () => {
        const contador = botao.querySelector("span");
        let total = Number(contador.textContent);

        if (botao.classList.contains("curtido")) {
            total--;
            botao.classList.remove("curtido");
        } else {
            total++;
            botao.classList.add("curtido");
        }

        contador.textContent = total;
    });
}

document.querySelectorAll(".curtir").forEach(ativarCurtidas);

publicar.addEventListener("click", () => {
    const usuario = nome.value.trim();
    const mensagem = texto.value.trim();

    if (!usuario || !mensagem) {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = usuario;

    const conteudo = document.createElement("p");
    conteudo.textContent = mensagem;

    const botaoCurtir = document.createElement("button");
    botaoCurtir.className = "curtir";
    botaoCurtir.innerHTML = '❤️ Curtir <span>0</span>';

    ativarCurtidas(botaoCurtir);

    post.append(titulo, conteudo, botaoCurtir);
    feed.insertBefore(post, feed.children[1]);

    nome.value = "";
    texto.value = "";
});
