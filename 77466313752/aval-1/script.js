const botao = document.getElementById("modo");

botao.addEventListener("click", () => {
    document.body.classList.toggle("claro");

    if(document.body.classList.contains("claro")){
        botao.textContent="🌞";
    }else{
        botao.textContent="🌙";
    }
});

const pesquisa = document.getElementById("pesquisa");
const cards = document.querySelectorAll(".card");

pesquisa.addEventListener("keyup", () => {

    let texto = pesquisa.value.toLowerCase();

    cards.forEach(card => {

        let titulo = card.querySelector("h2").textContent.toLowerCase();

        if(titulo.indexOf(texto) > -1){
            card.style.display="block";
        }else{
            card.style.display="none";
        }

    });

});