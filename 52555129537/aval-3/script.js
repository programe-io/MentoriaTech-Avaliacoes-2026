
// SELECIONAR ELEMENTOS
const formulario = document.getElementById("formPost");
const publicacoes = document.getElementById("publicacoes");

// CRIAR PUBLICAÇÃO
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const texto = document.getElementById("mensagem").value.trim();
    const foto = document.getElementById("foto").value.trim();

    if (texto === "") {
        alert("Digite uma mensagem!");
        return;
    }

    // CRIAR CARD
    const card = document.createElement("article");
    card.classList.add("publicacao");

    // CRIAR AUTOR
    const autor = document.createElement("div");
    autor.className = "autor";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "U";

    const dados = document.createElement("div");

    const nome = document.createElement("h3");
    nome.textContent = "Usuário";

    const horario = document.createElement("small");
    horario.textContent = "Agora";

    dados.append(nome, horario);
    autor.append(avatar, dados);

    // CRIAR TEXTO
    const mensagem = document.createElement("p");
    mensagem.className = "mensagem";
    mensagem.textContent = texto;

    card.append(autor, mensagem);

    // ADICIONAR IMAGEM SE EXISTIR
    if (foto !== "") {
        const imagem = document.createElement("img");

        imagem.className = "imagem-post";
        imagem.src = foto;
        imagem.alt = "Imagem da publicação";

        card.appendChild(imagem);
    }

    // CRIAR AÇÕES
    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const curtir = document.createElement("button");
    curtir.textContent = "♡ Curtir ";

    const quantidade = document.createElement("span");
    quantidade.textContent = "0";

    curtir.appendChild(quantidade);

    curtir.addEventListener("click", function() {
        let total = Number(quantidade.textContent);

        if (curtir.dataset.ativo === "sim") {
            total--;
            curtir.dataset.ativo = "nao";
            curtir.firstChild.textContent = "♡ Curtir ";
        } else {
            total++;
            curtir.dataset.ativo = "sim";
            curtir.firstChild.textContent = "♥ Curtir ";
        }

        quantidade.textContent = total;
    });

    const comentar = document.createElement("button");
    comentar.textContent = "Comentar";

    comentar.addEventListener("click", function() {
        adicionarComentario(card);
    });

    acoes.append(curtir, comentar);

    // ÁREA DE COMENTÁRIOS
    const comentarios = document.createElement("div");
    comentarios.className = "area-comentarios";

    card.append(acoes, comentarios);

    // COLOCAR NOVO POST NO TOPO
    publicacoes.prepend(card);

    // LIMPAR FORMULÁRIO
    formulario.reset();

    alert("Publicação criada com sucesso!");

});


// FUNÇÃO DE COMENTÁRIOS
function adicionarComentario(card) {

    const texto = prompt("Escreva seu comentário:");

    if (texto === null || texto.trim() === "") {
        return;
    }

    const area = card.querySelector(".area-comentarios");

    const comentario = document.createElement("div");
    comentario.className = "comentario-item";

    comentario.textContent = "Usuário: " + texto.trim();

    area.appendChild(comentario);
}


// CURTIR PUBLICAÇÕES INICIAIS
document.querySelectorAll(".curtir").forEach(function(botao) {

    botao.addEventListener("click", function() {

        const contador = botao.querySelector("span");
        let total = Number(contador.textContent);

        if (botao.dataset.ativo === "sim") {
            total--;
            botao.dataset.ativo = "nao";
            botao.firstChild.textContent = "♡ Curtir ";
        } else {
            total++;
            botao.dataset.ativo = "sim";
            botao.firstChild.textContent = "♥ Curtir ";
        }

        contador.textContent = total;

    });

});


// COMENTAR PUBLICAÇÕES INICIAIS
document.querySelectorAll(".comentar").forEach(function(botao) {

    botao.addEventListener("click", function() {

        const card = botao.closest(".publicacao");

        adicionarComentario(card);

    });

});
