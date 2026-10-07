```javascript
// Função para curtir uma publicação
function curtir(botao) {

    let contador = botao.querySelector("span");

    let quantidade = Number(contador.textContent);

    quantidade++;

    contador.textContent = quantidade;
}


// Função para criar uma nova publicação
function criarPost() {

    let nome = document.getElementById("nome").value;
    let texto = document.getElementById("texto").value;

    // Verifica se os campos estão preenchidos
    if (nome === "" || texto === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // Cria o elemento do post
    let novoPost = document.createElement("article");

    novoPost.classList.add("post");

    novoPost.innerHTML = `
        <h3>${nome}</h3>

        <p>${texto}</p>

        <button onclick="curtir(this)">
            ❤️ Curtir <span>0</span>
        </button>
    `;

    // Coloca o novo post no começo do feed
    let feed = document.getElementById("feed");

    feed.insertBefore(novoPost, feed.firstChild);

    // Limpa os campos
    document.getElementById("nome").value = "";
    document.getElementById("texto").value = "";
}
```
