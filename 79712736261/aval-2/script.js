    function curtirPost(botao) {
        // Encontra o contador de curtidas dentro do botão que foi clicado
        const spanContador = botao.querySelector('.like-count');
        
        // Pega o número atual, transforma em número e soma 1
        let curtidas = parseInt(spanContador.textContent);
        curtidas++;
        
        // Atualiza o número na tela
        spanContador.textContent = curtidas;
        
        // Opcional: adiciona uma classe para estilizar se quiser
        botao.classList.toggle('curtido');
    }  