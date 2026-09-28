<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Avaliação - Escolinha de Basquete</title>
    <style>
        :root {
            --primary-color: #ff6600; /* Laranja Basquete */
            --secondary-color: #1a1a1a; /* Preto/Cinza Escuro */
            --bg-color: #f4f4f9;
            --text-color: #333;
            --star-color: #e6e6e6;
            --star-active: #ffbc00;
        \}

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        \}

        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        \}

        .card {
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 550px;
            padding: 30px;
            border-top: 8px solid var(--primary-color);
        \}

        .header {
            text-align: center;
            margin-bottom: 25px;
        \}

        .header h1 {
            color: var(--secondary-color);
            font-size: 24px;
            margin-bottom: 8px;
        \}

        .header p {
            color: #666;
            font-size: 14px;
        \}

        .form-group {
            margin-bottom: 20px;
        \}

        label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
            color: var(--secondary-color);
        \}

        input[type="text"], select, textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 15px;
            transition: border-color 0.3s;
        \}

        input[type="text"]:focus, select:focus, textarea:focus {
            outline: none;
            border-color: var(--primary-color);
        \}

        /* Sistema de Estrelas */
        .rating-container {
            display: flex;
            flex-direction: row-reverse;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 5px;
        \}

        .rating-container input {
            display: none;
        \}

        .rating-container label {
            font-size: 30px;
            color: var(--star-color);
            cursor: pointer;
            transition: color 0.2s;
            margin-bottom: 0;
        \}

        .rating-container label:hover,
        .rating-container label:hover ~ label,
        .rating-container input:checked ~ label {
            color: var(--star-active);
        \}

        textarea {
            resize: vertical;
            min-height: 100px;
        \}

        button {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 14px 20px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 8px;
            width: 100%;
            cursor: pointer;
            transition: background 0.3s;
        \}

        button:hover {
            background-color: #e05500;
        \}

        /* Tela de Sucesso */
        .success-message {
            display: none;
            text-align: center;
            padding: 40px 20px;
        \}

        .success-message .icon {
            font-size: 60px;
            color: var(--primary-color);
            margin-bottom: 15px;
        \}

        .success-message h2 {
            margin-bottom: 10px;
            color: var(--secondary-color);
        \}
    </style>
</head>
<body>

    <div class="card">
        <!-- Formulário de Avaliação -->
        <form id="evaluationForm">
            <div class="header">
                <h1>🏀 Avalie Nossa Escolinha</h1>
                <p>Sua opinião é fundamental para melhorarmos nossos treinos e estrutura!</p>
            </div>

            <!-- Nome -->
            <div class="form-group">
                <label for="studentName">Nome do Aluno(a):</label>
                <input type="text" id="studentName" required placeholder="Digite o nome completo">
            </div>

            <!-- Categoria/Idade -->
            <div class="form-group">
                <label for="category">Categoria / Turma:</label>
                <select id="category" required>
                    <option value="" disabled selected>Selecione a turma</option>
                    <option value="sub11">Sub-11 (Iniciante)</option>
                    <option value="sub14">Sub-14 (Intermediário)</option>
                    <option value="sub17">Sub-17 (Avançado)</option>
                </select>
            </div>

            <!-- Avaliação por Estrelas -->
            <div class="form-group">
                <label>Nota para os Treinos e Professores:</label>
                <div class="rating-container">
                    <input type="radio" name="rating" id="star5" value="5" required><label for="star5">★</label>
                    <input type="radio" name="rating" id="star4" value="4"><label for="star4">★</label>
                    <input type="radio" name="rating" id="star3" value="3"><label for="star3">★</label>
                    <input type="radio" name="rating" id="star2" value="2"><label for="star2">★</label>
                    <input type="radio" name="rating" id="star1" value="1"><label for="star1">★</label>
                </div>
            </div>

            <!-- Comentários -->
            <div class="form-group">
                <label for="comments">Deixe seu comentário ou sugestão:</label>
                <textarea id="comments" placeholder="O que você mais gosta ou o que podemos melhorar?"></textarea>
            </div>

            <button type="submit">Enviar Avaliação</button>
        </form>

        <!-- Mensagem de Agradecimento (Oculta inicialmente) -->
        <div id="successMessage" class="success-message">
            <div class="icon">🏀</div>
            <h2>Obrigado pela avaliação!</h2>
            <p>Seus comentários foram enviados com sucesso e nos ajudam a pontuar cada vez mais alto na nossa evolução!</p>
        </div>
    </div>

    <script>
        document.getElementById('evaluationForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o recarregamento da página

            // Captura dos dados inseridos (Prontos para serem enviados para um banco de dados se necessário)
            const name = document.getElementById('studentName').value;
            const category = document.getElementById('category').value;
            const rating = document.querySelector('input[name="rating"]:checked').value;
            const comments = document.getElementById('comments').value;

            // Console log apenas para demonstrar os dados coletados
            console.log('Avaliação Recebida:', { name, category, rating, comments \});

            // Esconde o formulário e mostra a tela de sucesso
            document.getElementById('evaluationForm').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            
            // Aqui você integraria com serviços como EmailJS, Google Sheets ou sua própria API profissional.
        \});
    </script>

</body>
</html>$0