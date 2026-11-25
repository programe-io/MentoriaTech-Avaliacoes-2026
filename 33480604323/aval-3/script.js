// Seleciona os elementos do DOM
const likeBtn = document.getElementById('like-btn');
const likesCount = document.getElementById('likes-count');

// Adiciona um evento de clique para alternar o estado de curtida
function toggleLike() {
    if (likeBtn.classList.contains('fa-regular')) {
            likeBtn.classList.remove('fa-regular', 'fa-heart');
                    likeBtn.classList.add('fa-solid', 'fa-heart');
                            likesCount.textContent = '1.244 curtidas';
                                } else {
                                        likeBtn.classList.remove('fa-solid', 'fa-heart');
                                                likeBtn.classList.add('fa-regular', 'fa-heart');
                                                        likesCount.textContent = '1.243 curtidas';
                                                            }
                                                            }

                                                            // Vincula a função ao clique do botão de curtir
                                                            likeBtn.addEventListener('click', toggleLike);
                                                            