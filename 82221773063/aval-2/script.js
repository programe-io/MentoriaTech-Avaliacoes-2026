javascript <!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mundo Kids - Jogos</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;font-family:'Fredoka',sans-serif}
body{background:#FFF8E1;display:flex;justify-content:center}
.app{width:100%;max-width:400px;background:#fff;min-height:100vh}
.topo{background:linear-gradient(135deg,#FFD93D,#FF6B6B);padding:25px;border-radius:0 0 30px 30px;text-align:center;color:#fff}
.topo h1{font-size:26px;text-shadow:0 2px 0 rgba(0,0,0,.1)}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:15px;padding:20px}
.card{border-radius:25px;padding:20px;text-align:center;cursor:pointer;transition:.2s;box-shadow:0 8px 0 rgba(0,0,0,.1)}
.card:active{transform:translateY(4px);box-shadow:0 4px 0 rgba(0,0,0,.1)}
.card b{display:block;margin-top:10px;font-size:16px;color:#333}
.card small{color:#777;font-size:12px}
.c1{background:#FFE5EC} .c2{background:#D4F8E8} .c3{background:#DBEAFE} .c4{background:#FFF3BF}
.jogo{display:none;padding:20px;text-align:center}
.jogo.ativo{display:block}
.btn-voltar{background:#333;color:#fff;border:none;padding:10px 20px;border-radius:20px;margin-bottom:15px}
.letra{font-size:40px;width:70px;height:70px;background:#eee;border-radius:15px;display:inline-grid;place-items:center;margin:5px;cursor:pointer}
</style>
</head>
<body>
<div class="app">
  <div class="topo"><h1>🌈 MUNDO KIDS</h1><p>Aprender brincando!</p></div>

    <!-- MENU -->
      <div id="menu" class="grid">
          <div class="card c1" onclick="abrir('j1')"><div style="font-size:40px">🎨</div><b>Cores</b><small>Aprenda as cores</small></div>
              <div class="card c2" onclick="abrir('j2')"><div style="font-size:40px">🔢</div><b>Números</b><small>Conte comigo</small></div>
                  <div class="card c3" onclick="abrir('j3')"><div style="font-size:40px">🔤</div><b>Letrinhas</b><small>A-B-C</small></div>
                      <div class="card c4" onclick="abrir('j4')"><div style="font-size:40px">🧠</div><b>Memória</b><small>Encontre os pares</small></div>
                        </div>

                          <!-- JOGO 1 CORES -->
                            <div id="j1" class="jogo">
                                <button class="btn-voltar" onclick="abrir('menu')">← Voltar</button>
                                    <h2>Toque na cor VERMELHA 🔴</h2><br>
                                        <div id="cores"></div>
                                            <p id="msg1" style="margin-top:20px;font-size:20px"></p>
                                              </div>

                                                <!-- JOGO 2 NUMEROS -->
                                                  <div id="j2" class="jogo">
                                                      <button class="btn-voltar" onclick="abrir('menu')">← Voltar</button>
                                                          <h2>Quanto é 2 + 3 ?</h2><br>
                                                              <div style="font-size:60px">🍎🍎 + 🍎🍎🍎</div><br>
                                                                  <button class="letra" onclick="checkNum(5)">5</button>
                                                                      <button class="letra" onclick="checkNum(4)">4</button>
                                                                          <button class="letra" onclick="checkNum(6)">6</button>
                                                                              <p id="msg2" style="margin-top:20px;font-size:20px"></p>
                                                                                </div>

                                                                                  <!-- JOGO 3 LETRAS -->
                                                                                    <div id="j3" class="jogo">
                                                                                        <button class="btn-voltar" onclick="abrir('menu')">← Voltar</button>
                                                                                            <h2>Complete: B O L _</h2><br>
                                                                                                <div style="font-size:60px">⚽</div><br>
                                                                                                    <button class="letra" onclick="checkLetra('A')">A</button>
                                                                                                        <button class="letra" onclick="checkLetra('O')">O</button>
                                                                                                            <p id="msg3"></p>
                                                                                                              </div>

                                                                                                                <!-- JOGO 4 MEMORIA -->
                                                                                                                  <div id="j4" class="jogo">
                                                                                                                      <button class="btn-voltar" onclick="abrir('menu')">← Voltar</button>
                                                                                                                          <h2>Encontre os pares 🐶</h2><br>
                                                                                                                              <div id="memoria" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px"></div>
                                                                                                                                </div>
                                                                                                                                </div>

                                                                                                                                <script>
                                                                                                                                function abrir(id){document.querySelectorAll('.grid,.jogo').forEach(e=>e.style.display='none');document.getElementById(id).style.display=id=='menu'?'grid':'block'; if(id=='j1')criaCores(); if(id=='j4')criaMemoria()}

                                                                                                                                function criaCores(){
                                                                                                                                  let c=document.getElementById('cores');c.innerHTML='';let cores=['blue','red','yellow','green'];cores.sort(()=>Math.random()-0.5);
                                                                                                                                    cores.forEach(cor=>{let d=document.createElement('div');d.style.cssText=`width:80px;height:80px;background:${cor