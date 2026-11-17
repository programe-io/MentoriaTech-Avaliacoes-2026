<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Curso de Lógica de Programação</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f0f4ff;
            margin: 0;
            color: #333;
        \}

        header {
            background: #172e59;
            color: white;
            text-align: center;
            padding: 30px;
        \}

        main {
            max-width: 800px;
            margin: 25px auto;
            padding: 15px;
        \}

        .card {
            background: white;
            padding: 25px;
            margin-bottom: 20px;
            border-radius: 12px;
            box-shadow: 0 3px 10px #0002;
        \}

        h2 {
            color: #2455a4;
        \}

        input {
            width: 95%;
            padding: 12px;
            margin: 8px 0;
            border: 1px solid #bbb;
            border-radius: 7px;
        \}

        button {
            background: #2455a4;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 7px;
            cursor: pointer;
            margin-top: 8px;
        \}

        button:hover {
            background: #172e59;
        \}

        .resultado {
            color: #16833b;
            font-weight: bold;
        \}

        footer {
            background: #172e59;
            color: white;
            text-align: center;
            padding: 15px;
        \}
    </style>
</head>

<body>

<header>
    <h1>💻 Lógica de Programação</h1>
    <p>Aprenda JavaScript do zero!</p>
</header>

<main>

    <div class="card">
        <h2>📚 O que é lógica de programação?</h2>
        <p>
            É a maneira de organizar pensamentos e criar instruções
            para resolver problemas através do computador.
        </p>

        <h3>Principais conteúdos:</h3>
        <ul>
            <li>Algoritmos</li>
            <li>Variáveis</li>
            <li>Operadores</li>
            <li>Condições (if e else)</li>
            <li>Laços de repetição</li>
            <li>Funções</li>
        </ul>
    </div>

    <div class="card">
        <h2>🧮 1. Calculadora</h2>

        <input type="number" id="numero1" placeholder="Primeiro número">
        <input type="number" id="numero2" placeholder="Segundo número">

        <button onclick="somar()">Somar</button>
        <button onclick="multiplicar()">Multiplicar</button>

        <p class="resultado" id="resultado"></p>
    </div>

    <div class="card">
        <h2>🎓 2. Verificar idade</h2>

        <input type="number" id="idade" placeholder="Digite sua idade">

        <button onclick="verificarIdade()">Verificar</button>

        <p class="resultado" id="mensagem"></p>
    </div>

    <div class="card">
        <h2>⭐ 3. Tabuada</h2>

        <input type="number" id="tabuada" placeholder="Digite um número">

        <button onclick="mostrarTabuada()">Mostrar tabuada</button>

        <p class="resultado" id="resultadoTabuada"></p>
    </div>

</main>

<footer>
    <p>Projeto Educacional - JavaScript</p>
</footer>

<script>

    // Função para somar
    function somar() {
        let n1 = document.getElementById("numero1").value;
        let n2 = document.getElementById("numero2").value;

        if (n1 === "" || n2 === "") {
            document.getElementById("resultado").innerHTML =
                "Digite os dois números!";
            return;
        \}

        let resultado = Number(n1) + Number(n2);

        document.getElementById("resultado").innerHTML =
            "A soma é: " + resultado;
    \}

    // Função para multiplicar
    function multiplicar() {
        let n1 = document.getElementById("numero1").value;
        let n2 = document.getElementById("numero2").value;

        if (n1 === "" || n2 === "") {
            document.getElementById("resultado").innerHTML =
                "Digite os dois números!";
            return;
        \}

        let resultado = Number(n1) * Number(n2);

        document.getElementById("resultado").innerHTML =
            "A multiplicação é: " + resultado;
    \}

    // Verificar idade
    function verificarIdade() {
        let idadeTexto = document.getElementById("idade").value;
        let idade = Number(idadeTexto);

        if (idadeTexto === "" || idade < 0) {
            document.getElementById("mensagem").innerHTML =
                "Digite uma idade válida!";
        \}
        else if (idade >= 18) {
            document.getElementById("mensagem").innerHTML =
                "Você é maior de idade!";
        \}
        else {
            document.getElementById("mensagem").innerHTML =
                "Você é menor de idade!";
        \}
    \}

    // Criar tabuada
    function mostrarTabuada() {
        let numeroTexto = document.getElementById("tabuada").value;

        if (numeroTexto === "") {
            document.getElementById("resultadoTabuada").innerHTML =
                "Digite um número!";
            return;
        \}

        let numero = Number(numeroTexto);
        let texto = "";

        for (let i = 1; i <= 10; i++) {
            texto += numero + " x " + i + " = " +
                     (numero * i) + "<br>";
        \}

        document.getElementById("resultadoTabuada").innerHTML = texto;
    \}

</script>

</body>
</html>$0