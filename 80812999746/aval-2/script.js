
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ShopMais - Loja Online</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            background: #f4f4f4;
            color: #333;
        }

        header {
            background: #2563eb;
            color: white;
            padding: 20px 7%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
        }

        header h1 {
            font-size: 28px;
        }

        header input {
            padding: 10px;
            border: none;
            border-radius: 6px;
            width: 250px;
        }

        .banner {
            background: linear-gradient(120deg, #2563eb, #7c3aed);
            color: white;
            text-align: center;
            padding: 60px 20px;
        }

        .banner h2 {
            font-size: 36px;
            margin-bottom: 12px;
        }

        .banner p {
            font-size: 18px;
        }

        main {
            padding: 35px 7%;
        }

        main h2 {
            margin-bottom: 25px;
        }

        .produtos {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 22px;
        }

        .produto {
            background: white;
            border-radius: 12px;
            padding: 18px;
            text-align: center;
            box-shadow: 0 3px 12px #00000012;
            transition: 0.2s;
        }

        .produto:hover {
            transform: translateY(-5px);
        }

        .imagem {
            font-size: 75px;
            padding: 20px;
        }

        .produto h3 {
            margin: 12px 0;
        }

        .preco {
            color: #16a34a;
            font-size: 22px;
            font-weight: bold;
            margin: 12px 0;
        }

        button {
            background: #2563eb;
            color: white;
            border: none;
            padding: 12px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 15px;
        }

        button:hover {
            background: #1d4ed8;
        }

        .carrinho {
            margin-top: 35px;
            background: white;
            padding: 22px;
            border-radius: 12px;
        }

        .carrinho p {
            margin: 12px 0;
        }

        #listaCarrinho {
            margin: 15px 0;
            padding-left: 20px;
        }

        footer {
            background: #1f2937;
            color: white;
            text-align: center;
            padding: 22px;
            margin-top: 40px;
        }

        @media (max-width: 600px) {
            header {
                flex-direction: column;
                text-align: center;
            }

            header input {
                width: 100%;
            }

            .banner h2 {
                font-size: 28px;
            }
        }
    </style>
</head>

<body>

    <header>
        <h1>🛍️ ShopMais</h1>

        <input
            type="search"
            id="pesquisa"
            placeholder="Pesquisar produtos..."
            oninput="filtrarProdutos()"
        >

        <button onclick="mostrarCarrinho()">
            🛒 Carrinho (<span id="quantidade">0</span>)
        </button>
    </header>

    <section class="banner">
        <h2>Bem-vindo à ShopMais!</h2>
        <p>Encontre os melhores produtos com ótimos preços.</p>
    </section>

    <main>
        <h2>🔥 Nossos produtos</h2>

        <div class="produtos" id="produtos">

            <article class="produto" data-nome="fone bluetooth">
                <div class="imagem">🎧</div>
                <h3>Fone Bluetooth</h3>
                <p>Som de qualidade e conforto.</p>
                <div class="preco">R$ 89,90</div>
                <button onclick="adicionar('Fone Bluetooth', 89.90)">
                    Comprar
                </button>
            </article>

            <article class="produto" data-nome="relogio digital">
                <div class="imagem">⌚</div>
                <h3>Relógio Digital</h3>
                <p>Estilo para o seu dia a dia.</p>
                <div class="preco">R$ 129,90</div>
                <button onclick="adicionar('Relógio Digital', 129.90)">
                    Comprar
                </button>
            </article>

            <article class="produto" data-nome="tenis esportivo">
                <div class="imagem">👟</div>
                <h3>Tênis Esportivo</h3>
                <p>Conforto para caminhar e treinar.</p>
                <div class="preco">R$ 159,90</div>
                <button onclick="adicionar('Tênis Esportivo', 159.90)">
                    Comprar
                </button>
            </article>

            <article class="produto" data-nome="mochila">
                <div class="imagem">🎒</div>
                <h3>Mochila</h3>
                <p>Prática para escola e viagens.</p>
                <div class="preco">R$ 79,90</div>
                <button onclick="adicionar('Mochila', 79.90)">
                    Comprar
                </button>
            </article>

        </div>

        <section class="carrinho" id="carrinho">
            <h2>🛒 Meu carrinho</h2>
            <ul id="listaCarrinho"></ul>
            <p><strong>Total: R$ <span id="total">0,00</span></strong></p>
            <button onclick="finalizarCompra()">Finalizar compra</button>
        </section>
    </main>

    <footer>
        <p>© 2026 ShopMais - Loja Online</p>
        <p>Site demonstrativo para fins de aprendizado.</p>
    </footer>

    <script>
        let carrinho = [];
        let total = 0;

        function adicionar(nome, preco) {
            carrinho.push({ nome, preco });
            total += preco;
            atualizarCarrinho();
            alert(nome + " foi adicionado ao carrinho!");
        }

        function atualizarCarrinho() {
            const lista = document.getElementById("listaCarrinho");
            lista.innerHTML = "";

            carrinho.forEach((produto, indice) => {
                const item = document.createElement("li");
                item.textContent =
                    produto.nome + " - R$ " +
                    produto.preco.toFixed(2).replace(".", ",");

                const remover = document.createElement("button");
                remover.textContent = "Remover";
                remover.style.marginLeft = "10px";
                remover.style.marginBottom = "8px";

                remover.onclick = () => {
                    total -= carrinho[indice].preco;
                    carrinho.splice(indice, 1);
                    atualizarCarrinho();
                };

                item.appendChild(remover);
                lista.appendChild(item);
            });

            document.getElementById("quantidade").textContent =
                carrinho.length;

            document.getElementById("total").textContent =
                total.toFixed(2).replace(".", ",");
        }

        function mostrarCarrinho() {
            document.getElementById("carrinho").scrollIntoView({
                behavior: "smooth"
            });
        }

        function finalizarCompra() {
            if (carrinho.length === 0) {
                alert("Seu carrinho está vazio!");
                return;
            }

            alert(
                "Compra demonstrativa! Total: R$ " +
                total.toFixed(2).replace(".", ",") +
                ". Para receber pagamentos reais, é necessário integrar um serviço de pagamento."
            );
        }

        function filtrarProdutos() {
            const busca = document
                .getElementById("pesquisa")
                .value.toLowerCase();

            document.querySelectorAll(".produto").forEach(produto => {
                const nome = produto.dataset.nome;
                produto.style.display = nome.includes(busca) ? "" : "none";
            });
        }
    </script>

</body>
</html>
