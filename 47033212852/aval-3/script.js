<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Avaliação - Escolinha de Basquete</title>
    <style>
        :root {
            --primary-color: #ff6600; /* Laranja Basquete */
            --secondary-color: #1a1a1a; /* Preto Quadra */
            --bg-color: #f4f4f9;
            --card-bg: #ffffff;
            --text-color: #333333;
            --star-color: #e6e6e6;
            --star-active: #ffbc0b;
        \}

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        \}

        .container {
            background-color: var(--card-bg);
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            padding: 30px;
            max-width: 450px;
            width: 100%;
            text-align: center;
            border-top: 8px solid var(--primary-color);
        \}

        .logo-placeholder {
            font-size: 3rem;
            margin-bottom: 10px;
        \}

        h1 {
            color: var(--secondary-color);
            margin-bottom: 5px;
            font-size: 1.6rem;
        \}

        p.subtitle {
            color: #666;
            margin-bottom: 25px;
            font-size: 0.95rem;
        \}

        /* Sistema de Estrelas */
        .stars-container {
            display: flex;
            justify-content: center;
            flex-direction: row-reverse; /* Inverte para lógica de hover correta */
            gap: 10px;
            margin-bottom: 20px;
        \}

        .star {
            font-size: 2.5rem;
            color: var(--star-color);
            cursor: pointer;
            transition: color 0.2s ease-in-out, transform 0.1s;
        \}

        .star:hover,
        .star:hover ~ .star {
            color: var(--primary-color);
            transform: scale(1.1);
        \}

        .star.selected,
        .star.selected ~ .star {
            color: var(--star-active);
        \}

        /* Formulário de texto */
        .form-group {
            margin-bottom: 20px;
            text-align: left;
        \}

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            font-size: 0.9rem;
            color: var(--secondary-color);
        \}

        input[type="text"], textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 8px;
            box-sizing: border-box;
            font-size: 0.95rem;
            transition: border-color 0.3s;
        \}

        input[type="text"]:focus, textarea:focus {
            border-color: var(--primary-color);
            outline: none;
        \}

        textarea {
            resize: vertical;
            min-height: 100px;
        \}

        /* Botão de Enviar */
        button {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 14px 28px;
            font-size: 1rem;
            font-weight: bold;
            border-radius: 30px;
            cursor: pointer;
            width: 100%;
            transition: background-color 0.3s, transform 0.1s;
            box-shadow: 0 4px 10px rgba(255, 102, 0, 0.3);
        \}

        button:hover {
            background-color: #e05500;
        \}

        button:active {
            transform: scale(0.98);
        \}

        /* Tela de Sucesso */
        .hidden {
            display: none !important;
        \}

        .success-message {
            animation: fadeIn 0.5s ease-out;
        \}

        .success-message h2 {
            color: var(--primary-color);
        \}

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); \}
            to { opacity: 1; transform: translateY(0); \}
        \}
    </style>
</head>
<body>

    <div class="container">
        <!-- Tela de Formulário -->
        <div id="form-screen">
            <div class="logo-placeholder">🏀</div>
            <h1>Sua Opinião é Cesta de 3!</h1>
            <p class="subtitle">Ajude nossa escolinha de basquete a melhorar cada vez mais os treinos e a nossa estrutura.</p>
            
            <form id="evaluation-form" onsubmit="enviarAvaliacao(event)">
                
                <!-- Seleção de Estrelas -->
                <label style="text-align: center;">Sua nota para o treino:</label>
                <div class="stars-container">
                    <span class="star" data-value="5">&#9733;</span>
                    <span class="star" data-value="4">&#9733;</span>
                    <span class="star" data-value="3">&#9733;</span>
                    <span class="star" data-value="2">&#9733;</span>
                    <span class="star" data-value="1">&#9733;</span>
                </div>

                <!-- Campo Nome -->
                <div class="form-group">
                    <label for="student-name">Nome do Aluno (ou Responsável):</label>
                    <input type="text" id="student-name" placeholder="Ex: Lucas Silva" required>
                </div>

                <!-- Campo Comentário -->
                <div class="form-group">
                    <label for="feedback-text">O que você mais gosta ou o que podemos melhorar?</label>
                    <textarea id="feedback-text" placeholder="Deixe seu comentário sobre os professores, horários ou estrutura..." required></textarea>
                </div>

                <button type="submit">Enviar Avaliação 🏀</button>
            </form>
        </div>

        <!-- Tela de Sucesso (Oculta por padrão) -->
        <div id="success-screen" class="hidden success-message">
            <div class="logo-placeholder">🏆</div>
            <h2>Avaliação Enviada com Sucesso!</h2>
            <p>Obrigado por fazer parte do nosso time. Seu feedback nos ajuda a formar grandes atletas, dentro e fora de quadra!</p>
        </div>
    </div>

    <script>
        // Lógica de seleção das estrelas
        const stars = document.querySelectorAll('.star');
        let notaSelecionada = 0;

        stars.forEach(star => {
            star.addEventListener('click', () => {
                notaSelecionada = star.getAttribute('data-value');
                
                // Remove a seleção de todas as estrelas
                stars.forEach(s => s.classList.remove('selected'));
                
                // Adiciona a classe selecionada na estrela clicada
                star.classList.add('selected');
            \});
        \});

        // Lógica de envio do formulário
        function enviarAvaliacao(event) {
            event.preventDefault(); // Impede a página de recarregar

            if (notaSelecionada === 0) {
                alert("Por favor, selecione uma nota de 1 a 5 estrelas clicando nelas! 🏀");
                return;
            \}

            // Coleta dos dados preenchidos
            const nome = document.getElementById('student-name').value;
            const feedback = document.getElementById('feedback-text').value;

            // Objeto com os dados prontos para uso futuro (enviar para um banco de dados, e-mail, etc)
            const dadosAvaliacao = {
                voto: notaSelecionada,
                usuario: nome,
                comentario: feedback,
                data: new Date().toLocaleDateString('pt-BR')
            \};

            console.log("Dados salvos:", dadosAvaliacao);

            // Alterna a tela para a mensagem de sucesso
            document.getElementById('form-screen').classList.add('hidden');
            document.getElementById('success-screen').classList.remove('hidden');
        \}
    </script>
</body>
</html>$0