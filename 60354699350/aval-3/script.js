<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Vida Ativa</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            background: #f4f8f5;
            color: #26352b;
            line-height: 1.6;
        }

        header {
            background: linear-gradient(135deg, #166534, #22c55e);
            color: white;
            padding: 25px 8%;
        }

        .topo {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 30px;
        }

        .logo h1 {
            font-size: 32px;
        }

        .logo p {
            font-size: 14px;
            opacity: 0.9;
        }

        nav {
            display: flex;
            gap: 20px;
        }

        nav a {
            color: white;
            text-decoration: none;
            font-weight: bold;
            transition: 0.3s;
        }

        nav a:hover {
            color: #dcfce7;
        }

        .hero {
            padding: 70px 8%;
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            align-items: center;
            gap: 50px;
            background: white;
        }

        .hero h2 {
            font-size: 46px;
            color: #166534;
            margin-bottom: 20px;
        }

        .hero p {
            font-size: 18px;
            color: #526158;
            margin-bottom: 25px;
        }

        .botao {
            display: inline-block;
            background: #16a34a;
            color: white;
            padding: 12px 22px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
        }

        .hero img {
            width: 100%;
            height: 320px;
            object-fit: cover;
            border-radius: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }

        .sobre {
            padding: 60px 8%;
            text-align: center;
        }

        .sobre h2,
        .artigos h2,
        .galeria h2 {
            color: #166534;
            font-size: 30px;
            margin-bottom: 15px;
        }

        .sobre p {
            max-width: 750px;
            margin: auto;
            color: #59665d;
        }

        .artigos {
            padding: 60px 8%;
            background: #eaf5ed;
        }

        .cards {
            margin-top: 35px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
        }

        .card {
            background: white;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            transition: 0.3s;
        }

        .card:hover {
            transform: translateY(-6px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.12);
        }

        .card img {
            width: 100%;
            height: 230px;
            object-fit: cover;
        }

        .card-content {
            padding: 25px;
        }

        .card h3 {
            color: #166534;
            font-size: 22px;
            margin-bottom: 8px;
        }

        .autor {
            font-size: 13px;
            color: #718078;
            margin-bottom: 15px;
        }

        .galeria {
            padding: 60px 8%;
        }

        .imagens {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 30px;
        }

        .imagens img {
            width: 100%;
            height: 220px;
            object-fit: cover;
            border-radius: 18px;
            transition: 0.3s;
        }

        .imagens img:hover {
            transform: scale(1.03);
        }

        footer {
            background: #14532d;
            color: white;
            text-align: center;
            padding: 30px 8%;
        }

        footer p {
            margin: 5px 0;
            font-size: 14px;
        }

        @media (max-width: 800px) {

            .topo {
                flex-direction: column;
                text-align: center;
            }

            nav {
                flex-wrap: wrap;
                justify-content: center;
            }

            .hero {
                grid-template-columns: 1fr;
                padding: 45px 6%;
            }

            .hero h2 {
                font-size: 36px;
            }

            .cards {
                grid-template-columns: 1fr;
            }

            .imagens {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>

<body>

    <header>
        <div class="topo">

            <div class="logo">
                <h1>Vida Ativa</h1>
                <p>Dicas para uma vida mais saudável através do esporte.</p>
            </div>

            <nav>
                <a href="#inicio">Início</a>
                <a href="#sobre">Sobre</a>
                <a href="#artigos">Artigos</a>
                <a href="#galeria">Galeria</a>
            </nav>

        </div>
    </header>


    <main>

        <section class="hero" id="inicio">

            <div>
                <h2>Movimente-se para viver melhor</h2>

                <p>
                    Informações e dicas sobre exercícios físicos,
                    alimentação saudável e hábitos que ajudam
                    a melhorar sua qualidade de vida.
                </p>

                <a href="#artigos" class="botao">
                    Ver artigos
                </a>
            </div>

            <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80"
                alt="Pessoa praticando exercícios em uma academia"
            >

        </section>


        <section class="sobre" id="sobre">

            <h2>Sobre o Vida Ativa</h2>

            <p>
                Este blog reúne informações sobre atividades físicas,
                alimentação saudável e hábitos que ajudam a melhorar
                a qualidade de vida.
            </p>

        </section>


        <section class="artigos" id="artigos">

            <h2>Conteúdos recentes</h2>

            <div class="cards">

                <article class="card">

                    <img
                        src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80"
                        alt="Pessoa caminhando"
                    >

                    <div class="card-content">

                        <h3>Benefícios da Caminhada</h3>

                        <div class="autor">
                            Autor: Sthefany Vitória Cavalcante Lima
                            | Julho de 2026
                        </div>

                        <p>
                            Caminhar diariamente ajuda a fortalecer o coração,
                            melhora a circulação sanguínea e contribui para
                            o bem-estar físico e mental.
                        </p>

                    </div>

                </article>


                <article class="card">

                    <img
                        src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80"
                        alt="Água para hidratação"
                    >

                    <div class="card-content">

                        <h3>A Importância da Hidratação</h3>

                        <div class="autor">
                            Autor: Sthefany Vitória Cavalcante Lima
                            | Julho de 2026
                        </div>

                        <p>
                            Beber água ao longo do dia é essencial para manter
                            o corpo hidratado, melhorar o desempenho físico
                            e prevenir problemas de saúde.
                        </p>

                    </div>

                </article>

            </div>

        </section>


        <section class="galeria" id="galeria">

            <h2>Galeria</h2>

            <div class="imagens">

                <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=700&q=80"
                    alt="Academia"
                >

                <img
                    src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=700&q=80"
                    alt="Corrida"
                >

                <img
                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=80"
                    alt="Pessoa praticando esporte"
                >

            </div>

        </section>

    </main>


    <footer>

        <p>
            © 2026 - Vida Ativa
        </p>

        <p>
            Desenvolvido por Sthefany Vitória Cavalcante Lima
        </p>

    </footer>

</body>
</html>
