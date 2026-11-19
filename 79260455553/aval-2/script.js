
const receitas = {

    bolo: {
        titulo: "🍫 Bolo de Chocolate",

        ingredientes: [
            "2 xícaras de farinha de trigo",
            "1 xícara de açúcar",
            "1 xícara de chocolate em pó",
            "3 ovos",
            "1 xícara de leite",
            "1/2 xícara de óleo",
            "1 colher de fermento"
        ],

        preparo:
        "Misture os ovos, o açúcar e o óleo. " +
        "Adicione o leite, a farinha e o chocolate. " +
        "Misture até ficar homogêneo. Acrescente o fermento. " +
        "Coloque em uma forma untada e asse em forno " +
        "preaquecido a 180°C por aproximadamente 35 a 40 minutos."
    },

    brigadeiro: {
        titulo: "🍬 Brigadeiro",

        ingredientes: [
            "1 lata de leite condensado",
            "3 colheres de chocolate em pó",
            "1 colher de manteiga",
            "Chocolate granulado"
        ],

        preparo:
        "Coloque o leite condensado, o chocolate e a manteiga " +
        "em uma panela. Mexa em fogo baixo até desgrudar " +
        "do fundo da panela. Espere esfriar, enrole e passe " +
        "no chocolate granulado."
    },

    panqueca: {
        titulo: "🥞 Panqueca",

        ingredientes: [
            "1 xícara de farinha de trigo",
            "1 xícara de leite",
            "1 ovo",
            "1 pitada de sal",
            "1 colher de óleo"
        ],

        preparo:
        "Bata todos os ingredientes no liquidificador. " +
        "Coloque pequenas porções da massa em uma frigideira " +
        "untada. Doure os dois lados e sirva com o recheio " +
        "de sua preferência."
    },

    salada: {
        titulo: "🍓 Salada de Frutas",

        ingredientes: [
            "2 bananas",
            "1 maçã",
            "1 mamão pequeno",
            "1 xícara de uvas",
            "1 laranja",
            "Suco de laranja a gosto"
        ],

        preparo:
        "Lave e higienize as frutas. Descasque as que forem " +
        "necessárias e corte todas em pedaços pequenos. " +
        "Misture em uma tigela e acrescente o suco de laranja. " +
        "Leve à geladeira antes de servir."
    },

    pizza: {
        titulo: "🍕 Pizza Caseira",

        ingredientes: [
            "2 xícaras de farinha de trigo",
            "1/2 xícara de água morna",
            "1 colher de fermento biológico seco",
            "2 colheres de óleo",
            "1 pitada de sal",
            "Molho de tomate, queijo e recheio a gosto"
        ],

        preparo:
        "Misture a farinha, o fermento, a água, o óleo e o sal. " +
        "Sove a massa e deixe descansar até crescer. " +
        "Abra a massa, coloque o molho e os ingredientes. " +
        "Asse em forno preaquecido a 200°C até dourar."
    },

    vitamina: {
        titulo: "🍌 Vitamina de Banana",

        ingredientes: [
            "2 bananas",
            "2 copos de leite",
            "1 colher de aveia",
            "Mel ou açúcar a gosto"
        ],

        preparo:
        "Coloque todos os ingredientes no liquidificador. " +
        "Bata até obter uma mistura cremosa. Sirva em seguida."
    }

};

function mostrarReceita(nome) {

    const receita = receitas[nome];

    document.getElementById("tituloReceita").textContent =
        receita.titulo;

    const lista = document.getElementById("ingredientes");

    lista.innerHTML = "";

    receita.ingredientes.forEach(function(item) {

        const li = document.createElement("li");

        li.textContent = item;

        lista.appendChild(li);

    });

    document.getElementById("preparo").textContent =
        receita.preparo;

    document.getElementById("detalhes").style.display = "block";

    document.getElementById("detalhes").scrollIntoView({
        behavior: "smooth"
    });
}

function fecharReceita() {

    document.getElementById("detalhes").style.display = "none";

}

function pesquisarReceitas() {

    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(function(card) {

        const nome = card.dataset.nome;

        if (nome.includes(pesquisa)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}
