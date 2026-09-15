<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slide - Grafos</title>

    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #0f172a;
            color: white;
        }

        .slide {
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        h1 {
            font-size: 60px;
            color: #38bdf8;
            margin-bottom: 20px;
        }

        h2 {
            font-size: 32px;
            color: #f8fafc;
        }

        p {
            max-width: 800px;
            font-size: 24px;
            line-height: 1.5;
            color: #cbd5e1;
        }

        .grafo {
            position: relative;
            width: 500px;
            height: 250px;
            margin-top: 30px;
        }

        .vertice {
            position: absolute;
            width: 55px;
            height: 55px;
            background: #38bdf8;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #0f172a;
            font-weight: bold;
            font-size: 20px;
            z-index: 2;
        }

        .a { left: 40px; top: 100px; }
        .b { left: 210px; top: 30px; }
        .c { left: 210px; top: 170px; }
        .d { left: 390px; top: 100px; }

        .aresta {
            position: absolute;
            height: 5px;
            background: #94a3b8;
            transform-origin: left center;
        }

        .ab {
            width: 185px;
            left: 90px;
            top: 115px;
            transform: rotate(-23deg);
        }

        .ac {
            width: 185px;
            left: 90px;
            top: 130px;
            transform: rotate(23deg);
        }

        .bd {
            width: 185px;
            left: 260px;
            top: 70px;
            transform: rotate(23deg);
        }

        .cd {
            width: 185px;
            left: 260px;
            top: 200px;
            transform: rotate(-23deg);
        }

        .rodape {
            position: absolute;
            bottom: 20px;
            font-size: 16px;
            color: #64748b;
        }
    </style>
</head>

<body>

    <section class="slide">

        <h1>GRAFOS</h1>

        <h2>O que é um grafo?</h2>

        <p>
            Um grafo é uma estrutura formada por
            <strong>vértices</strong> e <strong>arestas</strong>.
            Ele é utilizado para representar relações e conexões
            entre diferentes elementos.
        </p>

        <div class="grafo">

            <!-- Arestas -->
            <div class="aresta ab"></div>
            <div class="aresta ac"></div>
            <div class="aresta bd"></div>
            <div class="aresta cd"></div>

            <!-- Vértices -->
            <div class="vertice a">A</div>
            <div class="vertice b">B</div>
            <div class="vertice c">C</div>
            <div class="vertice d">D</div>

        </div>

        <div class="rodape">
            Exemplo de grafo com 4 vértices e 4 arestas
        </div>

    </section>

</body>
</html>
