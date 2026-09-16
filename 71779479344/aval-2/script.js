ad>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Portfólio | Leonarda</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
            scroll-behavior: smooth;
        }

        body {
            background: #0f0f1a;
            color: white;
            line-height: 1.6;
        }

        header {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 30px;
            background: linear-gradient(135deg, #15152b, #4b1d66);
        }

        .hero {
            max-width: 800px;
        }

        .hero h1 {
            font-size: 4rem;
            color: #d98cff;
            margin-bottom: 10px;
        }

        .hero h2 {
            font-size: 1.8rem;
            margin-bottom: 20px;
        }

        .hero p {
            color: #ddd;
            font-size: 1.1rem;
        }

        .btn {
            display: inline-block;
            margin-top: 30px;
            padding: 12px 25px;
            background: #d98cff;
            color: #171020;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            transition: 0.3s;
        }

        .btn:hover {
            transform: scale(1.05);
            background: #ffffff;
        }

        nav {
            position: fixed;
            top: 0;
            width: 100%;
            padding: 18px;
            background: rgba(15, 15, 26, 0.9);
            text-align: center;
            z-index: 1000;
        }

        nav a {
            color: white;
            text-decoration: none;
            margin: 0 15px;
            font-weight: bold;
        }

        nav a:hover {
            color: #d98cff;
        }

        section {
            padding: 90px 10%;
        }

        section h2 {
            text-align: center;
            color: #d98cff;
            font-size: 2.5rem;
            margin-bottom: 40px;
        }

        .sobre {
            max-width: 850px;
            margin: auto;
            text-align: center;
            color: #ddd;
            font-size: 1.1rem;
        }

        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 25px;
        }

        .card {
            background: #191929;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            border: 1px solid #302044;
            transition: 0.3s;
        }

        .card:hover {
            transform: translateY(-8px);
            border-color: #d98cff;
        }

        .card h3 {
            color: #d98cff;
            margin-bottom: 10px;
        }

        .card p {
            color: #ccc;
        }

        .dados {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
        }

        .dado {
            background: #191929;
            padding: 25px 40px;
            border-radius: 15px;
            text-align: center;
            min-width: 180px;
        }

        .dado strong {
            display: block;
            color: #d98cff;
            font-size: 1.3rem;
            margin-bottom: 5px;
        }

        footer {
            text-align: center;
            padding: 30px;
            background: #08080f;
            color: #aaa;
        }

        @media (max-width: 600px) {
            .hero h1 {
                font-size: 2.8rem;
            }

            nav a {
                margin: 0 5px;
                font-size: 0.9rem;
            }

            section {
                padding: 70px 6%;
            }
        }
    </style>
</head>

<body>

    <!-- MENU -->
    <nav>
        <a href="#inicio">Início</a>
        <a href="#sobre">Sobre Mim</a>
        <a href="#qualidades">Qualidades</a>
        <a href="#sonhos">Sonhos</a>
    </nav>

    <!-- INÍCIO -->
    <header id="inicio">
        <div class="hero">
            <h1>Leonarda</h1>

            <h2>Meu Portfólio Pessoal</h2>

            <p>
                Olá! Meu nome é <strong>Leonarda</strong>, tenho
                <strong>17 anos</strong> e este é o meu espaço pessoal,
                onde posso apresentar um pouco sobre quem sou,
                meus interesses, minhas qualidades e meus sonhos.
            </p>

            <a href="#sobre" class="btn">Conheça minha história</a>
        </div>
    </header>

    <!-- SOBRE MIM -->
    <section id="sobre">
        <h2>Sobre Mim</h2>

        <div class="sobre">
            <p>
                Meu nome é Leonarda e tenho 17 anos. Estou vivendo uma
                fase importante da minha vida, cheia de descobertas,
                aprendizados e novas experiências.
            </p>

            <br>

            <p>
                Sou uma pessoa que está construindo sua própria história
                e descobrindo cada vez mais aquilo que gosta, aquilo em
                que é boa e aquilo que deseja conquistar no futuro.
            </p>

            <br>

            <p>
                Este portfólio representa um pouco da minha personalidade
                e também os meus objetivos. Aqui posso registrar minhas
                experiências, meus projetos, minhas habilidades e tudo
                aquilo que faz parte da minha trajetória.
            </p>
        </div>
    </section>

    <!-- DADOS -->
    <section>
        <h2>Sobre Mim</h2>

        <div class="dados">

            <div class="dado">
                <strong>Nome</strong>
                Leonarda
            </div>

            <div class="dado">
                <strong>Idade</strong>
                17 anos
            </div>

            <div class="dado">
                <strong>Momento</strong>
                Construindo meu futuro
            </div>

        </div>
    </section>

    <!-- QUALIDADES -->
    <section id="qualidades">
        <h2>Minhas Qualidades</h2>

        <div class="cards">

            <div class="card">
                <h3>🌟 Determinação</h3>
                <p>
                    Busco continuar aprendendo e evoluindo,
                    mesmo diante dos desafios.
                </p>
            </div>

            <div class="card">
                <h3>💡 Criatividade</h3>
                <p>
                    Gosto de descobrir novas ideias e encontrar
                    diferentes maneiras de fazer as coisas.
                </p>
            </div>

            <div class="card">
                <h3>📚 Aprendizado</h3>
                <p>
                    Estou sempre em busca de novos conhecimentos
                    e experiências.
                </p>
            </div>

            <div class="card">
                <h3>🚀 Futuro</h3>
                <p>
                    Tenho sonhos e objetivos que quero conquistar
                    ao longo da minha vida.
                </p>
            </div>

        </div>
    </section>

    <!-- SONHOS -->
    <section id="sonhos">
        <h2>Meus Sonhos e Objetivos</h2>

        <div class="sobre">

            <p>
                Tenho muitos sonhos para o meu futuro e sei que cada
                pequena conquista faz parte de uma caminhada maior.
            </p>

            <br>

            <p>
                Quero continuar estudando, aprendendo, conhecendo novas
                possibilidades e construindo uma vida da qual eu possa
                me orgulhar.
            </p>

            <br>

            <p>
                <strong>
                    "Meu futuro começa com as escolhas que faço hoje."
                </strong>
            </p>

        </div>
    </section>

    <!-- RODAPÉ -->
    <footer>
        <p>© 2026 Leonarda — Meu Portfólio Pessoal</p>
        <p>Feito com HTML e CSS 💜</p>
    </footer>

</body>
</html>
