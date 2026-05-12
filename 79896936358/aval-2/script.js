const numero = document.getElementById("numero");

const botaoMais = document.getElementById("mais");
const botaoMenos = document.getElementById("menos");

let contador = 0;

botaoMais.addEventListener("click", () => {
    contador++;
    numero.textContent = contador;
});

botaoMenos.addEventListener("click", () => {
    contador--;
    numero.textContent = contador;
});