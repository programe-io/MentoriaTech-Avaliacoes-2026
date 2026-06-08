 <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yarla | Site Pessoal</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&family=Playfair+Display:wght@700&display=swap');

        :root {
            --roxo: #7c3aed;
            --rosa: #ec4899;
            --azul: #3b82f6;
            --dark: #0f172a;
            --card: #1e293b;
            --text: #f1f5f9;
            --gray: #94a3b8;
            --border: #334155;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
            scroll-padding-top: 90px;
        }

        body {
            background: var(--dark);
            color: var(--text);
            font-family: 'Montserrat', sans-serif;
            line-height: 1.7;
        }

        ::selection {
            background: var(--roxo);
            color: #fff;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-areas: 
                "header"
                "menu"
                "conteudo"
                "rodape";
            gap: 30px;
            padding: 20px;
        }

        .cabecalho {
            grid-area: header;
        }

        header {
            text-align: center;
            padding: 60px 30px;
            background: linear-gradient(135deg, var(--roxo), var(--rosa), var(--azul));
            background-size: 300% 300%;
            animation: gradientMove 8s ease infinite;
            border-radius: 15px;
            clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(124, 58, 237, 0.3);
        }

        @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        header h1 {
            font-size: 3rem;
            font-family: 'Playfair Display', serif;
            color: #fff;
            margin-bottom: 10px;
            text-shadow: 0 4px 15px rgba(0,0,0,0.3);
            position: relative;
            z-index: 1;
        }

        header h1 span {
            color: #fff;
            display: inline-block;
            animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        header p {
            font-size: 1.2rem;
            color: rgba(255,255,255,0.9);
            font-weight: 300;
            position: relative;
            z-index: 1;
        }

        .menu {
            grid-area: menu;
            position: sticky;
            top: 20px;
            z-index: 100;
        }

        nav {
            background: rgba(30, 41, 59, 0.8);
            backdrop-filter: blur(15px) saturate(180%);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 15px 25px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }

        nav ul {
            list-style: none;
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
        }

        nav a {
            color: var(--text);
            text-decoration: none;
            font-weight: 600;
            padding: 8px 16px;
            border-radius: 8px;
            transition: all 0.3s ease;
            position: relative;
        }

        nav a::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--roxo), var(--rosa));
            transform: translateX(-50%);
            transition: width 0.3s ease;
        }

        nav a:hover {
            color: var(--rosa);
            background: rgba(124, 58, 237, 0.1);
        }

        nav a:hover::before {
            width: 80%;
        }

        .conteudo {
            grid-area: conteudo;
        }

        main {
            display: grid;
            gap: 30px;
        }

        article, section {
            background: var(--card);
            padding: 35px;
            border-radius: 12px;
            border: 1px solid var(--border);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        article::after, section::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 0;
            background: linear-gradient(180deg, var(--roxo), var(--rosa));
            transition: height 0.4s ease;
        }

        article:hover::after, section:hover::after {
            height: 100%;
        }

        article:hover, section:hover {
            border-color: var(--roxo);
            transform: translateY(-5px);
            box-shadow: 0 15px 50px rgba(124, 58, 237, 0.2);
        }

        h2 {
            font-size: 2rem;
            color: var(--rosa);
            margin-bottom: 20px;
            font-family: 'Playfair Display', serif;
            position: relative;
            display: inline-block;
        }

        h2::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 50px;
            height: 3px;
            background: var(--roxo);
            border-radius: 2px;
        }

        h3 {
            font-size: 1.5rem;
            color: var(--azul);
            margin-bottom: 15px;
        }

        article img {
            border-radius: 12px;
            border: 3px solid var(--roxo);
            margin: 20px 0;
            display: block;
            box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
            transition: all 0.4s ease;
            filter: grayscale(20%);
        }

        article img:hover {
            transform: scale(1.05) rotate(2deg);
            filter: grayscale(0%);
            border-color: var(--rosa);
        }

        p {
            margin-bottom: 15px;
            color: var(--gray);
        }

        p span, li span {
            color: var(--rosa);
            font-weight: 600;
            background: linear-gradient(90deg, var(--roxo), var(--rosa));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        ul {
            list-style: none;
            padding-left: 0;
        }

        li {
            padding: 12px 0 12px 30px;
            border-bottom: 1px dashed var(--border);
            position: relative;
            transition: all 0.3s ease;
        }

        li::before {
            content: '▹';
            position: absolute;
            left: 0;
            color: var(--roxo);
            font-size: 1.2rem;
            transition: transform 0.3s ease;
        }

        li:hover {
            color: var(--text);
            padding-left: 35px;
        }

        li:hover::before {
            transform: translateX(5px);
            color: var(--rosa);
        }

        li:last-child {
            border-bottom: none;
        }

        #redes li a {
            color: var(--text);
            text-decoration: none;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 10px;
        }

        #redes li a:hover {
            color: var(--rosa);
            transform: translateX(5px);
        }

        #redes li a::before {
            content: '\f08e';
            font-family: 'Font Awesome 6 Free';
            font-weight: 900;
        }

        aside {
            background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(236, 72, 153, 0.1));
            padding: 25px;
            border-radius: 12px;
            border: 1px solid var(--roxo);
            margin-top: 20px;
        }

        aside h3 {
            color: var(--rosa);
        }

        .rodape {
            grid-area: rodape;
        }

        footer {
            text-align: center;
            padding: 30px;
            background: var(--card);
            border-radius: 12px;
            border: 1px solid var(--border);
            color: var(--gray);
        }

        footer span {
            color: var(--rosa);
            font-weight: 600;
        }

        @media (max-width: 768px) {
            header h1 {
                font-size: 2.2rem;
            }

            nav ul {
                flex-direction: column;
                gap: 10px;
            }

            nav a {
                display: block;
                text-align: center;
            }

            article, section {
                padding: 25px;
            }

            h2 {
                font-size: 1.6rem;
            }
        }
    </style>
</head>
<body>

    <div class="container">

        <div class="cabecalho">
            <header>
                <h1><span>Yarla</span></h1>
                <p>Meu Site Pessoal</p>
            </header>
        </div>

        <div class="menu">
            <nav>
                <ul>
                    <li><a href="#sobre"><i class="fa-solid fa-user"></i> Sobre Mim</a></li>
                    <li><a href="#materias"><i class="fa-solid fa-book"></i> Interesses</a></li>
                    <li><a href="#funcoes"><i class="fa-solid fa-briefcase"></i> Funções</a></li>
                    <li><a href="#redes"><i class="fa-solid fa-share-nodes"></i> Redes Sociais</a></li>
                </ul>
            </nav>
        </div>

        <div class="conteudo">
            <main>

                <article>
                    <h2>Minha Apresentação</h2>

                    <img
                        src="https://via.placeholder.com/200/7c3aed/ffffff?text=Yarla"
                        alt="Foto de Yarla"
                        width="200">

                    <p>
                        Meu nome é <span>Yarla</span>. Sou estudante e amo filmes de terror,
                        HTML, CSS e criar conteúdo pro Instagram.
                    </p>
                </article>

                <section id="sobre">
                    <h2>Sobre Mim</h2>
                    <p>Tenho <span>[16]</span> anos, moro em <span>[caridade]</span>. Sou estudante e gosto de <span>programação</span>, <span>filmes de terror</span> e <span>design</span>.</p>
                </section>

                <section id="materias">
                    <h2>Interesses</h2>
                    <ul>
                        <li>HTML e CSS</li>
                        <li>Filmes de Terror</li>
                        <li>Design Digital</li>
                        <li>Criação de Conteúdo</li>
                    </ul>
                </section>

                <section id="funcoes">
                    <h2>Minhas Funções</h2>
                    <ul>
                        <li>Estudante</li>
                        <li>Content Creator</li>
                        <li>Dev Iniciante</li>
                        <li>Crítica de Terror</li>
                    </ul>
                </section>

                <aside>
                    <h3>Informações Extras</h3>
                    <p>Gosto de aprender programação e maratonar terror. Meu sonho é trabalhar com front-end.</p>
                </aside>

                <section id="redes">
                    <h2>Redes Sociais</h2>
                    <ul>
                        <li><a href="https://instagram.com/daily.yarla">Instagram</a></li>
                        <li><a href="https://tiktok.com/@daily.yarla">TikTok</a></li>
                        <li><a href="https://github.com/[seu-user]">GitHub</a></li>
                    </ul>
                </section>

            </main>
        </div>

        <div class="rodape">
            <footer>
                <p>&copy; 2026 - <span>Yarla</span></p>
            </footer>
        </div>

    </div>

</body>
</html>