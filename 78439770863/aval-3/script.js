const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const toast = (message) => { const el=$('#toast'); el.textContent=message; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'),1900); };

// Curtidas, salvar e comentários
document.addEventListener('click', (e) => {
  const like=e.target.closest('.like-btn');
  if(like){like.classList.toggle('liked');like.querySelector('i').className=like.classList.contains('liked')?'fa-solid fa-heart':'fa-regular fa-heart';const count=like.closest('.post').querySelector('.likes');let n=parseInt(count.textContent)||0;count.textContent=`${n+(like.classList.contains('liked')?1:-1)} curtidas`;}
  const save=e.target.closest('.save-btn');
  if(save){save.classList.toggle('saved');save.innerHTML=save.classList.contains('saved')?'<i class="fa-solid fa-bookmark"></i>':'<i class="fa-regular fa-bookmark"></i>';toast(save.classList.contains('saved')?'Publicação salva':'Publicação removida dos salvos');}
  if(e.target.closest('.share-btn')) toast('Demonstração: link da publicação copiado!');
  if(e.target.closest('.comment-focus')) e.target.closest('.post').querySelector('.comment-form input').focus();
  if(e.target.closest('.view-comments')) toast('Os comentários desta publicação estão sendo exibidos.');
});
$$('.comment-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const input=$('input',form);if(!input.value.trim())return;const p=document.createElement('p');p.innerHTML=`<strong>samuel</strong> `;p.append(document.createTextNode(input.value.trim()));form.previousElementSibling.prepend(p);input.value='';toast('Comentário publicado!');}));

// Stories
const storyImages={'Seu story':'https://d23jzdnitxn12c.cloudfront.net/a4fbb610ae877f872286c1947d7edb2a/v2_e198acb0-03b2-4fc8-8180-949c9e349a77.jpg','Marina':'https://i.pravatar.cc/100?img=47','Lucas':'https://i.pravatar.cc/100?img=11','Ana':'https://i.pravatar.cc/100?img=44','Pedro':'https://i.pravatar.cc/100?img=13','Julia':'https://i.pravatar.cc/100?img=49'};
$$('.story').forEach(btn=>btn.addEventListener('click',()=>{const name=btn.dataset.story;$('#storyName').textContent=name;$('#storyAvatar').src=storyImages[name]||storyImages.Marინა;$('#storyDialog').showModal();}));
$$('[data-close]').forEach(btn=>btn.addEventListener('click',()=>$('#'+btn.dataset.close).close()));

// Mensagens demonstrativas
const messagesPanel=$('#mensagens');
function openMessages(){messagesPanel.classList.add('open');}
$('#navMessages').addEventListener('click',e=>{e.preventDefault();openMessages();});
$('#closeMessages').addEventListener('click',()=>messagesPanel.classList.remove('open'));
const chatData={
  'Marina':{img:47,history:[['Oi! Tudo bem?','received'],['Tudo sim! E você?','sent']]},
  'Lucas':{img:11,history:[['Vamos jogar hoje?','received']]},
  'Ana Clara':{img:44,history:[['Gostei da foto!','received']]}
};
function selectChat(name){
  const data=chatData[name];$('#chatName').textContent=name;$('#chatAvatar').src=`https://i.pravatar.cc/100?img=${data.img}`;
  $$('.chat-person').forEach(b=>b.classList.toggle('selected',b.dataset.chat===name));
  const area=$('#chatMessages');area.innerHTML='';
  data.history.forEach(([txt,type])=>{const bubble=document.createElement('div');bubble.className=`bubble ${type}`;bubble.textContent=txt;area.append(bubble);});
  area.scrollTop=area.scrollHeight;
}
$$('.chat-person').forEach(btn=>btn.addEventListener('click',()=>selectChat(btn.dataset.chat)));
$('#messageForm').addEventListener('submit',e=>{e.preventDefault();const input=$('#messageInput');const value=input.value.trim();if(!value)return;const bubble=document.createElement('div');bubble.className='bubble sent';bubble.textContent=value;$('#chatMessages').append(bubble);chatData[$('#chatName').textContent].history.push([value,'sent']);input.value='';$('#chatMessages').scrollTop=$('#chatMessages').scrollHeight;});

// Criar publicação
$('#navCreate').addEventListener('click',e=>{e.preventDefault();$('#createDialog').showModal();});
$('#imageUrl').addEventListener('input',e=>{const url=e.target.value;const preview=$('#imagePreview');preview.innerHTML='';if(url){const img=document.createElement('img');img.src=url;img.alt='Prévia da publicação';img.onerror=()=>preview.textContent='Não foi possível carregar essa imagem.';preview.append(img);}else preview.textContent='A prévia da imagem aparecerá aqui';});
$('#createForm').addEventListener('submit',e=>{
  e.preventDefault();const url=$('#imageUrl').value.trim();if(!url)return;
  const caption=$('#captionInput').value.trim();
  const post=document.createElement('article');post.className='post';
  post.innerHTML=`<header class="post-header"><img class="avatar" src="https://d23jzdnitxn12c.cloudfront.net/a4fbb610ae877f872286c1947d7edb2a/v2_e198acb0-03b2-4fc8-8180-949c9e349a77.jpg" alt=""><div><strong>samuel</strong><small>Agora</small></div><button class="more">•••</button></header><img class="post-image" alt="Nova publicação"><div class="post-actions"><button class="like-btn"><i class="fa-regular fa-heart"></i></button><button class="comment-focus"><i class="fa-regular fa-comment"></i></button><button class="share-btn"><i class="fa-regular fa-paper-plane"></i></button><button class="save-btn"><i class="fa-regular fa-bookmark"></i></button></div><div class="post-caption"><strong class="likes">0 curtidas</strong><p><strong>samuel</strong> </p><button class="view-comments">Ver comentários</button><small>AGORA</small></div><form class="comment-form"><input placeholder="Adicione um comentário..." aria-label="Comentário"><button>Publicar</button></form>`;
  post.querySelector('.post-image').src=url;post.querySelector('.post-caption p').append(document.createTextNode(caption));
  $('#posts').prepend(post);$('#createDialog').close();e.target.reset();$('#imagePreview').textContent='A prévia da imagem aparecerá aqui';toast('Sua publicação foi adicionada!');
});