
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Delícias de Bolo</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #fff4ec;
            margin: 0;
            color: #553322;
        }

        header {
            background-color: #e89b72;
            color: white;
            text-align: center;
            padding: 25px;
        }

        nav {
            background-color: #f4c4a5;
            padding: 15px;
            text-align: center;
        }

        nav a {
            color: #553322;
            text-decoration: none;
            margin: 15px;
            font-weight: bold;
        }

        main {
            max-width: 850px;
            margin: 30px auto;
            padding: 20px;
        }

        .receita {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 3px 10px #ddd;
            margin-bottom: 25px;
        }

        .receita img {
            width: 100%;
            border-radius: 12px;
        }

        button {
            background-color: #e89b72;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
        }

        button:hover {
            background-color: #c87550;
        }

        #preparo {
            display: none;
            margin-top: 15px;
        }

        footer {
            background-color: #e89b72;
            color: white;
            text-align: center;
            padding: 20px;
        }
    </style>
</head>

<body>

<header>
    <h1>🍰 Delícias de Bolo</h1>
    <p>Receitas deliciosas para adoçar seu dia!</p>
</header>

<nav>
    <a href="#inicio">Início</a>
    <a href="#receitas">Receitas</a>
    <a href="#sobre">Sobre</a>
</nav>

<main id="inicio">

    <h2 id="receitas">Nossa Receita do Dia</h2>

    <div class="receita">

        <img
        src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900"
        alt="Bolo de chocolate">

        <h2>🍫 Bolo de Chocolate</h2>

        <p>Um bolo fofinho, delicioso e perfeito para o café da tarde!</p>

        <h3>Ingredientes:</h3>

        <ul>
            <li>3 ovos</li>
            <li>2 xícaras de açúcar</li>
            <li>2 xícaras de farinha de trigo</li>
            <li>1 xícara de chocolate em pó</li>
            <li>1 xícara de leite</li>
            <li>1 colher de fermento</li>
        </ul>

        <button onclick="mostrarReceita()">
            Ver modo de preparo
        </button>

        <div id="preparo">
            <h3>Modo de preparo:</h3>

            <ol>
                <li>Misture os ovos e o açúcar.</li>
                <li>Adicione o leite e o chocolate.</li>
                <li>Acrescente a farinha aos poucos.</li>
                <li>Coloque o fermento e misture delicadamente.</li>
                <li>Despeje em uma forma untada.</li>
                <li>Asse a 180°C por aproximadamente 35 a 40 minutos.</li>
            </ol>

            <p>Pronto! Agora é só aproveitar seu bolo! ❤️</p>
        </div>

    </div>

    <section id="sobre">
        <h2>Sobre nosso blog</h2>
        <p>
            O Delícias de Bolo é um espaço para compartilhar
            receitas simples, saborosas e fáceis de fazer.
        </p>
    </section>

</main>

<footer>
    <p>© 2026 - Delícias de Bolo | Feito com ❤️</p>
</footer>

<script>
    function mostrarReceita() {
        const preparo = document.getElementById("preparo");

        if (preparo.style.display === "none") {
            preparo.style.display = "block";
        } else {
            preparo.style.display = "none";
        }
    }
</script>

</body>
</html>
