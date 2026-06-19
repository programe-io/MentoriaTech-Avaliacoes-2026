Preview
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Seu Nome">
    <meta name="description" content="Página HTML completa com todos os elementos principais">
    <title>Página HTML Completa</title>

    <style>
        /* Reset e estilos gerais */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        \}

        body {
            background-color: #f8f9fa;
            color: #333;
            line-height: 1.6;
        \}

        /* Cabeçalho */
        header {
            background: linear-gradient(135deg, #165DFF, #3685FF);
            color: white;
            padding: 2rem 1rem;
            text-align: center;
        \}

        header h1 {
            margin-bottom: 0.5rem;
            font-size: 2.2rem;
        \}

        /* Navegação */
        nav {
            background-color: #0F48C0;
            padding: 1rem;
            position: sticky;
            top: 0;
            z-index: 100;
        \}

        nav ul {
            list-style: none;
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
        \}

        nav a {
            color: white;
            text-decoration: none;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            transition: background 0.3s;
        \}

        nav a:hover {
            background-color: #3685FF;
        \}

        /* Conteúdo principal */
        main {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1.5rem;
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2rem;
        \}

        section, aside {
            background-color: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        \}

        h2 {
            color: #165DFF;
            margin-bottom: 1.2rem;
            border-left: 4px solid #3685FF;
            padding-left: 0.5rem;
        \}

        p {
            margin-bottom: 1rem;
            font-size: 1.05rem;
        \}

        /* Imagem */
        .imagem-principal {
            width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 1.5rem 0;
        \}

        /* Listas */
        .lista-estilizada {
            margin: 1rem 0 1rem 1.8rem;
        \}

        .lista-estilizada li {
            margin-bottom: 0.5rem;
            padding-left: 0.3rem;
        \}

        /* Tabela */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
        \}

        table th, table td {
            border: 1px solid #ddd;
            padding: 0.8rem;
            text-align: left;
        \}

        table th {
            background-color: #f0f7ff;
            color: #165DFF;
        \}

        /* Formulário */
        form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1rem;
        \}

        label {
            font-weight: 500;
        \}

        input, select, textarea {
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 1rem;
        \}

        button {
            background-color: #165DFF;
            color: white;
            border: none;
            padding: 1rem;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.3s;
        \}

        button:hover {
            background-color: #0F48C0;
        \}

        /* Rodapé */
        footer {
            background-color: #0F48C0;
            color: white;
            text-align: center;
            padding: 1.5rem;
            margin-top: 3rem;
        \}

        /* Responsividade */
        @media (max-width: 768px) {
            main {
                grid-template-columns: 1fr;
            \}

            nav ul {
                gap: 0.8rem;
            \}
        \}
    </style>
</head>
<body>
    <!-- Cabeçalho -->
    <header>
        <h1>Bem-vindo ao Meu Site</h1>
        <p>Exemplo completo de página HTML com estrutura, estilo e interatividade</p>
    </header>

    <!-- Navegação -->
    <nav>
        <ul>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#recursos">Recursos</a></li>
            <li><a href="#dados">Dados</a></li>
            <li><a href="#contato">Contato</a></li>
        </ul>
    </nav>

    <!-- Conteúdo Principal -->
    <main>
        <div>
            <section id="sobre">
                <h2>Sobre este Projeto</h2>
                <p>Este é um exemplo completo de página HTML, desenvolvido para mostrar todos os elementos fundamentais que compõem um site moderno e funcional. Você encontrará estrutura semântica, estilos CSS, imagens, tabelas, listas e formulários.</p>
                <img src="https://picsum.photos/800/400" alt="Imagem ilustrativa do projeto" class="imagem-principal">
                <p>Todo o código está organizado e comentado para facilitar o aprendizado e a reutilização em outros projetos.</p>
            </section>

            <section id="recursos">
                <h2>Recursos Disponíveis</h2>
                <ul class="lista-estilizada">
                    <li>Estrutura HTML5 semântica e válida</li>
                    <li>Estilos CSS responsivos para celular e computador</li>
                    <li>Elementos de mídia: imagens e textos formatados</li>
                    <li>Tabelas para organizar dados</li>
                    <li>Formulário funcional com validação básica</li>
                    <li>Código JavaScript para interação</li>
                </ul>
            </section>

            <section id="dados">
                <h2>Tabela de Dados</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Descrição</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>HTML</td>
                            <td>Estrutura da página</td>
                            <td>Completo</td>
                        </tr>
                        <tr>
                            <td>CSS</td>
                            <td>Estilos e aparência</td>
                            <td>Completo</td>
                        </tr>
                        <tr>
                            <td>JavaScript</td>
                            <td>Interatividade</td>
                            <td>Básico implementado</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>

        <!-- Barra Lateral -->
        <aside id="contato">
            <h2>Entre em Contato</h2>
            <p>Preencha o formulário abaixo para enviar uma mensagem:</p>

            <form id="formularioContato">
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome" required placeholder="Digite seu nome">

                <label for="email">E-mail:</label>
                <input type="email" id="email" name="email" required placeholder="seuemail@exemplo.com">

                <label for="assunto">Assunto:</label>
                <select id="assunto" name="assunto">
                    <option value="duvida">Dúvida</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="projeto">Projeto</option>
                </select>

                <label for="mensagem">Mensagem:</label>
                <textarea id="mensagem" name="mensagem" rows="5" required placeholder="Escreva sua mensagem aqui..."></textarea>

                <button type="submit">Enviar Mensagem</button>
            </form>
        </aside>
    </main>

    <!-- Rodapé -->
    <footer>
        <p>&copy; 2026 - Todos os direitos reservados | Página HTML Completa</p>
    </footer>

    <!-- JavaScript -->
    <script>
        const formulario = document.getElementById('formularioContato');

        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault(); // Impede o envio real do formulário

            // Captura os valores preenchidos
            const nome = document.getElementById('nome').value;
            const assunto = document.getElementById('assunto').value;

            // Exibe mensagem de sucesso
            alert(`Olá \${nome\}! Sua mensagem sobre "\${assunto\}" foi enviada com sucesso!`);

            // Limpa os campos do formulário
            formulario.reset();
        \});
    </script>
</b$0