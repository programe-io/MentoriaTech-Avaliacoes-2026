// =========================
// 1. VARIÁVEIS E TIPOS
// =========================
let nome = "João";
let idade = 20;
let ativo = true;

console.log("Nome:", nome);
console.log("Idade:", idade);
console.log("Ativo:", ativo);

// =========================
// 2. FUNÇÕES
// =========================
function saudacao(nome) {
  return `Olá, ${nome}! Bem-vindo ao site.`;
}

console.log(saudacao("Maria"));

// Arrow function
const soma = (a, b) => a + b;

console.log("Soma:", soma(5, 3));

// =========================
// 3. ARRAYS
// =========================
let frutas = ["maçã", "banana", "uva"];

frutas.push("laranja"); // adiciona item

frutas.forEach((fruta, index) => {
  console.log(index + " - " + fruta);
});

// =========================
// 4. OBJETOS
// =========================
let usuario = {
  nome: "Carlos",
  idade: 30,
  email: "carlos@email.com",
  ativo: true
};

console.log(usuario.nome);
console.log(usuario.email);

// =========================
// 5. CONDIÇÕES
// =========================
if (usuario.idade >= 18) {
  console.log("Maior de idade");
} else {
  console.log("Menor de idade");
}

// =========================
// 6. LOOP
// =========================
for (let i = 0; i < 5; i++) {
  console.log("Número:", i);
}

// =========================
// 7. DOM (MANIPULAÇÃO DE HTML)
// =========================
// Precisa existir um elemento no HTML com id="titulo"
document.addEventListener("DOMContentLoaded", () => {
  const titulo = document.getElementById("titulo");

  if (titulo) {
    titulo.innerText = "Texto alterado pelo JavaScript!";
    titulo.style.color = "blue";
  }
});

// =========================
// 8. EVENTO DE CLIQUE
// =========================
// Precisa existir um botão com id="botao"
const botao = document.getElementById("botao");

if (botao) {
  botao.addEventListener("click", () => {
    alert("Você clicou no botão!");
  });
}

// =========================
// 9. FUNÇÃO COM INTERAÇÃO
// =========================
function mostrarMensagem() {
  const msg = document.getElementById("mensagem");

  if (msg) {
    msg.innerText = "Mensagem atualizada com JavaScript!";
  }
}

// =========================
// 10. SIMULAÇÃO DE API (PROMISE)
// =========================
function buscarDados() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Dados carregados com sucesso!");
    }, 2000);
  });
}

buscarDados().then((resposta) => {
  console.log(resposta);
});