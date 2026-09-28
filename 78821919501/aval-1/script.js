html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Avaliação - Escolinha de Balé</title>
    <style>
        /* Estilização com tema de Balé (Tons de Rosa e Branco) */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #fff5f7;
            color: #4a4a4a;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        \}

        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(244, 143, 177, 0.2);
            width: 100%;
            max-width: 450px;
            border: 1px solid #fce4ec;
        \}

        h2 {
            color: #d81b60;
            text-align: center;
            margin-top: 0;
            font-size: 24px;
        \}

        p.subtitle {
            text-align: center;
            color: #888;
            font-size: 14px;
            margin-bottom: 25px;
        \}

        .form-group {
            margin-bottom: 20px;
        \}

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #c2185b;
            font-size: 14px;
        \}

        input[type="text"], select, textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #f8bbd0;
            border-radius: 8px;
            box-sizing: border-box;
            font-size: 14px;
            transition: border-color 0.3s;
        \}

        input[type="text"]:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #d81b60;
            box-shadow: 0 0 5px rgba(216, 27, 96, 0.2);
        \}

        /* Sistema de Estrelas */
        .stars-container {
            display: flex;
            flex-direction: row-reverse;
            justify-content: flex-end;
            gap: 5px;
        \}

        .stars-container input {
            display: none;
        \}

        .stars-container label {
            font-size: 30px;
            color: #e0e0e0;
            cursor: pointer;
            transition: color 0.2s;
            margin-bottom: 0;
        \}

        /* Efeito de hover e seleção de estrelas (da direita para a esquerda por causa do row-reverse) */
        .stars-container label:hover,
        .stars-container label:hover ~ label,
        .stars-container input:checked ~ label {
            color: #ff4081;
        \}

        button {
            background-color: #d81b60;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            width: 100%;
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.3s;
            box-shadow: 0 4px 6px rgba(216, 27, 96, 0.2);
        \}

        button:hover {
            background-color: #c2185b;
        \}

        /* Mensagem de Feedback */
        #msg-sucesso {
            display: none;
            background-color: #e8f5e9;
            color: #2e7d32;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            margin-top: 20px;
            font-weight: 500;
            border: 1px solid #c8e6c9;
        \}
    </style>
</head>
<body>

<div class="container">
    <h2>Deixe sua Avaliação 🩰</h2>
    <p class="subtitle">Sua opinião ajuda a nossa escolinha a brilhar ainda mais!</p>

    <!-- Formulário de Avaliação -->
    <form id="form-avaliacao">
        
        <div class="form-group">
            <label for="nome">Nome do Aluno ou Responsável:</label>
            <input type="text" id="nome" name="nome" placeholder="Ex: Maria Silva" required>
        </div>

        <div class="form-group">
            <label for="turma">Turma:</label>
            <select id="turma" name="turma" required>
                <option value="" disabled selected>Selecione a turma...</option>
                <option value="baby-ballet">Baby Ballet</option>
                <option value="ballet-infantil">Ballet Infantil</option>
                <option value="ballet-juvenil">Ballet Juvenil</option>
                <option value="ballet-adulto">Ballet Adulto</option>
            </select>
        </div>

        <div class="form-group">
            <label>Sua Nota:</label>
            <div class="stars-container">
                <input type="radio" id="star5" name="nota" value="5" required>
                <label for="star5" title="Excelente">★</label>
                
                <input type="radio" id="star4" name="nota" value="4">
                <label for="star4" title="Muito Bom">★</label>
                
                <input type="radio" id="star3" name="nota" value="3">
                <label for="star3" title="Bom">★</label>
                
                <input type="radio" id="star2" name="nota" value="2">
                <label for="star2" title="Regular">★</label>
                
                <input type="radio" id="star1" name="nota" value="1">
                <label for="star1" title="Ruim">★</label>
            </div>
        </div>

        <div class="form-group">
            <label for="comentario">Comentário:</label>
            <textarea id="comentario" name="comentario" rows="4" placeholder="Conte-nos como tem sido a experiência na nossa escolinha..." required></textarea>
        </div>

        <button type="submit">Enviar Avaliação ✨</button>
    </form>

    <!-- Mensagem de Sucesso (oculta por padrão) -->
    <div id="msg-sucesso">
        🩰 Obrigado! Sua avaliação foi enviada com sucesso e está na ponta dos pés para ser lida!
    </div>
</div>

<script>
    // Código JavaScript para processar o envio do formulário
    document.getElementById('form-avaliacao').addEventListener('submit', function(event) {
        // Impede o comportamento padrão de recarregar a página
        event.preventDefault();

        // Captura os dados digitados no formulário
        const nome = document.getElementById('nome').value;
        const turma = document.getElementById('turma').value;
        const comentario = document.getElementById('comentario').value;
        
        // Captura a nota da estrela selecionada
        const notaSelecionada = document.querySelector('input[name="nota"]:checked');
        const nota = notaSelecionada ? notaSelecionada.value : 0;

        // Cria o objeto com os dados da avaliação prontos para o envio
        const dadosAvaliacao = {
            nome: nome,
            turma: turma,
            nota: parseInt(nota),
            comentario: comentario,
            dataEnvio: new Date().toLocaleDateString('pt-BR')
        \};

        // EXEMPLO DE USO: Mostra os dados capturados no console do navegador
        console.log("Nova avaliação recebida:", dadosAvaliacao);

        /* 
           DICA: Se você tiver um servidor ou banco de dados, é aqui que você enviaria 
           os dados usando fetch(). Exemplo:
           
           fetch('https://sua-api.com', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' \},
               body: JSON.stringify(dadosAvaliacao)
           \});
        */

        // Mostra a mensagem de sucesso na tela
        const mensagemSucesso = document.getElementById('msg-sucesso');
        mensagemSucesso.style.display = 'block';

        // Limpa o formulário após o envio
        document.getElementById('form-avaliacao').reset();

        // Esconde a mensagem de sucesso após 5 segundos
        setTimeout(function() {
            mensagemSucesso.style.display = 'none';
        \}, 5000);
    \});
</script>

</body>
</html>$0