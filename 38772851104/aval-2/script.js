(function(){
  const SUITS=['♠','♥','♦','♣'], RANKS=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  const \$=id=>document.getElementById(id);
  let balance=500, bet=0, deck=[], player=[], dealer=[], phase='bet';

  try{ const s=localStorage.getItem('vinteum-saldo'); if(s && +s>0) balance=+s; \}catch(e){\}
  const save=()=>{ try{ localStorage.setItem('vinteum-saldo', String(balance)); \}catch(e){\} \};
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));

  function newDeck(){
    const d=[];
    for(const s of SUITS) for(const r of RANKS) d.push({r,s\});
    for(let i=d.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [d[i],d[j]]=[d[j],d[i]]; \}
    return d;
  \}
  function draw(hand){
    if(deck.length<15) deck=newDeck();
    const c=deck.pop(); c.fresh=true; hand.push(c); return c;
  \}
  const val=c=>c.r==='A'?11:('JQK'.includes(c.r)?10:+c.r);
  function score(h){
    let t=0,a=0;
    for(const c of h){ t+=val(c); if(c.r==='A') a++; \}
    while(t>21&&a){ t-=10; a--; \}
    return t;
  \}
  const isBJ=h=>h.length===2&&score(h)===21;

  function cardEl(c,hidden){
    const el=document.createElement('div');
    if(hidden){ el.className='card back'; el.setAttribute('aria-label','Carta virada'); return el; \}
    el.className='card'+(c.s==='♥'||c.s==='♦'?' red':'')+(c.fresh?' fresh':'');
    c.fresh=false;
    el.setAttribute('aria-label',c.r+' de '+c.s);
    el.innerHTML='<span class="c tl">'+c.r+'<br>'+c.s+'</span><span class="mid">'+c.s+'</span><span class="c br">'+c.r+'<br>'+c.s+'</span>';
    return el;
  \}
  function render(){
    \$('bal').textContent=balance; \$('bet').textContent=bet;
    const pe=\$('player'), de=\$('dealer');
    pe.replaceChildren(...player.map(c=>cardEl(c,false)));
    de.replaceChildren(...dealer.map((c,i)=>cardEl(c, phase==='play' && i===1)));
    \$('pscore').textContent=player.length?score(player):'';
    \$('dscore').textContent=dealer.length?(phase==='play'?val(dealer[0]):score(dealer)):'';
    const betting=phase==='bet', playing=phase==='play';
    \$('betRow').hidden=!betting; \$('betActions').hidden=!betting; \$('playActions').hidden=!playing;
    document.querySelectorAll('.chip').forEach(b=>b.disabled=(+b.dataset.v>balance));
    \$('deal').disabled=bet===0; \$('clear').disabled=bet===0;
    \$('double').disabled=!(playing&&player.length===2&&balance>=bet);
  \}
  function say(t,cls){ const m=\$('msg'); m.textContent=t; m.className='msg'+(cls?' '+cls:''); \}

  function addBet(v){ if(phase!=='bet'||v>balance) return; bet+=v; balance-=v; say('Aposta: '+bet); render(); \}
  function clearBet(){ if(phase!=='bet') return; balance+=bet; bet=0; say('Escolha sua aposta'); render(); \}

  async function startRound(){
    if(bet===0) return;
    phase='play'; player=[]; dealer=[];
    say('Distribuindo…'); render();
    for(let i=0;i<2;i++){ draw(player); render(); await sleep(220); draw(dealer); render(); await sleep(220); \}
    if(isBJ(player)||isBJ(dealer)) return finish();
    say('Sua vez');
    render();
  \}
  async function hit(){
    if(phase!=='play') return;
    draw(player); render();
    const s=score(player);
    if(s>21) return finish();
    if(s===21) return stand();
  \}
  async function stand(){ if(phase==='play') return finish(); \}
  async function doubleDown(){
    if(phase!=='play'||player.length!==2||balance<bet) return;
    balance-=bet; bet*=2; draw(player); render();
    await sleep(350); finish();
  \}
  async function finish(){
    phase='dealer'; render();
    const ps=score(player);
    const pBJ=isBJ(player), dBJ=isBJ(dealer);
    say('Banca revela…'); render();
    await sleep(500);
    if(ps<=21 && !pBJ && !dBJ){
      while(score(dealer)<17){ draw(dealer); render(); await sleep(600); \}
    \}
    const ds=score(dealer);
    let payout=0, text, cls;
    if(ps>21){ text='Estourou! A banca vence.'; cls='lose'; \}
    else if(pBJ&&!dBJ){ payout=bet*2.5; text='Blackjack! Você ganhou '+(bet*1.5)+'.'; cls='win'; \}
    else if(dBJ&&!pBJ){ text='Blackjack da banca.'; cls='lose'; \}
    else if(ds>21){ payout=bet*2; text='A banca estourou! Você ganhou '+bet+'.'; cls='win'; \}
    else if(ps>ds){ payout=bet*2; text='Você venceu! +'+bet; cls='win'; \}
    else if(ps<ds){ text='A banca vence com '+ds+'.'; cls='lose'; \}
    else { payout=bet; text='Empate. Aposta devolvida.'; cls='push'; \}
    balance+=payout; save();
    phase='done'; render();
    say(text,cls);
    await sleep(1400);
    bet=0; phase='bet';
    if(balance<=0){ balance=500; save(); say('Fichas acabaram. Saldo reiniciado em 500.','push'); \}
    else say('Escolha sua aposta para a próxima rodada');
    render();
  \}

  document.querySelectorAll('.chip').forEach(b=>b.addEventListener('click',()=>addBet(+b.dataset.v)));
  \$('clear').addEventListener('click',clearBet);
  \$('deal').addEventListener('click',startRound);
  \$('hit').addEventListener('click',hit);
  \$('stand').addEventListener('click',stand);
  \$('double').addEventListener('click',doubleDown);

  deck=newDeck(); render();
\})();$0