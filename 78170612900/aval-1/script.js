javascript
let idade = 25;

if (idade > 15 && idade < 18 || idade > 70) {
    console.log("O voto é opcional");
} else if (idade < 16) {
    console.log("Você não pode votar");
} else {
    console.log("Você é obrigado a votar");
}