const dados = [
    { id: 1, titulo: "O picolé foi inventado por acidente por uma criança", cat: "doces", img: "https://unsplash.com", resumo: "Um menino de 11 anos esqueceu um copo de refrigerante no frio em 1905.", texto: "Em 1905, Frank Epperson, de apenas 11 anos, misturou pó de refrigerante com água e deixou o copo na varanda com o palito de mexer dentro. Durante a noite, a temperatura caiu abaixo de zero. Pela manhã, ele puxou o palito e descobriu a primeira versão do picolé." },
    { id: 2, titulo: "Ketchup já foi vendido como remédio", cat: "origem", img: "https://unsplash.com", resumo: "No século XIX, médicos recomendavam o molho para curar indigestão.", texto: "Na década de 1830, um médico americano chamado John Cook Bennett afirmou que o tomate tinha propriedades medicinais incríveis. Ele começou a vender receitas de ketchup (e até pílulas de extrato de tomate) na farmácia para tratar diarreia, icterícia e indigestão." },
    { id: 3, titulo: "Bananas são bagas, mas morangos não", cat: "frutas", img: "https://unsplash.com", resumo: "Na classificação botânica, o mundo das frutas faz pouco sentido.", texto: "Para a botânica, uma baga é um fruto gerado a partir de uma única flor com um único ovário, contendo sementes por dentro — o que inclui bananas, uvas e melancias. Já o morango vem de uma flor com múltiplos ovários e tem suas sementes do lado de fora, sendo classificado como um 'fruto acessório'." }
];

const grid = document.getElementById('grid');
const search = document.getElementById('search');
const btns = document.querySelectorAll('.btn');
const modal = document.getElementById('modal');
let catAtual = 'todos';

function render(lista) {
    grid.innerHTML = lista.map(item => `
        <article class="card">
            <img src="${item.img}" alt="${item.titulo}">
            <div class="card-body">
                <span class="tag">${item.cat}</span>
                <h3>${item.titulo}</h3>
                <p>${item.resumo}</p>
                <button class="read-btn" onclick="abrir(${item.id})">Ver História</button>
            </div>
        </article>
    `).join('');
}

function abrir(id) {
    const p = dados.find(x => x.id === id);
    document.getElementById('m-cat').textContent = p.cat;
    document.getElementById('m-title').textContent = p.titulo;
    document.getElementById('m-img').src = p.img;
    document.getElementById('m-text').textContent = p.texto;
    modal.style.display = 'flex';
}

document.querySelector('.close').onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };

btns.forEach(b => b.onclick = () => {
    btns.forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    catAtual = b.dataset.cat;
    filtrar();
});

search.oninput = filtrar;

function filtrar() {
    const t = search.value.toLowerCase();
    render(dados.filter(p => (catAtual === 'todos' || p.cat === catAtual) && p.titulo.toLowerCase().includes(t)));
}

render(dados);
