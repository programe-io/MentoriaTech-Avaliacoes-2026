let carrinho = 0;

function comprar(produto){
    carrinho++;

    document.getElementById("contador").textContent = carrinho;

    alert(produto + " foi adicionado ao carrinho!");
}