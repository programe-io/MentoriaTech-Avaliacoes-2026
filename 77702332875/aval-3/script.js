// Exemplo de código JavaScript: Filtrando usuários adultos
const usuarios = [
  { nome: "Ana", idade: 22 \},
  { nome: "Bruno", idade: 30 \},
  { nome: "Carla", idade: 17 \},
  { nome: "Daniel", idade: 25 \}
];

// Filtra apenas quem tem 18 anos ou mais
const maioresDeIdade = usuarios.filter(usuario => usuario.idade >= 18);

console.log("Usuários maiores de idade:");
console.log(maioresDeIdade);$0