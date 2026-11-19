const botaoCurtir = document.getElementById("curtir");
const totalCurtidas = document.getElementById("totalCurtidas");
const formularioComentario = document.getElementById("formComentario");
const campoComentario = document.getElementById("novoComentario");
const comentarios = document.getElementById("comentarios");

let curtido = false;
let curtidas = 3821;

// Curtir publicação
botaoCurtir.addEventListener("click", () => {
    curtido = !curtido;

    if (curtido) {
        curtidas++;
        botaoCurtir.textContent = "♥ Curtido";
        botaoCurtir.classList.add("ativo");
    } else {
        curtidas--;
        botaoCurtir.textContent = "♡ Curtir";
        botaoCurtir.classList.remove("ativo");
    }

    totalCurtidas.textContent =
        "♡ " + curtidas.toLocaleString("pt-BR") + " curtidas";
});

// Adicionar comentário
formularioComentario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const texto = campoComentario.value.trim();

    if (texto === "") return;

    const novoComentario = document.createElement("div");
    novoComentario.classList.add("comentario");

    const avatar = document.createElement("div");
    avatar.classList.add("avatar", "avatar-arthur");
    avatar.textContent = "V";

    const mensagem = document.createElement("p");

    const usuario = document.createElement("strong");
    usuario.textContent = "Você";

    mensagem.appendChild(usuario);
    mensagem.appendChild(document.createTextNode(" " + texto));

    novoComentario.appendChild(avatar);
    novoComentario.appendChild(mensagem);

    comentarios.appendChild(novoComentario);

    campoComentario.value = "";
});

// Levar até os comentários
document.getElementById("focarComentario").addEventListener("click", () => {
    campoComentario.focus();
});

// Compartilhar publicação
document.getElementById("compartilhar").addEventListener("click", async () => {
    const texto = "Relatório de campo: por aqui tudo tranquilo. Nenhuma atividade suspeita e a equipe segue trabalhando normalmente.";

    try {
        await navigator.clipboard.writeText(texto);
        alert("Publicação copiada!");
    } catch {
        alert("Não foi possível copiar. Tente novamente.");
    }
});

// Criar uma nova publicação
document.getElementById("publicar").addEventListener("click", () => {
    const campo = document.getElementById("textoPost");
    const texto = campo.value.trim();

    if (texto === "") {
        alert("Escreva alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.classList.add("post", "post-novo");

    const topo = document.createElement("div");
    topo.classList.add("post-topo");

    const avatar = document.createElement("div");
    avatar.classList.add("avatar", "avatar-arthur");
    avatar.textContent = "V";

    const usuario = document.createElement("div");
    usuario.classList.add("usuario");

    const nome = document.createElement("strong");
    nome.textContent = "Você";

    const horario = document.createElement("span");
    horario.textContent = "@novoagente · agora";

    usuario.appendChild(nome);
    usuario.appendChild(horario);

    topo.appendChild(avatar);
    topo.appendChild(usuario);

    const legenda = document.createElement("p");
    legenda.classList.add("legenda");
    legenda.textContent = texto;

    const estatisticas = document.createElement("div");
    estatisticas.classList.add("estatisticas");
    estatisticas.textContent = "♡ 0 curtidas";

    post.appendChild(topo);
    post.appendChild(legenda);
    post.appendChild(estatisticas);

    document.getElementById("feed").prepend(post);

    campo.value = "";

    post.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});