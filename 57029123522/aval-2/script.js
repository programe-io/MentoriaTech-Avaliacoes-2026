<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Minha página</title>

    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- Conteúdo -->

</body>
</html>
<link rel="stylesheet" href="style.css">/* ==============================
   CONFIGURAÇÕES GERAIS
   ============================== */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #222;
    line-height: 1.6;
}

/* ==============================
   CABEÇALHO
   ============================== */

header {
    background-color: #222;
    color: white;
    padding: 20px;
    text-align: center;
}

header h1 {
    margin-bottom: 15px;
}

nav {
    display: flex;
    justify-content: center;
    gap: 25px;
}

nav a {
    color: white;
    text-decoration: none;
    font-size: 18px;
}

nav a:hover {
    color: #00aaff;
}

/* ==============================
   CONTEÚDO PRINCIPAL
   ============================== */

main {
    min-height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
}

section {
    background-color: white;
    width: 100%;
    max-width: 700px;
    padding: 40px;
    text-align: center;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

section h2 {
    font-size: 32px;
    margin-bottom: 15px;
    color: #222;
}

section p {
    font-size: 18px;
    margin-bottom: 25px;
}

/* ==============================
   BOTÃO
   ============================== */

button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

/* ==============================
   RODAPÉ
   ============================== */

footer {
    background-color: #222;
    color: white;
    text-align: center;
    padding: 20px;
}

/* ==============================
   RESPONSIVIDADE
   ============================== */

@media (max-width: 600px) {

    header {
        padding: 15px;
    }

    nav {
        flex-direction: column;
        gap: 10px;
    }

    section {
        padding: 25px 20px;
    }

    section h2 {
        font-size: 26px;
    }

    section p {
        font-size: 16px;
    }
}
