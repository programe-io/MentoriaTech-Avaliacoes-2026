<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Mentoria Tech JS</title>
  <style>
    body { font-family: Arial; margin: 0; background: #f4f4f4; }
    header { background: #0d6efd; color: white; padding: 15px; text-align: center; }
    .container { display: flex; }
    .menu { width: 250px; background: #1e293b; padding: 20px; color: white; }
    .menu button {
      width: 100%; padding: 10px; margin-bottom: 10px;
      background: #334155; border: none; color: white;
      cursor: pointer; border-radius: 5px;
    }
    .menu button:hover { background: #0d6efd; }
    .content { flex: 1; padding: 20px; }
    .box {
      background: white; padding: 20px;
      border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    input, button { margin-top: 10px; padding: 8px; }
  </style>
</head>
<body>

<header>
  <h1>Mentoria Tech 🚀</h1>
</header>

<div class="container">
  <div class="menu" id="menu"></div>
  <div class="content">
    <div class="box" id="conteudo"></div>
  </div>
</div>

<script>
// Dados dos módulos
const modulos = [
  {
    titulo: "1.01 Introdução",
    conteudo: () => `
      <h2>Introdução à Lógica de Programação</h2>
      <p>Lógica é a forma de resolver problemas com passos.</p>
      <p>JavaScript é usado para criar interatividade.</p>
    `
  },
  {
    titulo: "1.02 Variáveis",
    conteudo: () => `
      <h2>Variáveis e Tipos de Dados</h2>
      <input type="text" id="nome" placeholder="Digite seu nome">
      <button onclick="salvarNome()">Salvar</button>
      <p id="res"></p>
    `
  },
  {
    titulo: "1.03 Operadores",
    conteudo: () => `
      <h2>Operadores Aritméticos</h2>
      <input type="number" id="n1" placeholder="Número 1">
      <input type="number" id="n2" placeholder="Número 2">
      <button onclick="somar()">Somar</button>
      <p id="resultado"></p>
    `
  }
];

// Criar menu dinamicamente
const menu = document.getElementById("menu");

modulos.forEach((mod, i) => {
  const btn = document.createElement("button");
  btn.innerText = mod.titulo;
  btn.onclick = () => carregarModulo(i);
  menu.appendChild(btn);
});

// Carregar conteúdo
function carregarModulo(index) {
  document.getElementById("conteudo").innerHTML = modulos[index].conteudo();
}

// Funções interativas
function salvarNome() {
  const nome = document.getElementById("nome").value;
  document.getElementById("res").innerText = "Olá, " + nome;
}

function somar() {
  const n1 = Number(document.getElementById("n1").value);
  const n2 = Number(document.getElementById("n2").value);
  document.getElementById("resultado").innerText = "Resultado: " + (n1 + n2);
}

// Inicializar
carregarModulo(0);
</script>

</body>
</html>