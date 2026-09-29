<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Área de Entrega - Avaliações</title>

    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        \}

        body {
            background: #000;
            color: #fff;
            font-family: Arial, Helvetica, sans-serif;
            min-height: 100vh;
            padding: 40px 24px;
        \}

        /* Título */
        header {
            text-align: center;
            margin-bottom: 110px;
        \}

        h1 {
            font-size: 48px;
            margin-bottom: 25px;
        \}

        header p {
            font-size: 24px;
            line-height: 1.7;
        \}

        /* Área dos editores */
        .editores {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            width: 100%;
        \}

        .editor-container {
            min-width: 0;
        \}

        .editor-topo {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 13px;
        \}

        .editor-topo h2 {
            font-size: 28px;
        \}

        .maximizar {
            border: none;
            background: #fff;
            color: #111;
            padding: 15px 24px;
            border-radius: 10px;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.2s;
        \}

        .maximizar:hover {
            background: #ddd;
            transform: scale(1.03);
        \}

        /* Editor */
        .editor {
            display: flex;
            width: 100%;
            height: 550px;
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            color: #111;
            border-top: 2px solid #00aaff;
        \}

        .numeros {
            width: 55px;
            padding-top: 7px;
            background: #fafafa;
            color: #16357a;
            text-align: center;
            font-family: monospace;
            font-size: 18px;
            line-height: 26px;
            user-select: none;
            overflow: hidden;
        \}

        textarea {
            flex: 1;
            height: 100%;
            border: none;
            outline: none;
            resize: none;
            padding: 7px 15px;
            font-family: Consolas, Monaco, monospace;
            font-size: 17px;
            line-height: 26px;
            color: #222;
            background: #fff;
        \}

        textarea:focus {
            box-shadow: inset 0 0 0 2px #00aaff;
        \}

        /* Editor maximizado */
        .editor-container.maximizado {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background: #000;
            padding: 25px;
            width: 100vw;
            height: 100vh;
        \}

        .editor-container.maximizado .editor {
            height: calc(100vh - 100px);
        \}

        .editor-container.maximizado .maximizar::after {
            content: " ✕";
        \}

        /* Responsividade */
        @media (max-width: 900px) {
            .editores {
                grid-template-columns: 1fr;
            \}

            header {
                margin-bottom: 60px;
            \}

            h1 {
                font-size: 36px;
            \}

            header p {
                font-size: 18px;
            \}
        \}
    </style>
</head>

<body>

    <header>
        <h1>Área de Entrega - Avaliações</h1>

        <p>
            Aqui você envia seus códigos para correção.
            Revise antes de publicar e garanta que sua avaliação esteja completa.
        </p>

        <p>
            Finalize seu trabalho, publique seu código e compartilhe sua solução
            com o professor para ser avaliada.
        </p>
    </header>

    <main class="editores">

        <!-- HTML -->
        <section class="editor-container">
            <div class="editor-topo">
                <h2>HTML</h2>
                <button class="maximizar">Maximizar</button>
            </div>

            <div class="editor">
                <div class="numeros">1</div>

                <textarea
                    placeholder="Digite seu código HTML aqui..."
                    spellcheck="false"
                ></textarea>
            </div>
        </section>


        <!-- CSS -->
        <section class="editor-container">
            <div class="editor-topo">
                <h2>CSS</h2>
                <button class="maximizar">Maximizar</button>
            </div>

            <div class="editor">
                <div class="numeros">1</div>

                <textarea
                    placeholder="Digite seu código CSS aqui..."
                    spellcheck="false"
                ></textarea>
            </div>
        </section>


        <!-- JavaScript -->
        <section class="editor-container">
            <div class="editor-topo">
                <h2>JavaScript</h2>
                <button class="maximizar">Maximizar</button>
            </div>

            <div class="editor">
                <div class="numeros">1</div>

                <textarea
                    placeholder="Digite seu código JavaScript aqui..."
                    spellcheck="false"
                ></textarea>
            </div>
        </section>

    </main>


    <script>
        const editores = document.querySelectorAll(".editor-container");

        editores.forEach(editor => {

            const textarea = editor.querySelector("textarea");
            const numeros = editor.querySelector(".numeros");
            const botao = editor.querySelector(".maximizar");

            // Atualiza os números das linhas
            function atualizarLinhas() {
                const quantidade = textarea.value.split("\\n").length;

                let linhas = "";

                for (let i = 1; i <= quantidade; i++) {
                    linhas += i + "<br>";
                \}

                numeros.innerHTML = linhas;
            \}

            textarea.addEventListener("input", atualizarLinhas);

            // Mantém os números acompanhando o scroll
            textarea.addEventListener("scroll", () => {
                numeros.scrollTop = textarea.scrollTop;
            \});

            // Maximizar / minimizar
            botao.addEventListener("click", () => {
                editor.classList.toggle("maximizado");

                if (editor.classList.contains("maximizado")) {
                    botao.textContent = "Minimizar";
                \} else {
                    botao.textContent = "Maximizar";
                \}
            \});

            atualizarLinhas();
        \});
    </script>

</body>
</html>$0