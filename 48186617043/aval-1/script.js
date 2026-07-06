<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blog da Maria Eduarda</title>

<style>
body{
    margin:0;
    font-family:Arial, Helvetica, sans-serif;
    background:#f4f4f4;
}

header{
    background:linear-gradient(90deg,#ff69b4,#8a2be2);
    color:white;
    text-align:center;
    padding:40px;
}

nav{
    background:#222;
    text-align:center;
    padding:15px;
}

nav a{
    color:white;
    text-decoration:none;
    margin:15px;
    font-weight:bold;
}

.container{
    width:90%;
    max-width:900px;
    margin:30px auto;
}

.card{
    background:white;
    border-radius:12px;
    padding:25px;
    margin-bottom:20px;
    box-shadow:0 4px 10px rgba(0,0,0,.2);
}

img{
    width:100%;
    border-radius:10px;
}

button{
    background:#ff69b4;
    color:white;
    border:none;
    padding:12px 20px;
    border-radius:8px;
    cursor:pointer;
    font-size:16px;
}

button:hover{
    background:#d63384;
}

footer{
    background:#222;
    color:white;
    text-align:center;
    padding:20px;
}
</style>

</head>

<body onload="boasVindas()">

<header>
<h1>🌸 Blog da Maria Eduarda 🌸</h1>
<p>Meu cantinho na internet.</p>
</header>

<nav>
<a href="#">Início</a>
<a href="#">Sobre</a>
<a href="#">Contato</a>
</nav>

<div class="container">

<div class="card">

<img src="copa.png" alt="Imagem do blog">

<h2>Sobre Mim</h2>

<p>
Olá! Meu nome é <strong>Maria Eduarda</strong>.
Tenho <strong>16 anos</strong>, estudo no
<strong>Martins</strong> em tempo integral e moro com meus tios.
</p>

<p>
Gosto muito de escutar música, treinar na academia
e compartilhar minhas ideias neste blog.
</p>

<button onclick="curtir()">💖 Curtir</button>

<button onclick="mostrarMensagem()">😊 Clique Aqui</button>

<p id="texto"></p>

</div>

<div class="card">

<h2>📬 Contato</h2>

<p>Email: madusraiva25</p>

<p>Instagram: @__mariawz1</p>

</div>

</div>

<footer>
© 2026 - Blog da Maria Eduarda
</footer>

<script>

function boasVindas(){
    alert("Seja bem-vindo(a) ao Blog da Maria Eduarda! 🌸");
}

function curtir(){
    document.getElementById("texto").innerHTML =
    "💖 Obrigada por curtir o meu blog!";
}

function mostrarMensagem(){
    document.getElementById("texto").innerHTML =
    "🎵 Nunca deixe de acreditar nos seus sonhos!";
}

</script>

</body>
</html><!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Galeria da Era Moderna</title>

<style>
body{
    font-family:Arial, sans-serif;
    margin:0;
    background:#eef2f7;
}

header{
    background:#1e3a8a;
    color:white;
    text-align:center;
    padding:30px;
}

#galeria{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
    gap:20px;
    padding:30px;
}

.card{
    background:white;
    border-radius:12px;
    overflow:hidden;
    box-shadow:0 5px 15px rgba(0,0,0,0.2);
    transition:0.3s;
}

.card:hover{
    transform:scale(1.03);
}

.card img{
    width:100%;
    height:220px;
    object-fit:cover;
}

.card h2{
    padding:15px;
    color:#1e3a8a;
}

.card p{
    padding:0 15px 20px;
}
</style>

</head>

<body>

<header>
<h1>🌆 Paisagens da Era Moderna</h1>
<p>Galeria criada com JavaScript</p>
</header>

<div id="galeria"></div>

<script>

const imagens = [
{
titulo:"Cidade Moderna",
descricao:"Arranha-céus e arquitetura contemporânea.",
foto:"https://picsum.photos/600/400?random=1"
},
{
titulo:"Ponte Urbana",
descricao:"Infraestrutura moderna e inovação.",
foto:"https://picsum.photos/600/400?random=2"
},
{
titulo:"Paisagem Urbana",
descricao:"Grandes centros urbanos.",
foto:"https://picsum.photos/600/400?random=3"
},
{
titulo:"Cidade à Noite",
descricao:"Luzes e tecnologia.",
foto:"https://picsum.photos/600/400?random=4"
},
{
titulo:"Natureza e Cidade",
descricao:"Harmonia entre áreas verdes e edifícios.",
foto:"https://picsum.photos/600/400?random=5"
},
{
titulo:"Arquitetura Moderna",
descricao:"Construções marcantes da era moderna.",
foto:"https://picsum.photos/600/400?random=6"
}
];

const galeria = document.getElementById("galeria");

imagens.forEach(item => {

galeria.innerHTML += `
<div class="card">
<img src="${item.foto}" alt="${item.titulo}">
<h2>${item.titulo}</h2>
<p>${item.descricao}</p>
</div>
`;

});

</script>

</body>
</html>