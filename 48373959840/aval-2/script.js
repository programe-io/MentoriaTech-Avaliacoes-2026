
// FUNÇÃO PARA PUBLICAR
function publicar() {

    const nome = document.getElementById("nome").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    // Verificar campos
    if (nome === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Criar publicação
    const post = document.createElement("article");
    post.className = "post";

    // Nome do usuário
    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    // Texto da publicação
    const texto = document.createElement("p");
    texto.textContent = mensagem;

    // Botão de curtir
    const botao = document.createElement("button");
    botao.textContent = "♡ Curtir";

    botao.addEventListener("click", function() {
        curtir(botao);
    });

    // Contador de curtidas
    const contador = document.createElement("span");
    contador.textContent = "0 curtidas";

    // Adicionar elementos
    post.append(titulo, texto, botao, contador);

    // Mostrar publicação no feed
    const lista = document.getElementById("lista-posts");
    lista.prepend(post);

    // Limpar campos
    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";

    alert("Publicação realizada com sucesso!");
}


// FUNÇÃO DE CURTIR
function curtir(botao) {

    const contador = botao.nextElementSibling;

    let quantidade = Number(
        contador.textContent.split(" ")[0]
    );

    // Alternar curtida
    if (botao.dataset.curtido === "true") {

        quantidade--;
        botao.dataset.curtido = "false";
        botao.textContent = "♡ Curtir";

    } else {

        quantidade++;
        botao.dataset.curtido = "true";
        botao.textContent = "♥ Curtido";
    }

    contador.textContent = quantidade + " curtidas";
}


// ADICIONAR EVENTOS AOS POSTS EXISTENTES
document.querySelectorAll(".post button").forEach(botao => {

    botao.addEventListener("click", function() {
        curtir(botao);
    });

});


// MENSAGEM NO CONSOLE
console.log("SocialHub iniciado com sucesso!");
