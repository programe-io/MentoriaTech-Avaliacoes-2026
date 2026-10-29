 <script>
        let curtidas = 0;
        let curtido = false;

        function curtir() {
            if (!curtido) {
                curtidas++;
                curtido = true;
            } else {
                curtidas--;
                curtido = false;
            }

            document.getElementById("contador").textContent = curtidas;
            document.getElementById("curtir").firstChild.textContent =
                curtido ? "❤️ Curtido " : "🤍 Curtir ";
        }
    </script>
 <button id="negativo" onclick="darFeedback()">
        👎 Não gostei <span id="contador">0</span>
    </button>

    <p id="mensagem"></p>

    <script>

        <h2> Você gostou do nosso blog👎?<h2>
        let feedback = false;
        let total = 0;

        function darFeedback() {
            const botao = document.getElementById("negativo");
            const mensagem = document.getElementById("mensagem");

            feedback = !feedback;
            total = feedback ? total + 1 : total - 1;

            botao.classList.toggle("selecionado", feedback);
            document.getElementById("contador").textContent = total;

            mensagem.textContent = feedback
                ? "Obrigado pelo feedback! 👎"
                : "Seu feedback foi removido.";
        }
    </script>




</body>
</html>
