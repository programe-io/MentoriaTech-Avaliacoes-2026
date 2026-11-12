// LISTA COM OS 40 VEÍCULOS E FOTOS ESPECÍFICAS
const vehicles = [
    // --- CARROS ESPORTIVOS (25) ---
    {
        tipo: "Carro",
        nome: "Ferrari SF90 Stradale",
        categoria: "Supercarro Híbrido",
        preco: "R$ 6.800.000",
        velocidade: "340 km/h",
        forca: "1.000 CV",
        imagem: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800",
        descricao: "Um híbrido plug-in bestial que combina um motor V8 biturbo com três motores elétricos, proporcionando tração integral implacável."
    },
    {
        tipo: "Carro",
        nome: "Lamborghini Aventador SVJ",
        categoria: "Supercarro V12",
        preco: "R$ 5.900.000",
        velocidade: "350 km/h",
        forca: "770 CV",
        imagem: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800",
        descricao: "O ápice do motor V12 aspirado da Lamborghini, equipado com aerodinâmica ativa ALA para devorar curvas em qualquer pista."
    },
    {
        tipo: "Carro",
        nome: "Porsche 911 GT3 RS",
        categoria: "Esportivo de Pista",
        preco: "R$ 2.150.000",
        velocidade: "296 km/h",
        forca: "525 CV",
        imagem: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800",
        descricao: "Uma máquina de precisão cirúrgica homologada para ruas, com aerodinâmica digna de carros de competição GT3."
    },
    {
        tipo: "Carro",
        nome: "McLaren 720S",
        categoria: "Supercarro Biturbo",
        preco: "R$ 3.800.000",
        velocidade: "341 km/h",
        forca: "720 CV",
        imagem: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800",
        descricao: "Chassi monocoque em fibra de carbono ultraleve associado a um motor V8 explosivo que redefine a agilidade."
    },
    {
        tipo: "Carro",
        nome: "Bugatti Chiron Super Sport",
        categoria: "Hipercarro",
        preco: "R$ 28.000.000",
        velocidade: "440 km/h",
        forca: "1.600 CV",
        imagem: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800",
        descricao: "Uma obra-prima da engenharia mecânica com motor W16 quadriturbo projetada para quebrar barreiras de velocidade absurdas."
    },
    {
        tipo: "Carro",
        nome: "Aston Martin Valkyrie",
        categoria: "Hipercarro de Pista",
        preco: "R$ 18.500.000",
        velocidade: "402 km/h",
        forca: "1.155 CV",
        imagem: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
        descricao: "Projeto de engenharia extrema que traz aerodinâmica avançada e um motor V12 aspirado que grita a rotações altíssimas."
    },
    {
        tipo: "Carro",
        nome: "Chevrolet Corvette Stingray C8",
        categoria: "Esportivo V8",
        preco: "R$ 980.000",
        velocidade: "296 km/h",
        forca: "502 CV",
        imagem: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
        descricao: "Arquitetura de motor central-traseiro que elevou o Corvette ao patamar dos melhores supercarros europeus em desempenho e design."
    },
    {
        tipo: "Carro",
        nome: "Nissan GT-R Nismo",
        categoria: "Super Esportivo",
        preco: "R$ 2.400.000",
        velocidade: "315 km/h",
        forca: "600 CV",
        imagem: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800",
        descricao: "Conhecido como 'Godzilla', domina qualquer pista com seu motor V6 biturbo artesanal e tração integral implacável."
    },
    {
        tipo: "Carro",
        nome: "BMW M4 Competition",
        categoria: "Cupê Esportivo",
        preco: "R$ 950.000",
        velocidade: "290 km/h",
        forca: "510 CV",
        imagem: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800",
        descricao: "Equilíbrio perfeito entre luxo executivo alemão e desempenho brutal nas pistas com seu motor 6 cilindros em linha."
    },
    {
        tipo: "Carro",
        nome: "Audi R8 V10 Performance",
        categoria: "Supercarro V10",
        preco: "R$ 2.600.000",
        velocidade: "331 km/h",
        forca: "620 CV",
        imagem: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800",
        descricao: "O motor V10 aspirado garante acelerações lineares impressionantes e um som verdadeiramente marcante."
    },
    {
        tipo: "Carro",
        nome: "Koenigsegg Jesko Absolut",
        categoria: "Hipercarro de Alta Velocidade",
        preco: "R$ 21.000.000",
        velocidade: "483 km/h",
        forca: "1.600 CV",
        imagem: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800",
        descricao: "Projetado com aerodinâmica ultra limpa para romper limites de velocidade com extrema estabilidade estrutural."
    },
    {
        tipo: "Carro",
        nome: "Pagani Huayra Roadster BC",
        categoria: "Supercarro Artesanal",
        preco: "R$ 16.000.000",
        velocidade: "380 km/h",
        forca: "802 CV",
        imagem: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800",
        descricao: "Uma obra de arte sobre rodas feita à mão na Itália, utilizando fibra de carbono com titânio e motor V12 biturbo."
    },
    {
        tipo: "Carro",
        nome: "Maserati MC20",
        categoria: "Supercarro Esportivo",
        preco: "R$ 2.900.000",
        velocidade: "325 km/h",
        forca: "630 CV",
        imagem: "https://images.unsplash.com/photo-1617814076274-7221379ea63a?w=800",
        descricao: "Marca o retorno triunfante da Maserati aos supercarros com o inovador motor Nettuno de altíssimo desempenho."
    },
    {
        tipo: "Carro",
        nome: "Mercedes-AMG GT Black Series",
        categoria: "Monstro de Pista",
        preco: "R$ 4.200.000",
        velocidade: "325 km/h",
        forca: "730 CV",
        imagem: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
        descricao: "O AMG mais feroz já produzido para as ruas, com aerodinâmica extrema ajustável e motor V8 biturbo aplainado."
    },
    {
        tipo: "Carro",
        nome: "Dodge Charger SRT Hellcat Redeye",
        categoria: "Muscle Car Extremo",
        preco: "R$ 1.250.000",
        velocidade: "327 km/h",
        forca: "808 CV",
        imagem: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=800",
        descricao: "Puro torque americano com um compressor mecânico monstruoso que ruge em acelerações avassaladoras em linha reta."
    },
    {
        tipo: "Carro",
        nome: "Lotus Evija",
        categoria: "Hipercarro Elétrico",
        preco: "R$ 11.500.000",
        velocidade: "320 km/h",
        forca: "2.000 CV",
        imagem: "https://images.unsplash.com/photo-1541348263662-e052662afda3?w=800",
        descricao: "100% elétrico britânico com quatro motores independentes que entregam uma força instantânea inacreditável."
    },
    {
        tipo: "Carro",
        nome: "Ferrari 812 Competizione",
        categoria: "Grand Tourer V12",
        preco: "R$ 5.500.000",
        velocidade: "340 km/h",
        forca: "830 CV",
        imagem: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800",
        descricao: "O motor V12 aspirado de produção mais potente da história da marca, girando até impressionantes 9.500 rpm."
    },
    {
        tipo: "Carro",
        nome: "Porsche Carrera GT",
        categoria: "Lenda Analógica V10",
        preco: "R$ 9.000.000",
        velocidade: "330 km/h",
        forca: "612 CV",
        imagem: "https://images.unsplash.com/photo-1616422285623-13ff01625ab3?w=800",
        descricao: "Considerado um dos supercarros mais puros e desafiadores já feitos, com embreagem cerâmica e som inigualável."
    },
    {
        tipo: "Carro",
        nome: "Ford GT Heritage Edition",
        categoria: "Supercarro de Corrida",
        preco: "R$ 4.900.000",
        velocidade: "348 km/h",
        forca: "660 CV",
        imagem: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800",
        descricao: "Aerodinâmica ativada por túnel de vento e motor EcoBoost V6 biturbo com herança direta das pistas de endurance."
    },
    {
        tipo: "Carro",
        nome: "Rimac Nevera",
        categoria: "Hipercarro Elétrico",
        preco: "R$ 14.000.000",
        velocidade: "412 km/h",
        forca: "1.914 CV",
        imagem: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
        descricao: "O recordista mundial de aceleração elétrica, capaz de desafiar as leis da física com vetorização de torque avançada."
    },
    {
        tipo: "Carro",
        nome: "Chevrolet Corvette Z06",
        categoria: "Esportivo V8",
        preco: "R$ 1.550.000",
        velocidade: "314 km/h",
        forca: "680 CV",
        imagem: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
        descricao: "O V8 aspirado mais potente do mundo em um carro de produção, com ronco inconfundível e comportamento feroz."
    },
    {
        tipo: "Carro",
        nome: "Alfa Romeo Giulia Quadrifoglio",
        categoria: "Sedã Esportivo",
        preco: "R$ 820.000",
        velocidade: "307 km/h",
        forca: "510 CV",
        imagem: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800",
        descricao: "Motor V6 biturbo desenvolvido com engenharia de ponta em um sedã elegante, ágil e extremamente agressivo."
    },
    {
        tipo: "Carro",
        nome: "Toyota GR Supra",
        categoria: "Cupê Esportivo",
        preco: "R$ 640.000",
        velocidade: "250 km/h",
        forca: "387 CV",
        imagem: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800",
        descricao: "Ícone moderno com motor 6 cilindros em linha turbo e distribuição de peso perfeita 50/50."
    },
    {
        tipo: "Carro",
        nome: "Honda Civic Type R",
        categoria: "Hatch Esportivo",
        preco: "R$ 430.000",
        velocidade: "275 km/h",
        forca: "297 CV",
        imagem: "https://images.unsplash.com/photo-1579886477543-05973920372f?w=800",
        descricao: "O rei incontestável dos tração dianteira em circuitos ao redor do mundo, com aerodinâmica refinada."
    },
    {
        tipo: "Carro",
        nome: "Porsche 911 Turbo S",
        categoria: "Super Esportivo All-Around",
        preco: "R$ 1.850.000",
        velocidade: "330 km/h",
        forca: "650 CV",
        imagem: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800",
        descricao: "Capaz de acelerar de 0 a 100 km/h em impressionantes 2,7 segundos com tração integral e conforto absoluto."
    },

    // --- MOTOS ESPORTIVAS (15) ---
    {
        tipo: "Moto",
        nome: "Kawasaki Ninja H2R",
        categoria: "Supermoto Supercharged",
        preco: "R$ 350.000",
        velocidade: "400 km/h",
        forca: "310 CV",
        imagem: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
        descricao: "Equipada com compressor mecânico (supercharger), é a moto de produção em série mais rápida e extrema do planeta."
    },
    {
        tipo: "Moto",
        nome: "Ducati Panigale V4 R",
        categoria: "Superbike de Pista",
        preco: "R$ 290.000",
        velocidade: "315 km/h",
        forca: "240 CV",
        imagem: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800",
        descricao: "Derivada diretamente das pistas profissionais, traz asas aerodinâmicas em fibra de carbono e motor V4 desmodrômico."
    },
    {
        tipo: "Moto",
        nome: "BMW S1000RR M Package",
        categoria: "Superbike Alemã",
        preco: "R$ 145.000",
        velocidade: "303 km/h",
        forca: "210 CV",
        imagem: "https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800",
        descricao: "Eletrônica de ponta com controle de tração dinâmico e rodas em fibra de carbono para máxima agilidade nas curvas."
    },
    {
        tipo: "Moto",
        nome: "Yamaha YZF-R1M",
        categoria: "Superesportiva de Competição",
        preco: "R$ 155.000",
        velocidade: "299 km/h",
        forca: "200 CV",
        imagem: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800",
        descricao: "Suspensão eletrônica Öhlins semi-ativa e carenagem de carbono inspirada nos protótipos campeões."
    },
    {
        tipo: "Moto",
        nome: "Honda CBR 1000RR-R Fireblade SP",
        categoria: "Superbike Japonesa",
        preco: "R$ 162.000",
        velocidade: "314 km/h",
        forca: "217 CV",
        imagem: "https://images.unsplash.com/photo-1589148939226-8968898199b4?w=800",
        descricao: "Construída com tecnologia de ponta das pistas, possui bloco de motor compacto e aerodinâmica de alto downforce."
    },
    {
        tipo: "Moto",
        nome: "Aprilia RSV4 Factory",
        categoria: "Superbike Italiana",
        preco: "R$ 150.000",
        velocidade: "305 km/h",
        forca: "217 CV",
        imagem: "https://images.unsplash.com/photo-1609630875172-2e3fb6336440?w=800",
        descricao: "Motor V4 exclusivo de 65 graus que oferece torque avassalador em qualquer faixa de rotação com ciclística impecável."
    },
    {
        tipo: "Moto",
        nome: "Suzuki Hayabusa 1300",
        categoria: "Hyperbike Lenda",
        preco: "R$ 124.000",
        velocidade: "299 km/h",
        forca: "190 CV",
        imagem: "https://images.unsplash.com/photo-1558980664-3a031cf67ea8?w=800",
        descricao: "Famosa mundialmente por sua estabilidade lendária em velocidades extremas e design aerodinâmico marcante."
    },
    {
        tipo: "Moto",
        nome: "KTM 1290 Super Duke RR",
        categoria: "Naked Extrema",
        preco: "R$ 138.000",
        velocidade: "280 km/h",
        forca: "180 CV",
        imagem: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800",
        descricao: "Conhecida como 'A Fera', esta naked de edição limitada entrega torque brutal e muita adrenalina sem carenagem."
    },
    {
        tipo: "Moto",
        nome: "MV Agusta Brutale 1000 RR",
        categoria: "Naked de Luxo",
        preco: "R$ 180.000",
        velocidade: "300 km/h",
        forca: "208 CV",
        imagem: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800",
        descricao: "Uma verdadeira obra de arte italiana sobre duas rodas, unindo componentes artesanais de luxo e desempenho feroz."
    },
    {
        tipo: "Moto",
        nome: "Ducati Streetfighter V4 SP",
        categoria: "Naked Superesportiva",
        preco: "R$ 230.000",
        velocidade: "295 km/h",
        forca: "208 CV",
        imagem: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800",
        descricao: "Uma Panigale sem carenagens, com guidão alto e aceleração assustadora para quem busca emoção pura."
    },
    {
        tipo: "Moto",
        nome: "Triumph Speed Triple 1200 RR",
        categoria: "Café Racer Moderna",
        preco: "R$ 115.000",
        velocidade: "270 km/h",
        forca: "180 CV",
        imagem: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
        descricao: "Estilo retrô clássico combinado com suspensão semi-ativa Öhlins e um motor tricilíndrico de resposta imediata."
    },
    {
        tipo: "Moto",
        nome: "Kawasaki Ninja ZX-10RR",
        categoria: "Superbike de Competição",
        preco: "R$ 135.000",
        velocidade: "299 km/h",
        forca: "214 CV",
        imagem: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800",
        descricao: "Bólido voltado para as pistas com pistões em titânio e rotações elevadas para alto rendimento em circuitos fechados."
    },
    {
        tipo: "Moto",
        nome: "Yamaha MT-10 SP",
        categoria: "Naked Esportiva",
        preco: "R$ 112.000",
        velocidade: "250 km/h",
        forca: "160 CV",
        imagem: "https://images.unsplash.com/photo-1609630875172-2e3fb6336440?w=800",
        descricao: "Motor crossplane que produz um ronco único e torque esmagador em baixas rotações com visual imponente."
    },
    {
        tipo: "Moto",
        nome: "Ducati Superleggera V4",
        categoria: "Hipermoto Exclusiva",
        preco: "R$ 680.000",
        velocidade: "310 km/h",
        forca: "234 CV",
        imagem: "https://images.unsplash.com/photo-1558980664-3a031cf67ea8?w=800",
        descricao: "A primeira moto de produção com chassi, rodas e braço oscilante inteiramente em fibra de carbono."
    },
    {
        tipo: "Moto",
        nome: "Honda CBR 650R",
        categoria: "Esportiva Média",
        preco: "R$ 62.000",
        velocidade: "240 km/h",
        forca: "92 CV",
        imagem: "https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=800",
        descricao: "Equilíbrio ideal entre uso diário na cidade e pilotagem esportiva em estradas com seu motor 4 cilindros em linha."
    }
];

// RENDERIZAR VEÍCULOS NA TELA
function renderizarVeiculos(lista) {
    const grid = document.getElementById('vehiclesGrid');
    const noResults = document.getElementById('noResults');
    grid.innerHTML = '';

    if (lista.length === 0) {
        noResults.style.display = 'block';
        return;
    } else {
        noResults.style.display = 'none';
    }

    lista.forEach(v => {
        const card = document.createElement('div');
        card.className = 'vehicle-card';
        card.innerHTML = `
            <div class="vehicle-img-box">
                <img src="${v.imagem}" alt="${v.nome}">
                <span class="vehicle-badge">${v.tipo} • ${v.categoria}</span>
            </div>
            <div class="vehicle-body">
                <div>
                    <h3 class="vehicle-title">${v.nome}</h3>
                    <p class="vehicle-desc">${v.descricao}</p>
                    <div class="specs-grid">
                        <div class="spec-item">
                            <span class="label">Velocidade Máx</span>
                            <span class="value">${v.velocidade}</span>
                        </div>
                        <div class="spec-item">
                            <span class="label">Força (Potência)</span>
                            <span class="value">${v.forca}</span>
                        </div>
                    </div>
                </div>
                <div class="vehicle-footer">
                    <span class="vehicle-price">${v.preco}</span>
                    <button class="btn-buy" onclick="alert('Interesse registrado no veículo: ${v.nome}! Nossa equipe de vendas entrará em contato.')">Comprar</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// FUNÇÃO DE PESQUISA EM TEMPO REAL
function filtrarVeiculos() {
    const termo = document.getElementById('searchInput').value.toLowerCase();
    const filtrados = vehicles.filter(v => 
        v.nome.toLowerCase().includes(termo) || 
        v.categoria.toLowerCase().includes(termo) || 
        v.tipo.toLowerCase().includes(termo) ||
        v.descricao.toLowerCase().includes(termo)
    );
    renderizarVeiculos(filtrados);
}

// CARREGAR TODOS AO ABRIR A PÁGINA
window.onload = () => {
    renderizarVeiculos(vehicles);
};