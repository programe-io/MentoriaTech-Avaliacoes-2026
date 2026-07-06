// Botão de modo escuro

const tema = document.getElementById("tema");

tema.addEventListener("click", function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        tema.innerHTML = "☀️ Modo Claro";
    }else{
        tema.innerHTML = "🌙 Modo Escuro";
    }

});

// Botões de curtidas

const botoes = document.querySelectorAll(".curtir");

botoes.forEach(function(botao){

    let curtidas = 0;

    botao.addEventListener("click", function(){

        curtidas++;

        botao.nextElementSibling.innerHTML =
        "Curtidas: " + curtidas;

    });

});