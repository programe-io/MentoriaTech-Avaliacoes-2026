<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exemplos de JavaScript</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
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
    </style>
</head>
<body>
    <h1>⚡ Exemplos com JavaScript</h1>

    <!-- 1 - Saudação -->
    <div class="bloco">
        <h2>1. Saudação Personalizada</h2>
        <input type="text" id="nome" placeholder="Digite seu nome">
        <button class="btn-azul" onclick="saudar()">Saudar</button>
        <div class="resultado" id="res1"></div>
    </div>

    <!-- 2 - Calculadora Simples -->
    <div class="bloco">
        <h2>2. Calculadora</h2>
        <input type="number" id="n1" placeholder="Primeiro número">
        <input type="number" id="n2" placeholder="Segundo número">
        <br>
        <button class="btn-azul" onclick="calcular('+')">Somar</button>
        <button class="btn-verde" onclick="calcular('*')">Multiplicar</button>
        <button class="btn-vermelho" onclick="calcular('-')">Subtrair</button>
        <div class="resultado" id="res2"></div>
    </div>

    <!-- 3 - Contador -->
    <div class="bloco">
        <h2>3. Contador</h2>
        <button class="btn-vermelho" onclick="contar(-1)">−</button>
        <button class="btn-azul" onclick="zerar()">0</button>
        <button class="btn-verde" onclick="contar(1)">+</button>
        <div class="resultado" id="res3">Valor: 0</div>
    </div>

    <!-- 4 - Relógio -->
    <div class="bloco">
        <h2>4. Hora Atual</h2>
        <button class="btn-azul" onclick="mostrarHora()">Ver Hora</button>
        <div class="resultado" id="res4"></div>
    </div>

    <script>
        // 1 - Saudação
        function saudar() {
            const nome = document.getElementById('nome').value;
            if (nome) {
                document.getElementById('res1').textContent = `Olá, \${nome\}! Seja bem-vindo(a)! 🎉`;
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
        let cont = 0;
        function contar(valor) {
            cont += valor;
            document.getElementById('res3').textContent = `Valor: \${cont\}`;
        \}
        function zerar() {
            cont = 0;
            document.getElementById('res3').textContent = `Valor: \${cont\}`;
        \}

        // 4 - Hora
        function mostrarHora() {
            const agora = new Date();
            const h = String(agora.getHours()).padStart(2, '0');
            const m = String(agora.getMinutes()).padStart(2, '0');
            const s = String(agora.getSeconds()).padStart(2, '0');
            document.getElementById('res4').textContent = `\${h\}:\${m\}:\${s\}`;
        \}
    </script>
</body>
</html>$0