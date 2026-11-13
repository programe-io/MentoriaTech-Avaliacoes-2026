function toggleLike(element) {
    // Alterna a classe 'liked' para mudar a cor do coração
    element.classList.toggle('liked');

    // Alterna o ícone entre coração vazio e coração preenchido
    if (element.classList.contains('liked')) {
        element.classList.remove('fa-regular');
        element.classList.add('fa-solid');
    } else {
        element.classList.remove('fa-solid');
        element.classList.add('fa-regular');
    }

    // Localiza o contador de curtidas do post correspondente
    const postContainer = element.closest('.post');
    const likeCountElem = postContainer.querySelector('.like-count');
    
    // Converte o texto para número e incrementa/decrementa
    let currentLikes = parseInt(likeCountElem.innerText.replace(/\./g, ''));
    if (element.classList.contains('liked')) {
        currentLikes += 1;
    } else {
        currentLikes -= 1;
    }
    
    likeCountElem.innerText = currentLikes.toLocaleString('pt-BR');
}
