// =============================================
// AMORPET - SISTEMA DE ADOÇÃO
// =============================================

// =============================================
// LISTA DE ANIMAIS
// =============================================

const animais = [

{
    id: 1,
    nome: "Thor",
    especie: "Cachorro",
    raca: "Golden Retriever",
    idade: "2 anos",
    idadeNumero: 2,
    sexo: "Macho",
    porte: "Grande",
    cidade: "Teresina - PI",
    emoji: "🐕",
    descricao:
        "Thor é um cachorro carinhoso, brincalhão e muito companheiro. Adora correr e brincar com crianças.",
    vacinado: true,
    castrado: true,
    vermifugado: true
},

{
    id: 2,
    nome: "Luna",
    especie: "Gato",
    raca: "SRD",
    idade: "1 ano",
    idadeNumero: 1,
    sexo: "Fêmea",
    porte: "Pequeno",
    cidade: "Teresina - PI",
    emoji: "🐈",
    descricao:
        "Luna é tranquila, carinhosa e gosta de receber carinho. É ideal para apartamentos.",
    vacinado: true,
    castrado: true,
    vermifugado: true
},

{
    id: 3,
    nome: "Max",
    especie: "Cachorro",
    raca: "Labrador",
    idade: "4 anos",
    idadeNumero: 4,
    sexo: "Macho",
    porte: "Grande",
    cidade: "Timon - MA",
    emoji: "🐕‍🦺",
    descricao:
        "Max é muito dócil e inteligente. Gosta de passeios e de ficar perto das pessoas.",
    vacinado: true,
    castrado: false,
    vermifugado: true
},

{
    id: 4,
    nome: "Mel",
    especie: "Cachorro",
    raca: "Pinscher",
    idade: "3 anos",
    idadeNumero: 3,
    sexo: "Fêmea",
    porte: "Pequeno",
    cidade: "Teresina - PI",
    emoji: "🐶",
    descricao:
        "Mel é pequena, alegre e muito companheira. Procura uma família que possa lhe dar bastante carinho.",
    vacinado: true,
    castrado: true,
    vermifugado: true
},

{
    id: 5,
    nome: "Simba",
    especie: "Gato",
    raca: "Siamês",
    idade: "8 meses",
    idadeNumero: 0.7,
    sexo: "Macho",
    porte: "Pequeno",
    cidade: "Teresina - PI",
    emoji: "🐱",
    descricao:
        "Simba é um gatinho curioso, brincalhão e cheio de energia. Adora brinquedos e carinho.",
    vacinado: true,
    castrado: false,
    vermifugado: true
},

{
    id: 6,
    nome: "Nina",
    especie: "Coelho",
    raca: "Mini Lop",
    idade: "1 ano",
    idadeNumero: 1,
    sexo: "Fêmea",
    porte: "Pequeno",
    cidade: "Teresina - PI",
    emoji: "🐰",
    descricao:
        "Nina é uma coelhinha tranquila e dócil. Precisa de um ambiente seguro e confortável.",
    vacinado: false,
    castrado: true,
    vermifugado: true
},

{
    id: 7,
    nome: "Bob",
    especie: "Cachorro",
    raca: "Beagle",
    idade: "5 anos",
    idadeNumero: 5,
    sexo: "Macho",
    porte: "Médio",
    cidade: "Altos - PI",
    emoji: "🐶",
    descricao:
        "Bob é alegre e muito amigável. Gosta de passeios, brincadeiras e companhia.",
    vacinado: true,
    castrado: true,
    vermifugado: true
},

{
    id: 8,
    nome: "Mia",
    especie: "Gato",
    raca: "SRD",
    idade: "2 anos",
    idadeNumero: 2,
    sexo: "Fêmea",
    porte: "Pequeno",
    cidade: "Teresina - PI",
    emoji: "🐈",
    descricao:
        "Mia é uma gata carinhosa e independente. Perfeita para quem procura uma companheira tranquila.",
    vacinado: true,
    castrado: true,
    vermifugado: true
},

{
    id: 9,
    nome: "Zeus",
    especie: "Cachorro",
    raca: "Pastor Alemão",
    idade: "3 anos",
    idadeNumero: 3,
    sexo: "Macho",
    porte: "Grande",
    cidade: "Teresina - PI",
    emoji: "🐕",
    descricao:
        "Zeus é protetor, inteligente e muito leal. Precisa de espaço para brincar e se exercitar.",
    vacinado: true,
    castrado: true,
    vermifugado: true
}


];

// =============================================
// ELEMENTOS
// =============================================

const listaAnimais =
document.getElementById(
"listaAnimais"
);

const pesquisa =
document.getElementById(
"pesquisa"
);

const filtroEspecie =
document.getElementById(
"filtroEspecie"
);

const filtroPorte =
document.getElementById(
"filtroPorte"
);

const semResultados =
document.getElementById(
"semResultados"
);

const modal =
document.getElementById(
"modal"
);

const conteudoModal =
document.getElementById(
"conteudoModal"
);

// =============================================
// MOSTRAR TOTAL
// =============================================

document.getElementById(
"totalAnimais"
).textContent = animais.length;

// =============================================
// CRIAR TAGS DE SAÚDE
// =============================================

function criarTags(animal) {

let tags = "";


if (animal.vacinado) {

    tags += `
        <span class="tag-saude">
            ✓ Vacinado
        </span>
    `;

}


if (animal.castrado) {

    tags += `
        <span class="tag-saude">
            ✓ Castrado
        </span>
    `;

}


if (animal.vermifugado) {

    tags += `
        <span class="tag-saude">
            ✓ Vermifugado
        </span>
    `;

}


return tags;


}

// =============================================
// MOSTRAR ANIMAIS
// =============================================

function mostrarAnimais() {

listaAnimais.innerHTML = "";


const texto =
    pesquisa.value
        .toLowerCase()
        .trim();


const especie =
    filtroEspecie.value;


const porte =
    filtroPorte.value;


const filtrados =
    animais.filter(animal => {

        const encontrouTexto =

            animal.nome
                .toLowerCase()
                .includes(texto)

            ||

            animal.raca
                .toLowerCase()
                .includes(texto)

            ||

            animal.cidade
                .toLowerCase()
                .includes(texto);


        const encontrouEspecie =

            especie === "Todos" ||
            animal.especie === especie;


        const encontrouPorte =

            porte === "Todos" ||
            animal.porte === porte;


        return (
            encontrouTexto &&
            encontrouEspecie &&
            encontrouPorte
        );

    });


// Nenhum resultado

if (filtrados.length === 0) {

    semResultados.classList.add(
        "mostrar"
    );

} else {

    semResultados.classList.remove(
        "mostrar"
    );

}


// Criar cards

filtrados.forEach(animal => {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "animal-card";


    card.innerHTML = `

        <div class="animal-topo">

            <span class="disponivel">
                DISPONÍVEL
            </span>

            <div class="animal-emoji">
                ${animal.emoji}
            </div>

        </div>


        <div class="animal-info">

            <h3>
                ${animal.nome}
            </h3>

            <div class="animal-raca">
                ${animal.raca}
            </div>


            <div class="detalhes">

                <div class="detalhe">
                    🎂 ${animal.idade}
                </div>

                <div class="detalhe">
                    ${animal.sexo === "Macho"
                        ? "♂️"
                        : "♀️"
                    }
                    ${animal.sexo}
                </div>

                <div class="detalhe">
                    🐾 ${animal.porte}
                </div>

                <div class="detalhe">
                    📍 ${animal.cidade}
                </div>

            </div>


            <p class="descricao">
                ${animal.descricao}
            </p>


            <div class="saude">
                ${criarTags(animal)}
            </div>


            <button
                class="btn-adotar"
                onclick="abrirAdocao(${animal.id})"
            >
                ❤️ Quero adotar
            </button>

        </div>

    `;


    listaAnimais.appendChild(card);

});


}

// =============================================
// ABRIR MODAL DE ADOÇÃO
// =============================================

function abrirAdocao(id) {

const animal =
    animais.find(
        item => item.id === id
    );


if (!animal) {
    return;
}


conteudoModal.innerHTML = `

    <div class="modal-animal">

        <div class="emoji">
            ${animal.emoji}
        </div>

        <h2>
            Quero adotar ${animal.nome}
        </h2>

        <p>
            Você está interessado em adotar
            ${animal.nome}, ${animal.idade}?
        </p>

    </div>


    <form
        class="modal-form"
        onsubmit="enviarAdocao(event, ${animal.id})"
    >

        <input
            type="text"
            id="nomeAdotante"
            placeholder="Seu nome completo"
            required
        >

        <input
            type="email"
            id="emailAdotante"
            placeholder="Seu e-mail"
            required
        >

        <input
            type="tel"
            id="telefoneAdotante"
            placeholder="Seu telefone"
            required
        >

        <textarea
            id="motivoAdocao"
            placeholder="Por que você deseja adotar este animal?"
            required
        ></textarea>

        <button
            type="submit"
            class="btn-principal"
        >
            🐾 Enviar pedido de adoção
        </button>

    </form>

`;


modal.classList.add("ativo");


}

// =============================================
// FECHAR MODAL
// =============================================

function fecharModal() {

modal.classList.remove(
    "ativo"
);


}

// =============================================
// ENVIAR ADOÇÃO
// =============================================

function enviarAdocao(event, id) {

event.preventDefault();


const animal =
    animais.find(
        item => item.id === id
    );


const nome =
    document.getElementById(
        "nomeAdotante"
    ).value;


alert(
    `Obrigado, ${nome}! 🐾\n\n` +
    `Seu pedido de adoção para ` +
    `${animal.nome} foi enviado com sucesso.\n\n` +
    `Nossa equipe entrará em contato para ` +
    `continuar o processo de adoção responsável.`
);


fecharModal();


}

// =============================================
// PESQUISA
// =============================================

pesquisa.addEventListener(
"input",
mostrarAnimais
);

// =============================================
// FILTRO ESPÉCIE
// =============================================

filtroEspecie.addEventListener(
"change",
mostrarAnimais
);

// =============================================
// FILTRO PORTE
// =============================================

filtroPorte.addEventListener(
"change",
mostrarAnimais
);

// =============================================
// FORMULÁRIO DE CONTATO
// =============================================

document
.getElementById("formContato")
.addEventListener(
"submit",
function(event) {

        event.preventDefault();


        const nome =
            document.getElementById(
                "nomeContato"
            ).value;


        alert(
            `Obrigado, ${nome}! 💚\n\n` +
            `Sua mensagem foi enviada.`
        );


        this.reset();

    }
);


// =============================================
// FECHAR MODAL CLICANDO FORA
// =============================================

modal.addEventListener(
"click",
function(event) {

    if (event.target === modal) {

        fecharModal();

    }

}


);

// =============================================
// MENU MOBILE
// =============================================

function abrirMenu() {

const nav =
    document.querySelector("nav");


if (
    nav.style.display === "flex"
) {

    nav.style.display = "";

} else {

    nav.style.display = "flex";

    nav.style.flexDirection =
        "column";

    nav.style.position =
        "absolute";

    nav.style.top = "75px";

    nav.style.right = "0";

    nav.style.background =
        "white";

    nav.style.padding =
        "20px";

    nav.style.width =
        "200px";

    nav.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.1)";

}


}

// =============================================
// INICIALIZAÇÃO
// =============================================

mostrarAnimais();