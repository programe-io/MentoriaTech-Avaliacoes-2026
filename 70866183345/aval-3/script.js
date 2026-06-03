// 1. Variáveis (espaços na memória para guardar dados)
let nomeUsuario = "Desenvolvedor"; // Pode ser alterada
const anoAtual = 2026;            // Valor fixo, não pode ser alterado

// 2. Funções (blocos de código que executam uma tarefa quando chamados)
function saudar(nome) {
    return "Olá, " + nome + "! Bem-vindo ao JavaScript.";
}

// Executando a função e guardando o resultado
let mensagem = saudar(nomeUsuario);
console.log(mensagem); // Exibe o texto no console do navegador// 1. Selecionando os elementos do HTML que queremos manipular
const imagemArtigo = document.querySelector("main img");
const spanDestaque = document.querySelector("h2 span");
const linkMenu = document.querySelector("nav a");

// 2. Criando uma ação baseada em um EVENTO (Ouvindo o clique do usuário)
linkMenu.addEventListener("click", function(evento) {
    evento.preventDefault(); // Impede o link de seguir o endereço padrão
    alert("Você clicou no menu de navegação!");
});

// 3. Modificando propriedades dinamicamente com JS
// Vamos fazer com que, ao passar o mouse sobre o SPAN, a imagem mude de tamanho
spanDestaque.addEventListener("mouseover", function() {
    imagemArtigo.style.transform = "scale(1.05)"; // Aumenta a imagem levemente
    imagemArtigo.style.transition = "transform 0.3s ease"; // Suaviza o efeito
});

spanDestaque.addEventListener("mouseout", function() {
    imagemArtigo.style.transform = "scale(1)"; // Volta ao tamanho original
});