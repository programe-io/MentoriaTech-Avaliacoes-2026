
/* =========================
   NAVEGAÇÃO DO SITE
========================= */
function show(id){
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });

    document.getElementById(id).classList.add('active');
}

/* =========================
   LITURGIA REAL DO DIA
========================= */
async function carregarLiturgia(){
    const el = document.getElementById("liturgiaTexto");

    try {
        let res = await fetch("https://liturgia.up.railway.app/");
        let d = await res.json();

        el.innerHTML = `
        <b>📅 ${d.data}</b><br><br>

        <b>📖 1ª Leitura</b><br>
        ${d.primeiraLeitura.texto}<br><br>

        <b>🎶 Salmo</b><br>
        ${d.salmo.texto}<br><br>

        <b>✝ Evangelho</b><br>
        ${d.evangelho.texto}
        `;
    } catch (e) {
        el.innerText = "❌ Não foi possível carregar a Liturgia do dia.";
    }
}

carregarLiturgia();

/* =========================
   ORAÇÕES COMPLETAS
========================= */
function abrirOracao(tipo){
    let t = "";

    if(tipo === "pai"){
        t = `
        <h2>Pai Nosso</h2>
        Pai nosso que estais no céu,<br>
        santificado seja o vosso nome;<br>
        venha a nós o vosso reino;<br>
        seja feita a vossa vontade,<br>
        assim na terra como no céu.<br><br>

        O pão nosso de cada dia nos dai hoje;<br>
        perdoai-nos as nossas ofensas,<br>
        assim como nós perdoamos a quem nos tem ofendido;<br>
        e não nos deixeis cair em tentação,<br>
        mas livrai-nos do mal.<br><br>

        Amém.
        `;
    }

    if(tipo === "ave"){
        t = `
        <h2>Ave Maria</h2>
        Ave Maria, cheia de graça,<br>
        o Senhor é convosco;<br>
        bendita sois vós entre as mulheres,<br>
        e bendito é o fruto do vosso ventre, Jesus.<br><br>

        Santa Maria, Mãe de Deus,<br>
        rogai por nós, pecadores,<br>
        agora e na hora da nossa morte.<br><br>

        Amém.
        `;
    }

    if(tipo === "credo"){
        t = `
        <h2>Credo</h2>
        Creio em Deus Pai todo-poderoso,<br>
        criador do céu e da terra...<br><br>

        Creio no Espírito Santo,<br>
        na Santa Igreja Católica,<br>
        na comunhão dos santos,<br>
        na remissão dos pecados,<br>
        na ressurreição da carne,<br>
        na vida eterna.<br><br>

        Amém.
        `;
    }

    abrirModal(t);
}

/* =========================
   SANTOS + HISTÓRIA
========================= */
function abrirSanto(nome){
    let t = "";

    switch(nome){

        case "francisco":
            t = `
            <h2>São Francisco de Assis</h2>
            Viveu em pobreza radical e amor profundo por toda a criação.<br><br>
            Fundador da Ordem Franciscana, é símbolo de humildade e paz.
            `;
        break;

        case "teresinha":
            t = `
            <h2>Santa Teresinha do Menino Jesus</h2>
            Conhecida pela "pequena via": fazer pequenas coisas com grande amor.<br><br>
            Doutora da Igreja e padroeira das missões.
            `;
        break;

        case "antonio":
            t = `
            <h2>Santo Antônio de Pádua</h2>
            Grande pregador franciscano e doutor da Igreja.<br><br>
            Conhecido como intercessor dos pobres e objetos perdidos.
            `;
        break;
    }

    abrirModal(t);
}

/* =========================
   VELAS INTERATIVAS
========================= */
function acender(el){
    el.innerHTML = "🔥";

    el.style.transform = "scale(1.3)";
    setTimeout(() => {
        el.style.transform = "scale(1)";
    }, 300);
}

/* =========================
   MODAL
========================= */
function abrirModal(texto){
    document.getElementById("texto").innerHTML = texto;
    document.getElementById("modal").style.display = "block";
}

function fechar(){
    document.getElementById("modal").style.display = "none";
}

/* fechar clicando fora */
window.onclick = function(event){
    let modal = document.getElementById("modal");
    if(event.target === modal){
        modal.style.display = "none";
    }
}