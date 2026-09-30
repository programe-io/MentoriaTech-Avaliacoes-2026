// INFORMAÇÕES DOS GÊNEROS

function mostrarInfo(genero) {

    const mensagens = {

        "Rock":
            "O rock possui diversas vertentes, como rock clássico, punk rock, metal e indie rock.",

        "Pop":
            "O pop reúne diferentes influências e costuma alcançar grande público.",

        "Eletrônica":
            "A música eletrônica utiliza tecnologia, sintetizadores e diferentes tipos de batidas.",

        "Samba":
            "O samba possui grande importância na cultura musical brasileira.",

        "Jazz":
            "O jazz é conhecido pela improvisação e pela interação entre os músicos.",

        "Hip-Hop":
            "O hip-hop reúne elementos como rap, DJ, produção de batidas e diferentes formas de expressão."
    };


    alert(mensagens[genero]);
}


// SISTEMA DE PESQUISA

const pesquisa = document.getElementById("pesquisa");

const cards = document.querySelectorAll(".card");


pesquisa.addEventListener("input", function () {

    const texto = pesquisa.value.toLowerCase();


    cards.forEach(function (card) {

        const nome =
            card
            .querySelector("h3")
            .textContent
            .toLowerCase();


        if (nome.includes(texto)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});