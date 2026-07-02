const imagens = [
    "https://picsum.photos/id/1015/600/350",
    "https://picsum.photos/id/1025/600/350",
    "https://picsum.photos/id/1043/600/350",
    "https://picsum.photos/id/1069/600/350"
];

let indice = 0;

function trocarImagem() {
    indice++;

    if (indice >= imagens.length) {
        indice = 0;
    }

    document.getElementById("imagem").src = imagens[indice];
}