function curtir(botao) {
        let likes = botao.nextElementSibling;
            let quantidade = parseInt(likes.textContent);

                quantidade++;
                    likes.textContent = quantidade + " curtidas";
                    }
}