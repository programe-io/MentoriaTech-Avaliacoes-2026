// Contador de curtidas
let contador = 0;

function curtir() {
    contador++;

    document.getElementById("curtidas").innerText =
        contador + " curtidas ❤️";
}

// Mensagem de boas-vindas
function boasVindas() {
    alert("Bem-vindo ao meu Instagram! 🚀");
}

// Criar um novo post
function novoPost() {
    let texto = prompt("Digite o que você deseja publicar:");

    if (texto !== null && texto.trim() !== "") {
        let post = document.createElement("div");

        post.className = "post";

        post.innerHTML = `
            <h2>Novo post 📸</h2>
            <p>${texto.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
            <p>Publicado agora!</p>
        `;

        document.querySelector(".container").prepend(post);
    }
}