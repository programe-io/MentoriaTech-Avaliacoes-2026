const artigos = {
    1: {
        titulo: "Aprender a valorizar a própria companhia",
        texto: `A relação que construímos conosco merece atenção.

        Aprender a aproveitar a própria companhia não significa
        deixar de valorizar as outras pessoas. Significa reconhecer
        que também podemos encontrar tranquilidade em nossos
        próprios momentos.

        Reserve um tempo para seus interesses, descubra novas
        atividades e respeite suas necessidades.

        A autoestima não precisa depender da aprovação de outras
        pessoas. Ela também se desenvolve por meio do respeito,
        do autoconhecimento e da aceitação.

        Lembre-se: você merece cuidado em todas as fases da vida.`
    },

    2: {
        titulo: "A importância de respeitar o próprio tempo",
        texto: `Vivemos em uma sociedade que frequentemente
        valoriza a produtividade e a pressa.

        Entretanto, cada pessoa possui sua própria trajetória.
        Comparar seu desenvolvimento com o de outras pessoas
        pode gerar cobranças desnecessárias.

        Descansar, mudar de planos e reconhecer limites também
        fazem parte de uma rotina equilibrada.

        Não transforme o autocuidado em mais uma obrigação.
        Ele deve ser um espaço de respeito e acolhimento.`
    },

    3: {
        titulo: "Conhecer a si mesma é um ato de cuidado",
        texto: `O autoconhecimento é um processo contínuo.

        Identificar sentimentos, compreender necessidades e
        reconhecer limites são atitudes que ajudam a construir
        relações mais saudáveis consigo e com os outros.

        Você pode começar com pequenas reflexões:
        O que me faz bem?
        O que gostaria de aprender?
        Quais limites preciso respeitar?

        Não existe uma resposta definitiva. Conhecer a si mesma
        é permitir-se descobrir e mudar ao longo do caminho.`
    }
};


// ABRIR ARTIGO

function abrirArtigo(numero) {

    const artigo = artigos[numero];

    document.getElementById("tituloLeitura").textContent =
        artigo.titulo;

    document.getElementById("textoLeitura").textContent =
        artigo.texto;

    const leitura = document.getElementById("leitura");

    leitura.hidden = false;

    leitura.scrollIntoView({
        behavior: "smooth"
    });
}


// FECHAR ARTIGO

function fecharArtigo() {

    document.getElementById("leitura").hidden = true;

    document.getElementById("artigos").scrollIntoView({
        behavior: "smooth"
    });
}


// FAVORITOS

function favoritar(botao) {

    botao.classList.toggle("salvo");

    if (botao.classList.contains("salvo")) {
        botao.textContent = "♥ Salvo";
    } else {
        botao.textContent = "♡ Salvar";
    }
}


// PROGRESSO DA ROTINA

const caixas = document.querySelectorAll(
    '.lista-rotina input[type="checkbox"]'
);

function atualizarProgresso() {

    const concluidas = document.querySelectorAll(
        '.lista-rotina input:checked'
    ).length;

    document.getElementById("progresso").textContent =
        `${concluidas} de ${caixas.length} atividades concluídas.`;
}

caixas.forEach(caixa => {
    caixa.addEventListener("change", atualizarProgresso);
});


// MODO CLARO E ESCURO

const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("click", function() {

    document.body.classList.toggle("claro");

    if (document.body.classList.contains("claro")) {
        botaoTema.textContent = "☀";
    } else {
        botaoTema.textContent = "☾";
    }
});


// FORMULÁRIO DE CONTATO

document.getElementById("formContato").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();

        document.getElementById("retorno").textContent =
            `Obrigado pela atenção! Este formulário é demonstrativo.`;

        this.reset();
    }
);