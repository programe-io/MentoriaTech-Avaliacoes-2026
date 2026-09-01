console.log("=== SISTEMA DE NOTAS ANUAIS ===");

// Entrada das notas
let n1 = Number(prompt("Digite a nota 1:"));
let n2 = Number(prompt("Digite a nota 2:"));
let n3 = Number(prompt("Digite a nota 3:"));
let n4 = Number(prompt("Digite a nota 4:"));
let n5 = Number(prompt("Digite a nota 5:"));
let n6 = Number(prompt("Digite a nota 6:"));
let n7 = Number(prompt("Digite a nota 7:"));
let n8 = Number(prompt("Digite a nota 8:"));

// Cálculo dos bimestres
let b1 = (n1 + n2) / 2;
let b2 = (n3 + n4) / 2;
let b3 = (n5 + n6) / 2;
let b4 = (n7 + n8) / 2;

// Cálculo dos semestres
let s1 = (b1 + b2) / 2;
let s2 = (b3 + b4) / 2;

// Média final
let mediaFinal = (s1 + s2) / 2;

// Resultados
console.log("=== RESULTADOS ===");

console.log("1º Bimestre: " + b1);
console.log("2º Bimestre: " + b2);
console.log("3º Bimestre: " + b3);
console.log("4º Bimestre: " + b4);

console.log("1º Semestre: " + s1);
console.log("2º Semestre: " + s2);

console.log("Média Final: " + mediaFinal);

// Situação final
if (mediaFinal >= 7) {
    console.log("Situação: Aprovado");
} else if (mediaFinal >= 5) {
    console.log("Situação: Recuperação");
} else {
    console.log("Situação: Reprovado");
}