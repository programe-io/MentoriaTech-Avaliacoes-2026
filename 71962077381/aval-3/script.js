let favoritos = [];

function favoritar(filme){

    if(!favoritos.includes(filme)){
        favoritos.push(filme);
    }

    renderizarFavoritos();
}

function renderizarFavoritos(){

    let lista = document.getElementById("listaFavoritos");

    lista.innerHTML = "";

    favoritos.forEach(f => {
        lista.innerHTML += `<div class="fav-item">⭐ ${f}</div>`;
    });
}

function verTrailer(filme){

    document.getElementById("modal").style.display = "block";
    document.getElementById("tituloTrailer").innerText = filme;
}

function fecharModal(){
    document.getElementById("modal").style.display = "none";
}

function buscarFilmes(){

    let input = document.getElementById("search").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        let nome = card.getAttribute("data-nome").toLowerCase();

        if(nome.includes(input)){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}