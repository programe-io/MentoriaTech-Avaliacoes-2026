<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Juventus x Flamengo | Fan App</title>

    <style>

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            background: #080808;
            color: white;
        }

        header {
            background: linear-gradient(90deg, #050505, #171717);
            padding: 20px;
            position: sticky;
            top: 0;
            z-index: 100;
            border-bottom: 2px solid #d71920;
        }

        nav {
            max-width: 1200px;
            margin: auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 25px;
            font-weight: bold;
        }

        .logo span {
            color: #d71920;
        }

        nav ul {
            display: flex;
            list-style: none;
            gap: 25px;
        }

        nav a {
            color: white;
            text-decoration: none;
            font-weight: bold;
        }

        nav a:hover {
            color: #d71920;
        }

        /* HERO */

        .hero {
            min-height: 600px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;

            background:
                radial-gradient(circle at 20% 50%, #333, transparent 30%),
                radial-gradient(circle at 80% 50%, #700000, transparent 30%),
                #090909;
        }

        .hero-content {
            width: 90%;
            max-width: 1000px;
        }

        .hero h1 {
            font-size: 55px;
            margin-bottom: 15px;
        }

        .hero h1 span {
            color: #d71920;
        }

        .hero p {
            color: #bbb;
            margin-bottom: 45px;
        }

        /* PLACAR */

        .scoreboard {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 50px;
        }

        .team {
            width: 220px;
            padding: 30px;
            border-radius: 20px;
            background: rgba(255,255,255,.05);
            border: 1px solid #333;
            transition: .3s;
        }

        .team:hover {
            transform: translateY(-8px);
            background: rgba(255,255,255,.1);
        }

        .badge {
            width: 110px;
            height: 110px;
            border-radius: 50%;
            margin: auto auto 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 30px;
            font-weight: bold;
        }

        .juve {
            background:
                repeating-linear-gradient(
                    90deg,
                    #fff 0,
                    #fff 20px,
                    #111 20px,
                    #111 40px
                );
            color: #000;
        }

        .flamengo {
            background:
                repeating-linear-gradient(
                    0deg,
                    #d71920 0,
                    #d71920 20px,
                    #080808 20px,
                    #080808 40px
                );
            color: white;
        }

        .team h2 {
            margin-bottom: 8px;
        }

        .team small {
            color: #aaa;
        }

        .score {
            font-size: 65px;
            font-weight: bold;
        }

        .versus {
            color: #d71920;
            font-size: 28px;
            font-weight: bold;
        }

        /* BOTÕES */

        button {
            border: none;
            cursor: pointer;
        }

        .main-button {
            margin-top: 40px;
            padding: 15px 30px;
            border-radius: 30px;
            background: #d71920;
            color: white;
            font-weight: bold;
            transition: .3s;
        }

        .main-button:hover {
            background: #ff2630;
            transform: scale(1.05);
        }

        /* CONTAINER */

        .container {
            max-width: 1200px;
            margin: auto;
            padding: 70px 25px;
        }

        .title {
            text-align: center;
            margin-bottom: 45px;
        }

        .title h2 {
            font-size: 38px;
        }

        .title p {
            color: #999;
            margin-top: 10px;
        }

        /* ESTATÍSTICAS */

        .stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }

        .stat {
            background: #151515;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            border: 1px solid #292929;
        }

        .stat h3 {
            color: #d71920;
            font-size: 35px;
        }

        .stat p {
            color: #aaa;
            margin-top: 8px;
        }

        /* COMPARAÇÃO */

        .comparison {
            margin-top: 60px;
        }

        .bar-box {
            margin-bottom: 25px;
        }

        .bar-title {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }

        .bar {
            height: 12px;
            background: #222;
            border-radius: 20px;
            overflow: hidden;
        }

        .bar-juve {
            height: 100%;
            width: 72%;
            background: white;
        }

        .bar-flamengo {
            height: 100%;
            width: 82%;
            background: #d71920;
        }

        /* JOGADORES */

        .players {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
        }

        .player {
            background: #151515;
            border-radius: 15px;
            padding: 25px;
            text-align: center;
            border: 1px solid #292929;
            transition: .3s;
        }

        .player:hover {
            transform: translateY(-7px);
            border-color: #d71920;
        }

        .player-photo {
            width: 100px;
            height: 100px;
            margin: auto auto 15px;
            border-radius: 50%;
            background: linear-gradient(135deg, #333, #111);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 35px;
        }

        .player h3 {
            margin-bottom: 5px;
        }

        .player p {
            color: #888;
            font-size: 13px;
        }

        /* VOTAÇÃO */

        .vote-section {
            background: linear-gradient(135deg, #111, #220609);
            padding: 50px 25px;
            border-radius: 25px;
            text-align: center;
        }

        .vote-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 30px;
        }

        .vote {
            padding: 15px 30px;
            border-radius: 10px;
            font-weight: bold;
            color: white;
            transition: .3s;
        }

        .vote.juventus {
            background: white;
            color: black;
        }

        .vote.flamengo {
            background: #d71920;
        }

        .vote:hover {
            transform: scale(1.05);
        }

        #resultado {
            margin-top: 25px;
            color: #ccc;
        }

        /* NOTÍCIAS */

        .news {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }

        .news-card {
            background: #151515;
            padding: 25px;
            border-radius: 15px;
            border-left: 4px solid #d71920;
        }

        .news-card span {
            color: #d71920;
            font-size: 12px;
            font-weight: bold;
        }

        .news-card h3 {
            margin: 12px 0;
        }

        .news-card p {
            color: #999;
            line-height: 1.6;
        }

        /* FOOTER */

        footer {
            background: #030303;
            padding: 40px 20px;
            text-align: center;
            border-top: 1px solid #222;
        }

        footer h2 {
            margin-bottom: 10px;
        }

        footer span {
            color: #d71920;
        }

        footer p {
            color: #666;
        }

        /* TOAST */

        #toast {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translate(-50%, 100px);
            background: #d71920;
            color: white;
            padding: 15px 25px;
            border-radius: 30px;
            transition: .4s;
            z-index: 999;
        }

        #toast.show {
            transform: translate(-50%, 0);
        }

        /* RESPONSIVO */

        @media(max-width: 800px) {

            nav ul {
                display: none;
            }

            .hero h1 {
                font-size: 38px;
            }

            .scoreboard {
                gap: 15px;
            }

            .team {
                width: 145px;
                padding: 20px 10px;
            }

            .badge {
                width: 80px;
                height: 80px;
                font-size: 22px;
            }

            .score {
                font-size: 45px;
            }

            .stats,
            .news {
                grid-template-columns: 1fr;
            }

            .players {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media(max-width: 500px) {

            .hero {
                min-height: 550px;
            }

            .scoreboard {
                gap: 5px;
            }

            .team {
                width: 115px;
            }

            .versus {
                font-size: 18px;
            }

            .players {
                grid-template-columns: 1fr;
            }

            .vote-buttons {
                flex-direction: column;
            }
        }

    </style>

</head>


<body>

    <!-- HEADER -->

    <header>

        <nav>

            <div class="logo">
                JUVE <span>×</span> FLA
            </div>

            <ul>
                <li>
                    <a href="#inicio">Início</a>
                </li>

                <li>
                    <a href="#estatisticas">Estatísticas</a>
                </li>

                <li>
                    <a href="#jogadores">Jogadores</a>
                </li>

                <li>
                    <a href="#noticias">Notícias</a>
                </li>
            </ul>

        </nav>

    </header>


    <!-- HERO -->

    <section class="hero" id="inicio">

        <div class="hero-content">

            <h1>
                Juventus
                <span>×</span>
                Flamengo
            </h1>

            <p>
                O espaço dos torcedores para acompanhar
                uma batalha entre dois gigantes do futebol.
            </p>


            <div class="scoreboard">

                <div class="team">

                    <div class="badge juve">
                        J
                    </div>

                    <h2>
                        Juventus
                    </h2>

                    <small>
                        Itália 🇮🇹
                    </small>

                </div>


                <div>

                    <div class="score">
                        2 - 2
                    </div>

                    <div class="versus">
                        FT
                    </div>

                </div>


                <div class="team">

                    <div class="badge flamengo">
                        F
                    </div>

                    <h2>
                        Flamengo
                    </h2>

                    <small>
                        Brasil 🇧🇷
                    </small>

                </div>

            </div>


            <button
                class="main-button"
                onclick="mostrarMensagem('⚽ Jogo adicionado aos favoritos!')">

                ⭐ Favoritar confronto

            </button>

        </div>

    </section>


    <!-- ESTATÍSTICAS -->

    <section
        class="container"
        id="estatisticas">

        <div class="title">

            <h2>
                ⚡ Comparação
            </h2>

            <p>
                Veja uma comparação fictícia para o aplicativo.
            </p>

        </div>


        <div class="stats">

            <div class="stat">

                <h3 id="posse">
                    54%
                </h3>

                <p>
                    Posse de bola Juventus
                </p>

            </div>


            <div class="stat">

                <h3>
                    12
                </h3>

                <p>
                    Finalizações
                </p>

            </div>


            <div class="stat">

                <h3>
                    8
                </h3>

                <p>
                    Escanteios
                </p>

            </div>

        </div>


        <div class="comparison">

            <div class="bar-box">

                <div class="bar-title">

                    <span>
                        Juventus
                    </span>

                    <strong>
                        72%
                    </strong>

                </div>

                <div class="bar">

                    <div class="bar-juve"></div>

                </div>

            </div>


            <div class="bar-box">

                <div class="bar-title">

                    <span>
                        Flamengo
                    </span>

                    <strong>
                        82%
                    </strong>

                </div>

                <div class="bar">

                    <div class="bar-flamengo"></div>

                </div>

            </div>

        </div>

    </section>


    <!-- JOGADORES -->

    <section
        class="container"
        id="jogadores">

        <div class="title">

            <h2>
                ⭐ Jogadores em destaque
            </h2>

            <p>
                Área demonstrativa do aplicativo.
            </p>

        </div>


        <div class="players">


            <div class="player">

                <div class="player-photo">
                    ⚽
                </div>

                <h3>
                    Atacante Juve
                </h3>

                <p>
                    Juventus
                </p>

            </div>


            <div class="player">

                <div class="player-photo">
                    🧤
                </div>

                <h3>
                    Goleiro Juve
                </h3>

                <p>
                    Juventus
                </p>

            </div>


            <div class="player">

                <div class="player-photo">
                    🔥
                </div>

                <h3>
                    Atacante Fla
                </h3>

                <p>
                    Flamengo
                </p>

            </div>


            <div class="player">

                <div class="player-photo">
                    ⭐
                </div>

                <h3>
                    Meia Fla
                </h3>

                <p>
                    Flamengo
                </p>

            </div>


        </div>

    </section>


    <!-- VOTAÇÃO -->

    <section class="container">

        <div class="vote-section">

            <h2>
                🏆 Quem é melhor?
            </h2>

            <p>
                Vote no seu favorito!
            </p>


            <div class="vote-buttons">

                <button
                    class="vote juventus"
                    onclick="votar('Juventus')">

                    ⚪ Juventus

                </button>


                <button
                    class="vote flamengo"
                    onclick="votar('Flamengo')">

                    🔴 Flamengo

                </button>

            </div>


            <div id="resultado">
                Nenhum voto registrado.
            </div>

        </div>

    </section>


    <!-- NOTÍCIAS -->

    <section
        class="container"
        id="noticias">

        <div class="title">

            <h2>
                📰 Central de notícias
            </h2>

            <p>
                Conteúdo fictício para demonstração do app.
            </p>

        </div>


        <div class="news">


            <article class="news-card">

                <span>
                    JUVENTUS
                </span>

                <h3>
                    Gigante italiana entra em campo
                </h3>

                <p>
                    O time italiano aparece como uma
                    das atrações do confronto especial
                    deste aplicativo.
                </p>

            </article>


            <article class="news-card">

                <span>
                    FLAMENGO
                </span>

                <h3>
                    Mengão prepara grande espetáculo
                </h3>

                <p>
                    A equipe brasileira chega para
                    representar o futebol brasileiro
                    neste duelo internacional.
                </p>

            </article>


            <article class="news-card">

                <span>
                    CONFRONTO
                </span>

                <h3>
                    Torcedores fazem a festa
                </h3>

                <p>
                    O confronto reúne duas torcidas
                    apaixonadas em uma experiência
                    especial para os fãs.
                </p>

            </article>


        </div>

    </section>


    <!-- FOOTER -->

    <footer>

        <h2>
            JUVE <span>×</span> FLA
        </h2>

        <p>
            Fan App • Projeto demonstrativo
        </p>

        <br>

        <p>
            ⚽ Feito para fãs de futebol
        </p>

    </footer>


    <!-- TOAST -->

    <div id="toast"></div>


    <script>

        /*
        ================================================
        APP JUVENTUS × FLAMENGO
        JAVASCRIPT
        ================================================
        */


        // VOTOS

        let votosJuventus = 0;
        let votosFlamengo = 0;


        function votar(time) {

            if (time === "Juventus") {

                votosJuventus++;

            } else {

                votosFlamengo++;

            }


            atualizarVotos();

            mostrarMensagem(
                "⚽ Seu voto foi registrado!"
            );

        }


        function atualizarVotos() {

            const total =
                votosJuventus +
                votosFlamengo;


            if (total === 0) {

                return;

            }


            const porcentagemJuve =
                Math.round(
                    (votosJuventus / total) * 100
                );


            const porcentagemFla =
                100 - porcentagemJuve;


            document.getElementById(
                "resultado"
            ).innerHTML = `

                ⚪ Juventus:
                <strong>
                    ${porcentagemJuve}%
                </strong>

                &nbsp; × &nbsp;

                🔴 Flamengo:
                <strong>
                    ${porcentagemFla}%
                </strong>

                <br><br>

                Total de votos:
                ${total}

            `;

        }


        // MENSAGEM

        function mostrarMensagem(texto) {

            const toast =
                document.getElementById("toast");


            toast.textContent = texto;


            toast.classList.add("show");


            setTimeout(() => {

                toast.classList.remove("show");

            }, 2500);

        }


        // ANIMAÇÃO DO PLACAR

        const score =
            document.querySelector(".score");


        score.addEventListener(
            "click",
            function() {

                mostrarMensagem(
                    "🔥 Placar do confronto!"
                );

            }
        );


        // ANIMAÇÃO DOS JOGADORES

        const jogadores =
            document.querySelectorAll(".player");


        jogadores.forEach(
            function(jogador) {

                jogador.addEventListener(
                    "click",
                    function() {

                        const nome =
                            jogador.querySelector(
                                "h3"
                            ).textContent;


                        mostrarMensagem(
                            "⭐ " + nome
                        );

                    }
                );

            }
        );


        // EFEITO AO ROLAR A PÁGINA

        window.addEventListener(
            "scroll",
            function() {

                const cards =
                    document.querySelectorAll(
                        ".stat, .player, .news-card"
                    );


                cards.forEach(
                    function(card) {

                        const posicao =
                            card.getBoundingClientRect()
                                .top;


                        if (
                            posicao <
                            window.innerHeight - 50
                        ) {

                            card.style.opacity = "1";

                        }

                    }
                );

            }
        );


        // MENSAGEM INICIAL

        console.log(
            "⚽ Juventus × Flamengo Fan App iniciado!"
        );

    </script>

</body>

</html>