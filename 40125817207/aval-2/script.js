const botao = document.getElementById("btnReceita");
const preparo = document.getElementById("modoPreparo");

botao.addEventListener("click", function(){

    if(preparo.style.display === "block"){
        preparo.style.display = "none";
        botao.textContent = "Mostrar Modo de Preparo";
    }else{
        preparo.style.display = "block";
        botao.textContent = "Ocultar Modo de Preparo";
    }

});