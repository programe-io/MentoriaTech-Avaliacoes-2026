<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Praia Animada</title>
<style>
  body {
    margin: 0;
    overflow: hidden;
    font-family: Arial, sans-serif;
  }

  /* Céu */
  .ceu {
    width: 100%;
    height: 60vh;
    background: linear-gradient(to bottom, #87CEEB, #FFD700);
    position: relative;
  }

  /* Sol */
  .sol {
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, #FFD700, #FFA500);
    border-radius: 50%;
    position: absolute;
    top: 40px;
    left: 50px;
    box-shadow: 0 0 60px rgba(255, 215, 0, 0.9);
  }

  /* Mar */
  .mar {
    width: 100%;
    height: 20vh;
    background: #1E90FF;
    position: relative;
    overflow: hidden;
  }

  /* Ondas animadas */
  .onda {
    position: absolute;
    width: 200%;
    height: 100%;
    background: rgba(255,255,255,0.3);
    border-radius: 50%;
    bottom: 0;
    animation: moverOnda 6s linear infinite;
  }

  @keyframes moverOnda {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* Areia */
  .areia {
    width: 100%;
    height: 20vh;
    background: #F4A460;
  }
</style>
</head>
<body>

<div class="ceu">
  <div class="sol"></div>
</div>

<div class="mar">
  <div class="onda"></div>
</div>
<div class="areia"></div>

<script>
  const sol = document.querySelector('.sol');
  let posX = 50; // posição inicial horizontal
  let posY = 40; // posição inicial vertical
  let direction = 1; // 1 para direita, -1 para esquerda

  function animarSol() {
    // movimento horizontal do sol
    posX += 0.5 * direction;
    
    // faz o sol voltar no outro lado quando chegar na borda
    if(posX > window.innerWidth - 120 || posX < 0){
      direction *= -1;
    }

    // movimento vertical simulando arco
    posY = 100 * Math.sin((posX / window.innerWidth) * Math.PI) + 50;

    sol.style.left = posX + 'px';
    sol.style.top = posY + 'px';

    requestAnimationFrame(animarSol);
  }

  animarSol();
</script>

</body>
</html>