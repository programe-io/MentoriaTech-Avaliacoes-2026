
function saibaMais() {
    document.getElementById("curiosidades").scrollIntoView({
        behavior: "smooth"
    });
}

const curiosidades = [
    "O suor ajuda o corpo a controlar a temperatura!",
    "As axilas possuem glândulas sudoríparas!",
    "A higiene diária ajuda a evitar odores desagradáveis!",
    "O desodorante ajuda a controlar o mau cheiro!"
];

function mostrarCuriosidade() {
    const numero = Math.floor(Math.random() * curiosidades.length);

    document.getElementById("curiosidade").textContent =
        curiosidades[numero];
}
