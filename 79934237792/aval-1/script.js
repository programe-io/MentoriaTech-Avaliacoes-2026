<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Homem-Aranha</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #050505, #8b0000);
            color: white;
            min-height: 100vh;
        }

        header {
            background: #e30613;
            padding: 20px;
            text-align: center;
            border-bottom: 5px solid #111;
        }

        header h1 {
            font-size: 45px;
            text-shadow: 4px 4px #000;
        }

        nav {
            margin-top: 15px;
        }

        nav a {
            color: white;
            text-decoration: none;
            margin: 0 15px;
            font-weight: bold;
        }

        nav a:hover {
            color: #000;
        }

        .hero {
            min-height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 40px;
            background:
                linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.75)),
                url("https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=1600&q=80");
            background-size: cover;
            background-position: center;
        }

        .hero-content {
            max-width: 700px;
        }

        .hero h2 {
            font-size: 60px;
            color: #e30613;
            text-shadow: 4px 4px #000;
        }

        .hero p {
            font-size: 20px;
            margin: 20px 0;
        }

        button {
            background: #e30613;
            color: white;
            border: 3px solid white;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: .3s;
        }

        button:hover {
            background: white;
            color: #e30613;
            transform: scale(1.1);
        }

        .galeria {
            padding: 50px 8%;
            text-align: center;
        }

        .galeria h2 {
            font-size: 35px;
            margin-bottom: 30px;
            color: #ff1a1a;
        }

        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
        }

        .card {
            background: #151515;
            border: 2px solid #e30613;
            border-radius: 15px;
            overflow: hidden;
            transition: .3s;
        }

        .card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 30px rgba(255, 0, 0, .5);
        }

        .card img {
            width: 100%;
            height: 280px;
            object-fit: cover;
        }

        .card h3 {
            padding: 15px;
            color: #ff3333;
        }

        .card p {
            padding: 0 15px 20px;
            color: #ccc;
        }

        footer {
            background: #050505;
            text-align: center;
            padding: 25px;
            margin-top: 30px;
        }

        #mensagem {
            margin-top: 20px;
            font-size: 22px;
            color: #ff3333;
            font-weight: bold;
        }
    </style>
</head>

<body>

    <header>
        <h1>🕷️ HOMEM-ARANHA 🕷️</h1>

        <nav>
            <a href="#inicio">Início</a>
            <a href="#galeria">Galeria</a>
        </nav>
    </header>

    <section class="hero" id="inicio">
        <div class="hero-content">
            <h2>Seu amigão da vizinhança</h2>

            <p>
                Com grandes poderes vêm grandes responsabilidades.
            </p>

            <button onclick="soltarTeia()">
                🕸️ Lançar Teia
            </button>

            <div id="mensagem"></div>
        </div>
    </section>

    <section class="galeria" id="galeria">

        <h2>🕷️ Galeria</h2>

        <div class="cards">

            <div class="card">
                <img
                    src="https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&w=800&q=80"
                    alt="Cidade à noite"
                >

                <h3>Nova York</h3>
                <p>
                    O Homem-Aranha patrulhando a cidade.
                </p>
            </div>

            <div class="card">
                <img
                    src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80"
                    alt="Prédio alto"
                >

                <h3>Arranha-céus</h3>
                <p>
                    O cenário perfeito para lançar teias.
                </p>
            </div>

            <div class="card">
                <img
                    src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
                    alt="Aranha"
                >

                <h3>O símbolo</h3>
                <p>
                    Uma inspiração para o herói.
                </p>
            </div>

        </div>
    </section>

    <footer>
        <p>🕷️ Site temático inspirado no Homem-Aranha</p>
    </footer>

    <script>
        function soltarTeia() {
            const mensagem = document.getElementById("mensagem");

            mensagem.innerHTML = "🕸️ THWIP! Teia lançada!";

            setTimeout(() => {
                mensagem.innerHTML = "";
            }, 3000);
        }

        // Efeito simples no título
        const titulo = document.querySelector("header h1");

        titulo.addEventListener("click", () => {
            titulo.style.transform = "scale(1.2)";

            setTimeout(() => {
                titulo.style.transform = "scale(1)";
            }, 500);
        });
    </script>

</body>
</html>

Como usar: salve o código como index.html e abra no navegador. O JavaScript está dentro da tag <script> e controla o botão “Lançar Teia” e a animação do título