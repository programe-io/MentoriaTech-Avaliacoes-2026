```javascript
// MODO ESCURO

const tema = document.getElementById("tema");

tema.addEventListener("click", function() {

    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {

        tema.textContent = "☀️";

    } else {

        tema.textContent = "🌙";

    }

});


// PESQUISA

const pesquisa = document.getElementById("pesquisa");

const cards = document.querySelectorAll(".card");

pesquisa.addEventListener("input", function() {

    const texto = pesquisa.value.toLowerCase();

    cards.forEach(function(card) {

        const conteudo =
            card.textContent.toLowerCase();

        if (conteudo.includes(texto)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});


// FILTRO DE CATEGORIAS

function filtrar(categoria) {

    cards.forEach(function(card) {

        const categoriaCard =
            card.querySelector("span").textContent;

        if (
            categoria === "Todos" ||
            categoriaCard === categoria
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


// LER ARTIGO

function lerPost(categoria) {

    alert(
        "Você selecionou um artigo de " +
        categoria +
        "!"
    );

}
```
