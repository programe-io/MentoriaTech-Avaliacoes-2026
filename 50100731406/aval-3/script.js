const curiosidades = [
    "A Organização Mundial da Saúde (OMS) recomenda que o consumo de açúcar diário não passe de 10% das calorias totais.",
    "O açúcar atua no cérebro ativando o sistema de recompensa, liberando dopamina, o que gera a sensação de prazer.",
    "Existem mais de 50 nomes diferentes para o açúcar nos rótulos de alimentos, como xarope de milho, maltodextrina e açúcar invertido.",
    "O excesso de açúcar acelera o envelhecimento celular através de um processo chamado glicação."
];

const botaoCuriosidade = document.getElementById('btn-curiosidade');
const textoCuriosidade = document.getElementById('texto-curiosidade');

botaoCuriosidade.addEventListener('click', () => {
    const indiceAleatorio = Math.floor(Math.random() * curiosidades.length);
    textoCuriosidade.textContent = curiosidades[indiceAleatorio];
    textoCuriosidade.style.display = 'block';
});