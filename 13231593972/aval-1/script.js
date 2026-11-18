const notas = [8.5, 7.0, 9.0];

function calcularMedia(listaDeNotas) {
  let soma = 0;

  for (const nota of listaDeNotas) {
    soma += nota;
  }

  return soma / listaDeNotas.length;
}

const media = calcularMedia(notas);
const status = media >= 7 ? "Aprovado" : "Recuperação";

console.log(`Média: ${media.toFixed(1)} - ${status}`);