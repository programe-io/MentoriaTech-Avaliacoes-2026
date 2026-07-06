function filtrar(categoria, event){

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        if(categoria === "todos"){
            card.style.display = "block";
        }else{
            card.style.display = card.classList.contains(categoria)
                ? "block"
                : "none";
        }

    });

    document.querySelectorAll("nav button").forEach(botao=>{
        botao.classList.remove("ativo");
    });

    event.target.classList.add("ativo");

}

function comprar(produto){

    alert("🛒 " + produto + " foi adicionado ao pedido!");

}function filtrar(categoria, event){

    event.preventDefault();

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        if(categoria === "todos"){
            card.style.display = "block";
        }else{
            card.style.display = card.classList.contains(categoria)
                ? "block"
                : "none";
        }
    });

    document.querySelectorAll("nav a").forEach(link=>{
        link.classList.remove("ativo");
    });

    event.target.classList.add("ativo");
}