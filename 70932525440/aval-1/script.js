let contador = 0;

document.getElementById("clicar").addEventListener("click", function() {
    contador++;
    document.getElementById("contador").textContent = contador;
});

document.getElementById("resetar").addEventListener("click", function() {
    contador = 0;
    document.getElementById("contador").textContent = contador;
});