const posts=[
{id:1,img:"images/post1.jpg",title:"Fábrica de Brinquedos - Cap 1",desc:"Fábrica abandonada! Mascote azul me seguiu. Nota 9/10",likes:892,comments:[{u:"Andiz",t:"Mapa insano! 🔥"},{u:"Melly",t:"Amei o susto 😱"},{u:"Wallcy",t:"Bora jogar junto?"}]},
{id:2,img:"images/post2.jpg",title:"Noite na Pizzaria Assombrada",desc:"Passei a madrugada na pizzaria! Animatronics não deixam em paz.",likes:1243,comments:[{u:"Melly",t:"MORRI DE MEDO"},{u:"Andiz",t:"Coelho roxo é o pior"}]},
{id:3,img:"images/post3.jpg",title:"Mundo Blocado - Roblox",desc:"Tycoon maluco no Roblox! Link nos stories 🚀",likes:521},
{id:4,img:"images/post4.jpg",title:"GTA VI - Vice City LINDA!",desc:"Vice City com neon infinito! Melhor jogo da década 🏙️",likes:2105},
{id:5,img:"images/post5.jpg",title:"Puzzle Lab",desc:"Montando brinquedos que se mexem sozinhos 🧩",likes:342},
{id:6,img:"images/post6.jpg",title:"Cidade Neon Blocada",desc:"Cidade noturna com festival! 3.420 moedas farmadas 🎮",likes:768}
];
function render(){
document.getElementById('grid').innerHTML=posts.map(p=>`<div class="grid-item" onclick="openPost(${p.id})"><img src="${p.img}"><div class="overlay">❤ ${p.likes}</div></div>`).join('');
}
function openPost(id){
const p=posts.find(x=>x.id===id);
document.getElementById('modal-img').src=p.img;
document.getElementById('modal-title').innerText=p.title;
document.getElementById('modal-desc').innerText=p.desc;
document.getElementById('modal-likes').innerText=p.likes;
document.getElementById('modal-comments').innerHTML=(p.comments||[]).map(c=>`<div class="comment"><b>${c.u}</b> ${c.t}</div>`).join('');
document.getElementById('modal').classList.add('active');
}
function closeModal(){document.getElementById('modal').classList.remove('active');}
function openFriend(n){alert(n+" - Em breve!");}
document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal') closeModal();});
render();