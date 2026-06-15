// Aguarda o carregamento completo do DOM para garantir que os elementos existem
document.addEventListener("DOMContentLoaded", () => {
    criarBarraPesquisa();
    adicionarFuncionalidadeSaibaMais();
\});

/**
 * 1. Cria e insere dinamicamente uma barra de pesquisa no topo da lista de fatores
 */
function criarBarraPesquisa() {
    const sectionFatores = document.querySelector("main section:last-of-type");
    if (!sectionFatores) return;

    // Criar o container da pesquisa
    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";
    searchContainer.style.marginBottom = "2rem";
    searchContainer.style.borderTop = "none"; // Remove a borda laranja herdada do CSS anterior
    searchContainer.style.padding = "0";

    // Criar o campo de input
    const inputBusca = document.createElement("input");
    inputBusca.type = "text";
    inputBusca.placeholder = "🔎 Digite um fator climático para filtrar... (ex: Altitude)";
    inputBusca.style.width = "100%";
    inputBusca.style.padding = "0.8rem 1rem";
    inputBusca.style.border = "2px solid #2e86c1";
    inputBusca.style.borderRadius = "8px";
    inputBusca.style.fontSize = "1rem";
    inputBusca.style.outline = "none";

    searchContainer.appendChild(inputBusca);
    
    // Insere a barra de pesquisa logo antes do primeiro fator climático
    sectionFatores.insertBefore(searchContainer, sectionFatores.firstChild);

    // Evento de digitação para filtrar os fatores em tempo real
    inputBusca.addEventListener("input", (e) => {
        const termoBusca = e.target.value.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
        const cardsFatores = sectionFatores.querySelectorAll("div:not(.search-container)");

        cardsFatores.forEach(card => {
            const titulo = card.querySelector("h3").textContent.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
            const texto = card.querySelector("p").textContent.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");

            // Se o termo pesquisado estiver no título ou no texto do card, ele continua visível
            if (titulo.includes(termoBusca) || texto.includes(termoBusca)) {
                card.style.display = "block";
            \} else {
                card.style.display = "none";
            \}
        \});
    \});
\}

/**
 * 2. Adiciona detalhes extras escondidos que aparecem ao clicar em um botão "Saiba Mais"
 */
function adicionarFuncionalidadeSaibaMais() {
    // Dados extras para detalhar cada fator cientificamente
    const detalhesExtras = {
        "1. Latitude": "<strong>Curiosidade Científica:</strong> A radiação solar atinge a Terra de forma desigual devido à sua forma esferoidal. A quantidade de energia por unidade de área diminui conforme nos afastamos do Equador em direção aos polos, criando as Zonas Térmicas da Terra (Tropical, Temperada e Polar).",
        "2. Altitude": "<strong>Curiosidade Científica:</strong> O gradiente térmico vertical padrão da troposfera dita que a temperatura cai cerca de 0,65°C a cada 100 metros de elevação. Menos moléculas de ar nas altitudes significam menos retenção de calor por radiação terrestre.",
        "3. Maritimidade e Continentalidade": "<strong>Curiosidade Científica:</strong> Isso ocorre devido ao calor específico. O calor específico da água é cerca de 4 vezes maior do que o da terra/rocha. A água precisa de mais energia para aquecer 1°C e demora muito mais para liberar esse calor.",
        "4. Massas de Ar": "<strong>Curiosidade Científica:</strong> As massas de ar são classificadas por sua origem: equatoriais (E), tropicais (T) e polares (P); e pelo seu nível de umidade: marítimas (m) ou continentais (c). O encontro de massas diferentes gera frentes climáticas (frentes frias ou quentes).",
        "5. Correntes Marítimas": "<strong>Curiosidade Científica:</strong> Elas funcionam como o sistema circulatório do planeta, distribuindo calor das regiões tropicais para os polos. A Corrente do Golfo (quente), por exemplo, impede que o norte da Europa congele completamente durante o inverno.",
        "6. Relevo e Vegetação": "<strong>Curiosidade Científica:</strong> O relevo cria barreiras orográficas provocando chuvas de relevo (bच्छाvento) e deixando o outro lado seco (sotavento). A floresta amazônica gera sua própria chuva por meio da evapotranspiração, agindo como 'rios voadores' de umidade."
    \};

    const cardsFatores = document.querySelectorAll("main section:last-of-type div");

    cardsFatores.forEach(card => {
        const h3 = card.querySelector("h3");
        if (!h3) return;

        const tituloTexto = h3.textContent.trim();

        // Se houver detalhe cadastrado para esse título
        if (detalhesExtras[tituloTexto]) {
            // Criar o parágrafo de texto extra oculto
            const pExtra = document.createElement("p");
            pExtra.innerHTML = detalhesExtras[tituloTexto];
            pExtra.style.marginTop = "1rem";
            pExtra.style.padding = "0.8rem";
            pExtra.style.backgroundColor = "#eaf2f8";
            pExtra.style.borderLeft = "3px solid #e67e22";
            pExtra.style.borderRadius = "4px";
            pExtra.style.display = "none"; // Começa escondido
            pExtra.style.fontSize = "0.95rem";

            // Criar o botão de alternância
            const botao = document.createElement("button");
            botao.textContent = "Ver detalhamento técnico ↓";
            botao.style.marginTop = "1rem";
            botao.style.padding = "0.5rem 1rem";
            botao.style.backgroundColor = "#2e86c1";
            botao.style.color = "white";
            botao.style.border = "none";
            botao.style.borderRadius = "4px";
            botao.style.cursor = "pointer";
            botao.style.fontWeight = "bold";
            botao.style.fontSize = "0.85rem";
            botao.style.transition = "background-color 0.2s";

            botao.addEventListener("mouseover", () => botao.style.backgroundColor = "#1b4f72");
            botao.addEventListener("mouseout", () => botao.style.backgroundColor = "#2e86c1");

            // Evento de clique para abrir/fechar o detalhe
            botao.addEventListener("click", () => {
                if (pExtra.style.display === "none") {
                    pExtra.style.display = "block";
                    botao.textContent = "Fechar detalhamento ↑";
                    botao.style.backgroundColor = "#e67e22";
                \} else {
                    pExtra.style.display = "none";
                    botao.textContent = "Ver detalhamento técnico ↓";
                    botao.style.backgroundColor = "#2e86c1";
                \}
            \});

            // Insere o botão e o texto extra no bloco (card)
            card.appendChild(botao);
            card.appendChild(pExtra);
        \}
    \});
\}$0