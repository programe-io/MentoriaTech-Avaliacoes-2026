<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exemplos de JavaScript</title>
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
            color: #2d3748;
        \}
        .secao {
            background: white;
            padding: 25px;
            margin-bottom: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        \}
        h2 {
            color: #2b6cb0;
            border-bottom: 2px solid #ebf8ff;
            padding-bottom: 8px;
        \}
        button {
            padding: 10px 20px;
            margin: 5px;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.3s;
        \}
        .btn-azul { background: #3182ce; color: white; \}
        .btn-azul:hover { background: #2b6cb0; \}
        .btn-verde { background: #38a169; color: white; \}
        .btn-verde:hover { background: #2f855a; \}
        .btn-vermelho { background: #e53e3e; color: white; \}
        .btn-vermelho:hover { background: #c53030; \}
        .resultado {
            margin-top: 15px;
            padding: 12px;
            background: #f7fafc;
            border-radius: 6px;
            font-weight: 500;
            min-height: 40px;
        \}
        input {
            padding: 10px;
            width: 250px;
            border: 2px solid #e2e8f0;
            border-radius: 6px;
            font-size: 1rem;
            margin-right: 8px;
        \}
        input:focus {
            outline: none;
            border-color: #3182ce;
        \}
        .relogio {
            font-size: 2rem;
            font-weight: bold;
            color: #2d3748;
            text-align: center;
            padding: 15px;
        \}
    </style>
</head>
<body>
    <h1>⚡ Exemplos com JavaScript</h1>

    <!-- 1 - Mensagem -->
    <section class="secao">
        <h2>1. Clicar e Mostrar Mensagem</h2>
        <button class="btn-azul" onclick="mostrarMensagem()">Clique Aqui!</button>
        <div class="resultado" id="saida1"></div>
    </section>

    <!-- 2 - Calculadora Simples -->
    <section class="secao">
        <h2>2. Soma de Números</h2>
        <input type="number" id="num1" placeholder="Primeiro número">
        <input type="number" id="num2" placeholder="Segundo número">
        <button class="btn-verde" onclick="somar()">Somar</button>
        <div class="resultado" id="saida2"></div>
    </section>

    <!-- 3 - Contador -->
    <section class="secao">
        <h2>3. Contador</h2>
        <button class="btn-vermelho" onclick="alterarContador(-1)">− Diminuir</button>
        <button class="btn-azul" onclick="resetarContador()">Zerar</button>
        <button class="btn-verde" onclick="alterarContador(1)">+ Aumentar</button>
        <div class="resultado" id="contador-valor">Valor: 0</div>
    </section>

    <!-- 4 - Relógio em Tempo Real -->
    <section class="secao">
        <h2>4. Relógio</h2>
        <div class="relogio" id="relogio"></div>
    </section>

    <!-- 5 - Mudar Cor da Página -->
    <section class="secao">
        <h2>5. Mudar Cor de Fundo</h2>
        <button style="background:#fef3c7; color:#92400e" onclick="mudarCor('#fef3c7')">Amarelo</button>
        <button style="background:#dbeafe; color:#1e40af" onclick="mudarCor('#dbeafe')">Azul</button>
        <button style="background:#dcfce7; color:#166534" onclick="mudarCor('#dcfce7')">Verde</button>
        <button style="background:#f0f4f8; color:#374151" onclick="mudarCor('#f0f4f8')">Padrão</button>
    </section>

    <script>
        // 1 - Mostrar mensagem
        function mostrarMensagem() {
            document.getElementById('saida1').textContent = "🎉 Funcionou! JavaScript está ativo!";
        \}

        // 2 - Somar números
        function somar() {
            const n1 = Number(document.getElementById('num1').value);
            const n2 = Number(document.getElementById('num2').value);
            const resultado = n1 + n2;
            document.getElementById('saida2').textContent = `Resultado: \${n1\} + \${n2\} = \${resultado\}`;
        \}

        // 3 - Contador
        let contador = 0;
        function alterarContador(valor) {
            contador += valor;
            document.getElementById('contador-valor').textContent = `Valor: \${contador\}`;
        \}
        function resetarContador() {
            contador = 0;
            document.getElementById('contador-valor').textContent = `Valor: \${contador\}`;
        \}

        // 4 - Relógio em tempo real
        function atualizarRelogio() {
            const agora = new Date();
            const horas = String(agora.getHours()).padStart(2, '0');
            const minutos = String(agora.getMinutes()).padStart(2, '0');
            const segundos = String(agora.getSeconds()).padStart(2, '0');
            document.getElementById('relogio').textContent = `\${horas\}:\${minutos\}:\${segundos\}`;
        \}
        // Atualiza a cada 1 segundo
        atualizarRelogio();
        setInterval(atualizarRelogio, 1000);

        // 5 - Mudar cor de fundo
        function mudarCor(cor) {
            document.body.style.backgroundColor = cor;
        \}
    </script>
</body>
</html>$0<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mais Exemplos de JavaScript</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            max-width: 900px;
            margin: 30px auto;
            padding: 0 20px;
            background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
            min-height: 100vh;
        \}
        h1 {
            text-align: center;
            color: #312e81;
            margin-bottom: 30px;
        \}
        .secao {
            background: white;
            padding: 25px;
            margin-bottom: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        \}
        h2 {
            color: #4f46e5;
            margin-bottom: 15px;
        \}
        input {
            padding: 10px 15px;
            border: 2px solid #c7d2fe;
            border-radius: 8px;
            font-size: 1rem;
            margin: 5px;
        \}
        button {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            margin: 5px;
            transition: all 0.3s ease;
        \}
        button:hover {
            transform: scale(1.03);
        \}
        .btn-primario { background: #4f46e5; color: white; \}
        .btn-primario:hover { background: #4338ca; \}
        .btn-sucesso { background: #10b981; color: white; \}
        .btn-sucesso:hover { background: #059669; \}
        .btn-perigo { background: #ef4444; color: white; \}
        .btn-perigo:hover { background: #dc2626; \}
        .resultado {
            margin-top: 15px;
            padding: 15px;
            background: #f5f3ff;
            border-radius: 8px;
            font-weight: 500;
            min-height: 40px;
        \}
        .item-lista {
            padding: 10px;
            background: #f0f9ff;
            margin: 5px 0;
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        \}
        .tarefa-concluida {
            text-decoration: line-through;
            color: #9ca3af;
        \}
        #cor-amostra {
            width: 100px;
            height: 100px;
            border-radius: 8px;
            margin: 10px 0;
            border: 2px solid #ddd;
        \}
    </style>
</head>
<body>
    <h1>⚡ Mais Exemplos de JavaScript</h1>

    <!-- 1 - Lista de Tarefas -->
    <section class="secao">
        <h2>1. Lista de Tarefas</h2>
        <input type="text" id="nova-tarefa" placeholder="Digite uma nova tarefa...">
        <button class="btn-primario" onclick="adicionarTarefa()">Adicionar</button>
        <div id="lista-tarefas" class="resultado"></div>
    </section>

    <!-- 2 - Verificador de Par ou Ímpar -->
    <section class="secao">
        <h2>2. Par ou Ímpar?</h2>
        <input type="number" id="numero-par" placeholder="Digite um número">
        <button class="btn-sucesso" onclick="verificarPar()">Verificar</button>
        <div class="resultado" id="resultado-par"></div>
    </section>

    <!-- 3 - Gerador de Cor Aleatória -->
    <section class="secao">
        <h2>3. Cor Aleatória</h2>
        <button class="btn-primario" onclick="gerarCor()">Gerar Cor</button>
        <div id="cor-amostra"></div>
        <div class="resultado" id="codigo-cor"></div>
    </section>

    <!-- 4 - Contador de Caracteres -->
    <section class="secao">
        <h2>4. Contador de Caracteres</h2>
        <input type="text" id="texto-contar" placeholder="Digite algo..." oninput="contarCaracteres()">
        <div class="resultado" id="contagem-texto">Caracteres: 0 | Palavras: 0</div>
    </section>

    <script>
        // 1 - Lista de Tarefas
        function adicionarTarefa() {
            const entrada = document.getElementById('nova-tarefa');
            const texto = entrada.value.trim();
            
            if (texto === '') {
                alert('Digite uma tarefa!');
                return;
            \}

            const lista = document.getElementById('lista-tarefas');
            const item = document.createElement('div');
            item.className = 'item-lista';
            item.innerHTML = `
                <span onclick="this.parentElement.classList.toggle('tarefa-concluida')">\${texto\}</span>
                <button class="btn-perigo" style="padding: 5px 10px; font-size: 0.8rem;" onclick="this.parentElement.remove()">Excluir</button>
            `;
            
            lista.appendChild(item);
            entrada.value = '';
        \}

        // 2 - Verificar Par ou Ímpar
        function verificarPar() {
            const num = Number(document.getElementById('numero-par').value);
            const saida = document.getElementById('resultado-par');
            
            if (isNaN(num) || num === '') {
                saida.textContent = '⚠️ Digite um número válido!';
                saida.style.color = '#ef4444';
                return;
            \}

            if (num % 2 === 0) {
                saida.textContent = `✅ \${num\} é um número PAR!`;
                saida.style.color = '#10b981';
            \} else {
                saida.textContent = `✅ \${num\} é um número ÍMPAR!`;
                saida.style.color = '#4f46e5';
            \}
        \}

        // 3 - Gerar Cor Aleatória
        function gerarCor() {
            const letras = '0123456789ABCDEF';
            let cor = '#';
            for (let i = 0; i < 6; i++) {
                cor += letras[Math.floor(Math.random() * 16)];
            \}
            
            document.getElementById('cor-amostra').style.backgroundColor = cor;
            document.getElementById('codigo-cor').textContent = `Código da cor: \${cor\}`;
        \}

        // 4 - Contar Caracteres e Palavras
        function contarCaracteres() {
            const texto = document.getElementById('texto-contar').value;
            const caracteres = texto.length;
            const palavras = texto.trim() === '' ? 0 : texto.trim().split(/\\s+/).length;
            
            document.getElementById('contagem-texto').textContent = 
                `Caracteres: \${caracteres\} | Palavras: \${palavras\}`;
        \}
    </script>
</body>
</html>
$0