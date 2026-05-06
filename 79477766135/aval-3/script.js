let contador = 0;

function clicar() {
  contador++;
  console.log("Você clicou " + contador + " vezes");

  // Se existir um elemento com id "texto", ele atualiza na tela
  const elemento = document.getElementById("texto");
  if (elemento) {
    elemento.innerText = "Cliques: " + contador;
  }
}