<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.
<title>TailwindCSS vs CSS</title>
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"><
<style>
</style>
</head>
<body>
<button class="btn">
OLA MUNDO
</button>
</body>
</html>
Seu código está quase correto! Faltavam fechar algumas tags e completar o viewport. Veja a versão corrigida com HTML, Tailwind CSS e CSS tradicional:


<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>TailwindCSS vs CSS</title>

    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

    <style>
        .btn {
            background-color: blue;
            color: white;
            padding: 12px 25px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px;
        }