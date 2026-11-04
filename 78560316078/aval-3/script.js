
// ==================================
// MUNDO DAS MOTOS
// CATÁLOGO DE MOTOCICLETAS
// ==================================

// IMAGENS POR CATEGORIA

const imagens = {
    street: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600",
    esportiva: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600",
    trail: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600",
    custom: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600"
};

// LISTA DE MOTOS

const motos = [
    {marca:"Honda", nome:"CG 160 Titan", categoria:"street", preco:22000, cilindrada:"160 cc"},
    {marca:"Honda", nome:"Biz 125", categoria:"street", preco:15000, cilindrada:"125 cc"},
    {marca:"Honda", nome:"Pop 110i", categoria:"street", preco:10000, cilindrada:"110 cc"},
    {marca:"Honda", nome:"PCX 160", categoria:"street", preco:20000, cilindrada:"160 cc"},
    {marca:"Honda", nome:"XRE 300 Sahara", categoria:"trail", preco:30000, cilindrada:"300 cc"},
    {marca:"Honda", nome:"CBR 650R", categoria:"esportiva", preco:55000, cilindrada:"650 cc"},
    {marca:"Honda", nome:"Africa Twin", categoria:"trail", preco:90000, cilindrada:"1100 cc"},

    {marca:"Yamaha", nome:"Factor 150", categoria:"street", preco:16000, cilindrada:"150 cc"},
    {marca:"Yamaha", nome:"Fazer FZ25", categoria:"street", preco:23000, cilindrada:"250 cc"},
    {marca:"Yamaha", nome:"MT-03", categoria:"esportiva", preco:33000, cilindrada:"321 cc"},
    {marca:"Yamaha", nome:"R3", categoria:"esportiva", preco:35000, cilindrada:"321 cc"},
    {marca:"Yamaha", nome:"Lander 250", categoria:"trail", preco:27000, cilindrada:"250 cc"},
    {marca:"Yamaha", nome:"NMAX 160", categoria:"street", preco:22000, cilindrada:"160 cc"},

    {marca:"Kawasaki", nome:"Ninja 400", categoria:"esportiva", preco:35000, cilindrada:"400 cc"},
    {marca:"Kawasaki", nome:"Ninja ZX-6R", categoria:"esportiva", preco:75000, cilindrada:"636 cc"},
    {marca:"Kawasaki", nome:"Z400", categoria:"street", preco:30000, cilindrada:"400 cc"},
    {marca:"Kawasaki", nome:"Versys 650", categoria:"trail", preco:50000, cilindrada:"650 cc"},

    {marca:"Suzuki", nome:"Hayabusa", categoria:"esportiva", preco:120000, cilindrada:"1340 cc"},
    {marca:"Suzuki", nome:"V-Strom 650", categoria:"trail", preco:55000, cilindrada:"650 cc"},

    {marca:"BMW", nome:"G 310 R", categoria:"street", preco:35000, cilindrada:"313 cc"},
    {marca:"BMW", nome:"F 850 GS", categoria:"trail", preco:75000, cilindrada:"853 cc"},
    {marca:"BMW", nome:"S 1000 RR", categoria:"esportiva", preco:130000, cilindrada:"999 cc"},

    {marca:"Ducati", nome:"Monster", categoria:"street", preco:85000, cilindrada:"937 cc"},
    {marca:"Ducati", nome:"Panigale V2", categoria:"esportiva", preco:110000, cilindrada:"955 cc"},
    {marca:"Ducati", nome:"Multistrada V4", categoria:"trail", preco:140000, cilindrada:"1158 cc"},

    {marca:"Harley-Davidson", nome:"Iron 883", categoria:"custom", preco:55000, cilindrada:"883 cc"},
    {marca:"Harley-Davidson", nome:"Street Glide", categoria:"custom", preco:150000, cilindrada:"1923 cc"},

    {marca:"Royal Enfield", nome:"Classic 350", categoria:"custom", preco:23000, cilindrada:"350 cc"},
    {marca:"Royal Enfield", nome:"Meteor 350", categoria:"custom", preco:23000, cilindrada:"350 cc"},
    {marca:"Royal Enfield", nome:"Himalayan 450", categoria:"trail", preco:30000, cilindrada:"450 cc"},

    {marca:"KTM", nome:"Duke 390", categoria:"street", preco:35000, cilindrada:"399 cc"},
    {marca:"KTM", nome:"Adventure 390", categoria:"trail", preco:40000, cilindrada:"399 cc"},

    {marca:"Triumph", nome:"Bonneville T100", categoria:"custom", preco:60000, cilindrada:"900 cc"},
    {marca:"Triumph", nome:"Tiger 900", categoria:"trail", preco:85000, cilindrada:"888 cc"},

    {marca:"Bajaj", nome:"Dominar 400", categoria:"street", preco:26000, cilindrada:"373 cc"},
    {marca:"Benelli", nome:"TRK 502", categoria:"trail", preco:35000, cilindrada:"500 cc"},
    {marca:"Dafra", nome:"NH 300", categoria:"trail", preco:25000, cilindrada:"300 cc"},
    {marca:"Shineray", nome:"SHI 175", categoria:"street", preco:15000, cilindrada:"175 cc"},
    {marca:"Husqvarna", nome:"Svartpilen 401", categoria:"street", preco:35000, cilindrada:"399 cc"},
    {marca:"Aprilia", nome:"RS 660", categoria:"esportiva", preco:80000, cilindrada:"660 cc"},
    {marca:"CFMoto", nome:"450SR", categoria:"esportiva", preco:35000, cilindrada:"450 cc"},
    {marca:"Indian", nome:"Scout", categoria:"custom", preco:90000, cilindrada:"1133 cc"}
];

// FORMATAR PREÇO

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// MOSTRAR MOTOS NA TELA

function mostrarMotos(lista) {

    const catalogo = document.getElementById("catalogo");
    const contador = document.getElementById("contador");

    catalogo.innerHTML = "";

    contador.innerText = lista.length + " motos encontradas";

    if (lista.length === 0) {
        catalogo.innerHTML = `
            <p class="vazio">
                Nenhuma moto encontrada. Tente outra pesquisa!
            </p>
        `;
        return;
    }

    lista.forEach((moto) => {

        const imagem = imagens[moto.categoria];

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img
                src="${imagem}"
                alt="${moto.marca} ${moto.nome}"
                onerror="this.style.display='none'"
            >

            <div class="card-info">

                <h3>${moto.marca} ${moto.nome}</h3>

                <p>Categoria: ${moto.categoria}</p>

                <p>Cilindrada: ${moto.cilindrada}</p>

                <span class="preco">
                    ${formatarPreco(moto.preco)}
                </span>

                <button class="detalhes">
                    Ver detalhes
                </button>

            </div>
        `;

        card.querySelector(".detalhes").addEventListener("click", () => {
            verDetalhes(moto);
        });

        catalogo.appendChild(card);
    });
}

// PESQUISAR MOTOS

function filtrarMotos() {

    const pesquisa = document
        .getElementById("pesquisa")
        .value
        .toLowerCase()
        .trim();

    const categoria = document
        .getElementById("categoria")
        .value;

    const resultado = motos.filter((moto) => {

        const nomeCompleto =
            (moto.marca + " " + moto.nome).toLowerCase();

        const encontrouNome = nomeCompleto.includes(pesquisa);

        const encontrouCategoria =
            categoria === "todas" ||
            moto.categoria === categoria;

        return encontrouNome && encontrouCategoria;
    });

    mostrarMotos(resultado);
}

// ATIVAR PESQUISA E FILTROS

document.getElementById("pesquisa")
    .addEventListener("input", filtrarMotos);

document.getElementById("categoria")
    .addEventListener("change", filtrarMotos);

// VER DETALHES

function verDetalhes(moto) {

    const detalhes = document.getElementById("detalhes");

    detalhes.innerHTML = `
        <h3>${moto.marca} ${moto.nome}</h3>

        <p><strong>Marca:</strong> ${moto.marca}</p>

        <p><strong>Modelo:</strong> ${moto.nome}</p>

        <p><strong>Categoria:</strong> ${moto.categoria}</p>

        <p><strong>Cilindrada:</strong> ${moto.cilindrada}</p>

        <p><strong>Preço ilustrativo:</strong>
        ${formatarPreco(moto.preco)}</p>
    `;

    document.getElementById("modal").style.display = "flex";
}

// FECHAR JANELA

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

// FECHAR AO CLICAR FORA

document.getElementById("modal").addEventListener("click", function(event) {

    if (event.target === this) {
        fecharModal();
    }

});

// CALCULADORA

function calcularParcelas() {

    const valor = Number(
        document.getElementById("valor").value
    );

    const parcelas = Number(
        document.getElementById("parcelas").value
    );

    const resultado = document.getElementById("resultado");

    if (!Number.isFinite(valor) || valor <= 0) {
        resultado.innerText = "Digite um valor válido!";
        return;
    }

    const valorParcela = valor / parcelas;

    resultado.innerHTML = `
        Valor da moto: ${formatarPreco(valor)}<br>
        Parcelamento: ${parcelas} vezes<br>
        Valor de cada parcela: ${formatarPreco(valorParcela)}<br>
        <small>Simulação sem juros.</small>
    `;
}

// INICIAR O CATÁLOGO AUTOMATICAMENTE

mostrarMotos(motos);
