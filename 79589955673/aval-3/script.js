
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript — Completo e Interativo</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', sans-serif;
        \}

        body {
            background: linear-gradient(135deg, #0f172a, #1e293b, #334155);
            min-height: 100vh;
            color: #f1f5f9;
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
            color: #38bdf8;
        \}

        .subtitulo {
            color: #94a3b8;
        \}

        .card {
            background: rgba(255, 255, 255, 0.05);
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
            color: #cbd5e1;
            margin-bottom: 0.8rem;
        \}

        input {
            width: 100%;
            padding: 0.9rem;
            margin: 0.5rem 0 1rem;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 8px;
            color: #f1f5f9;
            font-size: 1rem;
        \}

        input:focus {
            outline: none;
            border-color: #38bdf8;
            box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
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
            background: #3b82f6;
            color: white;
        \}

        .btn-primario:hover {
            background: #2563eb;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
        \}

        .btn-sucesso {
            background: #10b981;
            color: white;
        \}

        .btn-sucesso:hover {
            background: #059669;
        \}

        .btn-perigo {
            background: #ef4444;
            color: white;
        \}

        .btn-perigo:hover {
            background: #dc2626;
        \}

        .resultado {
            margin-top: 1rem;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            border-left: 3px solid #38bdf8;
            min-height: 40px;
        \}

        .destaque-valor {
            font-size: 2.5rem;
            font-weight: bold;
            font-family: monospace;
            color: #86efac;
            margin: 1rem 0;
            letter-spacing: 2px;
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

        .gerador-senha {
            display: flex;
            gap: 0.8rem;
            align-items: center;
            margin-top: 1rem;
        \}

        .campo-senha {
            flex: 1;
            font-family: monospace;
            font-size: 1.1rem;
            letter-spacing: 2px;
        \}

        .copiar {
            padding: 0.9rem 1.2rem;
        \}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>⚡ JavaScript em Ação</h1>
            <p class="subtitulo">Funcionalidades reais e interativas</p>
        </header>

        <!-- Relógio em Tempo Real -->
        <div class="card">
            <h2>🕐 Relógio ao Vivo</h2>
            <p>Atualiza automaticamente a cada segundo:</p>
            <div class="destaque-valor" id="relogio">00:00:00</div>
        </div>

        <!-- Contador -->
        <div class="card">
            <h2>🔢 Contador</h2>
            <p>Altere o valor clicando nos botões:</p>
            <div class="destaque-valor" id="contador">0</div>
            <button class="btn-primario" onclick="alterarContador(1)">+ Adicionar</button>
            <button class="btn-primario" onclick="alterarContador(-1)">− Diminuir</button>
            <button class="btn-perigo" onclick="zerarContador()">Zerar</button>
        </div>

        <!-- Lista de Tarefas -->
        <div class="card">
            <h2>📋 Lista de Tarefas</h2>
            <p>Adicione com o botão ou tecla Enter:</p>
            <input type="text" id="entrada-tarefa" placeholder="Digite uma tarefa...">
            <button class="btn-primario" onclick="adicionarTarefa()">Adicionar</button>
            <ul class="lista-itens" id="lista-tarefas"></ul>
        </div>

        <!-- Calculadora -->
        <div class="card">
            <h2>🧮 Calculadora</h2>
            <label>Número 1:</label>
            <input type="number" id="num1" placeholder="Primeiro número">
            <label>Número 2:</label>
            <input type="number" id="num2" placeholder="Segundo número">
            <br>
            <button class="btn-primario" onclick="calcular('somar')">+ Somar</button>
            <button class="btn-primario" onclick="calcular('subtrair')">− Subtrair</button>
            <button class="btn-primario" onclick="calcular('multiplicar')">× Multiplicar</button>
            <button class="btn-primario" onclick="calcular('dividir')">÷ Dividir</button>
            <div class="resultado" id="resultado-calc">
                O resultado aparecerá aqui ✅
            </div>
        </div>

        <!-- Gerador de Senhas -->
        <div class="card">
            <h2>🔐 Gerador de Senhas</h2>
            <p>Crie senhas seguras com um clique:</p>
            <button class="btn-sucesso" onclick="gerarSenha()">Gerar Senha</button>
            <div class="gerador-senha">
                <input type="text" id="senhaGerada" class="campo-senha" readonly placeholder="Sua senha aparecerá aqui">
                <button class="btn-primario copiar" onclick="copiarSenha()">📋</button>
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

        // 3. LISTA DE TAREFAS
        function adicionarTarefa() {
            const entrada = document.getElementById('entrada-tarefa');
            const texto = entrada.value.trim();
            
            if (!texto) {
                alert('⚠️ Digite uma tarefa!');
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

        // Adicionar com Enter
        document.getElementById('entrada-tarefa').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') adicionarTarefa();
        \});

        // 4. CALCULADORA
        function calcular(operacao) {
            const n1 = parseFloat(document.getElementById('num1').value);
            const n2 = parseFloat(document.getElementById('num2').value);
            const resEl = document.getElementById('resultado-calc');

            if (isNaN(n1) || isNaN(n2)) {
                resEl.textContent = '⚠️ Preencha os dois números!';
                resEl.style.borderColor = '#f87171';
                return;
            \}

            let resultado;
            switch (operacao) {
                case 'somar': resultado = n1 + n2; break;
                case 'subtrair': resultado = n1 - n2; break;
                case 'multiplicar': resultado = n1 * n2; break;
                case 'dividir':
                    if (n2 === 0) {
                        resEl.textContent = '❌ Divisão por zero não é permitida!';
                        resEl.style.borderColor = '#f87171';
                        return;
                    \}
                    resultado = n1 / n2;
                    break;
            \}

            resEl.textContent = `✅ Resultado: \${resultado\}`;
            resEl.style.borderColor = '#86efac';
        \}

        // 5. GERADOR DE SENHAS
        function gerarSenha() {
            const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&*()_+-=[]{\}|;:,.<>?';
            let senha = '';
            const tamanho = 16;
            
            for (let i = 0; i < tamanho; i++) {
                const indice = Math.floor(Math.random() * caracteres.length);
                senha += caracteres[indice];
            \}
            
            document.getElementById('senhaGerada').value = senha;
        \}

        function copiarSenha() {
            const campo = document.getElementById('senhaGerada');
            if (!campo.value) {
                alert('Gere uma senha primeiro!');
                return;
            \}
            campo.select();
            document.execCommand('copy');
            alert('✅ Senha copiada!');
        \}
    </script>
</body>
$0