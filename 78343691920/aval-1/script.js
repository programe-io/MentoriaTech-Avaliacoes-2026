
// MENU MOBILE

const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {

    menu.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");

});

// FECHAR MENU AO CLICAR

document.querySelectorAll("#menu a").forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});

// TEMPORADAS

const temporadas = {

    1: "Scott McCall é mordido por um lobisomem e começa a descobrir seus novos poderes. Ao lado de Stiles, ele tenta entender o que está acontecendo em Beacon Hills.",

    2: "Uma nova ameaça aparece na cidade. Scott e seus amigos precisam enfrentar um inimigo misterioso enquanto tentam proteger as pessoas que amam.",

    3: "A terceira temporada apresenta novos perigos, criaturas sobrenaturais e acontecimentos que mudam profundamente a vida do bando.",

    4: "Scott e seus amigos descobrem que estão em uma lista de alvos. Caçadores e criaturas perigosas passam a ameaçar Beacon Hills.",

    5: "O grupo enfrenta experimentos assustadores e novos inimigos. A amizade dos personagens passa por grandes desafios.",

    6: "A história chega à sua última temporada, trazendo ameaças finais e decisões importantes para Scott e seu bando."
};

function verTemporada(numero) {

    const detalhes = document.getElementById("detalhesTemporada");

    detalhes.style.display = "block";

    detalhes.innerHTML = `
        <h3>Temporada ${numero}</h3>
        <p>${temporadas[numero]}</p>
    `;

    detalhes.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}

// PESQUISA

const conteudos = [

    {
        nome: "Scott McCall",
        descricao: "O verdadeiro alfa de Beacon Hills."
    },

    {
        nome: "Stiles Stilinski",
        descricao: "O melhor amigo de Scott."
    },

    {
        nome: "Lydia Martin",
        descricao: "Uma banshee inteligente e poderosa."
    },

    {
        nome: "Derek Hale",
        descricao: "Um lobisomem da família Hale."
    },

    {
        nome: "Allison Argent",
        descricao: "Uma arqueira de uma família de caçadores."
    },

    {
        nome: "Malia Tate",
        descricao: "Uma personagem que aprende a controlar sua natureza sobrenatural."
    },

    {
        nome: "Beacon Hills",
        descricao: "A cidade onde acontecem os eventos sobrenaturais."
    },

    {
        nome: "Temporada 1",
        descricao: temporadas[1]
    },

    {
        nome: "Temporada 2",
        descricao: temporadas[2]
    },

    {
        nome: "Temporada 3",
        descricao: temporadas[3]
    },

    {
        nome: "Temporada 4",
        descricao: temporadas[4]
    },

    {
        nome: "Temporada 5",
        descricao: temporadas[5]
    },

    {
        nome: "Temporada 6",
        descricao: temporadas[6]
    }

];

const pesquisa = document.getElementById("pesquisa");

const resultado = document.getElementById("resultadoPesquisa");

pesquisa.addEventListener("input", () => {

    const termo = pesquisa.value.toLowerCase().trim();

    resultado.innerHTML = "";

    if (termo === "") {
        return;
    }

    const encontrados = conteudos.filter(item => {

        return item.nome.toLowerCase().includes(termo) ||
        item.descricao.toLowerCase().includes(termo);

    });

    if (encontrados.length === 0) {

        resultado.textContent = "Nenhum resultado encontrado.";

        return;
    }

    encontrados.forEach(item => {

        const card = document.createElement("div");

        card.className = "resultado";

        const titulo = document.createElement("h3");
        titulo.textContent = item.nome;

        const descricao = document.createElement("p");
        descricao.textContent = item.descricao;

        card.append(titulo, descricao);

        resultado.appendChild(card);

    });

});

// ANIMAÇÃO DAS SEÇÕES

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach(entrada => {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("visivel");

        }

    });

}, {
    threshold: 0.1
});

document.querySelectorAll(".section").forEach(secao => {

    observador.observe(secao);

});
