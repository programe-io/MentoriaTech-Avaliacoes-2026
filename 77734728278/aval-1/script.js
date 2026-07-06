const botaoTema = document.getElementById("tema");

botaoTema.onclick = () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        botaoTema.innerHTML = "☀️ Modo Claro";
    }else{
        botaoTema.innerHTML = "🌙 Modo Escuro";
    }

}

const botoes = document.querySelectorAll(".curtir");

botoes.forEach((botao)=>{

    let curtidas = 0;

    botao.addEventListener("click",()=>{

        curtidas++;

        botao.nextElementSibling.innerHTML =
        "Curtidas: " + curtidas;

    });

});