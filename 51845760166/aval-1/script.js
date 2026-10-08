const dadosUsuario = {
  nome: "Mariana Costa",
  idade: 26,
  profissao: "Designer UX",
  cidade: "Belo Horizonte",
  tecnologias: ["Figma", "HTML", "CSS"]};

console.log("=== PERFIL DO USUÁRIO ===");
console.log(`Nome Completo: ${dadosUsuario.nome}`);
console.log(`Idade: ${dadosUsuario.idade} anos`);
console.log(`Atuação: ${dadosUsuario.profissao}`);
console.log(`Localização: ${dadosUsuario.cidade}`);
console.log(`Habilidades: ${dadosUsuario.tecnologias.join(", ")}`);