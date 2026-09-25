<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Código com JavaScript</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 900px;
            margin: 30px auto;
            padding: 0 20px;
            background-color: #f0f4f8;
        \}
        h1 {
            text-align: center;
            color: #1e293b;
        \}
        .bloco {
            background: white;
            padding: 25px;
            margin-bottom: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        \}
        h2 {
            color: #3b82f6;
            margin-bottom: 15px;
        \}
        input {
            padding: 10px;
            border: 2px solid #bfdbfe;
            border-radius: 6px;
            font-size: 1rem;
            margin: 5px;
        \}
        button {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.3s;
            margin: 5px;
        \}
        .btn-azul { background: #3b82f6; color: white; \}
        .btn-azul:hover { background: #2563eb; \}
        .btn-verde { background: #10b981; color: white; \}
        .btn-verde:hover { background: #059669; \}
        .btn-vermelho { background: #ef4444; color: white; \}
        .btn-vermelho:hover { background: #dc2626; \}
        .resultado {
            margin-top: 12px;
            padding: 12px;
            background: #f0fdf4;
            border-radius: 6px;
            min-height: 20px;
            color: #166534;
        \}
        .relogio {
            font-size: 2rem;
            font-weight: bold;
            text-align: center;
            color: #3b82f6;
            padding: 15px;
        \}
    </style>
</head>
<body>
    <h1>⚡ Código com JavaScript</h1>

    <!-- 1 - Saudação -->
    <div class="bloco">
        <h2>1. Saudação</h2>
        <input type="text" id="nome" placeholder="Digite seu nome">
        <button class="btn-azul" onclick="saudar()">Saudar</button>
        <div class="resultado" id="res1"></div>
    </div>

    <!-- 2 - Calculadora -->
    <div class="bloco">
        <h2>2. Calculadora</h2>
        <input type="number" id="n1" placeholder="Número 1">
        <input type="number" id="n2" placeholder="Número 2">
        <br>
        <button class="btn-verde" onclick="calcular('+')">Somar</button>
        <button class="btn-azul" onclick="calcular('-')">Subtrair</button>
        <button class="btn-vermelho" onclick="calcular('*')">Multiplicar</button>
        <div class="resultado" id="res2"></div>
    </div>

    <!-- 3 - Contador -->
    <div class="bloco">
        <h2>3. Contador</h2>
        <button class="btn-vermelho" onclick="contar(-1)">− Diminuir</button>
        <button class="btn-azul" onclick="zerar()">Zerar</button>
        <button class="btn-verde" onclick="contar(1)">+ Aumentar</button>
        <div class="resultado" id="res3">Valor: 0</div>
    </div>

    <!-- 4 - Relógio em tempo real -->
    <div class="bloco">
        <h2>4. Relógio</h2>
        <div class="relogio" id="relogio"></div>
    </div>

    <!-- 5 - Mudar cor da página -->
    <div class="bloco">
        <h2>5. Mudar Cor de Fundo</h2>
        <button style="background:#fef3c7; color:#92400e" onclick="mudarCor('#fef3c7')">Amarelo</button>
        <button style="background:#dbeafe; color:#1e40af" onclick="mudarCor('#dbeafe')">Azul</button>
        <button style="background:#dcfce7; color:#166534" onclick="mudarCor('#dcfce7')">Verde</button>
        <button style="background:#f0f4f8; color:#374151" onclick="mudarCor('#f0f4f8')">Padrão</button>
    </div>

    <script>
        // 1 - Saudação personalizada
        function saudar() {
            const nome = document.getElementById('nome').value.trim();
            if (nome) {
                document.getElementById('res1').textContent = `Olá, \${nome\}! Seja bem-vindo(a)! 🎉`;
                document.getElementById('res1').style.color = '#166534';
            \} else {
                document.getElementById('res1').textContent = 'Por favor, digite seu nome!';
                document.getElementById('res1').style.color = '#dc2626';
            \}
        \}

        // 2 - Calculadora
        function calcular(operacao) {
            const a = Number(document.getElementById('n1').value);
            const b = Number(document.getElementById('n2').value);
            let res;

            if (operacao === '+') res = a + b;
            else if (operacao === '-') res = a - b;
            else if (operacao === '*') res = a * b;

            document.getElementById('res2').textContent = `Resultado: \${res\}`;
        \}

        // 3 - Contador
        let contador = 0;
        function contar(valor) {
            contador += valor;
            document.getElementById('res3').textContent = `Valor: \${contador\}`;
        \}
        function zerar() {
            contador = 0;
            document.getElementById('res3').textContent = `Valor: \${contador\}`;
        \}

        // 4 - Relógio em tempo real
        function atualizarRelogio() {
            const agora = new Date();
            const h = String(agora.getHours()).padStart(2, '0');
            const m = String(agora.getMinutes()).padStart(2, '0');
            const s = String(agora.getSeconds()).padStart(2, '0');
            document.getElementById('relogio').textContent = `\${h\}:\${m\}:\${s\}`;
        \}
        atualizarRelogio();
        setInterval(atualizarRelogio, 1000);

        // 5 - Mudar cor de fundo
        function mudarCor(cor) {
            document.body.style.backgroundColor = cor;
        \}
    </script>
</body>
</html>$0