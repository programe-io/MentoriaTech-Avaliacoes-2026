 <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily.yarla | Horror Hub</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Poppins:wght@300;400;600;700&display=swap');

        :root {
            --blood: #8b0000;
            --dark: #0a0a0a;
            --card: #151515;
            --text: #e0e0e0;
            --gray: #888;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            background: var(--dark);
            color: var(--text);
            font-family: 'Poppins', sans-serif;
            line-height: 1.7;
        }

     .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        nav {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(10,10,10,0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid #222;
            z-index: 1000;
        }

        nav.container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
        }

     .logo {
            font-family: 'Creepster', cursive;
            font-size: 1.8rem;
            color: var(--blood);
        }

     .nav-links a {
            color: var(--text);
            text-decoration: none;
            margin-left: 25px;
            font-weight: 400;
            transition: 0.3s;
        }

     .nav-links a:hover {
            color: var(--blood);
        }

        header {
            text-align: center;
            padding: 140px 20px 80px;
            background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),
                        url('https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1600') center/cover;
            border-bottom: 3px solid var(--blood);
        }

     .profile-pic {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            border: 4px solid var(--blood);
            object-fit: cover;
            margin-bottom: 15px;
            box-shadow: 0 0 20px rgba(139,0,0,0.5);
        }

        h1 {
            font-size: 3rem;
            font-family: 'Creepster', cursive;
            letter-spacing: 2px;
            color: #fff;
        }

     .username {
            color: var(--blood);
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 15px;
        }

     .bio {
            max-width: 650px;
            margin: 15px auto;
            font-size: 1.1rem;
            color: #bbb;
        }

     .social {
            margin-top: 25px;
        }

     .social a {
            color: var(--text);
            text-decoration: none;
            margin: 0 8px;
            padding: 10px 18px;
            border: 1px solid var(--blood);
            border-radius: 25px;
            transition: 0.3s;
            display: inline-block;
        }

     .social a:hover {
            background: var(--blood);
            transform: translateY(-2px);
        }

     .social i {
            margin-right: 6px;
        }

     .main-layout {
            display: grid;
            grid-template-columns: 1fr 320px;
            gap: 40px;
            padding: 70px 0;
        }

        main {
            min-width: 0;
        }

        /* ASIDE */
        aside {
            background: var(--card);
            padding: 25px;
            border-radius: 10px;
            border: 1px solid #2a2a2a;
            height: fit-content;
            position: sticky;
            top: 100px;
        }

        aside h3 {
            font-family: 'Creepster', cursive;
            color: var(--blood);
            font-size: 1.6rem;
            margin-bottom: 20px;
            letter-spacing: 1px;
        }

     .aside-block {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px dashed #2a2a2a;
        }

     .aside-block:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }

     .aside-block h4 {
            color: #fff;
            margin-bottom: 10px;
            font-size: 1.1rem;
        }

     .aside-block p {
            font-size: 0.9rem;
            color: var(--gray);
        }

     .tag-alert {
            background: var(--blood);
            color: #fff;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: bold;
        }

        section {
            margin-bottom: 70px;
        }

        h2 {
            font-size: 2.5rem;
            margin-bottom: 30px;
            color: var(--blood);
            font-family: 'Creepster', cursive;
            letter-spacing: 1px;
            border-left: 5px solid var(--blood);
            padding-left: 15px;
        }

     .about-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }

     .about-card {
            background: var(--card);
            padding: 30px;
            border-radius: 10px;
            border: 1px solid #2a2a2a;
        }

     .about-card h3 {
            color: #fff;
            margin-bottom: 15px;
            font-size: 1.4rem;
        }

     .stats {
            display: flex;
            justify-content: space-around;
            text-align: center;
            margin-top: 20px;
        }

     .stat-num {
            font-size: 2rem;
            color: var(--blood);
            font-weight: 700;
        }

     .stat-label {
            font-size: 0.9rem;
            color: var(--gray);
        }

        /* ARTICLE = CADA FILME É UM ARTIGO INDEPENDENTE */
     .movies-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 30px;
        }

        article.movie-card {
            background: var(--card);
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #2a2a2a;
            transition: 0.4s;
        }

        article.movie-card:hover {
            transform: translateY(-8px);
            border-color: var(--blood);
            box-shadow: 0 8px 25px rgba(139, 0, 0, 0.4);
        }

     .movie-poster {
            width: 100%;
            height: 380px;
            object-fit: cover;
        }

     .movie-info {
            padding: 20px;
        }

     .movie-title {
            font-size: 1.4rem;
            color: #fff;
            margin-bottom: 8px;
        }

     .movie-meta {
            font-size: 0.9rem;
            color: var(--blood);
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

     .movie-rating {
            background: var(--blood);
            color: #fff;
            padding: 3px 10px;
            border-radius: 5px;
            font-weight: bold;
        }

     .tags span {
            background: #222;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            margin-right: 5px;
            color: var(--gray);
        }

     .directors {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 25px;
            text-align: center;
        }

     .director {
            background: var(--card);
            padding: 25px 15px;
            border-radius: 10px;
            border: 1px solid #2a2a2a;
        }

     .director img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 10px;
            border: 2px solid var(--blood);
        }

     .director h4 {
            color: #fff;
            margin-bottom: 5px;
        }

     .director p {
            color: var(--gray);
            font-size: 0.85rem;
        }

     .watchlist {
            background: var(--card);
            padding: 30px;
            border-radius: 10px;
            border: 1px solid #2a2a2a;
        }

     .watchlist ul {
            list-style: none;
            columns: 2;
        }

     .watchlist li {
            padding: 8px 0;
            border-bottom: 1px dashed #2a2a2a;
        }

     .watchlist li:before {
            content: "🎬";
            margin-right: 10px;
        }

        footer {
            text-align: center;
            padding: 40px 20px;
            margin-top: 50px;
            border-top: 1px solid #2a2a2a;
            color: #666;
        }

        footer.quote {
            font-style: italic;
            margin-bottom: 15px;
            color: var(--gray);
        }

        @media (max-width: 900px) {
         .main-layout {
                grid-template-columns: 1fr;
            }
            aside {
                position: static;
                order: 2;
            }
         .about-grid,.watchlist ul {
                grid-template-columns: 1fr;
                columns: 1;
            }
         .nav-links { display: none; }
            h1 { font-size: 2.2rem; }
            h2 { font-size: 2rem; }
        }
    </style>
</head>
<body>
    <nav>
        <div class="container">
            <div class="logo">Daily.yarla</div>
            <div class="nav-links">
                <a href="#sobre">Sobre</a>
                <a href="#favoritos">Favoritos</a>
                <a href="#diretores">Diretores</a>
                <a href="#watchlist">Watchlist</a>
            </div>
        </div>
    </nav>

    <header>
        <img src="https://i.imgur.com/8Km9tLL.png" alt="Foto de Yarla" class="profile-pic">
        <h1>Yarla</h1>
        <p class="username">@daily.yarla</p>
        <p class="bio">
            Crítica de terror nas horas vagas e profissional em tomar susto.
            Se não me fez dormir de luz acesa, nem era tão bom assim.
        </p>
        <div class="social">
            <a href="https://instagram.com/daily.yarla" target="_blank"><i class="fab fa-instagram"></i>Instagram</a>
            <a href="https://tiktok.com/@daily.yarla" target="_blank"><i class="fab fa-tiktok"></i>TikTok</a>
            <a href="https://letterboxd.com/" target="_blank"><i class="fa-solid fa-film"></i>Letterboxd</a>
        </div>
    </header>

    <div class="container main-layout">
        <main>
            <section id="sobre">
                <h2>Sobre Mim</h2>
                <div class="about-grid">
                    <div class="about-card">
                        <h3>Ficha Técnica</h3>
                        <p><strong>Nome:</strong> Yarla [Sobrenome]</p>
                        <p><strong>Idade:</strong> [Sua Idade] anos</p>
                        <p><strong>Cidade:</strong> [Sua Cidade - UF]</p>
                        <p><strong>Primeiro terror:</strong> [Nome do Filme]</p>
                        <p><strong>Subgênero favorito:</strong> Terror Psicológico + Slasher</p>
                        <p><strong>Maior medo:</strong> Bonecas antigas e crianças cantando</p>
                    </div>
                    <div class="about-card">
                        <h3>Estatísticas do Horror</h3>
                        <div class="stats">
                            <div>
                                <div class="stat-num">147</div>
                                <div class="stat-label">Filmes Vistos</div>
                            </div>
                            <div>
                                <div class="stat-num">32</div>
                                <div class="stat-label">Noites sem dormir</div>
                            </div>
                            <div>
                                <div class="stat-num">9.2</div>
                                <div class="stat-label">Nota Média</div>
                            </div>
                        </div>
                        <p style="margin-top: 25px; color: var(--gray);">
                            <strong>Meta 2026:</strong> Zerar todos os filmes do Jordan Peele e Ari Aster + assistir 1 terror nacional por mês.
                        </p>
                    </div>
                </div>
            </section>

            <section id="favoritos">
                <h2>Top Filmes Favoritos</h2>
                <div class="movies-grid">

                    <!-- TAG ARTICLE AQUI -->
                    <article class="movie-card">
                        <img src="https://image.tmdb.org/t/p/w500/5aUX4pu1u6VxH8lJ5VGJbVXeVNw.jpg" alt="Hereditário" class="movie-poster">
                        <div class="movie-info">
                            <h3 class="movie-title">Hereditário</h3>
                            <div class="movie-meta">
                                <span>2018 • Ari Aster</span>
                                <span class="movie-rating">9.8</span>
                            </div>
                            <div class="tags"><span>Psicológico</span><span>Culto</span><span>Trauma</span></div>
                            <p class="movie-sinopse">
                                Trauma familiar, miniaturas e um demônio chamado Paimon. O filme que me fez ter medo de poste.
                            </p>
                        </div>
                    </article>

                    <!-- TAG ARTICLE AQUI -->
                    <article class="movie-card">
                        <img src="https://image.tmdb.org/t/p/w500/v56ahB7IzyNneDnbP8RwfCTRNDL.jpg" alt="Corra!" class="movie-poster">
                        <div class="movie-info">
                            <h3 class="movie-title">Corra!</h3>
                            <div class="movie-meta">
                                <span>2017 • Jordan Peele</span>
                                <span class="movie-rating">9.5</span>
                            </div>
                            <div class="tags"><span>Social</span><span>Suspense</span><span>Plot Twist</span></div>
                            <p class="movie-sinopse">
                                Terror social perfeito. A cena do "sunken place" vive na minha cabeça sem pagar aluguel.
                            </p>
                        </div>
                    </article>

                    <!-- TAG ARTICLE AQUI -->
                    <article class="movie-card">
                        <img src="https://image.tmdb.org/t/p/w500/7lTnGlL6FIj4rJ2iXzOIkUzJZKj.jpg" alt="Pânico" class="movie-poster">
                        <div class="movie-info">
                            <h3 class="movie-title">Pânico</h3>
                            <div class="movie-meta">
                                <span>1996 • Wes Craven</span>
                                <span class="movie-rating">9.0</span>
                            </div>
                            <div class="tags"><span>Slasher</span><span>Meta</span><span>Clássico</span></div>
                            <p class="movie-sinopse">
                                Ghostface me ensinou as regras do terror. Qual seu filme de terror favorito? O meu é esse.
                            </p>
                        </div>
                    </article>

                </div>
            </section>

            <section id="diretores">
                <h2>Diretores Que Eu Venero</h2>
                <div class="directors">
                    <div class="director">
                        <img src="https://m.media-amazon.com/images/M/MV5BMTY1NTc1MjI0M15BMl5BanBnXkFtZTcwODAyMTY1OA@@._V1_.jpg" alt="Jordan Peele">
                        <h4>Jordan Peele</h4>
                        <p>Corra!, Nós, Não! Não Olhe!</p>
                    </div>
                    <div class="director">
                        <img src="https://m.media-amazon.com/images/M/MV5BMTk2NTYxODIwMF5BMl5BanBnXkFtZTcwNDE2NDE3Mw@@._V1_.jpg" alt="Ari Aster">
                        <h4>Ari Aster</h4>
                        <p>Hereditário, Midsommar</p>
                    </div>
                    <div class="director">
                        <img src="https://m.media-amazon.com/images/M/MV5BMjI4NjE2ODUyNl5BMl5BanBnXkFtZTcwMzM2MTk2Mw@@._V1_.jpg" alt="James Wan">
                        <h4>James Wan</h4>
                        <p>Invocação do Mal, Sobrenatural</p>
                    </div>
                </div>
            </section>

            <section id="watchlist">
                <h2>Minha Watchlist 2026</h2>
                <div class="watchlist">
                    <ul>
                        <li>Fale Comigo 2</li>
                        <li>Longlegs</li>
                        <li>MaXXXine</li>
                        <li>Abigail</li>
                        <li>Os Observadores</li>
                        <li>Imaculada</li>
                        <li>Entrevista com o Demônio</li>
                        <li>A Primeira Profecia</li>
                    </ul>
                </div>
            </section>
        </main>

        <aside>
            <h3>Extras</h3>
            <div class="aside-block">
                <h4><i class="fa-solid fa-star"></i> Última Crítica</h4>
                <p><strong>Fale Comigo - 9.0/10</strong><br>
                Melhor possessão dos últimos anos. A cena da mão é agoniante e o final me destruiu. A24 não erra.</p>
            </div>
            <div class="aside-block">
                <h4><i class="fa-solid fa-calendar"></i> Filme do Mês</h4>
                <p><strong>Junho: O Telefone Preto</strong><br>
                Ethan Hawke assustador e roteiro do Joe Hill. Nostalgia + terror = perfeito.</p>
            </div>
            <div class="aside-block">
                <h4><i class="fa-solid fa-triangle-exclamation"></i> Alerta de Gatilho</h4>
                <p>Meus filmes favoritos costumam ter: <span class="tag-alert">Trauma</span> <span class="tag-alert">Luto</span> <span class="tag-alert">Violência</span><br>
                Se não curte, foge de Hereditário e Midsommar.</p>
            </div>
        </aside>
    </div>

    <footer>
        <p class="quote">"What's your favorite scary movie?" - Ghostface</p>
        <p>Feito com ❤️, café e muito terror por @daily.yarla | 2026</p>
    </footer>
</body>
</html>