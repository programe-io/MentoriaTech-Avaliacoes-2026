const nota1 = 8;
const nota2 = 7;
const nota3 = 6;

const media = (nota1 + nota2 + nota3) / 3;

console.log("Média:", media.toFixed(1));

if (media >= 7) {
    console.log("Aprovado!");
} else {
    console.log("Reprovado!");
}