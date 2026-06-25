const btnTema = document.getElementById("temaBtn");

btnTema.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        btnTema.textContent = "☀️ Modo Claro";
    }else{
        btnTema.textContent = "🌙 Modo Escuro";
    }

});

const botaoLerMais = document.querySelector(".lerMais");
const textoExtra = document.querySelector(".textoExtra");

botaoLerMais.addEventListener("click", () => {

    if(textoExtra.style.display === "block"){
        textoExtra.style.display = "none";
        botaoLerMais.textContent = "Ler mais";
    }else{
        textoExtra.style.display = "block";
        botaoLerMais.textContent = "Mostrar menos";
    }

});