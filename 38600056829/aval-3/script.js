function pesquisar() {

    let pesquisa =
        document
        .getElementById("search")
        .value
        .toLowerCase();

    let personagens =
        document.querySelectorAll(".card");


    personagens.forEach(function(personagem) {

        let nome =
            personagem.innerText.toLowerCase();


        if (nome.includes(pesquisa)) {

            personagem.style.display = "block";

        } else {

            personagem.style.display = "none";

        }

    });

}