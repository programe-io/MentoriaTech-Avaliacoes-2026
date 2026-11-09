
function verMais(personagem) {

    const informacoes = {
        Nando: "Nando é um dos protagonistas de Sintonia. Sua história envolve escolhas, responsabilidades e desafios.",
        Rita: "Rita é uma jovem que busca crescimento pessoal, independência e novas oportunidades.",
        Doni: "Doni é apaixonado por música e deseja conquistar seu espaço como artista."
    };

    alert(informacoes[personagem]);
}

function enviarComentario() {

    const nome = document.getElementById("nome").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (nome === "" || mensagem === "") {
        alert("Preencha seu nome e seu comentário!");
        return;
    }

    const comentario = document.createElement("p");

    comentario.textContent = "💬 " + nome + ": " + mensagem;

    document.getElementById("listaComentarios")
        .prepend(comentario);

    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";

    alert("Comentário publicado!");
}
