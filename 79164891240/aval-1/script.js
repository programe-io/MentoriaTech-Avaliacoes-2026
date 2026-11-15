
// ===================================
// UNIVERSO ACTION FIGURES
// JAVASCRIPT - VINI E DUARDA
// ===================================

// FUNÇÃO DE PESQUISA

function pesquisarFigura() {

    // Captura o texto digitado pelo usuário
    const campo = document.getElementById("campoBusca");

    const pesquisa = campo.value
        .toLowerCase()
        .trim();

    // Seleciona todos os cartões
    const figuras = document.querySelectorAll(".card");

    let encontrados = 0;

    // Verifica cada personagem
    figuras.forEach(function(figura) {

        const nome = figura.querySelector("h3")
            .textContent.toLowerCase();

        const descricao = figura.querySelector("p")
            .textContent.toLowerCase();

        // Verifica se o termo aparece no nome ou descrição
        if (
            nome.includes(pesquisa) ||
            descricao.includes(pesquisa)
        ) {

            figura.style.display = "block";
            encontrados++;

        } else {

            figura.style.display = "none";

        }

    });

    // Exibe o resultado da pesquisa
    if (encontrados === 0) {

        alert("Nenhuma Action Figure encontrada!");

    } else if (pesquisa !== "") {

        alert(
            "Encontramos " +
            encontrados +
            " Action Figure(s)!"
        );

    }

}


// PERMITE PESQUISAR PRESSIONANDO ENTER

document.getElementById("campoBusca")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            pesquisarFigura();
        }

    });


// MOSTRA TODAS AS FIGURAS AO LIMPAR A PESQUISA

document.getElementById("campoBusca")
    .addEventListener("input", function() {

        if (this.value.trim() === "") {

            document.querySelectorAll(".card")
                .forEach(function(figura) {

                    figura.style.display = "block";

                });

        }

    });
