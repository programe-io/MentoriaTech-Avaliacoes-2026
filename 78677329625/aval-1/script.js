// Animação do título

const titulo = document.getElementById("titulo");

let cores = [
    "#ffffff",
    "#f1c40f",
    "#2ecc71",
    "#3498db",
    "#e74c3c"
];

let indice = 0;

setInterval(() => {

    indice++;

    if(indice >= cores.length){
        indice = 0;
    }

    titulo.style.color = cores[indice];

},1000);


// Animação dos cards ao carregar

const cards = document.querySelectorAll(".card");

window.addEventListener("load", ()=>{

    cards.forEach((card, index)=>{

        setTimeout(()=>{

            card.classList.add("mostrar");

        }, index * 400);

    });

});


// Efeito ao clicar no menu

const links = document.querySelectorAll(".menu a");

links.forEach(link=>{

    link.addEventListener("click",(e)=>{

        e.preventDefault();

        link.animate([
            {transform:"scale(1)"},
            {transform:"scale(1.2)"},
            {transform:"scale(1)"}
        ],{
            duration:400
        });

    });

});