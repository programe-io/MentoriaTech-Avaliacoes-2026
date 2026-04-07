<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Som Automotivo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #111;
            color: white;
            text-align: center;
            padding: 50px;
        }

        button {
            padding: 10px 20px;
            margin: 10px;
            font-size: 1em;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            background: #ff6600;
            color: white;
        }

        button:hover {
            background: #ff8533;
        }
    </style>
</head>
<body>

    <h1>🎵 Som Automotivo</h1>
    <audio id="carAudio" src="audio/musica.mp3"></audio>

    <div>
        <button onclick="playAudio()">▶️ Tocar</button>
        <button onclick="pauseAudio()">⏸️ Pausar</button>
        <button onclick="stopAudio()">⏹️ Parar</button>
    </div>

    <script>
        const audio = document.getElementById('carAudio');

        function playAudio() {
            audio.play();
        }

        function pauseAudio() {
            audio.pause();
        }

        function stopAudio() {
            audio.pause();
            audio.currentTime = 0;
        }
    </script>

</body>
</html>