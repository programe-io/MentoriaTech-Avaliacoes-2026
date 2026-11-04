
// FILTRAR ARTIGOS POR CATEGORIA
function filtrar(categoria, botao) {

    // Remove a seleção dos outros botões
    document.querySelectorAll('.categories button')
        .forEach(b => b.classList.remove('active'));

    // Ativa o botão selecionado
    botao.classList.add('active');

    // Filtra os artigos
    document.querySelectorAll('.post').forEach(post => {

        if (
            categoria === 'Todos' ||
            post.dataset.categoria === categoria
        ) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }

    });
}


// SISTEMA DE PESQUISA
document.getElementById('pesquisa')
    .addEventListener('input', function() {

        let texto = this.value.toLowerCase();

        document.querySelectorAll('.post').forEach(post => {

            let conteudo = post.innerText.toLowerCase();

            if (conteudo.includes(texto)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }

        });

    });


// ABRIR ARTIGO
function ler(titulo, texto) {

    document.getElementById('tituloModal').innerText = titulo;

    document.getElementById('textoModal').innerText = texto;

    document.getElementById('modal').style.display = 'flex';

}


// FECHAR ARTIGO
function fecharModal() {

    document.getElementById('modal').style.display = 'none';

}


// FECHAR CLICANDO FORA DA JANELA
window.onclick = function(event) {

    let modal = document.getElementById('modal');

    if (event.target === modal) {
        fecharModal();
    }

};


// FECHAR COM A TECLA ESC
document.addEventListener('keydown', function(event) {

    if (event.key === 'Escape') {
        fecharModal();
    }

});
