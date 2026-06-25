const botao = document.getElementById("btn");
const curiosidade = document.getElementById("curiosidade");

botao.addEventListener("click", () => {

    if(curiosidade.style.display === "block"){
        curiosidade.style.display = "none";
        botao.textContent = "Mostrar Curiosidade";
    } else {
        curiosidade.style.display = "block";
        botao.textContent = "Ocultar Curiosidade";
    }

});