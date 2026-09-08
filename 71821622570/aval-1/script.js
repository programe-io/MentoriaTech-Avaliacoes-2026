function avaliar() {
  let nome = document.getElementById("nome").value;
  let sentimento = document.getElementById("sentimento").value;
  let escala = document.getElementById("escala").value;

  let perfil = escala >= 8 ? "Personalidade muito positiva" :
               escala >= 5 ? "Personalidade equilibrada" :
               "Personalidade mais reservada";

  document.getElementById("resultado").innerHTML =
    `<h2>Resultado</h2>
     Nome: \${nome\}<br>
     Sentimento predominante: \${sentimento\}<br>
     Escala: \${escala\}/10<br>
     Resumo: \${perfil\}`;
\}$0