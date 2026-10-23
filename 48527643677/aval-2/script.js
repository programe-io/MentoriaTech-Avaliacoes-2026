// Personagens - nomes trocados Noob <-> Builderman como pediu
const characters = [
  { id: "shedletsky", name: "Shedletsky", likes: "2.3K", hours: "2h", role: "Survivor", desc: "acordei cedo hoje, quem pegou meu frango frito?? 🍗😤 #diaRuim" },
  { id: "twotime", name: "Two Time", likes: "1.8K", hours: "4h", role: "Survivor", desc: "mais um dia sem dormir direito... não aguento mais essa cabeça 🖤 #cansado" },
  { id: "guest", name: "Guest 1337", likes: "4.1K", hours: "5h", role: "Survivor", desc: "treino de hoje foi pesado, bora descansar amanhã 💪 #gym" },
  { id: "elliot", name: "Elliot", likes: "2.0K", hours: "1h", role: "Survivor", desc: "entregando pizza o dia todo, alguém quer? 🍕🛵 tô cansado já" },
  { id: "builderman", name: "Builderman", img: "noob", likes: "1.2K", hours: "7h", role: "Survivor", desc: "dia de construir umas coisas novas no meu lugar, tá ficando top 🔨 #build" },
  { id: "noob", name: "Noob", img: "builderman", likes: "5.5K", hours: "agora", role: "Survivor", desc: "achei esse bloxy na rua e peguei kkkk tava com sede 😎🥤 #bloxy" },
  { id: "jason", name: "Jason", likes: "8.9K", hours: "12h", role: "KILLER", desc: "KIKIMAMA" },
  { id: "oneone", name: "1x1x1x1", likes: "6.2K", hours: "3h", role: "KILLER", desc: "aff hoje o céu tava verde de novo, normal por aqui 💚 #void" },
  { id: "coolkidd", name: "c00lkidd", likes: "7.4K", hours: "6h", role: "KILLER", desc: "HOJE VOU SAIR PRA BRINCAR UM POUCO 😜🏃‍♂️ #prontoOuNao" }
];

// Like
let liked = {};
let likeCounts = {};
characters.forEach(c => {
  likeCounts[c.id] = parseFloat(c.likes.replace("K","")) * 1000;
});

function toggleLike(id) {
  const isLiked = !!liked[id];
  liked[id] = !isLiked;
  likeCounts[id] = isLiked ? likeCounts[id]-1 : likeCounts[id]+1;
  document.getElementById(`likes-${id}`).innerText = formatLikes(likeCounts[id]);
}

function formatLikes(n){
  return n >= 1000 ? (n/1000).toFixed(1)+"K" : n.toString();
}

// Clique no amigo -> scroll pro post
function handleFriendClick(id){
  const el = document.getElementById(`post-${id}`);
  if(el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Botão Entrar no Forsaken - teleporte pro jogo
function handleEnterForsaken(){
  const btn = document.getElementById("enterForsakenBtn");
  btn.innerText = "Entrando...";
  window.open('https://www.roblox.com/pt/games/18687417158/Forsaken', '_blank');
  setTimeout(()=> btn.innerHTML = "▶ Entrar no Forsaken", 2500);
}