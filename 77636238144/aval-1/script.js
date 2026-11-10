<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>JavaScript Legal</title>
    <style>
        body { 
            font-family: Arial; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            background: #f0f0f0;
        }
        .box { 
            background: white; 
            padding: 40px; 
            border-radius: 20px; 
            text-align: center;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        button { 
            padding: 15px 30px; 
            font-size: 18px; 
            border: none; 
            border-radius: 30px; 
            background: #667eea; 
            color: white; 
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="box">
        <h1 id="texto">Clique no botão!</h1>
        <p id="contador">Cliques: 0</p>
        <button onclick="clicar()">CLIQUE AQUI</button>
    </div>

    <script>
        let cliques = 0;
        
        function clicar() {
            cliques++;
            document.getElementById("contador").innerText = "Cliques: " + cliques;
            document.getElementById("texto").innerText = "Você clicou " + cliques + " vezes! 🎉";
            
            // Muda a cor de fundo aleatória
            document.body.style.background = "#" + Math.floor(Math.random()*16777215).toString(16);
        }
    </script>
</body>
</html>