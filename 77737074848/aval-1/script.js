// Banco de dados inicial de receitas
const receitasIniciais = [
    {
        id: 1,
        titulo: "Bolo de Cenoura Fofinho com Cobertura de Chocolate",
        categoria: "Doces",
        tempo: "45 min",
        data: "26 de Novembro, 2026",
        imagem: "https://unsplash.com",
        descricao: "Um clássico da culinária brasileira perfeito para o café da tarde. O segredo é bater bem os líquidos no liquidificador.",
        ingredientes: [
            "3 cenouras médias descascadas e picadas",
            "3 ovos inteiros",
            "1 xícara (chá) de óleo",
            "2 xícaras (chá) de açúcar",
            "2 e 1/2 xícaras (chá) de farinha de trigo peneirada",
            "1 colher (sopa) de fermento em pó"
        ],
        preparo: [
            "Preaqueça o forno a 180°C e unte uma forma.",
            "Bata a cenoura, os ovos e o óleo no liquidificador até ficar homogêneo.",
            "Adicione o açúcar e bata por mais 2 minutos.",
            "Misture a farinha aos poucos em uma tigela e finalize com o fermento.",
            "Asse por cerca de 40 minutos."
        ]
    },
    {
        id: 2,
        titulo: "Risoto Cremoso de Cogumelos Frescos",
        categoria: "Pratos Principais",
        tempo: "35 min",
        data: "20 de Novembro, 2026",
        imagem: "https://unsplash.com",
        descricao: "Um prato sofisticado, rápido e extremamente saboroso para um jantar especial.",
        ingredientes: [
            "2 xícaras (chá) de arroz arbóreo",
            "300g de cogumelos paris ou shimeji fatiados",
            "1 litro de caldo de legumes quente",
            "1/2 xícara de vinho branco seco",
            "1 cebola pequena bem picada",
            "2 colheres (sopa) de manteiga gelada e queijo parmesão"
        ],
        preparo: [
            "Refogue os cogumelos na manteiga até dourarem e reserve.",
            "Refogue a cebola, adicione o arroz arbóreo e frite por 2 minutos.",
            "Regue com o vinho branco e mexa até evaporar.",
            "Adicione o caldo quente concha por concha até o arroz ficar al dente.",
            "Desligue o fogo e misture os cogumelos, manteiga gelada e parmesão."
        ]
    }
];

// Carrega receitas salvas no navegador ou usa as iniciais
let receitas = JSON.parse(localStorage.getItem('blog_receitas')) || receitasIniciais;
let categoriaAtual = 'todas';
let termoBusca = '';

// Elementos do DOM
const containerReceitas = document.getElementById('lista-receitas');
const mensagemVazia = document.getElementById('mensagem-vazia');
const campoBusca = document.getElementById('campo-busca');
const modal = document.getElementById('modal-receita');
const formReceita = document.getElementById('form-receita');

// Função para renderizar as receitas na tela
function renderizarReceitas() {
    containerReceitas.innerHTML = '';

    const filtradas = receitas.filter(receita => {
        const bateCategoria = categoriaAtual === 'todas' || receita.categoria === categoriaAtual;
        const textoCompleto = `${receita.titulo} ${receita.descricao} ${receita.ingredientes.join(' ')}`.toLowerCase();
        const bateBusca = textoCompleto.includes(termoBusca.toLowerCase());
        return bateCategoria && bateBusca;
    });

    if (filtradas.length === 0) {
        mensagemVazia.classList.remove('oculto');
        return;
    } else {
        mensagemVazia.classList.add('oculto');
    }

    filtradas.forEach(receita => {
        const artigo = document.createElement('article');
        
        const itensIngredientes = receita.ingredientes
            .map(ing => `<li onclick="this.classList.toggle('riscado')">⬜ ${ing}</li>`)
            .join('');

        const passosPreparo = receita.preparo
            .map(passo => `<li>${passo}</li>`)
            .join('');

        artigo.innerHTML = `
            <span class="badge-categoria">${receita.categoria}</span>
            <h2>${receita.titulo}</h2>
            <div class="meta-info">
                <span>⏱️ Preparo: ${receita.tempo}</span>
                <span>📅 ${receita.data}</span>
            </div>
            <img src="${receita.imagem}" alt="${receita.titulo}" class="receita-img">
            <p>${receita.descricao}</p>
            <h3>Ingredientes <small style="font-weight:normal; font-size:0.8rem; color:#888;">(clique para marcar)</small></h3>
            <ul class="lista-ingredientes">${itensIngredientes}</ul>
            <h3>Modo de Preparo</h3>
            <ol>${passosPreparo}</ol>
        `;

        containerReceitas.appendChild(artigo);
    });
}

// Evento de Busca em tempo real
campoBusca.addEventListener('input', (e) => {
    termoBusca = e.target.value;
    renderizarReceitas();
});

// Eventos de Filtro por Categoria (Nav e Sidebar)
document.querySelectorAll('[data-categoria]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        categoriaAtual = e.target.getAttribute('data-categoria');

        // Atualiza destaque no menu superior
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('ativo'));
        const linkNav = document.querySelector(`.nav-links a[data-categoria="${categoriaAtual}"]`);
        if (linkNav) linkNav.classList.add('ativo');

        renderizarReceitas();
    });
});

// Controle do Modal de Nova Receita
document.getElementById('btn-nova-receita').addEventListener('click', () => {
    modal.classList.remove('oculto');
});

document.getElementById('btn-fechar-modal').addEventListener('click', () => {
    modal.classList.add('oculto');
});

// Salvar Nova Receita
formReceita.addEventListener('submit', (e) => {
    e.preventDefault();

    const imagemInput = document.getElementById('imagem').value.trim();
    const novaReceita = {
        id: Date.now(),
        titulo: document.getElementById('titulo').value,
        categoria: document.getElementById('categoria').value,
        tempo: document.getElementById('tempo').value,
        data: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
        imagem: imagemInput || "https://unsplash.com",
        descricao: document.getElementById('descricao').value,
        ingredientes: document.getElementById('ingredientes').value.split('\n').filter(line => line.trim() !== ''),
        preparo: document.getElementById('preparo').value.split('\n').filter(line => line.trim() !== '')
    };

    receitas.unshift(novaReceita);
    localStorage.setItem('blog_receitas', JSON.stringify(receitas));

    formReceita.reset();
    modal.classList.add('oculto');
    renderizarReceitas();
});

// Inicializa o blog
renderizarReceitas();
