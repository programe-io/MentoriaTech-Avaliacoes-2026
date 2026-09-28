```javascript
// ======================================
// PLAYER
// ======================================

let tocando = false;


function playMusic() {

    const button =
        document.getElementById("playButton");

    const title =
        document.getElementById("songTitle");

    const artist =
        document.getElementById("songArtist");


    if (!tocando) {

        tocando = true;

        button.innerHTML = "⏸";

        title.innerHTML = "Agora tocando...";

        artist.innerHTML = "MusicWave Player";

    } else {

        tocando = false;

        button.innerHTML = "▶";

        title.innerHTML = "Minha Playlist";

        artist.innerHTML = "MusicWave";

    }

}



// ======================================
// BOTÃO "LER MAIS"
// ======================================

function lerMais(titulo) {

    alert(
        "🎵 " +
        titulo +
        "\n\n" +
        "Aqui você pode colocar o conteúdo completo da notícia."
    );

}



// ======================================
// SISTEMA DE PESQUISA
// ======================================

const search =
    document.getElementById("search");


const posts =
    document.querySelectorAll(".post");


search.addEventListener("input", function () {

    const texto =
        search.value.toLowerCase();


    posts.forEach(function (post) {

        const conteudo =
            post.innerText.toLowerCase();


        if (conteudo.includes(texto)) {

            post.style.display = "block";

        } else {

            post.style.display = "none";

        }

    });

});
```
