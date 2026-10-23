const texto = "Um Pouco Sobre Mim...";
let caractereIndex = 0;

function digitarEfeito() {
    const elementoSubtitulo = document.getElementById("subtitulo");
    
    if (caractereIndex < texto.length) {
        elementoSubtitulo.textContent += texto.charAt(caractereIndex);
        caractereIndex++;
        setTimeout(digitarEfeito, 100);
    }
}

window.onload = digitarEfeito;
