// Dados da estudante
const nome = "Rayla Ruana de Oliveira Araújo";
const curso = "Estudante do Curso de Desenvolvimento de Sistemas";
const escola = "Escola CETI Francisca Trindade";

// Seleciona o elemento do cartão
const card = document.querySelector(".card");

// Adiciona um evento de clique
card.addEventListener("click", () => {
    alert(`Olá! Meu nome é ${nome}.
${curso}.
${escola}.`);
});

// Mensagem no console ao carregar a página
console.log("Página carregada com sucesso!");
console.log(`Nome: ${nome}`);
console.log(`Curso: ${curso}`);
console.log(`Escola: ${escola}`);