const btnTema = document.getElementById("btnTema");

btnTema.addEventListener("click", function() {
    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {
        btnTema.textContent = "☀️ Modo claro";
    } else {
        btnTema.textContent = "🌙 Modo escuro";
    }
});


const btnPublicar = document.getElementById("btnPublicar");
const textoPost = document.getElementById("textoPost");
const feed = document.querySelector(".feed");

btnPublicar.addEventListener("click", function() {

    const texto = textoPost.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const novoPost = document.createElement("article");

    novoPost.className = "post";

    novoPost.innerHTML = `
        <h3>Você</h3>
        <p>${texto}</p>
    `;

    feed.appendChild(novoPost);

    textoPost.value = "";
});