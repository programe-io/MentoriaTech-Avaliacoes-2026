const botaoTema = document.getElementById("btnTema");

botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        botaoTema.innerHTML = "☀️ Modo Claro";
    }else{
        botaoTema.innerHTML = "🌙 Modo Escuro";
    }
});

const botoes = document.querySelectorAll(".lerMais");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        alert("Em breve a matéria completa estará disponível!");
    });
});