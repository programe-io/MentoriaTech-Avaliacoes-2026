// Informações sobre você
const nome = "Rayssa";
const ocupacao = "Estudante";
const escola = "Francisca Trindade";

// Criando elementos na página
const titulo = document.createElement("h1");
titulo.textContent = "Sobre Mim";

const infoNome = document.createElement("p");
infoNome.textContent = "Nome: " + nome;

const infoOcupacao = document.createElement("p");
infoOcupacao.textContent = "Ocupação: " + ocupacao;

const infoEscola = document.createElement("p");
infoEscola.textContent = "Escola: " + escola;

// Adicionando tudo no corpo da página
document.body.appendChild(titulo);
document.body.appendChild(infoNome);
document.body.appendChild(infoOcupacao);
document.body.appendChild(infoEscola);