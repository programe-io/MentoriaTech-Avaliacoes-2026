const botao = document.getElementById("btn");

botao.addEventListener("click", () => {
    alert("Bem-vindo ao País das Maravilhas!");
});

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

card.addEventListener("mouseenter",()=>{

card.style.boxShadow="0 0 20px #ff1744";

});

card.addEventListener("mouseleave",()=>{

card.style.boxShadow="none";

});

});