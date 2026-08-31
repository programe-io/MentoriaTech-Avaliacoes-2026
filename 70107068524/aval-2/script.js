// ===== SISTEMA DE COMPRAS =====

// Seleciona todos os botões "Comprar"
const botoesComprar = document.querySelectorAll(".produto button");

// Adiciona uma função para cada botão
botoesComprar.forEach(function(botao) {

```
botao.addEventListener("click", function() {

    // Pega o nome do produto
    const produto = botao.parentElement.querySelector("h3").textContent;

    // Pega o preço do produto
    const preco = botao.parentElement.querySelector("span").textContent;

    // Mostra a mensagem
    alert(
        "✨ Produto adicionado ao carrinho!\n\n" +
        "Produto: " + produto + "\n" +
        "Preço: " + preco
    );

});
```

});

// ===== FORMULÁRIO DE CONTATO =====

const formulario = document.querySelector("form");

formulario.addEventListener("submit", function(event) {

```
// Impede o formulário de recarregar a página
event.preventDefault();

// Pega o nome digitado
const nome = formulario.querySelector("input[type='text']").value;

// Verifica se o nome foi preenchido
if (nome.trim() === "") {
    alert("Por favor, digite seu nome.");
    return;
}

// Mensagem de sucesso
alert(
    "💖 Obrigado, " + nome + "!\n\n" +
    "Sua mensagem foi enviada com sucesso.\n" +
    "A Elegance Cosméticos agradece seu contato! ✨"
);

// Limpa os campos
formulario.reset();
```

});

// ===== EFEITO NOS PRODUTOS =====

const produtos = document.querySelectorAll(".produto");

produtos.forEach(function(produto) {

```
produto.addEventListener("mouseenter", function() {
    produto.style.cursor = "pointer";
});
```

});

// ===== MENSAGEM NO CONSOLE =====

console.log("✨ Elegance Cosméticos & Perfumaria carregada com sucesso!");
