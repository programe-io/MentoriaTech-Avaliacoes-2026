// Exibe um alerta personalizado com base na culinária selecionada
function mostrarMensagem(culinaria) {
    alert(`Abrindo o cardápio especial e receitas da ${culinaria}!`);
    console.log(`Foco do usuário: ${culinaria}`);
}

// Log dos links carregados no sistema para fins de avaliação
document.addEventListener("DOMContentLoaded", () => {
    const linksGastronomia = document.querySelectorAll(".nav-link");
    linksGastronomia.forEach((link) => {
        console.log(`Menu link ativo: ${link.textContent}`);
    });
});function mostrarMensagem(culinaria) {
    alert(`Abrindo o cardápio de receitas da ${culinaria}!`);
}function mostrarMensagem(culinaria) {
    alert(`Abrindo o cardápio de receitas da ${culinaria}!`);
}