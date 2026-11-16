
// Seleciona todas as publicações
const posts = document.querySelectorAll(".post");

// Cria um botão de curtida para cada publicação
posts.forEach((post) => {

    let curtidas = 0;
    let curtiu = false;

    const botao = document.createElement("button");

    botao.innerHTML = "🤍 Curtir (0)";

    botao.style.marginTop = "15px";
    botao.style.padding = "10px 18px";
    botao.style.border = "none";
    botao.style.borderRadius = "20px";
    botao.style.background = "#c90016";
    botao.style.color = "white";
    botao.style.cursor = "pointer";
    botao.style.fontSize = "14px";

    // Adiciona o botão ao cartão
    post.appendChild(botao);

    // Ação de curtir e descurtir
    botao.addEventListener("click", () => {

        if (curtiu === false) {
            curtidas++;
            curtiu = true;
            botao.innerHTML = `❤️ Curtido (${curtidas})`;
            botao.style.background = "#111";
        } else {
            curtidas--;
            curtiu = false;
            botao.innerHTML = `🤍 Curtir (${curtidas})`;
            botao.style.background = "#c90016";
        }

    });

});

// Mensagem no console
console.log("Mini Feed do Min carregado com sucesso! ❤️🖤");
