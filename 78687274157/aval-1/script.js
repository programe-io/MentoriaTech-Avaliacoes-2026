
// ==================================
// MEU BLOG MUSICAL 🎵
// ==================================

// COLOQUE SEU NOME AQUI
const nomeUsuario = "[SEU NOME]";

// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Bem-vindo(a) ao blog musical de " + nomeUsuario + "! ❤️");
});


// ==================================
// ADICIONAR MÚSICAS FAVORITAS
// ==================================

let musicas = JSON.parse(localStorage.getItem("minhasMusicas")) || [];

function mostrarMusicas() {

    const lista = document.getElementById("listaMusicas");

    if (!lista) return;

    lista.innerHTML = "";

    musicas.forEach(function(musica, indice) {

        const div = document.createElement("div");
        div.classList.add("musica");

        const titulo = document.createElement("h3");
        titulo.textContent = "🎤 " + musica.nome;

        const artista = document.createElement("p");
        artista.textContent = "Artista: " + musica.artista;

        const botao = document.createElement("button");
        botao.textContent = "Excluir música";
        botao.onclick = function() {
            removerMusica(indice);
        };

        div.appendChild(titulo);
        div.appendChild(artista);
        div.appendChild(botao);

        lista.appendChild(div);
    });
}


function adicionarMusica() {

    const nome = document.getElementById("nomeMusica").value.trim();

    const artista = document.getElementById("nomeArtista").value.trim();

    if (nome === "" || artista === "") {
        alert("Preencha o nome da música e do artista!");
        return;
    }

    musicas.push({
        nome: nome,
        artista: artista
    });

    salvarMusicas();

    document.getElementById("nomeMusica").value = "";
    document.getElementById("nomeArtista").value = "";

    mostrarMusicas();

    alert("🎵 Música adicionada com sucesso!");
}


// ==================================
// EXCLUIR MÚSICAS
// ==================================

function removerMusica(indice) {

    musicas.splice(indice, 1);

    salvarMusicas();

    mostrarMusicas();
}


// ==================================
// SALVAR MÚSICAS NO NAVEGADOR
// ==================================

function salvarMusicas() {

    localStorage.setItem(
        "minhasMusicas",
        JSON.stringify(musicas)
    );
}


// ==================================
// FORMULÁRIO DE CONTATO
// ==================================

function enviarMensagem(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const mensagem = document.getElementById("mensagem").value.trim();

    if (nome === "" || mensagem === "") {
        alert("Preencha todos os campos!");
        return;
    }

    document.getElementById("resposta").textContent =
        "❤️ Obrigado pela mensagem, " + nome + "!";

    document.querySelector("#contato form").reset();
}


// ==================================
// INICIAR O BLOG
// ==================================

document.addEventListener("DOMContentLoaded", function() {
    mostrarMusicas();
});