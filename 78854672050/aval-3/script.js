
function curtir(botao) {
    const contador = botao.querySelector("span");
    let numero = Number(contador.textContent);

    numero++;
    contador.textContent = numero;
    botao.style.color = "#1877f2";
}

function comentar(botao) {
    const post = botao.closest(".post");
    const area = post.querySelector(".comentarios");

    const nome = prompt("Qual é seu nome?");
    if (!nome || !nome.trim()) return;

    const texto = prompt("Digite seu comentário:");
    if (!texto || !texto.trim()) return;

    const comentario = document.createElement("div");
    comentario.className = "comentario";

    const autor = document.createElement("strong");
    autor.textContent = nome + ": ";

    comentario.appendChild(autor);
    comentario.appendChild(document.createTextNode(texto));

    area.appendChild(comentario);
}

function publicar() {
    const nome = document.getElementById("autor").value.trim();
    const texto = document.getElementById("texto").value.trim();

    if (!nome || !texto) {
        alert("Digite seu nome e sua publicação!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = "👤 " + nome;

    const horario = document.createElement("small");
    horario.textContent = "Agora";

    const mensagem = document.createElement("p");
    mensagem.textContent = texto;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const curtirBtn = document.createElement("button");
    curtirBtn.textContent = "👍 Curtir ";

    const contador = document.createElement("span");
    contador.textContent = "0";
    curtirBtn.appendChild(contador);
    curtirBtn.onclick = function() {
        curtir(curtirBtn);
    };

    const comentarBtn = document.createElement("button");
    comentarBtn.textContent = "💬 Comentar";
    comentarBtn.onclick = function() {
        comentar(comentarBtn);
    };

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    acoes.append(curtirBtn, comentarBtn);
    post.append(titulo, horario, mensagem, acoes, comentarios);

    document.getElementById("publicacoes").prepend(post);

    document.getElementById("autor").value = "";
    document.getElementById("texto").value = "";
}
