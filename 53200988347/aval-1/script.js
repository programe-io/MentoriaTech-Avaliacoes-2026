<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Exemplo de Link com JavaScript</title>
</head>
<body>

    <p>Clique no link abaixo para testar o comportamento com JavaScript:</p>
    
    <!-- Link com um ID para facilitar a seleção no JS -->
    <a href="https://www.google.com" id="meu-link" target="_blank" rel="noopener noreferrer">Acessar Google</a>

    <script>
        // Seleciona o link pelo ID
        const link = document.getElementById('meu-link');

        // Adiciona um ouvinte para o evento de clique
        link.addEventListener('click', function(event) {
            // event.preventDefault() impede o navegador de abrir o link imediatamente
            event.preventDefault();

            // Exibe uma caixa de confirmação para o usuário
            const vaiParaGoogle = confirm('Você tem certeza de que deseja sair desta página e ir para o Google?');

            // Se o usuário clicar em "OK", redirecionamos manualmente
            if (vaiParaGoogle) {
                window.location.href = this.href;
            }
        });
    </script>

</body>
</html>