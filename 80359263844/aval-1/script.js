const pesquisa = document.getElementById("pesquisa");
const cards = document.querySelectorAll(".card");
const tema = document.getElementById("tema");

pesquisa.addEventListener("keyup", () => {

    const texto = pesquisa.value.toLowerCase();

    cards.forEach(card => {

        const titulo = card.querySelector("h2").innerText.toLowerCase();

        if(titulo.includes(texto)){
            card.style.display="block";
        }else{
            card.style.display="none";
        }

    });

});

tema.addEventListener("click", ()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        tema.innerHTML="☀️";
    }else{
        tema.innerHTML="🌙";
    }

});

document.querySelectorAll(".card button").forEach(botao=>{

    botao.addEventListener("click",()=>{

        alert("Aqui você pode abrir a página completa do artigo.");

    });

});