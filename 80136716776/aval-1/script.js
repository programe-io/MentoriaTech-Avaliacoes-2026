const fatos = [
    "O Titanic tinha quatro chaminés, mas apenas três funcionavam. A quarta era apenas para ventilação e estética.",
    "O navio transportava cerca de 900 toneladas de bagagem e carga privada dos passageiros mais ricos.",
    "A temperatura da água na noite do naufrágio era de cerca de -2°C, o que causou hipotermia rápida nas vítimas.",
    "O orçamento do filme 'Titanic' de 1997 foi maior do que o custo real de construção do próprio navio histórico.",
    "Havia apenas 20 botes salva-vidas a bordo, número suficiente para apenas cerca de metade dos passageiros."
];

const btnFato = document.getElementById('fact-btn');
const boxFato = document.getElementById('fact-box');

btnFato.addEventListener('click', () => {
    const indiceAleatorio = Math.floor(Math.random() * fatos.length);
    boxFato.textContent = fatos[indiceAleatorio];
});
