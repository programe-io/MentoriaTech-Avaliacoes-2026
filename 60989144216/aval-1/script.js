const botao = document.getElementById("modo");

botao.onclick = function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        botao.innerHTML="☀️ Modo Claro";
    }else{
        botao.innerHTML="🌙 Modo Escuro";
    }

}

const busca=document.getElementById("buscar");
const cards=document.querySelectorAll(".card");

busca.addEventListener("keyup",()=>{

    const texto=busca.value.toLowerCase();

    cards.forEach(card=>{

        const conteudo=card.textContent.toLowerCase();

        if(conteudo.includes(texto)){
            card.style.display="block";
        }else{
            card.style.display="none";
        }

    });

});