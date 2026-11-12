document.querySelectorAll(".curtir").forEach(botao => {

    botao.addEventListener("click", () => {

        botao.classList.toggle("curtido");

        let contador = botao.querySelector("small");

        let quantidade = parseInt(contador.dataset.total || "0");

        if (botao.classList.contains("curtido")) {
            quantidade++;
        } else {
            quantidade--;
        }

        contador.dataset.total = quantidade;
        contador.textContent = quantidade.toLocaleString("pt-BR");

    });

});


// 2. FUNÇÃO DE COMENTÁRIOS
document.querySelectorAll(".comentar").forEach(botao => {

    botao.addEventListener("click", () => {

        let comentario = prompt("Digite seu comentário:");

        if (comentario && comentario.trim() !== "") {

            alert("💬 Comentário enviado com sucesso!");

        }

    });

});


// 3. FUNÇÃO DE COMPARTILHAMENTO
document.querySelectorAll(".compartilhar").forEach(botao => {

    botao.addEventListener("click", async () => {

        try {

            if (navigator.share) {

                await navigator.share({
                    title: "Mini TikTok",
                    text: "Confira essa publicação!"
                });

            } else {

                alert("Compartilhamento não disponível.");

            }

        } catch (erro) {

            console.log("Compartilhamento cancelado.");

        }

    });

});


// 4. FUNÇÃO DE SEGUIR
document.querySelectorAll(".avatar").forEach(avatar => {

    avatar.addEventListener("click", () => {

        alert("👤 Você está visitando um perfil!");

    });

});


// 5. MENU DE NAVEGAÇÃO
document.querySelectorAll("footer button").forEach(botao => {

    botao.addEventListener("click", () => {

        let opcao = botao.innerText.trim();

        if (opcao.includes("Início")) {
            document.querySelector(".feed").scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

        else if (opcao.includes("Descobrir")) {
            alert("🔍 Área de descoberta!");
        }

        else if (opcao.includes("Publicar")) {
            alert("📹 Área de publicação!");
        }

        else if (opcao.includes("Caixa de entrada")) {
            alert("✉️ Sua caixa de entrada está vazia!");
        }

        else if (opcao.includes("Perfil")) {
            alert("👤 Bem-vindo ao seu perfil!");
        }

    });

});


// 6. MENSAGEM DE BOAS-VINDAS
console.log("🚀 Mini TikTok iniciado com sucesso!");
console.log("HTML + CSS + JavaScript");