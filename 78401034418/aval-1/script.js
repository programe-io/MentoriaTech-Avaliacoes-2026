const curiosidades = [
    "Cristiano Ronaldo possui mais de 1200 partidas oficiais na carreira.",
    "Ele é o maior artilheiro da história da Champions League.",
    "CR7 já venceu o prêmio Puskás de gol mais bonito do ano em 2009.",
    "Ele é o atleta com mais seguidores nas redes sociais em todo o mundo."
];

const botao = document.getElementById('btn-curiosidade');
const texto = document.getElementById('curiosidade-texto');

botao.addEventListener('click', () => {
    const indiceAleatorio = Math.floor(Math.random() * curiosidades.length);
    texto.textContent = curiosidades[indiceAleatorio];
    texto.classList.remove('hidden');
});
