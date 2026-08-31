```javascript
function abrirImagem(imagem, titulo) {
    const modal = document.getElementById("modal");
    const imagemGrande = document.getElementById("imagemGrande");
    const tituloImagem = document.getElementById("tituloImagem");

    imagemGrande.src = imagem;
    tituloImagem.textContent = titulo;

    modal.style.display = "flex";
}

function fecharImagem() {
    document.getElementById("modal").style.display = "none";
}

// Fecha a imagem pressionando ESC
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        fecharImagem();
    }
});
```
