```javascript
// ==========================================
// CURTIR POST
// ==========================================

function curtir(botao) {

    const contador = botao.querySelector("span");

    let quantidade = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {

        quantidade--;

        botao.classList.remove("curtido");

        botao.innerHTML = `❤️ Curtir <span>${quantidade}</span>`;

    } else {

        quantidade++;

        botao.classList.add("curtido");

        botao.innerHTML = `❤️ Curtido <span>${quantidade}</span>`;
    }
}


// ==========================================
// MOSTRAR / ESCONDER COMENTÁRIOS
// ==========================================

function mostrarComentarios(botao) {

    const post = botao.closest(".post");

    const comentarios = post.querySelector(".comentarios");

    if (comentarios.style.display === "block") {

        comentarios.style.display = "none";

    } else {

        comentarios.style.display = "block";
    }
}


// ==========================================
// ADICIONAR COMENTÁRIO
// ==========================================

function comentar(botao) {

    const area = botao.closest(".comentarios");

    const input = area.querySelector("input");

    const lista = area.querySelector(".lista-comentarios");

    const texto = input.value.trim();


    if (texto === "") {

        alert("🙏 Digite um comentário!");

        input.focus();

        return;
    }


    const novoComentario = document.createElement("div");

    novoComentario.className = "comentario";


    const nome = document.createElement("strong");

    nome.textContent = "🙏 Você: ";


    const mensagem = document.createElement("span");

    mensagem.textContent = texto;


    novoComentario.appendChild(nome);

    novoComentario.appendChild(mensagem);


    lista.appendChild(novoComentario);


    input.value = "";

    input.focus();
}


// ==========================================
// CRIAR NOVO POST
// ==========================================

function criarPost() {

    const campo = document.getElementById("novoTexto");

    const texto = campo.value.trim();


    if (texto === "") {

        alert("✝️ Escreva uma mensagem antes de publicar!");
```
