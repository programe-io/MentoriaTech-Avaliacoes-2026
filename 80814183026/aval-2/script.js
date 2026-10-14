const feed = document.getElementById('feed');
let posts = [
  {id:1,name:'Ana Souza',avatar:'https://i.pravatar.cc/100?img=5',time:'2h',text:'Hoje no show do Henrique e Juliano foi incrível! 🎤💛',img:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=700&q=80',likes:124,liked:false,comments:[{name:'Você',text:'Que demais!'}]},
  {id:2,name:'Marcos Silva',avatar:'https://i.pravatar.cc/100?img=8',time:'5h',text:'Novo projeto no ar. Site 100% sem erros 🚀',img:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&q=80',likes:89,liked:false,comments:[]},
  {id:3,name:'Julia Lima',avatar:'https://i.pravatar.cc/100?img=12',time:'1d',text:'Minha galeria só com fotos reais 😍',img:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700&q=80',likes:203,liked:true,comments:[{name:'Pedro',text:'Linda!'}]}
];

function render(){
  feed.innerHTML='';
  posts.forEach(p=>{
    const div=document.createElement('div');
    div.className='post';
    div.innerHTML=`
      <div class="post-head"><img src="${p.avatar}"><div><b>${p.name}</b><small>${p.time} • 🌎</small></div></div>
      ${p.text?`<div class="post-text">${p.text}</div>`:''}
      ${p.img?`<img class="post-img" src="${p.img}" onerror="this.style.display='none'">`:''}
      <div class="post-stats"><span>👍 ${p.likes} curtidas</span><span>${p.comments.length} comentários</span></div>
      <div class="actions">
        <button class="${p.liked?'liked':''}" onclick="like(${p.id})">👍 Curtir</button>
        <button onclick="document.getElementById('c-${p.id}').focus()">💬 Comentar</button>
        <button onclick="share(${p.id})">↗️ Compartilhar</button>
      </div>
      <div class="comments">
        ${p.comments.map(c=>`<div class="comment"><img src="https://i.pravatar.cc/100?img=1"><div class="bubble"><b>${c.name}</b> ${c.text}</div></div>`).join('')}
        <div class="add-comment"><img src="https://i.pravatar.cc/100?img=1"><input id="c-${p.id}" placeholder="Escreva um comentário..." onkeydown="if(event.key==='Enter') comment(${p.id},this.value)"></div>
      </div>
    `;
    feed.appendChild(div);
  });
}
function like(id){ const p=posts.find(x=>x.id===id); p.liked=!p.liked; p.likes+=p.liked?1:-1; render(); }
function comment(id,text){ if(!text.trim()) return; posts.find(x=>x.id===id).comments.push({name:'Você',text:text}); render(); }
function share(id){ alert('Link copiado! https://socialfeed.com/post/'+id); }
function openModal(){ document.getElementById('newPostModal').style.display='flex'; }
function closeModal(){ document.getElementById('newPostModal').style.display='none'; }
function createPost(){
  const t=document.getElementById('newText').value;
  const img=document.getElementById('newImg').value;
  if(!t && !img){ alert('Escreva algo!'); return; }
  posts.unshift({id:Date.now(),name:'Você',avatar:'https://i.pravatar.cc/100?img=1',time:'agora',text:t,img:img,likes:0,liked:false,comments:[]});
  document.getElementById('newText').value=''; document.getElementById('newImg').value='';
  closeModal(); render();
}
function addStory(){ alert('Story criado! (exemplo)'); }
render();