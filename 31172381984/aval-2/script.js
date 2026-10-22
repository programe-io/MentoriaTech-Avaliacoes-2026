Aqui está o JavaScript personalizado para o Blog do Caua — Nicho de Macacos. Salve o código no arquivo `script.js`.

javascript
```

/* ==========================
   MENSAGEM DOS CONTEÚDOS
   SOBRE MACACOS
========================== */

function mostrarMensagem(conteudo) {
    alert(
        "🐒 Blog do Caua 🐒\n\n" +
        "Você selecionou: " + conteudo + "!\n\n" +
        "Continue explorando o mundo dos macacos " +
        "e aprendendo sobre a natureza!"
    );
}

/* ==========================
   MOSTRAR CONTATO
========================== */

function mostrarContato() {
    const mensagem = document.getElementById("mensagem");

    mensagem.innerHTML =
        "🐒 Obrigado por visitar o Blog do Caua! " +
        "Continue acompanhando nossas curiosidades " +
        "sobre os macacos e a preservação da natureza. 🌿";
}
```

Esse código funciona com os botões do HTML que você já tem: “Ver conteúdo” e “Mostrar contato”. Não precisa alterar o CSS.