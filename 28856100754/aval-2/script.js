
// MINI FEED - JAVASCRIPT PURO

const posts = [];

function criarPost(usuario, mensagem) {
    const post = {
        id: Date.now(),
        usuario,
        mensagem,
        curtidas: 0,
        comentarios: []
    };

    posts.unshift(post);
    console.log("✅ Publicação criada!");
    mostrarFeed();
}

function curtirPost(id) {
    const post = posts.find(p => p.id === id);

    if (post) {
        post.curtidas++;
        mostrarFeed();
    }
}

function comentarPost(id, comentario) {
    const post = posts.find(p => p.id === id);

    if (post) {
        post.comentarios.push(comentario);
        mostrarFeed();
    }
}

function mostrarFeed() {
    console.clear();

    console.log("========== MINI FEED ==========");

    posts.forEach(post => {
        console.log(`👤 ${post.usuario}`);
        console.log(`📝 ${post.mensagem}`);
        console.log(`❤️ Curtidas: ${post.curtidas}`);
        console.log("💬 Comentários:");

        post.comentarios.forEach(comentario => {
            console.log(`- ${comentario}`);
        });

        console.log("------------------------------");
    });
}

// PUBLICAÇÕES DE EXEMPLO

criarPost("Ana", "Olá! Estou aprendendo JavaScript 🚀");
criarPost("Pedro", "JavaScript é incrível!");
criarPost("Maria", "Hoje aprendi sobre funções!");

// INTERAÇÕES

curtirPost(posts[0].id);

comentarPost(
    posts[0].id,
    "Muito legal! Continue aprendendo!"
);

// EXIBIR FEED FINAL

mostrarFeed();
