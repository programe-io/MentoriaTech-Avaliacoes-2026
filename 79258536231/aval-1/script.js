// =========================================
// 1. CONTEÚDO COMPLETO DOS ARTIGOS (Simulando um banco de dados)
// =========================================
const artigosCompletos = [
    {
        id: 0,
        categoria: "dvds",
        titulo: "Do Tocantins para o Brasil: a força dos projetos ao vivo da dupla",
        data: "13 de Novembro de 2026",
        texto: `
            <p>Desde os primeiros registros em Palmas até os grandes estádios lotados pelo país, Henrique & Juliano construíram uma identidade única no sertanejo.</p>
            <br>
            <p>O grande diferencial da dupla sempre foi apostar em repertórios escolhidos a dedo, priorizando letras que falam diretamente sobre sentimentos reais, sem depender apenas de fórmulas comerciais passageiras. Projetos como "Ao Vivo em Brasília" e "Manifesto Musical" provaram que o público abraça cada faixa como um hino.</p>
        `
    },
    {
        id: 1,
        categoria: "letras",
        titulo: "10 modões e sofrências de Henrique & Juliano que não saem da minha playlist",
        data: "04 de Novembro de 2026",
        texto: `
            <p>Escolher apenas dez músicas da discografia dos irmãos é uma tarefa difícil, mas algumas faixas marcaram gerações e não podem faltar em nenhuma roda de violão:</p>
            <br>
            <ul style="margin-left: 20px; line-height: 1.8;">
                <li>1. Cuida Bem Dela</li>
                <li>2. Liberdade Provisória</li>
                <li>3. Aquela Pessoa</li>
                <li>4. Vidinha de Balada</li>
                <li>5. Arranhão</li>
                <li>6. Recaídas</li>
                <li>7. Na Hora da Raiva</li>
                <li>8. Flor e o Beija-Flor</li>
                <li>9. Evento Cancelado</li>
                <li>10. Traumatizei</li>
            </ul>
        `
    },
    {
        id: 2,
        categoria: "shows",
        titulo: "Minha experiência na grade: a emoção de ouvir a multidão cantar em coro",
        data: "22 de Outubro de 2026",
        texto: `
            <p>Chegar cedo para garantir um lugar na grade vale cada minuto de espera quando as luzes do palco se apagam e os primeiros acordes começam.</p>
            <br>
            <p>O que mais impressiona em um show de Henrique & Juliano é ver milhares de pessoas cantando tão alto que, em vários momentos, a dupla apenas abaixa o microfone e deixa a plateia conduzir a música inteira.</p>
        `
    }
];

// =========================================
// 2. FRASES E TRECHOS ALEATÓRIOS PARA O WIDGET
// =========================================
const trechosMusicas = [
    { musica: "Aquela Pessoa", letra: '"Porque tem sempre aquela pessoa que até quando tá longe é perto..."' },
    { musica: "Na Hora da Raiva", letra: '"Eu só não vou te esquecer porque não dá para apagar o que ficou marcado..."' },
    { musica: "Liberdade Provisória", letra: '"No início foi assim, terminou tá terminado, cada um pro seu lado..."' },
    { musica: "Arranhão", letra: '"E se for pra voltar, que seja pra ficar, não passa na minha vida só pra bagunçar..."' },
    { musica: "Cuida Bem Dela", letra: '"Você não conhece ela, mas ela conhece você..."' }
];

// =========================================
// INICIALIZAÇÃO QUANDO A PÁGINA CARREGAR
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    configurarModalLeitura();
    configurarFiltroMenu();
    configurarWidgetTrechos();
    adicionarBotoesCurtir();
});

// =========================================
// 3. ABRIR ARTIGO COMPLETO EM JANELA (MODAL)
// =========================================
function configurarModalLeitura() {
    // Cria a estrutura do modal dinamicamente no HTML
    const modalHTML = `
        <div id="modal-artigo" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:1000; justify-content:center; align-items:center; padding:20px;">
            <div style="background:#1c1c20; border:1px solid #d4af37; border-radius:10px; max-width:650px; width:100%; padding:2rem; position:relative; color:#f8f8f2; max-height:85vh; overflow-y:auto;">
                <button id="fechar-modal" style="position:absolute; top:15px; right:20px; background:none; border:none; color:#d4af37; font-size:1.5rem; cursor:pointer;">&times;</button>
                <span id="modal-data" style="color:#d4af37; font-size:0.85rem; font-weight:bold; text-transform:uppercase;"></span>
                <h2 id="modal-titulo" style="margin:0.5rem 0 1.2rem 0; color:#fff;"></h2>
                <div id="modal-corpo" style="color:#b8b8c2; line-height:1.7;"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modal = document.getElementById("modal-artigo");
    const botoesLer = document.querySelectorAll(".btn-ler");

    botoesLer.forEach((botao, index) => {
        botao.addEventListener("click", (e) => {
            e.preventDefault();
            const artigo = artigosCompletos[index];
            if (artigo) {
                document.getElementById("modal-data").textContent = artigo.data;
                document.getElementById("modal-titulo").textContent = artigo.titulo;
                document.getElementById("modal-corpo").innerHTML = artigo.texto;
                modal.style.display = "flex";
            }
        });
    });

    // Fechar no X ou clicando fora
    document.getElementById("fechar-modal").addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
}

// =========================================
// 4. FILTRAR POSTS PELO MENU DE NAVEGAÇÃO
// =========================================
function configurarFiltroMenu() {
    const linksMenu = document.querySelectorAll("nav a");
    const cards = document.querySelectorAll(".post-card");

    linksMenu.forEach((link) => {
        link.addEventListener("click", (e) => {
            const destino = link.getAttribute("href").replace("#", "");
            
            // Ignora o link "sobre" para rolar normalmente até a barra lateral
            if (destino === "sobre") return;

            e.preventDefault();

            cards.forEach((card, index) => {
                const categoriaPost = artigosCompletos[index]?.categoria;
                if (destino === "inicio" || categoriaPost === destino) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

// =========================================
// 5. BOTÃO DE TROCAR TRECHO NO WIDGET LATERAL
// =========================================
function configurarWidgetTrechos() {
    const boxDestaque = document.querySelector(".musica-destaque");
    if (!boxDestaque) return;

    const btnTrocar = document.createElement("button");
    btnTrocar.textContent = "↻ Outro trecho";
    btnTrocar.style.cssText = "margin-top:0.8rem; background:#7a1c27; color:#fff; border:none; padding:0.4rem 0.8rem; border-radius:4px; cursor:pointer; font-size:0.8rem; font-weight:bold;";

    btnTrocar.addEventListener("click", () => {
        const sorteado = trechosMusicas[Math.floor(Math.random() * trechosMusicas.length)];
        const paragrafos = boxDestaque.querySelectorAll("p");
        paragrafos[0].textContent = `"${sorteado.musica}"`;
        paragrafos[1].textContent = sorteado.letra;
    });

    boxDestaque.appendChild(btnTrocar);
}

// =========================================
// 6. BOTÃO DE CURTIR NOS POSTS
// =========================================
function adicionarBotoesCurtir() {
    const conteudosPosts = document.querySelectorAll(".post-content");

    conteudosPosts.forEach((post) => {
        let curtidas = Math.floor(Math.random() * 20) + 5; // Número inicial ilustrativo
        const btnCurtir = document.createElement("button");
        btnCurtir.innerHTML = `❤️ Curtir (${curtidas})`;
        btnCurtir.style.cssText = "margin-left:10px; background:#25252b; color:#e1e1e6; border:1px solid #3a3a42; padding:0.6rem 1rem; border-radius:5px; cursor:pointer; font-size:0.9rem; font-weight:bold;";

        let curtiu = false;
        btnCurtir.addEventListener("click", () => {
            if (!curtiu) {
                curtidas++;
                curtiu = true;
                btnCurtir.style.borderColor = "#d4af37";
                btnCurtir.style.color = "#d4af37";
            } else {
                curtidas--;
                curtiu = false;
                btnCurtir.style.borderColor = "#3a3a42";
                btnCurtir.style.color = "#e1e1e6";
            }
            btnCurtir.innerHTML = `❤️ Curtir (${curtidas})`;
        });

        post.appendChild(btnCurtir);
    });
}
