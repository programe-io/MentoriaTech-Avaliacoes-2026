<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flor de Cempasúchil</title>

    <style>
        body {
            background: #17120f;
            color: #ffb52e;
            font-family: Arial, sans-serif;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        \}

        h1 {
            margin-bottom: 30px;
        \}

        .planta {
            position: relative;
            width: 300px;
            height: 400px;
        \}

        .flor {
            position: absolute;
            width: 240px;
            height: 240px;
            left: 30px;
            top: 0;
            animation: balancar 3s ease-in-out infinite;
        \}

        .petala {
            position: absolute;
            width: 42px;
            height: 100px;
            left: 99px;
            top: 20px;
            border-radius: 50%;
            transform-origin: 21px 100px;
            background: linear-gradient(
                #ffd83d,
                #ff8c00,
                #ed4800
            );
            box-shadow: 0 0 8px #ff7900;
        \}

        .centro {
            position: absolute;
            width: 65px;
            height: 65px;
            left: 87px;
            top: 87px;
            border-radius: 50%;
            background: radial-gradient(
                circle,
                #fff176,
                #ffbd00,
                #e85b00
            );
            z-index: 2;
        \}

        .caule {
            position: absolute;
            width: 12px;
            height: 190px;
            left: 144px;
            top: 205px;
            border-radius: 10px;
            background: linear-gradient(
                to right,
                #236b24,
                #70b83e,
                #236b24
            );
        \}

        .folha {
            position: absolute;
            width: 85px;
            height: 35px;
            background: linear-gradient(
                #75c843,
                #236b24
            );
            border-radius: 100% 0 100% 0;
        \}

        .folha1 {
            left: 70px;
            top: 275px;
            transform: rotate(20deg);
        \}

        .folha2 {
            left: 150px;
            top: 320px;
            transform: scaleX(-1) rotate(20deg);
        \}

        p {
            color: #ffdb9b;
        \}

        @keyframes balancar {
            0%, 100% {
                transform: rotate(-4deg);
            \}

            50% {
                transform: rotate(4deg);
            \}
        \}
    </style>
</head>

<body>

    <h1>🌼 Flor de Cempasúchil 🌼</h1>

    <div class="planta">
        <div class="flor" id="flor">
            <div class="centro"></div>
        </div>

        <div class="caule"></div>
        <div class="folha folha1"></div>
        <div class="folha folha2"></div>
    </div>

    <p>A flor que ilumina o caminho das almas.</p>

    <script>
        const flor = document.getElementById("flor");

        // Criar as pétalas automaticamente
        for (let i = 0; i < 24; i++) {
            const petala = document.createElement("div");

            petala.classList.add("petala");
            petala.style.transform =
                `rotate(\${i * 15\}deg)`;

            // Alternar os tons das pétalas
            if (i % 2 === 0) {
                petala.style.filter = "brightness(1.15)";
            \}

            flor.appendChild(petala);
        \}

        console.log("Flor de Cempasúchil criada!");
    </script>

</body>
</html>$0