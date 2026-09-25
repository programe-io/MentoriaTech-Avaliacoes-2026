
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript — Funcional</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', sans-serif;
        \}

        body {
            background: linear-gradient(135deg, #1e1b4b, #312e81, #4338ca);
            min-height: 100vh;
            color: #eef2ff;
            padding: 2rem;
        \}

        .container {
            max-width: 900px;
            margin: 0 auto;
        \}

        header {
            text-align: center;
            margin-bottom: 3rem;
        \}

        h1 {
            font-size: 2.2rem;
            margin-bottom: 0.5rem;
        \}

        .card {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        \}

        h2 {
            color: #a5b4fc;
            margin-bottom: 1.2rem;
            font-size: 1.3rem;
        \}

        p, label {
            color: #c7d2fe;
            margin-bottom: 0.8rem;
        \}

        input {
            width: 100%;
            padding: 0.9rem;
            margin: 0.5rem 0 1rem;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            color: #eef2ff;
            font-size: 1rem;
        \}

        input:focus {
            outline: none;
            border-color: #818cf8;
            box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.2);
        \}

        button {
            padding: 0.9rem 1.8rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
        \}

        .btn-primario {
            background: #4f46e5;
            color: white;
        \}

        .btn-primario:hover {
            background: #4338ca;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(79, 70, 229, 0.3);
        \}

        .btn-perigo {
            background: #dc2626;
            color: white;
        \}

        .btn-perigo:hover {
            background: #b91c1c;
        \}

        .resultado {
            margin-top: 1rem;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            border-left: 3px solid #a5b4fc;
            min-height: 40px;
        \}

        .relogio {
            font-size: 2.5rem;
            font-weight: bold;
            font-family: monospace;
            color: #86efac;
            margin: 1rem 0;
            letter-spacing: 3px;
        \}

        .lista-itens {
            margin-top: 1rem;
            list-style: none;
        \}

        .lista-itens li {
            padding: 0.8rem 1rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6px;
            margin-bottom: 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background 0.2s;
        \}

        .lista-itens li:hover {
            background: rgba(255, 255, 255, 0.1);
        \}

        .excluir {
            padding: 0.4rem 0.8rem;
            font-size: 0.85rem;
            background: #ef4444;
            color: white;
        \}

        .excluir:hover {
            background: #dc2626;
        \}

        .cor-destaque {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-top: 1rem;
        \}

        .amostra-cor {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            border: 2px solid white;
        \}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>⚡ JavaScript em Ação</h1>
            <p>Tudo aqui funciona com código JavaScript!</p>
        </header>

        <!-- Relógio em tempo real -->
        <div class="card">
            <h2>🕐 Relógio ao Vivo</h2>
            <p>Atualiza a cada segundo automaticamente:</p>
            <div class="relogio" id="relogio">00:00:00</div>
        </div>

        <!-- Contador -->
        <div class="card">
            <h2>🔢 Contador</h2>
            <p>Altere o valor abaixo:</p>
            <div class="relogio" id="contador">0</div>
            <button class="btn-primario" onclick="alterarContador(1)">+ Adicionar</button>
            <button class="btn-primario" onclick="alterarContador(-1)">- Diminuir</button>
            <button class="btn-perigo" onclick="zerarContador()">Zerar</button>
        </div>

        <!-- Trocador de Cor -->
        <div class="card">
            <h2>🎨 Trocador de Cor</h2>
            <p>Escolha uma cor e veja a mudança:</p>
            <input type="color" id="seletor-cor" value="#4f46e5" style="width: 80px; height: 50px; cursor: pointer;">
            <div class="cor-destaque">
                <div class="amostra-cor" id="amostra-cor"></div>
                <span id="codigo-cor">#4f46e5</span>
            </div>
        </div>

        <!-- Lista de Tarefas -->
        <div class="card">
            <h2>📋 Lista de Tarefas</h2>
            <p>Adicione e remova itens:</p>
            <input type="text" id="entrada-tarefa" placeholder="Digite uma tarefa e pressione Enter...">
            <button class="btn-primario" onclick="adicionarTarefa()">Adicionar</button>
            <ul class="lista-itens" id="lista-tarefas"></ul>
        </div>

        <!-- Calculadora Simples -->
        <div class="card">
            <h2>🧮 Calculadora Simples</h2>
            <label>Número 1:</label>
            <input type="number" id="num1" placeholder="Digite o primeiro número">
            <label>Número 2:</label>
            <input type="number" id="num2" placeholder="Digite o segundo número">
            <button class="btn-primario" onclick="calcular('somar')">+ Somar</button>
            <button class="btn-primario" onclick="calcular('subtrair')">− Subtrair</button>
            <button class="btn-primario" onclick="calcular('multiplicar')">× Multiplicar</button>
            <button class="btn-primario" onclick="calcular('dividir')">÷ Dividir</button>
            <div class="resultado" id="resultado-calc">
                Resultado aparecerá aqui ✅
            </div>
        </div>
    </div>

    <script>
        // 1. RELÓGIO EM TEMPO REAL
        function atualizarRelogio() {
            const agora = new Date();
            const h = String(agora.getHours()).padStart(2, '0');
            const m = String(agora.getMinutes()).padStart(2, '0');
            const s = String(agora.getSeconds()).padStart(2, '0');
            document.getElementById('relogio').textContent = `\${h\}:\${m\}:\${s\}`;
        \}
        atualizarRelogio();
        setInterval(atualizarRelogio, 1000);

        // 2. CONTADOR
        let contador = 0;
        function alterarContador(valor) {
            contador += valor;
            document.getElementById('contador').textContent = contador;
        \}
        function zerarContador() {
            contador = 0;
            document.getElementById('contador').textContent = contador;
        \}

        // 3. TROCADOR DE COR
        const seletorCor = document.getElementById('seletor-cor');
        const amostraCor = document.getElementById('amostra-cor');
        const codigoCor = document.getElementById('codigo-cor');
        
        function atualizarAmostraCor() {
            const cor = seletorCor.value;
            amostraCor.style.backgroundColor = cor;
            codigoCor.textContent = cor;
        \}
        atualizarAmostraCor();
        seletorCor.addEventListener('input', atualizarAmostraCor);

        // 4. LISTA DE TAREFAS
        function adicionarTarefa() {
            const entrada = document.getElementById('entrada-tarefa');
            const texto = entrada.value.trim();
            
            if (!texto) {
                alert('Digite uma tarefa!');
                return;
            \}

            const lista = document.getElementById('lista-tarefas');
            const item = document.createElement('li');
            item.innerHTML = `
                <span>\${texto\}</span>
                <button class="excluir" onclick="this.parentElement.remove()">Excluir</button>
            `;
            lista.appendChild(item);
            entrada.value = '';
        \}

        // Permitir adicionar com Enter
        document.getElementById('entrada-tarefa').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') adicionarTarefa();
        \});

        // 5. CALCULADORA
        function calcular(operacao) {
            const n1 = parseFloat(document.getElementById('num1').value);
            const n2 = parseFloat(document.getElementById('num2').value);
            const resultadoEl = document.getElementById('resultado-calc');

            if (isNaN(n1) || isNaN(n2)) {
                resultadoEl.textContent = '⚠️ Preencha os dois números!';
                resultadoEl.style.borderColor = '#f87171';
                return;
            \}

            let res;
            switch (operacao) {
                case 'somar': res = n1 + n2; break;
                case 'subtrair': res = n1 - n2; break;
                case 'multiplicar': res = n1 * n2; break;
                case 'dividir': 
                    if (n2 === 0) {
                        resultadoEl.textContent = '❌ Não é possível dividir por zero!';
                        resultadoEl.style.borderColor = '#f87171';
                        return;
                    \}
                    res = n1 / n2; 
                    break;
            \}

            resultadoEl.textContent = `✅ Resultado: \${res\}`;
            resultadoEl.style.borderColor = '#a5b4fc';
        \}
    </script>
</body>
$0