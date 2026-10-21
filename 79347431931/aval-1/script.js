'use strict';

const $ = (id) => document.getElementById(id);

function criarElemento(tag, classe, texto) {
    const el = document.createElement(tag);
    if (classe) {
        el.className = classe;
    }

    if (texto !== undefined && texto !== null) {
        el.textContent = String(texto);
    }
    return el;
}

function lerLocal(chave) {
    try {
        return localStorage.getItem(chave);
    } catch (e) {
        return null;
    }
}

function salvarLocal(chave, valor) {
    try {
        localStorage.setItem(chave, valor);
    } catch (e) {}
}

function mensagemDeErro(error) {
    const texto = error && error.message ? String(error.message) : String(error);
    if (texto.toLowerCase().includes('permission_denied')) {
        return 'o banco de dados recusou a operação (permission_denied). ' +
               'Se estiver testando localmente, confira o App Check.';
    }
    return texto;
}

const TEMAS = {
    verde: {
        nome: 'Verde',
        confete: ['#00ff00', '#39ff14', '#00b300'],
        skin: null
    },
    vermelho: {
        nome: 'Vermelho',
        confete: ['#ff0000', '#ff2a2a', '#b00000'],
        skin: 'skins/Little_red_thing.wsz'
    }
};

let webampInstance = null;

function temaAtual() {
    return document.documentElement.dataset.tema || 'verde';
}

function aplicarTema(nome) {
    if (!TEMAS[nome]) {
        nome = 'verde';
    }

    document.documentElement.dataset.tema = nome;

    document.querySelectorAll('.btn-tema').forEach((botao) => {
        botao.classList.toggle('ativo', botao.dataset.temaOpcao === nome);
    });

    salvarLocal('temaBlog', nome);

    if (webampInstance && TEMAS[nome].skin) {
        try {
            webampInstance.setSkinFromUrl(TEMAS[nome].skin);
        } catch (e) {
            console.log('Não foi possível trocar a skin:', e);
        }
    }
}

const listaPalavroes = [
    "porra", "caralho", "merda", "buceta", "puta", "putinha", "puto",
    "putaria", "piroca", "cacete", "arrombado", "arrombada", "viado",
    "cuzao", "fdp", "vsf", "desgraca", "otario", "idiota",
    "imbecil"
];

function normalizar(texto) {
    return String(texto)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[@4]/g, 'a')
        .replace(/3/g, 'e')
        .replace(/1/g, 'i')
        .replace(/0/g, 'o')
        .replace(/\$/g, 's')
        .replace(/(.)\1+/g, '$1');
}

const palavroesNormalizados = [...new Set(listaPalavroes.map(normalizar))];

const regexPalavroes = new RegExp(
    '\\b(' + palavroesNormalizados.join('|') + ')s?\\b',
    'i'
);

function contemPalavrao(texto) {
    const base = normalizar(texto);
    const semSeparadores = base.replace(/[.\-_*]/g, '');
    return regexPalavroes.test(base) || regexPalavroes.test(semSeparadores);
}

const playlist = [
    {
        titulo: 'Desireless - Voyage Voyage',
        arquivo: 'https://ia600602.us.archive.org/11/items/ytdown.com-you-tube-desireless-voyage-voyage-official-hd-vid-media-nlgm-h-5q-9u-nk-008-128k/YTDown.com_YouTube_Desireless-Voyage-Voyage-Official-HD-Vid_Media_NlgmH5q9uNk_008_128k.mp3'
    },
    {
        titulo: 'Evanescence - Bring Me To Life',
        arquivo: 'https://ia601809.us.archive.org/25/items/ytdown.com-you-tube-evanescence-bring-me-to-life-official-hd-media-3-yxaa-gg-tqym-009-128k/YTDown.com_YouTube_Evanescence-Bring-Me-To-Life-Official-HD_Media_3YxaaGgTQYM_009_128k.mp3'
    },
    {
        titulo: 'Sheryl Crow - Real Gone',
        arquivo: 'https://ia601401.us.archive.org/34/items/ytdown.com-you-tube-real-gone-by-sheryl-crow-from-the-cars-s-media-62-vjm-0-ugfv-8-009-128k/YTDown.com_YouTube_Real-Gone-by-Sheryl-Crow-from-the-Cars-S_Media_62Vjm0UGfv8_009_128k.mp3'
    },
    { titulo: 'Melanie Martinez - The Vatican', arquivo: 'musicas/melanie-vatican.mp3' },
    { titulo: 'Muse - Supermassive Black Hole', arquivo: 'musicas/muse-supermassive.mp3' },
    { titulo: 'Winx Club - Superheroes', arquivo: 'musicas/winx-superheroes.mp3' },
    { titulo: 'EMAEL - BEATS', arquivo: 'musicas/emael-beats.mp3' }
];

function separarArtistaTitulo(texto) {
    const partes = texto.split(' - ');
    if (partes.length > 1) {
        return { artist: partes[0], title: partes.slice(1).join(' - ') };
    }
    return { artist: '', title: texto };
}

function iniciarWebamp() {
    const container = $('winamp-container');

    if (!window.Webamp || !window.Webamp.browserIsSupported()) {
        container.textContent = '⚠ Seu navegador não suporta o player.';
        return;
    }

    const skinInicial = TEMAS[temaAtual()].skin || TEMAS.vermelho.skin;

    webampInstance = new window.Webamp({
        initialTracks: playlist.map((faixa) => ({
            metaData: separarArtistaTitulo(faixa.titulo),
            url: faixa.arquivo
        })),
        initialSkin: { url: skinInicial },
        windowLayout: {
            main: { position: { top: 0, left: 0 } },
            equalizer: { position: { top: 116, left: 0 } },
            playlist: { position: { top: 232, left: 0 } }
        }
    });

    webampInstance.renderWhenReady(container);
}

const firebaseConfig = {
    apiKey: "AIzaSyA0i21JOhytjg-H7BvTmgIx4szqDnT7PJM",
    authDomain: "feed-6ba83.firebaseapp.com",
    databaseURL: "https://feed-6ba83-default-rtdb.firebaseio.com",
    projectId: "feed-6ba83",
    storageBucket: "feed-6ba83.firebasestorage.app",
    messagingSenderId: "517311621726",
    appId: "1:517311621726:web:dece3f93272688660b62cf",
    measurementId: "G-QMPF899YQS"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const auth = firebase.auth();

auth.signInAnonymously().catch((error) => {
    console.log('Erro ao autenticar:', error);
});

let ouvindoPostagens = false;

auth.onAuthStateChanged((user) => {
    if (user) {
        carregarPostagens();
    }
});

function avisarCarregando() {
    alert('Ainda carregando, aguarde um segundo e tente de novo.');
}

function alternarAdmin() {
    const painel = $('adminPanel');
    painel.hidden = !painel.hidden;
    $('btnAdminToggle').setAttribute('aria-expanded', String(!painel.hidden));
}

function carregarPostagens() {
    if (ouvindoPostagens) {
        return;
    }
    ouvindoPostagens = true;

    db.ref('posts').on('value', (snapshot) => {
        renderizarPostagens(snapshot.val() || {});
    }, (error) => {
        ouvindoPostagens = false;
        console.log('Erro ao carregar postagens:', error);
        mostrarAviso('⚠ Não foi possível carregar as postagens. Recarregue a página.');
    });
}

function mostrarAviso(texto) {
    const coluna = $('blogPostsColumn');
    coluna.replaceChildren(criarElemento('div', 'post post-aviso', texto));
}

function renderizarPostagens(dados) {
    const coluna = $('blogPostsColumn');
    const meuUid = auth.currentUser ? auth.currentUser.uid : null;

    const entradas = Object.entries(dados).reverse();

    if (entradas.length === 0) {
        mostrarAviso('Nenhuma postagem ainda. Abra o painel e faça a primeira!');
        return;
    }

    coluna.replaceChildren();
    entradas.forEach(([idPost, post]) => {
        coluna.appendChild(criarElementoPost(idPost, post, meuUid));
    });
}

function criarElementoPost(idPost, post, meuUid) {
    const curtidas = Number(post.curtidas || 0);
    const jaCurtiu = Boolean(meuUid && post.curtidoPor && post.curtidoPor[meuUid] === true);
    const ehMeuPost = Boolean(meuUid && post.autor === meuUid);

    const postEl = criarElemento('article', 'post');
    postEl.appendChild(criarElemento('div', 'post-title', post.titulo));
    postEl.appendChild(criarElemento('div', 'date', post.data));
    postEl.appendChild(criarElemento('p', 'post-conteudo', post.conteudo));

    const acoes = criarElemento('div', 'post-acoes');

    const btnCurtir = criarElemento('button', 'retro-button btn-curtir');
    btnCurtir.type = 'button';

    if (jaCurtiu) {
        btnCurtir.disabled = true;
        btnCurtir.textContent = '✅ Já Curtiu (' + curtidas + ')';
    } else {
        btnCurtir.textContent = '🔥 Curtir (' + curtidas + ')';

        btnCurtir.addEventListener('click', () => curtirPost(idPost));
    }
    acoes.appendChild(btnCurtir);

    if (ehMeuPost) {
        const btnExcluir = criarElemento('button', 'retro-button btn-excluir', '❌ Excluir');
        btnExcluir.type = 'button';
        btnExcluir.addEventListener('click', () => excluirPost(idPost));
        acoes.appendChild(btnExcluir);
    }

    postEl.appendChild(acoes);
    return postEl;
}

const COOLDOWN_MS = 30000;

function segundosParaPostarDeNovo() {
    const ultimoPost = Number(lerLocal('ultimoPostTimestamp'));
    if (!ultimoPost) {
        return 0;
    }
    const faltam = COOLDOWN_MS - (Date.now() - ultimoPost);
    return faltam > 0 ? Math.ceil(faltam / 1000) : 0;
}

function formatarDataAtual() {
    const agora = new Date();

    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const ano = agora.getFullYear();
    const hora = String(agora.getHours()).padStart(2, '0');
    const minuto = String(agora.getMinutes()).padStart(2, '0');

    return 'Postado em: ' + dia + '/' + mes + '/' + ano + ' às ' + hora + ':' + minuto;
}

function adicionarPostagem() {
    const user = auth.currentUser;
    if (!user) {
        avisarCarregando();
        return;
    }

    const espera = segundosParaPostarDeNovo();
    if (espera > 0) {
        alert('Aguarde ' + espera + ' segundos antes de postar de novo.');
        return;
    }

    const titulo = $('postTitleInput').value.trim();
    const conteudo = $('postContentInput').value.trim();

    if (titulo === '' || conteudo === '') {
        alert('Preencha o título e o conteúdo da postagem!');
        return;
    }

    if (contemPalavrao(titulo) || contemPalavrao(conteudo)) {
        alert('Sua postagem contém palavras não permitidas. Ajuste o texto e tente novamente.');
        return;
    }

    const botao = $('btnPublicar');
    botao.disabled = true;

    const novoId = db.ref('posts').push().key;

    const atualizacoes = {};
    atualizacoes['posts/' + novoId] = {
        titulo: titulo,
        data: formatarDataAtual(),
        conteudo: conteudo,
        curtidas: 0,
        autor: user.uid
    };
    atualizacoes['ratelimit/' + user.uid] = firebase.database.ServerValue.TIMESTAMP;

    db.ref().update(atualizacoes)
        .then(() => {
            salvarLocal('ultimoPostTimestamp', Date.now());
            $('postTitleInput').value = '';
            $('postContentInput').value = '';
        })
        .catch((error) => {
            alert('Não foi possível publicar: ' + mensagemDeErro(error));
            console.log('Erro ao publicar post:', error);
        })
        .finally(() => {
            botao.disabled = false;
        });
}

function curtirPost(idPost) {
    const user = auth.currentUser;
    if (!user) {
        avisarCarregando();
        return;
    }

    const uid = user.uid;

    db.ref('posts/' + idPost).transaction((post) => {
        if (post === null) {
            return;
        }

        if (!post.curtidoPor) {
            post.curtidoPor = {};
        }

        if (post.curtidoPor[uid]) {
            return;
        }

        post.curtidas = Number(post.curtidas || 0) + 1;
        post.curtidoPor[uid] = true;

        return post;
    })
    .then((resultado) => {
        if (!resultado.committed) {
            console.log('Curtida não aplicada (já curtido ou post removido).');
        }
    })
    .catch((error) => {
        alert('Não foi possível curtir: ' + mensagemDeErro(error));
        console.log('Erro ao curtir post:', error);
    });
}

function excluirPost(idPost) {
    const user = auth.currentUser;
    if (!user) {
        avisarCarregando();
        return;
    }

    const postRef = db.ref('posts/' + idPost);

    postRef.once('value')
        .then((snapshot) => {
            const post = snapshot.val();

            if (!post) {
                alert('Essa postagem não existe mais.');
                return;
            }

            if (post.autor !== user.uid) {
                alert('Você só pode excluir suas próprias postagens.');
                return;
            }

            if (confirm('Tem certeza que deseja excluir a sua postagem?')) {
                return postRef.remove();
            }
        })
        .catch((error) => {
            alert('Não foi possível excluir: ' + mensagemDeErro(error));
            console.log('Erro ao excluir post:', error);
        });
}

const INTERVALO_MINIMO_CONFETE_MS = 40;
const prefereMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
let ultimoConfeteEm = 0;

function criarConfete(x, y) {
    const confete = criarElemento('div', 'confete');

    const cores = TEMAS[temaAtual()].confete;
    const tamanho = Math.random() * 6 + 4;
    const cor = cores[Math.floor(Math.random() * cores.length)];

    confete.style.left = x + 'px';
    confete.style.top = y + 'px';
    confete.style.width = tamanho + 'px';
    confete.style.height = tamanho + 'px';
    confete.style.backgroundColor = cor;
    confete.style.borderRadius = Math.random() > 0.5 ? '0' : '50%';

    const desvioX = (Math.random() - 0.5) * 40;
    const quedaY = Math.random() * 50 + 30;
    const rotacao = Math.random() * 360;

    document.body.appendChild(confete);

    setTimeout(() => {
        confete.style.opacity = '0';
        confete.style.transform =
            'translate(' + desvioX + 'px, ' + quedaY + 'px) rotate(' + rotacao + 'deg)';
    }, 50);

    setTimeout(() => confete.remove(), 750);
}

document.addEventListener('mousemove', (e) => {
    if (prefereMenosMovimento.matches) {
        return;
    }

    const agora = Date.now();
    if (agora - ultimoConfeteEm < INTERVALO_MINIMO_CONFETE_MS) {
        return;
    }
    ultimoConfeteEm = agora;

    criarConfete(e.clientX, e.clientY);
});

aplicarTema(lerLocal('temaBlog') || 'verde');

$('btnAdminToggle').addEventListener('click', alternarAdmin);
$('btnPublicar').addEventListener('click', adicionarPostagem);

document.querySelectorAll('.btn-tema').forEach((botao) => {
    botao.addEventListener('click', () => aplicarTema(botao.dataset.temaOpcao));
});

iniciarWebamp();