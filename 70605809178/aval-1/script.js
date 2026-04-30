// Dados simulados de campeões (Pode ser expandido)
const champions = [
    { name: "Sébastien Loeb", titles: 9, country: "França" \},
    { name: "Sébastien Ogier", titles: 8, country: "França" \},
    { name: "Juha Kankkunen", titles: 4, country: "Finlândia" \},
    { name: "Tommi Mäkinen", titles: 4, country: "Finlândia" \}
];

document.addEventListener('DOMContentLoaded', () => {
    console.log("WRC Engine Started... 🏎️💨");

    // 1. Efeito de Revelação ao Scroll (Scroll Reveal)
    const observerOptions = {
        threshold: 0.1
    \};

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            \}
        \});
    \}, observerOptions);

    // Aplicando o efeito nos cards
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "all 0.6s ease-out";
        observer.observe(card);
    \});

    // 2. Função de clique para mostrar curiosidade técnica
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const terreno = card.querySelector('h3').innerText;
            alert(`Você selecionou: \${terreno\}. No WRC, a configuração de suspensão muda drasticamente para este tipo de solo!`);
        \});
    \});

    // 3. Log de Performance no Console (Estilo Dashboard de Corrida)
    function showRallyStatus() {
        const stage = "Etapa 01 - Monte Carlo";
        const temp = "2°C";
        console.table({ Stage: stage, Surface: "Ice/Tarmac", Temperature: temp \});
    \}

    showRallyStatus();
\});

// 4. Mudança de Cor do Header ao dar Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.borderBottomColor = "#0055ff"; // Muda para azul FIA ao descer
    \} else {
        header.style.borderBottomColor = "#ff6600"; // Volta para o laranja original
    \}
\});$0    <script src="script.js"></script>
</body>$0