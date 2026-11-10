!DOCTYPE html>
<html lang="pt-PT">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerador de Palavras-passe</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #0f172a;
            color: #f8fafc;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background-color: #1e293b;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            width: 350px;
        }
        h2 { margin-top: 0; text-align: center; color: #38bdf8; }
        .campo-resultado {
            background-color: #0f172a;
            padding: 12px;
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border: 1px solid #334155;
        }
        #resultado { font-family: monospace; font-size: 18px; word-break: break-all; color: #e2e8f0; }
        .btn-copiar { background: none; border: none; cursor: pointer; font-size: 18px; }
        .opcao { display: flex; justify-content: space-between; margin-bottom: 12px; align-items: center; }
        label { font-size: 14px; color: #94a3b8; }
        input[type="number"] { width: 50px; padding: 4px; border-radius: 4px; border: 1px solid #334155; background: #0f172a; color: white; text-align: center; }
        .btn-gerar {
            width: 100%;
            background-color: #38bdf8;
            color: #0f172a;
            border: none;
            padding: 12px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 15px;
            transition: 0.2s;
        }
        .btn-gerar:hover { background-color: #0ea5e9; }
    </style>
</head>
<body>

    <div class="container">
        <h2>Gerador de Senhas</h2>
        
        <div class="campo-resultado">
            <span id="resultado">Clique em Gerar</span>
            <button class="btn-copiar" id="copiar" title="Copiar senha">📋</button>
        </div>

        <div class="opcao">
            <label>Comprimento da senha</label>
            <input type="number" id="comprimento" min="6" max="30" value="12">
        </div>
        <div class="opcao">
            <label>Incluir Maiúsculas (A-Z)</label>
            <input type="checkbox" id="maiusculas" checked>
        </div>
        <div class="opcao">
            <label>Incluir Minúsculas (a-z)</label>
            <input type="checkbox" id="minusculas" checked>
        </div>
        <div class="opcao">
            <label>Incluir Números (0-9)</label>
            <input type="checkbox" id="numeros" checked>
        </div>
        <div class="opcao">
            <label>Incluir Símbolos (!@#$)</label>
            <input type="checkbox" id="simbolos" checked>
        </div>

        <button class="btn-gerar" id="gerar">Gerar Palavra-passe</button>
    </div>

    <!-- LÓGICA JAVASCRIPT -->
    <script>
        // Mapear elementos do HTML
        const resultadoEl = document.getElementById('resultado');
        const comprimentoEl = document.getElementById('comprimento');
        const maiusculasEl = document.getElementById('maiusculas');
        const minusculasEl = document.getElementById('minusculas');
        const numerosEl = document.getElementById('numeros');
        const simbolosEl = document.getElementById('simbolos');
        const gerarEl = document.getElementById('gerar');
        const copiarEl = document.getElementById('copiar');

        // Grupos de caracteres
        const caracteres = {
            maiusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            minusculas: 'abcdefghijklmnopqrstuvwxyz',
            numeros: '0123456789',
            simbolos: '!@#$%^&*()_+~`|}{[]:;?><,./-='
        };

        // Escutar o clique do botão Gerar
        gerarEl.addEventListener('click', () => {
            const comprimento = parseInt(comprimentoEl.value);
            const temMaiusculas = maiusculasEl.checked;
            const temMinusculas = minusculasEl.checked;
            const temNumeros = numerosEl.checked;
            const temSimbolos = simbolosEl.checked;

            resultadoEl.innerText = gerarSenha(comprimento, temMaiusculas, temMinusculas, temNumeros, temSimbolos);
        });

        // Função que constrói a senha baseada nas escolhas
        function gerarSenha(comprimento, maiuscula, minuscula, numero, simbolo) {
            let poolCaracteres = '';
            
            // Adiciona ao "banco de dados" de caracteres dependendo dos checkboxes ativos
            if (maiuscula) poolCaracteres += caracteres.maiusculas;
            if (minuscula) poolCaracteres += caracteres.minusculas;
            if (numero) poolCaracteres += caracteres.numeros;
            if (simbolo) poolCaracteres += caracteres.simbolos;

            // Se nenhum checkbox estiver marcado
            if (poolCaracteres === '') {
                return 'Selecione uma opção!';
            }

            let senhaGerada = '';
            for (let i = 0; i < comprimento; i++) {
                // Escolhe um caractere aleatório dentro do pool disponível
                const indiceAleatorio = Math.floor(Math.random() * poolCaracteres.length);
                senhaGerada += poolCaracteres[indiceAleatorio];
            }

            return senhaGerada;
        }

        // Função para copiar o texto para a Área de Transferência
        copiarEl.addEventListener('click', () => {
            const senha = resultadoEl.innerText;
            if (senha === 'Clique em Gerar' || senha === 'Selecione uma opção!') {
                return;
            }
            
            navigator.clipboard.writeText(senha);
            alert('Palavra-passe copiada para a área de transferência!');
        });
    </script>
</body>
</html>