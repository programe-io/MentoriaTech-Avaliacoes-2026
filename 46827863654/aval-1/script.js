// Lista de curiosidades

let curiosidades = [

    "O primeiro domínio registrado na internet foi symbolics.com, em 1985.",

    "O Bluetooth recebeu esse nome em referência ao rei Harald Bluetooth.",

    "O primeiro iPhone foi lançado em 2007.",

    "O código QR foi criado no Japão, em 1994.",

    "A linguagem Python foi criada por Guido van Rossum."

];

// Controlar a curiosidade exibida

let indice = 0;

// Função para mostrar curiosidades

function mostrarCuriosidade() {

    let elemento = document.getElementById("curiosidade-extra");

    elemento.innerText = curiosidades[indice];

    indice++;

    if (indice >= curiosidades.length) {
        indice = 0;
    }

}