// ==========================================
// 1. VARIÁVEIS E CONSTANTES (Guardar dados)
// ==========================================
let nomeUsuario = "Ana"; // 'let' permite que o valor mude depois
const anoAtual = 2026;   // 'const' é fixo, não pode ser alterado

// ==========================================
// 2. FUNÇÕES (Blocos de código que fazem tarefas)
// ==========================================
// Esta função cria uma mensagem personalizada de boas-vindas
function criarSaudacao(nome) {
    return "Olá, " + nome + "! Seja bem-vindo(a) ao sistema.";
}

// Executando a função e mostrando o resultado no console do navegador
let mensagem = criarSaudacao(nomeUsuario);
console.log(mensagem); 

// ==========================================
// 3. CONDICIONAIS (Tomada de decisões)
// ==========================================
let idadeUsuario = 20;

if (idadeUsuario >= 18) {
    console.log("Acesso liberado: Você é maior de idade.");
} else {
    console.log("Acesso bloqueado: Você é menor de idade.");
}

// ==========================================
// 4. INTERAÇÃO COM O HTML (Manipulação do DOM)
// ==========================================
// Imagina que no seu HTML existe um botão com id="meuBotao"
const botao = document.getElementById("meuBotao");

// E um parágrafo de texto com id="textoMensagem"
const textoNaTela = document.getElementById("textoMensagem");

// Ouvinte de Evento: Fica esperando o usuário clicar no botão
botao.addEventListener("click", function() {
    // Quando o usuário clicar, altera o texto do parágrafo no HTML
    textoNaTela.innerText = "Parabéns! O JavaScript detectou o seu clique e alterou este texto.";
    
    // Mostra um alerta pop-up na tela
    alert("O botão foi clicado com sucesso!");
});