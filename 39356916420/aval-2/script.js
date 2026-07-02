let contador = 0;

function comprar(){
contador++;
document.getElementById("contador").textContent = contador;
alert("Produto adicionado ao carrinho!");
}

document.querySelector(".banner button").addEventListener("click", function(){
document.querySelector(".produtos").scrollIntoView({behavior:"smooth"});
});