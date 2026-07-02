const data = [

{
title:"O futuro da Inteligência Artificial",
category:"IA",
img:"https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
text:"A Inteligência Artificial está revolucionando empresas, educação, medicina e praticamente todos os setores da sociedade.",
likes:22
},

{
title:"As tendências do Web Design",
category:"Design",
img:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
text:"Interfaces minimalistas, animações suaves e experiências cada vez mais intuitivas definem o futuro do design.",
likes:17
},

{
title:"JavaScript em 2026",
category:"Tecnologia",
img:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
text:"Novos recursos tornam o JavaScript ainda mais poderoso para aplicações web modernas.",
likes:41
},

{
title:"Como criar projetos incríveis",
category:"Tecnologia",
img:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
text:"Aprenda boas práticas para criar projetos que impressionam usuários e recrutadores.",
likes:12
}

];

const container = document.getElementById("posts");

function render(list){

container.innerHTML="";

list.forEach(post=>{

const reading = Math.ceil(post.text.split(" ").length/200)+1;

container.innerHTML += `
<div class="card">

<img src="${post.img}">

<div class="content">

<span class="category">${post.category}</span>

<h2>${post.title}</h2>

<p>${post.text}</p>

<div class="info">

<span>📖 ${reading} min</span>

<span class="like">❤️ ${post.likes}</span>

</div>

</div>

</div>
`;

});

document.querySelectorAll(".like").forEach(el=>{

el.onclick=()=>{

let n=parseInt(el.innerHTML.replace(/\D/g,""));
n++;

el.innerHTML="❤️ "+n;

}

});

}

render(data);

document.getElementById("search").addEventListener("keyup",(e)=>{

const texto = e.target.value.toLowerCase();

render(data.filter(post=>

post.title.toLowerCase().includes(texto) ||
post.text.toLowerCase().includes(texto) ||
post.category.toLowerCase().includes(texto)

));

});

function filterCategory(cat){

if(cat==="Todos"){

render(data);

}else{

render(data.filter(post=>post.category===cat));

}

}

function toggleTheme(){

document.body.classList.toggle("dark");

}

window.addEventListener("scroll",()=>{

const scroll = document.documentElement.scrollTop;
const altura = document.documentElement.scrollHeight - document.documentElement.clientHeight;

document.querySelector(".progress").style.width =
(scroll/altura)*100 + "%";

document.querySelector(".top").style.display =
scroll>500 ? "flex" : "none";

});