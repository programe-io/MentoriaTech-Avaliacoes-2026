document.addEventListener('DOMContentLoaded', () => {
    const btnCurtir = document.querySelector('.btn-curtir');
    const contadorLikesEl = document.querySelector('.contador-likes');
    const btnFocarComentario = document.querySelector('.btn-focar-comentario');
    const btnCompartilhar = document.querySelector('.btn-compartilhar');
    const btnSalvar = document.querySelector('.btn-salvar');
    const formComentario = document.querySelector('.form-comentario-insta');
    const inputComentario = formComentario.querySelector('input');
    const btnPublicar = formComentario.querySelector('button');
    const listaComentarios = document.querySelector('.lista-comentarios');
    const toast = document.getElementById('toast-insta');

    let curtido = false;
    let totalLikes = 18420;
    let salvo = false;

    function exibirToast(texto) {
        if (!toast) return;
        toast.textContent = texto;
        toast.classList.add('mostrar');
        setTimeout(() => {
            toast.classList.remove('mostrar');
        }, 2200);
    }

    // 1. Botão Curtir
    if (btnCurtir) {
        btnCurtir.addEventListener('click', () => {
            curtido = !curtido;
            if (curtido) {
                btnCurtir.textContent = '❤️';
                totalLikes++;
            } else {
                btnCurtir.textContent = '🤍';
                totalLikes--;
            }
            contadorLikesEl.textContent = totalLikes.toLocaleString('pt-BR');
        });
    }

    // 2. Botão Balão de Comentário
    if (btnFocarComentario) {
        btnFocarComentario.addEventListener('click', () => {
            inputComentario.focus();
        });
    }

    // 3. Função que adiciona o comentário na tela
    function adicionarComentario(e) {
        if (e) e.preventDefault();
        
        const texto = inputComentario.value.trim();
        if (texto !== '') {
            const novoComentario = document.createElement('div');
            novoComentario.classList.add('comentario');

            const autor = document.createElement('strong');
            autor.textContent = 'voce ';

            const conteudo = document.createTextNode(texto);

            novoComentario.appendChild(autor);
            novoComentario.appendChild(conteudo);
            listaComentarios.appendChild(novoComentario);

            inputComentario.value = '';
            inputComentario.focus();
        }
        return false;
    }

    // Ativa tanto ao apertar Enter quanto ao clicar no botão "Publicar"
    if (formComentario) {
        formComentario.addEventListener('submit', adicionarComentario);
    }
    if (btnPublicar) {
        btnPublicar.addEventListener('click', adicionarComentario);
    }

    // 4. Botão Salvar Post
    if (btnSalvar) {
        btnSalvar.addEventListener('click', () => {
            salvo = !salvo;
            exibirToast(salvo ? 'Post salvo na sua coleção!' : 'Removido dos salvos.');
        });
    }

    // 5. Botão Compartilhar
    if (btnCompartilhar) {
        btnCompartilhar.addEventListener('click', () => {
            if (navigator.clipboard) {
                navigator.clipboard.writeText('Confira o especial da TNT Sports sobre Marco van Basten!');
            }
            exibirToast('Link do post copiado!');
        });
    }
});