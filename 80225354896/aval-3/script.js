
/* SVG GENERATOR */

function svgData(svg){
 return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);
}

function avatarSvg(seed,name){
 const colors=[
 ["#f8b195","#6e4b3a","#efc6a3"],
 ["#8ec5fc","#253c6b","#f0c4a4"],
 ["#d8a7ca","#593d5e","#f3c8ad"],
 ["#b4d8b4","#345844","#dfb18d"],
 ["#f2d37d","#75502e","#e7b997"],
 ["#a9a6f7","#3d3877","#edc5a5"]
 ];
 const c=colors[seed%colors.length];
 const hair=seed%2===0?"#35251f":"#46342c";
 return svgData(`
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
 <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient></defs>
 <rect width="160" height="160" fill="url(#bg)"/>
 <circle cx="130" cy="28" r="18" fill="#fff" opacity=".13"/>
 <path d="M20 160 Q25 112 80 105 Q135 112 140 160" fill="${c[1]}"/>
 <ellipse cx="80" cy="72" rx="37" ry="45" fill="${c[2]}"/>
 <path d="M43 73 Q32 18 80 20 Q125 22 118 76 L109 47 Q85 28 56 46Z" fill="${hair}"/>
 <ellipse cx="66" cy="75" rx="4" ry="3" fill="#30251f"/>
 <ellipse cx="94" cy="75" rx="4" ry="3" fill="#30251f"/>
 <path d="M70 95 Q80 103 91 94" fill="none" stroke="#9b5d55" stroke-width="3" stroke-linecap="round"/>
 <path d="M43 70 Q30 100 47 116" fill="${hair}"/>
 <path d="M117 67 Q130 98 111 116" fill="${hair}"/>
 </svg>`);
}

function landscapeSvg(type){
 const scenes={
 nature:`
 <rect width="700" height="850" fill="#a8d8f0"/>
 <circle cx="540" cy="145" r="72" fill="#ffe99b"/>
 <path d="M0 440 160 240 300 420 460 205 700 470V850H0Z" fill="#8bb7a1"/>
 <path d="M0 500 200 340 360 490 500 330 700 530V850H0Z" fill="#557d69"/>
 <path d="M0 610 Q200 520 350 650 T700 610V850H0Z" fill="#315f50"/>
 <path d="M0 710 Q160 660 340 735 T700 700V850H0Z" fill="#244d41"/>
 <path d="M490 420 Q540 520 500 850" stroke="#d6c69b" stroke-width="38" fill="none"/>
 `,
 city:`
 <rect width="700" height="850" fill="#d6e7f5"/>
 <circle cx="540" cy="130" r="65" fill="#ffcf7b"/>
 <rect x="45" y="300" width="115" height="550" fill="#839bb2"/>
 <rect x="180" y="210" width="135" height="640" fill="#b2a9c6"/>
 <rect x="340" y="350" width="105" height="500" fill="#7c9aaf"/>
 <rect x="470" y="170" width="175" height="680" fill="#9cabc0"/>
 <g fill="#ffe9ac">
 <path d="M65 340h20v30H65zM115 340h20v30h-20zM65 410h20v30H65zM115 410h20v30h-20z"/>
 <path d="M210 260h25v35h-25zM260 260h25v35h-25zM210 340h25v35h-25zM260 340h25v35h-25zM210 420h25v35h-25zM260 420h25v35h-25z"/>
 <path d="M365 400h20v35h-20zM405 400h20v35h-20zM365 470h20v35h-20zM405 470h20v35h-20z"/>
 <path d="M505 220h25v40h-25zM560 220h25v40h-25zM505 310h25v40h-25zM560 310h25v40h-25zM505 400h25v40h-25zM560 400h25v40h-25z"/>
 </g>
 <path d="M0 770H700V850H0Z" fill="#404b58"/>
 <path d="M320 850V770H370V850" fill="#f2d88e"/>
 `,
 coffee:`
 <rect width="700" height="850" fill="#f1dfc6"/>
 <circle cx="555" cy="135" r="70" fill="#fff5d9"/>
 <rect x="0" y="500" width="700" height="350" fill="#b77f54"/>
 <rect x="100" y="430" width="490" height="50" rx="10" fill="#7c5034"/>
 <ellipse cx="350" cy="550" rx="170" ry="100" fill="#e7d5ba"/>
 <ellipse cx="350" cy="530" rx="150" ry="82" fill="#fff5e7"/>
 <ellipse cx="350" cy="525" rx="118" ry="58" fill="#6b3926"/>
 <path d="M310 500 Q350 470 390 500 Q360 535 310 500Z" fill="#d8b16d"/>
 <path d="M385 500 Q340 550 390 560" fill="none" stroke="#e7c785" stroke-width="10"/>
 <rect x="120" y="350" width="125" height="95" rx="18" fill="#7b4d34"/>
 <rect x="135" y="365" width="95" height="65" rx="10" fill="#f3d6ad"/>
 <path d="M145 395h75" stroke="#c79c6d" stroke-width="8"/>
 <g fill="#426d48">
 <path d="M30 500 Q90 380 160 500Z"/>
 <path d="M540 490 Q600 350 670 490Z"/>
 </g>
 `,
 travel:`
 <rect width="700" height="850" fill="#a9d5e9"/>
 <circle cx="520" cy="170" r="80" fill="#fff2a6"/>
 <path d="M0 490 150 290 250 430 380 220 550 440 700 250V850H0Z" fill="#8299a7"/>
 <path d="M0 530 170 360 310 510 430 340 610 520 700 400V850H0Z" fill="#557e91"/>
 <path d="M0 660 Q200 530 360 650 T700 600V850H0Z" fill="#317d89"/>
 <path d="M0 730 Q150 660 300 740 T700 700V850H0Z" fill="#24646f"/>
 <path d="M280 580 Q390 650 520 830" fill="none" stroke="#f2d5a0" stroke-width="35"/>
 `,
 art:`
 <rect width="700" height="850" fill="#f4d5c2"/>
 <circle cx="170" cy="160" r="100" fill="#ed9b7c"/>
 <circle cx="550" cy="190" r="145" fill="#b7d9c4"/>
 <path d="M0 480 Q150 330 310 490 T700 440V850H0Z" fill="#d5a1bc"/>
 <path d="M0 650 Q220 530 390 660 T700 610V850H0Z" fill="#7f95b8"/>
 <path d="M140 330 Q330 200 490 350" stroke="#fff3df" stroke-width="30" fill="none"/>
 <path d="M200 490 Q370 380 520 500" stroke="#f7e3a7" stroke-width="22" fill="none"/>
 <circle cx="355" cy="350" r="65" fill="#f8e4b7"/>
 `
 };
 return svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 850">${scenes[type]||scenes.art}</svg>`);
}

/* DADOS SVG: SEM FOTOGRAFIAS */

const storyData=[
 {name:"Seu story",avatar:avatarSvg(0),scene:"art"},
 {name:"marina",avatar:avatarSvg(1),scene:"nature"},
 {name:"pedro",avatar:avatarSvg(2),scene:"city"},
 {name:"juliana",avatar:avatarSvg(3),scene:"coffee"},
 {name:"lucas",avatar:avatarSvg(4),scene:"travel"},
 {name:"carol",avatar:avatarSvg(5),scene:"art"},
 {name:"rafael",avatar:avatarSvg(2),scene:"nature"}
];

let posts=[
 {id:1,user:"natureza.diaria",location:"Paisagens ilustradas",avatar:avatarSvg(1),image:landscapeSvg("nature"),caption:"A natureza sempre encontra uma maneira de surpreender. 🌿",likes:2841,liked:false,saved:false,comments:["Que lugar maravilhoso!","Adoraria conhecer."]},
 {id:2,user:"urban.frames",location:"Cidade • Arte digital",avatar:avatarSvg(2),image:landscapeSvg("city"),caption:"A cidade tem uma beleza própria quando a gente para para observar. 🌆",likes:1290,liked:false,saved:false,comments:["Arte incrível!","Essa composição ficou perfeita."]},
 {id:3,user:"cafecomviagem",location:"Um cantinho especial",avatar:avatarSvg(3),image:landscapeSvg("coffee"),caption:"Café, calma e um pouco de tempo para mim. ☕",likes:978,liked:false,saved:false,comments:["O melhor momento do dia!","Adorei a ilustração."]},
 {id:4,user:"aventuraslivres",location:"Trilha • Arte digital",avatar:avatarSvg(4),image:landscapeSvg("travel"),caption:"Desacelerar também é seguir em frente. 🏔️",likes:5420,liked:false,saved:false,comments:["Paisagem sensacional!","Que vista."]}
];

const suggestionData=[
 {user:"fotografia.br",info:"Seguido por marina",avatar:avatarSvg(1)},
 {user:"travel.world",info:"Sugestão para você",avatar:avatarSvg(4)},
 {user:"design.daily",info:"Seguido por 2 pessoas",avatar:avatarSvg(5)},
 {user:"food.explore",info:"Sugestão para você",avatar:avatarSvg(3)},
 {user:"daily.moments",info:"Novo no Instagram",avatar:avatarSvg(2)}
];

const myAvatar=avatarSvg(0);
document.getElementById("sidebarAvatar").src=myAvatar;
document.getElementById("accountAvatar").src=myAvatar;

/* ÍCONES SVG */

const icons={
 heart:`<svg viewBox="0 0 24 24"><path d="M20.8 4.8a5.3 5.3 0 0 0-7.5 0L12 6.1l-1.3-1.3a5.3 5.3 0 0 0-7.5 7.5L12 21l8.8-8.7a5.3 5.3 0 0 0 0-7.5Z"/></svg>`,
 comment:`<svg viewBox="0 0 24 24"><path d="M21 11.5a8.5 8.5 0 0 a1 8.5 9.8 9.8 0 0 1-4-.8L3 21l1.8-4.2A8.3 8.3 0 0 a1 11.5 8.5 8.5 0 0 1 9-8.5Z"/></svg>`,
 share:`<svg viewBox="0 0 24 24"><path d="m22 2-7.2 20-3.8-8.2L2 10.2 22 2Z"/><path d="M11 13.8 22 2"/></svg>`,
 save:`<svg viewBox="0 0 24 24"><path d="M5 3h14v18l-7-5-7 5V3Z"/></svg>`,
 more:`<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>`
};

/* RENDER STORIES */

function renderStories(){
 document.getElementById("stories").innerHTML=storyData.map((s,i)=>`
 <div class="story" onclick="openStory(${i})">
 <div class="story-ring"><img src="${s.avatar}"></div>
 <div class="story-name">${s.name}</div>
 </div>`).join("");
}

/* RENDER FEED */

function renderFeed(){
 document.getElementById("feed").innerHTML=posts.map(p=>`
 <article class="post" id="post-${p.id}">
 <div class="post-header">
 <img class="avatar" src="${p.avatar}">
 <div><div class="post-user">${p.user}</div><div class="post-location">${p.location}</div></div>
 <button class="more" onclick="postOptions(${p.id})">${icons.more}</button>
 </div>
 <img class="post-image" src="${p.image}" loading="lazy">
 <div class="post-actions">
 <button class="action ${p.liked?'liked':''}" onclick="toggleLike(${p.id})">${icons.heart}</button>
 <button class="action" onclick="focusComment(${p.id})">${icons.comment}</button>
 <button class="action" onclick="sharePost(${p.id})">${icons.share}</button>
 <button class="action save-button ${p.saved?'saved':''}" onclick="toggleSave(${p.id})">${icons.save}</button>
 </div>
 <div class="post-content">
 <div class="likes">${p.likes.toLocaleString('pt-BR')} curtidas</div>
 <div class="caption"><strong>${p.user}</strong>${p.caption}</div>
 <div class="comments" onclick="focusComment(${p.id})">Ver todos os ${p.comments.length} comentários</div>
 ${p.comments.slice(-2).map(c=>`<div class="caption"><strong>usuario</strong>${c}</div>`).join("")}
 <div class="time">PUBLICAÇÃO RECENTE</div>
 </div>
 <div class="comment-input">
 <input id="comment-${p.id}" placeholder="Adicione um comentário..." onkeydown="if(event.key==='Enter') addComment(${p.id})">
 <button onclick="addComment(${p.id})">Publicar</button>
 </div>
 </article>
 `).join("");
}

/* SUGESTÕES */

function renderSuggestions(){
 document.getElementById("suggestions").innerHTML=suggestionData.map(s=>`
 <div class="suggestion">
 <img src="${s.avatar}">
 <div class="suggestion-info"><strong>${s.user}</strong><small>${s.info}</small></div>
 <button class="follow" onclick="followUser(this)">Seguir</button>
 </div>`).join("");
}

/* INTERAÇÕES */

function toggleLike(id){
 const p=posts.find(x=>x.id===id);
 if(!p)return;
 p.liked=!p.liked;
 p.likes+=p.liked?1:-1;
 renderFeed();
}

function toggleSave(id){
 const p=posts.find(x=>x.id===id);
 if(!p)return;
 p.saved=!p.saved;
 renderFeed();
 alert(p.saved?"Publicação salva!":"Publicação removida dos salvos.");
}

function focusComment(id){
 const el=document.getElementById("comment-"+id);
 if(el)el.focus();
}

function addComment(id){
 const input=document.getElementById("comment-"+id);
 const text=input.value.trim();
 if(!text)return;
 const p=posts.find(x=>x.id===id);
 if(!p)return;
 p.comments.push(text);
 renderFeed();
}

function followUser(btn){
 if(btn.innerText==="Seguir"){
 btn.innerText="Seguindo";
 btn.style.color="#888";
 }else{
 btn.innerText="Seguir";
 btn.style.color="#0095f6";
 }
}

/* STORIES */

function openStory(index){
 const s=storyData[index];
 document.getElementById("storyImage").src=landscapeSvg(s.scene);
 document.getElementById("storyUser").innerText=s.name;
 document.getElementById("storyModal").classList.add("open");
}

function closeStory(){
 document.getElementById("storyModal").classList.remove("open");
}

/* CRIAR PUBLICAÇÃO SVG */

function openCreate(){
 document.getElementById("createModal").classList.add("open");
}

function closeCreate(){
 document.getElementById("createModal").classList.remove("open");
}

document.getElementById("imageFile").addEventListener("change",function(e){
 const file=e.target.files[0];
 if(!file)return;
 if(file.type!=="image/svg+xml"){
 alert("Este projeto aceita somente imagens SVG.");
 this.value="";
 return;
 }
 const reader=new FileReader();
 reader.onload=function(ev){
 const img=document.getElementById("imagePreview");
 img.src=ev.target.result;
 img.style.display="block";
 };
 reader.readAsDataURL(file);
});

function publishPost(){
 const file=document.getElementById("imageFile").files[0];
 const caption=document.getElementById("captionInput").value.trim();
 if(!file){alert("Escolha um arquivo SVG.");return;}
 const reader=new FileReader();
 reader.onload=function(e){
 posts.unshift({
 id:Date.now(),
 user:"seu_perfil",
 location:"Arte SVG",
 avatar:myAvatar,
 image:e.target.result,
 caption:caption,
 likes:0,
 liked:false,
 saved:false,
 comments:[]
 });
 renderFeed();
 closeCreate();
 document.getElementById("imageFile").value="";
 document.getElementById("captionInput").value="";
 document.getElementById("imagePreview").style.display="none";
 alert("Publicação compartilhada!");
 };
 reader.readAsDataURL(file);
}

/* PESQUISA */

function performSearch(){
 const term=document.getElementById("searchInput").value.trim().toLowerCase();
 const results=posts.filter(p=>p.user.toLowerCase().includes(term)||p.caption.toLowerCase().includes(term)||p.location.toLowerCase().includes(term));
 const box=document.getElementById("searchResults");
 if(!term){box.innerHTML="<p>Digite algo para pesquisar.</p>";return;}
 if(!results.length){box.innerHTML="<p>Nenhuma publicação encontrada.</p>";return;}
 box.innerHTML=results.map(p=>`
 <div class="search-result">
 <img src="${p.image}">
 <div><strong>${p.user}</strong><p>${p.caption}</p></div>
 </div>`).join("");
}

function closeSearch(){
 document.getElementById("searchModal").classList.remove("open");
}

/* NAVEGAÇÃO */

function navigate(section){
 if(section==="home"){
 renderFeed();
 window.scrollTo({top:0,behavior:"smooth"});
 return;
 }
 if(section==="search"){
 document.getElementById("searchModal").classList.add("open");
 document.getElementById("searchInput").focus();
 return;
 }
 const messages={
 explore:"Explore: descubra novas publicações.",
 reels:"Reels: área de vídeos curtos.",
 messages:"Mensagens: sua caixa de conversas.",
 notifications:"Notificações: veja suas atividades.",
 profile:"Perfil: seu espaço pessoal.",
 more:"Mais opções do Instagram."
 };
 alert(messages[section]||"Área selecionada");
}

/* COMPARTILHAR */

function sharePost(id){
 const p=posts.find(x=>x.id===id);
 if(!p)return;
 if(navigator.share){
 navigator.share({title:"Instagram",text:p.caption}).catch(()=>{});
 }else{
 alert("Compartilhamento não disponível neste navegador.");
 }
}

/* OPÇÕES */

function postOptions(id){
 const p=posts.find(x=>x.id===id);
 if(!p)return;
 const opt=prompt("Publicação de @"+p.user+"\nDigite SALVAR para salvar ou CANCELAR para fechar.");
 if(opt&&opt.toLowerCase()==="salvar"){
 p.saved=true;
 renderFeed();
 alert("Publicação salva.");
 }
}

/* INICIALIZAÇÃO */

renderStories();
renderFeed();
renderSuggestions();
