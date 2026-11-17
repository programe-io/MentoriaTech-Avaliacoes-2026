```javascript
const pesquisa = document.getElementById("pesquisa");
const produtos = document.querySelectorAll(".produto");
const contador = document.getElementById("contador");

let quantidade = 0;

function filtrar(tipo) {
    produtos.forEach(produto => {
        const categoria = produto.dataset.tipo;

        produto.style.display =
            tipo === "todos" || categoria === tipo
            ? "block"
            : "none";
    });

    pesquisa.value = "";
}

pesquisa.addEventListener("input", () => {
    const texto = pesquisa.value.toLowerCase();

    produtos.forEach(produto => {
        const nome = produto.dataset.nome;

        produto.style.display =
            nome.includes(texto) ? "block" : "none";
    });
});

document.querySelectorAll(".adicionar").forEach(botao => {
    botao.addEventListener("click", () => {
        quantidade++;
        contador.textContent = quantidade;

        const nome = botao.parentElement.querySelector("h3").textContent;

        alert(nome + " foi adicionado ao carrinho!");
    });
});

document.getElementById("carrinho").addEventListener("click", () => {
    alert("Você possui " + quantidade + " produto(s) no carrinho.");
});

console.log("NEXUS TECH iniciado com sucesso!");
```