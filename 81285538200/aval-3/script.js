
let gamesPlayed=0;

function showGame(name) {
 document.getElementById('home').classList.add('hidden');
 document.getElementById('gameCards').classList.add('hidden');
 document.querySelector('.section-head').classList.add('hidden');
 document.getElementById('playArea').classList.remove('hidden');

 ['ticGame','memoryGame','rpsGame'].forEach(id=>
  document.getElementById(id).classList.add('hidden')
 );

 const map={
  tic:['ticGame','Jogo da velha'],
  memory:['memoryGame','Jogo da memória'],
  rps:['rpsGame','Pedra, papel e tesoura']
 };

 document.getElementById(map[name][0]).classList.remove('hidden');
 document.getElementById('gameTitle').textContent=map[name][1];

 if(name==='tic') resetTic();
 if(name==='memory') startMemory();
}

function goHome() {
 document.getElementById('home').classList.remove('hidden');
 document.getElementById('gameCards').classList.remove('hidden');
 document.querySelector('.section-head').classList.remove('hidden');
 document.getElementById('playArea').classList.add('hidden');
}

// JOGO DA VELHA

let tic=Array(9).fill('');
let ticTurn='X';
let ticOver=false;

function resetTic() {
 tic=Array(9).fill('');
 ticTurn='X';
 ticOver=false;

 document.getElementById('ticResult').textContent='';
 document.getElementById('ticStatus').textContent='Sua vez! Você é X.';

 renderTic();
}

function renderTic() {
 const b=document.getElementById('ticBoard');
 b.innerHTML='';

 tic.forEach((v,i)=>{
  const btn=document.createElement('button');

  btn.className='cell';
  btn.textContent=v;
  btn.disabled=!!v||ticOver||ticTurn!=='X';
  btn.onclick=()=>ticMove(i);

  b.appendChild(btn);
 });
}

function winner(a) {
 const lines=[
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
 ];

 for(const [x,y,z] of lines) {
  if(a[x]&&a[x]===a[y]&&a[y]===a[z])
   return a[x];
 }

 return a.every(Boolean)?'empate':null;
}

function ticMove(i) {
 if(ticOver||tic[i]||ticTurn!=='X') return;

 tic[i]='X';

 let w=winner(tic);

 if(w) {
  finishTic(w);
  return;
 }

 ticTurn='O';
 renderTic();

 document.getElementById('ticStatus').textContent='Computador pensando...';

 setTimeout(()=>{
  let empty=tic.map((v,i)=>v?null:i).filter(v=>v!==null);

  if(!empty.length) return;

  let pick=empty[Math.floor(Math.random()*empty.length)];
  tic[pick]='O';

  let result=winner(tic);

  if(result) {
   finishTic(result);
  } else {
   ticTurn='X';
   document.getElementById('ticStatus').textContent='Sua vez! Você é X.';
   renderTic();
  }
 },350);
}

function finishTic(w) {
 ticOver=true;

 document.getElementById('ticStatus').textContent='Partida encerrada';

 document.getElementById('ticResult').textContent=
  w==='empate'?'Deu empate!':
  w==='X'?'Você venceu! 🎉':
  'O computador venceu. Tente outra vez!';

 renderTic();
 gamesPlayed++;
}

// JOGO DA MEMÓRIA

const emojis=['🍕','🚀','🎧','⚽','🐱','⭐'];

let memFirst=null;
let memLock=false;
let memFound=0;
let memMoves=0;

function startMemory() {
 let deck=[...emojis,...emojis].sort(()=>Math.random()-.5);

 memFirst=null;
 memLock=false;
 memFound=0;
 memMoves=0;

 document.getElementById('memoryStatus').textContent='Encontre os 6 pares!';
 document.getElementById('memoryMoves').textContent='Tentativas: 0';
 document.getElementById('memoryResult').textContent='';

 const board=document.getElementById('memoryBoard');
 board.innerHTML='';

 deck.forEach((emoji,i)=>{
  let btn=document.createElement('button');

  btn.className='memory-card';
  btn.textContent='?';
  btn.dataset.emoji=emoji;
  btn.dataset.index=i;
  btn.onclick=()=>flipCard(btn);

  board.appendChild(btn);
 });
}

function flipCard(btn) {
 if(memLock||btn.classList.contains('flipped')||btn.classList.contains('matched'))
  return;

 btn.classList.add('flipped');
 btn.textContent=btn.dataset.emoji;

 if(!memFirst) {
  memFirst=btn;
  return;
 }

 memMoves++;

 document.getElementById('memoryMoves').textContent='Tentativas: '+memMoves;

 if(memFirst.dataset.emoji===btn.dataset.emoji) {

  memFirst.classList.add('matched');
  btn.classList.add('matched');

  memFirst.disabled=true;
  btn.disabled=true;

  memFirst=null;
  memFound++;

  if(memFound===6) {
   document.getElementById('memoryStatus').textContent='Você encontrou todos os pares!';
   document.getElementById('memoryResult').textContent='Parabéns! 🎉 Tentativas: '+memMoves;
   gamesPlayed++;
  }

 } else {

  memLock=true;
  let old=memFirst;
  memFirst=null;

  setTimeout(()=>{
   old.classList.remove('flipped');
   btn.classList.remove('flipped');

   old.textContent='?';
   btn.textContent='?';

   memLock=false;
  },800);
 }
}

// PEDRA, PAPEL E TESOURA

let rpsYou=0;
let rpsCpu=0;

function playRps(choice) {
 const opts=['pedra','papel','tesoura'];

 const cpu=opts[Math.floor(Math.random()*3)];

 let msg=choice===cpu?'Empate!':
  (choice==='pedra'&&cpu==='tesoura'||
   choice==='papel'&&cpu==='pedra'||
   choice==='tesoura'&&cpu==='papel')
   ?'Você venceu a rodada! 🎉'
   :'Computador venceu a rodada!';

 if(choice!==cpu) {
  if(msg.startsWith('Você')) rpsYou++;
  else rpsCpu++;
 }

 document.getElementById('rpsResult').textContent=
  'Você: '+choice+' | Computador: '+cpu+' — '+msg;

 document.getElementById('rpsScore').textContent=
  'Você '+rpsYou+' × '+rpsCpu+' Computador';

 gamesPlayed++;
}

function resetRps() {
 rpsYou=0;
 rpsCpu=0;

 document.getElementById('rpsResult').textContent='Placar zerado. Faça sua escolha!';
 document.getElementById('rpsScore').textContent='Você 0 × 0 Computador';
}
