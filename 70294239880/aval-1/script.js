const btnTema = document.getElementById('btnTema');
const inputNome = document.getElementById('inputNome');
const feedback = document.getElementById('feedback');

btnTema.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    btnTema.textContent = document.body.classList.contains('dark-mode') ? "Modo Claro" : "Modo Escuro";
});

function processarNome() {
    const nome = inputNome.value.trim();

    if (nome === "") {
        feedback.textContent = "Por favor, digite algo primeiro! ❌";
        feedback.style.color = "red";
    } else {
        feedback.textContent = `Olá, ${nome}! O seu projeto está 100% funcional. ✅`;
        feedback.style.color = "var(--primaria)";
        inputNome.value = "";
    }
}

inputNome.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        processarNome();
    }
});