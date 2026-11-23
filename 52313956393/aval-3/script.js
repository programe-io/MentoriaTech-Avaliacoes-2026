function login(){
 const name=document.getElementById('username').value.trim();
 if(!name){
  alert('Digite um nome de usuário para entrar.');
  return;
 }
 document.getElementById('login').classList.add('hidden');
 document.getElementById('sideName').textContent=name;
 document.getElementById('profileName').textContent=name;
}

function like(btn){
 const liked=btn.textContent==='♥️';
 btn.textContent=liked?'♡':'♥️';
 btn.style.color=liked?'#262626':'#ed4956';
 const count=btn.closest('.post').querySelector('.likes');
 let n=parseInt(count.textContent.replace(/\D/g,''),10)||0;
 count.textContent=(n+(liked?-1:1)).toLocaleString('pt-BR')+' curtidas';
}

function focusComment(btn){
 btn.closest('.post').querySelector('.commentrow input').focus();
}

function sendComment(btn){
 const input=btn.previousElementSibling;
 const value=input.value.trim();
 if(!value)return;
 const body=btn.closest('.post').querySelector('.postbody');
 const p=document.createElement('p');
 p.innerHTML='<strong>Você</strong> ';
 p.appendChild(document.createTextNode(value));
 body.insertBefore(p,body.querySelector('.muted'));
 input.value='';
}

function showProfile(){
 document.getElementById('feed').classList.add('hidden');
 document.getElementById('profile').classList.remove('hidden');
}

function showFeed(){
 document.getElementById('profile').classList.add('hidden');
 document.getElementById('feed').classList.remove('hidden');
}

function showExplore(){
 showFeed();
 alert('Você está na aba Explorar da demonstração.');
}

function newPost(){
 const caption=prompt('Escreva uma legenda para sua publicação:');
 if(caption===null)return;
 const post=document.createElement('article');
 post.className='post';
 post.innerHTML='<div class="posthead"><span class="avatar">J</span><strong>Você</strong><span class="muted">• agora</span></div><div class="postphoto coffee"><span>📸</span><div class="caption"></div></div><div class="actions"><button onclick="like(this)">♡</button><button onclick="focusComment(this)">♧</button></div><div class="postbody"><div class="likes">0 curtidas</div></div><div class="commentrow"><input placeholder="Adicione um comentário..."><button onclick="sendComment(this)">Publicar</button></div>';
 post.querySelector('.caption').textContent=caption;
 document.getElementById('feed').appendChild(post);
}