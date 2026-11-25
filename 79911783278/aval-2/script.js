<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mundo dos Famosos</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <h1>⭐ Mundo dos Famosos</h1>
    <p>Conheça grandes celebridades!</p>
</header>

<nav>
    <a href="#famosos">Celebridades</a>
    <a href="#sobre">Sobre</a>
</nav>

<h2 id="famosos">🌟 Famosos em destaque</h2>

<main class="famosos">

    <div class="celebridade">
        <img src="https://placehold.co/300x350/d8b4fe/49305e?text=Mia+Khalifa"
             alt="Mia Khalifa">
        <h3>Mia Khalifa</h3>
        <p>Personalidade da internet ⭐</p>
        <p>Líbano 🇱🇧</p>
        <button onclick="verPerfil('Mia Khalifa')">
            Ver perfil
        </button>
    </div>

    <div class="celebridade">
        <img src="https://image.tmdb.org/t/p/w500/8qBylBsQf4llkGrWR3qAsOtOU8O.jpg"
             alt="Cristiano Ronaldo">
        <h3>Cristiano Ronaldo</h3>
        <p>Jogador ⚽</p>
        <p>Portugal 🇵🇹</p>
        <button onclick="verPerfil('Cristiano Ronaldo')">
            Ver perfil
        </button>
    </div>

    <div class="celebridade">
        <img src="https://image.tmdb.org/t/p/w500/3TVQj7L9y8iU8T7n7v6Zz.jpg"
             alt="Zendaya">
        <h3>Zendaya</h3>
        <p>Atriz 🎬</p>
        <p>Estados Unidos 🇺🇸</p>
        <button onclick="verPerfil('Zendaya')">
            Ver perfil
        </button>
    </div>

    <div class="celebridade">
        <img src="https://image.tmdb.org/t/p/w500/7CcoVFTogQgex2kJkXKMe8qHZr2.jpg"
             alt="Neymar">
        <h3>Neymar</h3>
        <p>Jogador ⚽</p>
        <p>Brasil 🇧🇷</p>
        <button onclick="verPerfil('Neymar')">
            Ver perfil
        </button>
    </div>

</main>

<section id="sobre">
    <h2>Sobre o projeto</h2>
    <p>Um site para conhecer algumas celebridades do mundo! 🌎</p>
</section>

<footer>
    <p>© 2026 - Mundo dos Famosos</p>
</footer>

<script src="script.js"></script>

</body>
</html>