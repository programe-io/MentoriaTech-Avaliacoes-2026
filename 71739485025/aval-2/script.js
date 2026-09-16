<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Portfólio | Mayra Dias</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            scroll-behavior: smooth;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            background: #f5f7ff;
            color: #24243a;
            line-height: 1.6;
        }

        header {
            background: linear-gradient(135deg, #6c63ff, #8f7cff);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
        }

        .inicio {
            max-width: 1100px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 50px;
        }

        .texto-inicio {
            max-width: 600px;
        }

        .texto-inicio h1 {
            font-size: 60px;
            margin-bottom: 10px;
        }

        .texto-inicio h2 {
            font-size: 28px;
            font-weight: normal;
            margin-bottom: 20px;
        }

        .texto-inicio p {
            font-size: 18px;
            margin-bottom: 30px;
        }

        .botao {
            display: inline-block;
            background: white;
            color: #6258e8;
            padding: 13px 25px;
            border-radius: 30px;
            text-decoration: none;
            font-weight: bold;
            transition: 0.3s;
        }

        .botao:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }

        .foto-container {
            width: 300px;
            height: 300px;
            border-radius: 50%;
            overflow: hidden;
            border: 8px solid rgba(255,255,255,0.8);
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            flex-shrink: 0;
        }

        .foto-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        nav {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(255,255,255,0.95);
            padding: 15px;
            text-align: center;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        nav a {
            color: #3f3b75;
            text-decoration: none;
            margin: 0 15px;
            font-weight: bold;
        }

        nav a:hover {
            color: #6c63ff;
        }

        section {
            max-width: 1000px;
            margin: auto;
            padding: 90px 25px;
        }

        .titulo {
            text-align: center;
            color: #5b52d6;
            font-size: 35px;
            margin-bottom: 35px;
        }

        .cartao {
            background: white;
            padding: 35px;
            border-radius: 20px;
            box-shadow: 0 5px 25px rgba(50,50,100,0.08);
            margin-bottom: 25px;
        }

        .cartao h3 {
            color: #5b52d6;
            margin-bottom: 12px;
            font-size: 24px;
        }

        .linha-do-tempo {
            border-left: 4px solid #6c63ff;
            padding-left: 25px;
        }

        .etapa {
            margin-bottom: 30px;
            position: relative;
        }

        .etapa::before {
            content: "";
            width: 15px;
            height: 15px;
            background: #6c63ff;
            border-radius: 50%;
            position: absolute;
            left: -35px;
            top: 5px;
        }

        .habilidades {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }

        .habilidade {
            background: white;
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 5px 20px rgba(50,50,100,0.08);
            transition: 0.3s;
        }

        .habilidade:hover {
            transform: translateY(-5px);
        }

        .habilidade span {
            font-size: 35px;
            display: block;
            margin-bottom: 10px;
        }

        .futuro {
            background: linear-gradient(135deg, #6c63ff, #8f7cff);
            color: white;
            border-radius: 25px;
            padding: 50px;
            text-align: center;
        }

        .futuro h2 {
            font-size: 32px;
            margin-bottom: 15px;
        }

        footer {
            background: #24243a;
            color: white;
            text-align: center;
            padding: 30px;
        }

        @media (max-width: 750px) {
            .inicio {
                flex-direction: column-reverse;
                text-align: center;
            }

            .texto-inicio h1 {
                font-size: 45px;
            }

            .foto-container {
                width: 230px;
                height: 230px;
            }

            .habilidades {
                grid-template-columns: 1fr;
            }

            nav a {
                margin: 0 5px;
                font-size: 13px;
            }
        }
    </style>
</head>

<body>

    <nav>
        <a href="#sobre">Sobre mim</a>
        <a href="#escola">Vida escolar</a>
        <a href="#habilidades">Habilidades</a>
        <a href="#futuro">Meu futuro</a>
    </nav>

    <!-- INÍCIO -->
    <header>
        <div class="inicio">

            <div class="texto-inicio">
                <h1>Mayra Dias</h1>

                <h2>Estudante • Sonhos • Aprendizado</h2>

                <p>
                    Olá! Eu sou Mayra Dias, tenho 17 anos e sou estudante
                    do CETI Paulo Freire. Este é o meu portfólio escolar,
                    criado para apresentar um pouco da minha trajetória,
                    das minhas experiências e dos meus sonhos para o futuro.
                </p>

                <a href="#sobre" class="botao">
                    Conheça minha história ↓
                </a>
            </div>

            <div class="foto-container">
                <!-- Coloque sua foto com o nome "mayra.jpg" na mesma pasta -->
                <img src="mayra.jpg" alt="Foto de Mayra Dias">
            </div>

        </div>
    </header>


    <!-- SOBRE MIM -->
    <section id="sobre">

        <h2 class="titulo">Sobre Mim</h2>

        <div class="cartao">

            <h3>Quem sou eu?</h3>

            <p>
                Meu nome é Mayra Dias, tenho 17 anos e sou estudante do
                CETI Paulo Freire. Ao longo da minha vida escolar,
                venho construindo conhecimentos, descobrindo novas
                habilidades e aprendendo com cada experiência.
            </p>

            <br>

            <p>
                A escola representa uma parte importante da minha vida,
                pois é onde tenho a oportunidade de aprender, conviver
                com outras pessoas e pensar sobre aquilo que desejo
                conquistar no futuro.
            </p>

        </div>

    </section>


    <!-- VIDA ESCOLAR -->
    <section id="escola">

        <h2 class="titulo">Minha Vida Escolar</h2>

        <div class="cartao">

            <div class="linha-do-tempo">

                <div class="etapa">
                    <h3>🌱 Início da minha trajetória</h3>

                    <p>
                        Minha trajetória escolar começou com os primeiros
                        aprendizados, quando comecei a descobrir o mundo
                        por meio dos estudos, das brincadeiras e da
                        convivência com outras pessoas.
                    </p>
                </div>

                <div class="etapa">
                    <h3>📚 Anos de aprendizado</h3>

                    <p>
                        Com o passar dos anos, fui aprendendo diferentes
                        matérias e desenvolvendo novas formas de pensar.
                        Cada etapa trouxe desafios e experiências que
                        contribuíram para o meu crescimento.
                    </p>
                </div>

                <div class="etapa">
                    <h3>🏫 CETI Paulo Freire</h3>

                    <p>
                        Atualmente, estudo no CETI Paulo Freire, onde
                        continuo minha formação e busco aproveitar cada
                        oportunidade para aprender, evoluir e construir
                        meu futuro.
                    </p>
                </div>

                <div class="etapa">
                    <h3>✨ Momento atual</h3>

                    <p>
                        Hoje, aos 17 anos, estou em uma fase importante
                        da minha vida escolar. Estou conhecendo melhor
                        minhas capacidades, meus interesses e pensando
                        nos próximos passos da minha trajetória.
                    </p>
                </div>

            </div>

        </div>

    </section>


    <!-- HABILIDADES -->
    <section id="habilidades">

        <h2 class="titulo">Minhas Habilidades</h2>

        <div class="habilidades">

            <div class="habilidade">
                <span>📖</span>
                <h3>Aprendizado</h3>
                <p>
                    Busco aprender coisas novas e melhorar meus conhecimentos.
                </p>
            </div>

            <div class="habilidade">
                <span>💡</span>
                <h3>Criatividade</h3>
                <p>
                    Gosto de desenvolver ideias e encontrar novas maneiras
                    de realizar minhas atividades.
                </p>
            </div>

            <div class="habilidade">
                <span>🤝</span>
                <h3>Trabalho em equipe</h3>
                <p>
                    Acredito que trabalhar junto com outras pessoas
                    pode gerar bons resultados.
                </p>
            </div>

            <div class="habilidade">
                <span>🎯</span>
                <h3>Determinação</h3>
                <p>
                    Procuro continuar avançando mesmo quando encontro
                    dificuldades.
                </p>
            </div>

        </div>

    </section>


    <!-- FUTURO -->
    <section id="futuro">

        <div class="futuro">

            <h2>🌟 Meus Sonhos e Meu Futuro</h2>

            <p>
                Quero continuar estudando, adquirir novos conhecimentos
                e aproveitar as oportunidades que aparecerem no meu
                caminho. Tenho sonhos e objetivos que pretendo alcançar
                com dedicação, aprendizado e determinação.
            </p>

            <br>

            <p>
                Minha vida escolar é apenas uma parte da história que
                estou construindo. Ainda existem muitos caminhos para
                conhecer e muitas conquistas para alcançar.
            </p>

        </div>

    </section>


    <!-- RODAPÉ -->
    <footer>

        <p>© 2026 Mayra Dias</p>
        <p>Portfólio Escolar • CETI Paulo Freire</p>

    </footer>

</body>
</html>
