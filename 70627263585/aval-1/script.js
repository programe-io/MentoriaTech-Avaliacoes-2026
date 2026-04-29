// Informações do usuário
const nome = "Dereck";
const serie = "2º ano do ensino médio";
const curso = "Desenvolvimento de Sistemas";
const escola = "Escola Francisca Trindade";

// Exibir mensagem no console
console.log(`Olá, meu nome é ${nome}.`);
console.log(`Sou estudante do ${serie}.`);
console.log(`Faço o curso de ${curso}.`);
console.log(`Estudo na ${escola}.`);

// Criar mensagem na página
const mensagem = document.createElement("p");
mensagem.textContent = `Olá! Eu sou ${nome}, estudante do ${curso}.`;
mensagem.style.fontWeight = "bold";
mensagem.style.textAlign = "center";

// Adicionar ao body
document.body.appendChild(mensagem);

// Criar botão interativo
const botao = document.createElement("button");
botao.textContent = "Clique para saber mais";
botao.style.display = "block";
botao.style.margin = "20px auto";
botao.style.padding = "10px 20px";
botao.style.cursor = "pointer";

// Evento de clique
botao.addEventListener("click", () => {
    alert(`Meu nome é ${nome}, estudo no ${serie} e faço ${curso} na ${escola}.`);
});

// Adicionar botão na página
document.body.appendChild(botao);