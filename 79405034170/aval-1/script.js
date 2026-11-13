

// BOAS-VINDAS AO BLOG MUSICAL

let nomeUsuario = "[SEU NOME]";

window.addEventListener("load", function() {
    alert("🎵 Bem-vindo(a) ao meu blog musical, " 
    + nomeUsuario + "! ❤️");
});


// ADICIONAR MÚSICAS FAVORITAS

function adicionarMusica() {

    let nomeMusica = document.getElementById("nomeMusica").value;
    let nomeArtista = document.getElementById("nomeArtista").value;

    if (nomeMusica === "" || nomeArtista === "") {
        alert("Preencha o nome da música e do artista!");
        return;
    }

    let lista = document.getElementById("listaMusicas");

    let novaMusica = document.createElement("div");

    novaMusica.classList.add("musica");

    novaMusica.innerHTML = `
        <h3>🎤 ${nomeMusica}</h3>
        <p>Artista: ${nomeArtista}</p>
        <button onclick="removerMusica(this)">
            Excluir música
        </button>
    `;

    lista.appendChild(novaMusica);

    document.getElementById("nomeMusica").value = "";
    document.getElementById("nomeArtista").value = "";

    alert("🎶 Música adicionada com sucesso!");
}


// REMOVER MÚSICAS

function removerMusica(botao) {
    botao.parentElement.remove();
}


// FORMULÁRIO DE MENSAGEM

function enviarMensagem(event) {

    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let mensagem = document.getElementById("mensagem").value;

    if (nome === "" || mensagem === "") {
        alert("Preencha todos os campos!");
        return;
    }

    alert("❤️ Obrigado pela mensagem, " + nome + "!");

    document.getElementById("resposta").innerText =
        "Mensagem recebida com carinho! 🎵";

    document.querySelector("form").reset();
}
Adicione estes elementos no seu index.html
Na seção de músicas, coloque:

<h2>🎶 Adicione suas músicas favoritas</h2>

<input type="text" id="nomeMusica"
placeholder="Nome da música">

<input type="text" id="nomeArtista"
placeholder="Nome do artista">

<button onclick="adicionarMusica()">
Adicionar música
</button>

<div id="listaMusicas"></div>