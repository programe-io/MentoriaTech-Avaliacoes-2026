let etapa = 1;
let escolhas = { A: 0, B: 0 };

function responder(tipo) {
  escolhas[tipo]++;
  if (etapa === 1) {
    etapa = 2;
    document.getElementById('question-text').innerText = "Pergunta 2: Você decide as coisas pela lógica ou pela emoção?";
    document.querySelector('.options').innerHTML = `
      <button onclick="responder('A')">Pela Lógica</button>
      <button onclick="responder('B')">Pela Emoção</button>
    `;
  } else {
    document.getElementById('quiz-card').style.display = 'none';
    document.getElementById('result-card').style.display = 'block';
    
    const perfil = escolhas.A >= escolhas.B ? "Analítico e Focado" : "Comunicativo e Empático";
    document.getElementById('perfil-text').innerText = `Seu perfil predominante é: ${perfil}`;
  }
}

function reiniciar() {
  etapa = 1;
  escolhas = { A: 0, B: 0 };
  document.getElementById('quiz-card').style.display = 'block';
  document.getElementById('result-card').style.display = 'none';
  document.getElementById('question-text').innerText = "Pergunta 1: Você prefere trabalhar sozinho ou em equipe?";
  document.querySelector('.options').innerHTML = `
    <button onclick="responder('A')">Trabalhar Sozinho</button>
    <button onclick="responder('B')">Trabalhar em Equipe</button>
  `;
}
