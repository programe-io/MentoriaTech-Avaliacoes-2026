const botao = document.getElementById("modoEscuro");

botao.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        botao.innerHTML = "☀️ Modo Claro";
    }else{
        botao.innerHTML = "🌙 Modo Escuro";
    }

});