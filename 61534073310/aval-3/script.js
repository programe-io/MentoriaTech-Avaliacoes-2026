let nome = "João";
let idade = 18;

function apresentar(nome, idade) {
  console.log("Olá, " + nome + "!");

  if (idade >= 18) {
    console.log("Você é maior de idade.");
  } else {
    console.log("Você é menor de idade.");
  }
}

apresentar(nome, idade);
