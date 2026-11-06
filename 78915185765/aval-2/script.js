// Função para curtir / descurtir o post ao clicar no ícone de coração
function toggleLike(button) {
    const icon = button.querySelector("i");
    
    // Alterna a classe 'liked' para mudar a cor via CSS e trocar o ícone
    button.classList.toggle("liked");
    
    if (button.classList.contains("liked")) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid"); // Coração preenchido
    } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular"); // Coração vazado
    }
}