<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AeroSky Passagens | Descubra o Mundo com Melhores Preços</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            50: '#eff6ff',
                            100: '#dbeafe',
                            500: '#3b82f6',
                            600: '#2563eb',
                            700: '#1d4ed8',
                            900: '#1e3a8a'
                        }
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .modal-enter { animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes modalIn {
            from { opacity: 0; transform: scale(0.95) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .hero-gradient {
            background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col justify-between selection:bg-blue-500 selection:text-white">

    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div class="flex items-center gap-3 cursor-pointer" onclick="navigateHome()">
                <div class="w-12 h-12 rounded-2xl hero-gradient flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                    <i class="fa-solid fa-plane-departure text-xl"></i>
                </div>
                <div>
                    <span class="text-2xl font-extrabold tracking-tight text-slate-900">Aero<span class="text-blue-600">Sky</span></span>
                    <span class="block text-[10px] font-bold tracking-widest uppercase text-slate-400">Passagens Aéreas</span>
                </div>
            </div>

            <nav class="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-600">
                <a href="#destinos" class="hover:text-blue-600 transition-colors">Destinos (50+)</a>
                <a href="#beneficios" class="hover:text-blue-600 transition-colors">Vantagens</a>
                <a href="#ofertas" class="hover:text-blue-600 transition-colors">Ofertas Relâmpago</a>
            </nav>

            <div class="flex items-center gap-3">
                <button onclick="openMyTripsModal()" class="flex items-center gap-2 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-semibold px-4 py-2.5 rounded-xl transition-all text-sm">
                    <i class="fa-solid fa-ticket"></i>
                    <span class="hidden sm:inline">Minhas Viagens</span>
                </button>
                <button onclick="openSupportModal()" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/25 transition-all text-sm flex items-center gap-2">
                    <i class="fa-solid fa-headset"></i>
                    <span>Ajuda</span>
                </button>
            </div>
        </div>
    </header>

    <main class="flex-grow">
        <section class="relative hero-gradient py-20 lg:py-28 text-white overflow-hidden">
            <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="text-center max-w-3xl mx-auto mb-12">
                    <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wide text-blue-100 mb-6 border border-white/20">
                        <i class="fa-solid fa-earth-americas text-blue-300"></i> Mais de 50 destinos globais com tarifa garantida
                    </span>
                    <h1 class="text-4xl sm:text-6xl font-black tracking-tight mb-6">
                        Para onde vamos <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">hoje?</span>
                    </h1>
                    <p class="text-blue-100 text-lg font-normal">Compare companhias aéreas, encontre os melhores preços e viaje com total segurança e suporte 24h.</p>
                </div>

                <!-- Flight Search Card -->
                <div class="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-800 max-w-5xl mx-auto border border-white/20 backdrop-blur-xl">
                    <form id="flightSearchForm" onsubmit="handleSearchFlights(event)" class="space-y-6">
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Origem</label>
                                <div class="relative">
                                    <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400"><i class="fa-solid fa-plane-departure"></i></span>
                                    <select id="originSelect" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-semibold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all">
                                        <option value="São Paulo (GRU)">São Paulo (GRU)</option>
                                        <option value="Rio de Janeiro (GIG)">Rio de Janeiro (GIG)</option>
                                        <option value="Brasília (BSB)">Brasília (BSB)</option>
                                        <option value="Belo Horizonte (CNF)">Belo Horizonte (CNF)</option>
                                        <option value="Salvador (SSA)">Salvador (SSA)</option>
                                        <option value="Lisboa (LIS)">Lisboa (LIS)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Destino</label>
                                <div class="relative">
                                    <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400"><i class="fa-solid fa-plane-arrival"></i></span>
                                    <select id="destinationSelect" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-semibold text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all">
                                        <optgroup label="América do Sul">
                                            <option value="Buenos Aires, Argentina">Buenos Aires, Argentina</option>
                                            <option value="Santiago, Chile">Santiago, Chile</option>
                                            <option value="Montevidéu, Uruguai">Montevidéu, Uruguai</option>
                                            <option value="Bogotá, Colômbia">Bogotá, Colômbia</option>
                                            <option value="Lima, Peru">Lima, Peru</option>
                                            <option value="Assunção, Paraguai">Assunção, Paraguai</option>
                                            <option value="Quito, Equador">Quito, Equador</option>
                                            <option value="La Paz, Bolívia">La Paz, Bolívia</option>
                                            <option value="Caracas, Venezuela">Caracas, Venezuela</option>
                                            <option value="Paramaribo, Suriname">Paramaribo, Suriname</option>
                                        </optgroup>
                                        <optgroup label="América do Norte e Central">
                                            <option value="Miami, Estados Unidos">Miami, Estados Unidos</option>
                                            <option value="Nova York, Estados Unidos">Nova York, Estados Unidos</option>
                                            <option value="Orlando, Estados Unidos">Orlando, Estados Unidos</option>
                                            <option value="Los Angeles, Estados Unidos">Los Angeles, Estados Unidos</option>
                                            <option value="Toronto, Canadá">Toronto, Canadá</option>
                                            <option value="Vancouver, Canadá">Vancouver, Canadá</option>
                                            <option value="Cidade do México, México">Cidade do México, México</option>
                                            <option value="Cancún, México">Cancún, México</option>
                                            <option value="Panama City, Panamá">Panama City, Panamá</option>
                                            <option value="San José, Costa Rica">San José, Costa Rica</option>
                                            <option value="Havana, Cuba">Havana, Cuba</option>
                                            <option value="Santo Domingo, República Dominicana">Santo Domingo, República Dominicana</option>
                                        </optgroup>
                                        <optgroup label="Europa">
                                            <option value="Lisboa, Portugal">Lisboa, Portugal</option>
                                            <option value="Madri, Espanha">Madri, Espanha</option>
                                            <option value="Paris, França">Paris, França</option>
                                            <option value="Londres, Reino Unido">Londres, Reino Unido</option>
                                            <option value="Roma, Itália">Roma, Itália</option>
                                            <option value="Frankfurt, Alemanha">Frankfurt, Alemanha</option>
                                            <option value="Amsterdã, Holanda">Amsterdã, Holanda</option>
                                            <option value="Zurique, Suíça">Zurique, Suíça</option>
                                            <option value="Bruxelas, Bélgica">Bruxelas, Bélgica</option>
                                            <option value="Viena, Áustria">Viena, Áustria</option>
                                            <option value="Atenas, Grécia">Atenas, Grécia</option>
                                            <option value="Dublin, Irlanda">Dublin, Irlanda</option>
                                            <option value="Copenhague, Dinamarca">Copenhague, Dinamarca</option>
                                            <option value="Estocolmo, Suécia">Estocolmo, Suécia</option>
                                            <option value="Oslo, Noruega">Oslo, Noruega</option>
                                            <option value="Varsóvia, Polônia">Varsóvia, Polônia</option>
                                        </optgroup>
                                        <optgroup label="Ásia e Oriente Médio">
                                            <option value="Tóquio, Japão">Tóquio, Japão</option>
                                            <option value="Dubai, Emirados Árabes">Dubai, Emirados Árabes</option>
                                            <option value="Doha, Catar">Doha, Catar</option>
                                            <option value="Bangkok, Tailândia">Bangkok, Tailândia</option>
                                            <option value="Singapura, Singapura">Singapura, Singapura</option>
                                            <option value="Pequim, China">Pequim, China</option>
                                            <option value="Seul, Coreia do Sul">Seul, Coreia do Sul</option>
                                            <option value="Hong Kong, China">Hong Kong, China</option>
                                            <option value="Istambul, Turquia">Istambul, Turquia</option>
                                            <option value="Tel Aviv, Israel">Tel Aviv, Israel</option>
                                            <option value="Mumbai, Índia">Mumbai, Índia</option>
                                        </optgroup>
                                        <optgroup label="África e Oceania">
                                            <option value="Cairo, Egito">Cairo, Egito</option>
                                            <option value="Joanesburgo, África do Sul">Joanesburgo, África do Sul</option>
                                            <option value="Cidade do Cabo, África do Sul">Cidade do Cabo, África do Sul</option>
                                            <option value="Marrakech, Marrocos">Marrakech, Marrocos</option>
                                            <option value="Sydney, Austrália">Sydney, Austrália</option>
                                            <option value="Melbourne, Austrália">Melbourne, Austrália</option>
                                            <option value="Auckland, Nova Zelândia">Auckland, Nova Zelândia</option>
                                            <option value="Nairóbi, Quênia">Nairóbi, Quênia</option>
                                        </optgroup>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Ida e Volta</label>
                                <div class="grid grid-cols-2 gap-2">
                                    <input type="date" id="departureDate" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-3 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500">
                                    <input type="date" id="returnDate" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-3 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500">
                                </div>
                            </div>

                            <div>
                                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Passageiros e Classe</label>
                                <div class="relative">
                                    <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400"><i class="fa-solid fa-users"></i></span>
                                    <select id="passengerSelect" class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-semibold text-slate-700 focus:outline-none focus:border-blue-500">
                                        <option value="1 Passageiro (Econômica)">1 Passageiro • Econômica</option>
                                        <option value="2 Passageiros (Econômica)">2 Passageiros • Econômica</option>
                                        <option value="Família (3+ Passageiros)">Família (3+ Passageiros)</option>
                                        <option value="Executiva / Primeira Classe">Classe Executiva</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                            <div class="flex items-center gap-6 text-xs font-semibold text-slate-500">
                                <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked class="w-4 h-4 text-blue-600 rounded border-slate-300"> Apenas voos diretos</label>
                                <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 text-blue-600 rounded border-slate-300"> Bagagem despachada inclusa</label>
                            </div>
                            <button type="submit" class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/30 transition-all flex items-center justify-center gap-3 text-base">
                                <i class="fa-solid fa-magnifying-glass"></i> Buscar Passagens
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <section id="resultsContainer" class="hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 id="resultsTitle" class="text-2xl font-black text-slate-900">Resultados da Busca</h2>
                    <p class="text-slate-500 text-sm">Selecione o voo ideal para prosseguir com a emissão do bilhete.</p>
                </div>
                <div class="flex items-center gap-3">
                    <span class="text-xs font-bold uppercase text-slate-400">Ordenar por:</span>
                    <select id="sortSelect" onchange="sortFlights()" class="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-xs focus:outline-none focus:border-blue-500">
                        <option value="price">Menor Preço</option>
                        <option value="duration">Menor Duração</option>
                        <option value="departure">Horário de Saída</option>
                    </select>
                </div>
            </div>

            <div id="flightList" class="space-y-4">
                <!-- Dynamically populated flight cards -->
            </div>
        </section>

        <section id="destinos" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div class="text-center max-w-2xl mx-auto mb-16">
                <span class="text-blue-600 font-extrabold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Explore o Mundo</span>
                <h2 class="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-4">Mais de 50 Destinos Imperdíveis</h2>
                <p class="text-slate-500 text-sm sm:text-base">Escolha seu continente favorito e clique para pesquisar passagens aéreas promocionais instantaneamente.</p>
            </div>

            <!-- Continent Tabs / Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- América do Sul -->
                <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 hover:shadow-lg transition-all">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg"><i class="fa-solid fa-earth-americas"></i></div>
                        <div>
                            <h3 class="font-extrabold text-slate-900 text-lg">América do Sul</h3>
                            <span class="text-xs text-slate-400">10 principais destinos</span>
                        </div>
                    </div>
                    <div class="space-y-2.5">
                        <div onclick="selectQuickDestination('Buenos Aires, Argentina')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Buenos Aires, Argentina</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Santiago, Chile')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Santiago, Chile</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Montevidéu, Uruguai')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Montevidéu, Uruguai</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Bogotá, Colômbia')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Bogotá, Colômbia</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Lima, Peru')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Lima, Peru</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                    </div>
                </div>

                <!-- América do Norte -->
                <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 hover:shadow-lg transition-all">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg"><i class="fa-solid fa-plane"></i></div>
                        <div>
                            <h3 class="font-extrabold text-slate-900 text-lg">América do Norte</h3>
                            <span class="text-xs text-slate-400">EUA, Canadá e México</span>
                        </div>
                    </div>
                    <div class="space-y-2.5">
                        <div onclick="selectQuickDestination('Miami, Estados Unidos')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Miami, Estados Unidos</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Nova York, Estados Unidos')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Nova York, Estados Unidos</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Orlando, Estados Unidos')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Orlando, Estados Unidos</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Toronto, Canadá')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Toronto, Canadá</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Cancún, México')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Cancún, México</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                    </div>
                </div>

                <!-- Europa -->
                <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 hover:shadow-lg transition-all">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg"><i class="fa-solid fa-landmark"></i></div>
                        <div>
                            <h3 class="font-extrabold text-slate-900 text-lg">Europa</h3>
                            <span class="text-xs text-slate-400">Lisboa, Paris, Londres e mais</span>
                        </div>
                    </div>
                    <div class="space-y-2.5">
                        <div onclick="selectQuickDestination('Lisboa, Portugal')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Lisboa, Portugal</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Madri, Espanha')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Madri, Espanha</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Paris, França')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Paris, França</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Londres, Reino Unido')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Londres, Reino Unido</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Roma, Itália')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Roma, Itália</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                    </div>
                </div>

                <!-- Ásia e Oriente Médio -->
                <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 hover:shadow-lg transition-all">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg"><i class="fa-solid fa-globe-asia"></i></div>
                        <div>
                            <h3 class="font-extrabold text-slate-900 text-lg">Ásia e Oriente Médio</h3>
                            <span class="text-xs text-slate-400">Tóquio, Dubai, Doha</span>
                        </div>
                    </div>
                    <div class="space-y-2.5">
                        <div onclick="selectQuickDestination('Tóquio, Japão')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Tóquio, Japão</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Dubai, Emirados Árabes')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Dubai, Emirados Árabes</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Doha, Catar')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Doha, Catar</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Bangkok, Tailândia')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Bangkok, Tailândia</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Singapura, Singapura')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Singapura, Singapura</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                    </div>
                </div>

                <!-- África -->
                <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 hover:shadow-lg transition-all">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-lg"><i class="fa-solid fa-sun"></i></div>
                        <div>
                            <h3 class="font-extrabold text-slate-900 text-lg">África</h3>
                            <span class="text-xs text-slate-400">Egito, África do Sul, Marrocos</span>
                        </div>
                    </div>
                    <div class="space-y-2.5">
                        <div onclick="selectQuickDestination('Cairo, Egito')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Cairo, Egito</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Joanesburgo, África do Sul')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Joanesburgo, África do Sul</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Cidade do Cabo, África do Sul')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Cidade do Cabo, África do Sul</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Marrakech, Marrocos')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Marrakech, Marrocos</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                    </div>
                </div>

                <!-- Oceania -->
                <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 hover:shadow-lg transition-all">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-lg"><i class="fa-solid fa-water"></i></div>
                        <div>
                            <h3 class="font-extrabold text-slate-900 text-lg">Oceania</h3>
                            <span class="text-xs text-slate-400">Austrália e Nova Zelândia</span>
                        </div>
                    </div>
                    <div class="space-y-2.5">
                        <div onclick="selectQuickDestination('Sydney, Austrália')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Sydney, Austrália</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Melbourne, Austrália')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Melbourne, Austrália</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                        <div onclick="selectQuickDestination('Auckland, Nova Zelândia')" class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all">
                            <span class="text-sm font-semibold text-slate-700 group-hover:text-blue-700">Auckland, Nova Zelândia</span>
                            <span class="text-xs font-bold text-blue-600 bg-white px-2.5 py-1 rounded-xl shadow-xs group-hover:bg-blue-600 group-hover:text-white transition-all">Ver Voos</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="beneficios" class="bg-white py-20 border-t border-slate-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="flex items-start gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                        <div class="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl shrink-0"><i class="fa-solid fa-shield-halved"></i></div>
                        <div>
                            <h4 class="font-extrabold text-slate-900 mb-1">Compra 100% Segura</h4>
                            <p class="text-xs text-slate-500 leading-relaxed">Transações criptografadas e emissão imediata do código PNR direto com as companhias aéreas parceiras.</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                        <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl shrink-0"><i class="fa-solid fa-percent"></i></div>
                        <div>
                            <h4 class="font-extrabold text-slate-900 mb-1">Melhor Preço Garantido</h4>
                            <p class="text-xs text-slate-500 leading-relaxed">Encontramos tarifas exclusivas que você não acha em nenhum outro site de viagens.</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                        <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl shrink-0"><i class="fa-solid fa-headset"></i></div>
                        <div>
                            <h4 class="font-extrabold text-slate-900 mb-1">Suporte Humano 24/7</h4>
                            <p class="text-xs text-slate-500 leading-relaxed">Nossa equipe está pronta para ajudar com alterações, bagagens e dúvidas antes e durante sua viagem.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <div id="checkoutModal" class="fixed inset-0 z-50 hidden items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
        <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl modal-enter relative my-8">
            <button onclick="closeCheckoutModal()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all"><i class="fa-solid fa-xmark"></i></button>
            
            <div class="mb-8">
                <span class="text-blue-600 font-extrabold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Finalização da Compra</span>
                <h3 class="text-2xl font-black text-slate-900 mt-2">Reserva de Bilhete Aéreo</h3>
                <div id="checkoutFlightSummary" class="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <!-- Flight details summary injected via JS -->
                </div>
            </div>

            <!-- Steps Indicator -->
            <div class="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 text-xs font-bold">
                <div id="stepIndicator1" class="flex items-center gap-2 text-blue-600">
                    <span class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">1</span>
                    <span>Dados Pessoais</span>
                </div>
                <div class="w-12 h-0.5 bg-slate-200"></div>
                <div id="stepIndicator2" class="flex items-center gap-2 text-slate-400">
                    <span class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">2</span>
                    <span>Pagamento</span>
                </div>
                <div class="w-12 h-0.5 bg-slate-200"></div>
                <div id="stepIndicator3" class="flex items-center gap-2 text-slate-400">
                    <span class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">3</span>
                    <span>Confirmação</span>
                </div>
            </div>

            <!-- Step 1: Passenger Information -->
            <div id="step1Content" class="space-y-4">
                <h4 class="font-extrabold text-slate-900 text-sm">Informações do Passageiro Principal</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Nome Completo (Conforme Passaporte/RG)</label>
                        <input type="text" id="passengerName" placeholder="Ex: Carlos Eduardo Silva" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">CPF ou Passaporte</label>
                        <input type="text" id="passengerDocument" placeholder="000.000.000-00" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">E-mail para Envio do Bilhete</label>
                        <input type="email" id="passengerEmail" placeholder="carlos@email.com" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Telefone / WhatsApp</label>
                        <input type="text" id="passengerPhone" placeholder="(11) 99999-9999" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500">
                    </div>
                </div>
                <div class="pt-6 flex justify-end">
                    <button type="button" onclick="goToStep2()" class="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3 rounded-xl shadow-md transition-all text-sm flex items-center gap-2">
                        <span>Avançar para Pagamento</span> <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>

            <!-- Step 2: Payment Methods -->
            <div id="step2Content" class="hidden space-y-6">
                <h4 class="font-extrabold text-slate-900 text-sm">Escolha a Forma de Pagamento</h4>
                
                <!-- Payment Tabs -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button type="button" onclick="selectPaymentMethod('pix')" id="payBtnPix" class="p-4 rounded-2xl border-2 border-blue-600 bg-blue-50 text-blue-700 font-semibold text-xs flex flex-col items-center justify-center gap-2 transition-all">
                        <i class="fa-brands fa-pix text-xl"></i> PIX (Instantâneo)
                    </button>
                    <button type="button" onclick="selectPaymentMethod('credit')" id="payBtnCredit" class="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 text-slate-600 font-semibold text-xs flex flex-col items-center justify-center gap-2 transition-all">
                        <i class="fa-solid fa-credit-card text-xl"></i> Cartão de Crédito
                    </button>
                    <button type="button" onclick="selectPaymentMethod('boleto')" id="payBtnBoleto" class="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 text-slate-600 font-semibold text-xs flex flex-col items-center justify-center gap-2 transition-all">
                        <i class="fa-solid fa-barcode text-xl"></i> Boleto Bancário
                    </button>
                    <button type="button" onclick="selectPaymentMethod('paypal')" id="payBtnPaypal" class="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 text-slate-600 font-semibold text-xs flex flex-col items-center justify-center gap-2 transition-all">
                        <i class="fa-brands fa-paypal text-xl"></i> PayPal
                    </button>
                </div>

                <!-- PIX Form -->
                <div id="paymentPixForm" class="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <div class="w-36 h-36 bg-white border border-slate-200 rounded-xl mx-auto flex items-center justify-center p-2 shadow-xs">
                        <i class="fa-solid fa-qrcode text-7xl text-slate-800"></i>
                    </div>
                    <p class="text-xs text-slate-500">Escaneie o QR Code acima com o aplicativo do seu banco ou utilize a chave PIX copia e cola.</p>
                    <div class="flex items-center gap-2">
                        <input type="text" readonly value="00020126580014br.gov.bcb.pix0136aerosky-passagens-pagamento-instantaneo..." class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-600">
                        <button type="button" onclick="alert('Chave PIX copiada com sucesso!')" class="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700">Copiar</button>
                    </div>
                </div>

                <!-- Credit Card Form -->
                <div id="paymentCreditForm" class="hidden space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Número do Cartão</label>
                        <input type="text" placeholder="0000 0000 0000 0000" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">Validade</label>
                            <input type="text" placeholder="MM/AA" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-slate-600 mb-1">CVV</label>
                            <input type="text" placeholder="123" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1">Parcelamento</label>
                        <select class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500">
                            <option>1x sem juros</option>
                            <option>3x sem juros</option>
                            <option>6x sem juros</option>
                            <option>10x com juros reduzidos</option>
                        </select>
                    </div>
                </div>

                <!-- Boleto Form -->
                <div id="paymentBoletoForm" class="hidden space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <i class="fa-solid fa-file-invoice-dollar text-4xl text-blue-600"></i>
                    <p class="text-xs text-slate-600">O boleto bancário tem prazo de compensação de até 2 dias úteis. A reserva será garantida após a confirmação do pagamento.</p>
                    <button type="button" onclick="alert('Boleto gerado com sucesso! Baixando PDF...')" class="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-800">Baixar Boleto PDF</button>
                </div>

                <!-- PayPal Form -->
                <div id="paymentPaypalForm" class="hidden space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <i class="fa-brands fa-paypal text-5xl text-blue-700"></i>
                    <p class="text-xs text-slate-600">Você será redirecionado para concluir o pagamento de forma segura em sua conta PayPal.</p>
                </div>

                <div class="pt-4 flex justify-between items-center">
                    <button type="button" onclick="goToStep1()" class="text-xs font-bold text-slate-500 hover:text-slate-800"><i class="fa-solid fa-arrow-left"></i> Voltar</button>
                    <button type="button" onclick="handleCheckoutSubmit(event)" class="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/25 transition-all text-sm flex items-center gap-2">
                        <i class="fa-solid fa-check">></i> Confirmar Pagamento e Emitir Passagem
                    </button>
                </div>
            </div>

            <!-- Step 3: Success Confirmation -->
            <div id="step3Content" class="hidden text-center space-y-6 py-6">
                <div class="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-md">
                    <i class="fa-solid fa-check"></i>
                </div>
                <div>
                    <h4 class="text-2xl font-black text-slate-900">Passagem Emitida com Sucesso!</h4>
                    <p class="text-xs text-slate-500 mt-1">Parabéns! Sua reserva foi confirmada e os bilhetes foram enviados para o seu e-mail.</p>
                </div>
                <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left space-y-3 max-w-md mx-auto">
                    <div class="flex justify-between text-xs">
                        <span class="text-slate-400 font-semibold">Código PNR (Localizador):</span>
                        <span id="successPNR" class="font-mono font-bold text-blue-600 text-sm">SK89324</span>
                    </div>
                    <div class="flex justify-between text-xs">
                        <span class="text-slate-400 font-semibold">Passageiro:</span>
                        <span id="successPassenger" class="font-bold text-slate-800">Carlos Eduardo Silva</span>
                    </div>
                    <div class="flex justify-between text-xs">
                        <span class="text-slate-400 font-semibold">Rota:</span>
                        <span id="successRoute" class="font-bold text-slate-800">São Paulo ➔ Lisboa</span>
                    </div>
                    <div class="flex justify-between text-xs">
                        <span class="text-slate-400 font-semibold">Companhia:</span>
                        <span id="successAirline" class="font-bold text-slate-800">AeroSky Airlines</span>
                    </div>
                </div>
                <div class="pt-4 flex justify-center gap-4">
                    <button onclick="closeCheckoutModal(); openMyTripsModal();" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-md">Ver em Minhas Viagens</button>
                    <button onclick="closeCheckoutModal(); navigateHome();" class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl text-xs transition-all">Voltar ao Início</button>
                </div>
            </div>
        </div>
    </div>

    <div id="myTripsModal" class="fixed inset-0 z-50 hidden items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
        <div class="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl modal-enter relative my-8">
            <button onclick="closeMyTripsModal()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all"><i class="fa-solid fa-xmark"></i></button>
            <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl"><i class="fa-solid fa-ticket"></i></div>
                <div>
                    <h3 class="text-xl font-black text-slate-900">Minhas Viagens Reservadas</h3>
                    <span class="text-xs text-slate-400">Histórico salvo no seu navegador</span>
                </div>
            </div>
            <div id="tripsListContainer" class="space-y-3 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                <!-- Dynamically injected trips -->
            </div>
        </div>
    </div>

    <div id="supportModal" class="fixed inset-0 z-50 hidden items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
        <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl modal-enter relative">
            <button onclick="closeSupportModal()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all"><i class="fa-solid fa-xmark"></i></button>
            <div class="text-center mb-6">
                <div class="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mx-auto mb-3"><i class="fa-solid fa-headset"></i></div>
                <h3 class="text-xl font-black text-slate-900">Central de Atendimento AeroSky</h3>
                <p class="text-xs text-slate-500 mt-1">Estamos disponíveis 24 horas por dia para tirar suas dúvidas.</p>
            </div>
            <div class="space-y-3 text-sm">
                <div class="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <i class="fa-brands fa-whatsapp text-emerald-600 text-2xl"></i>
                    <div>
                        <strong class="block text-slate-900 text-xs">WhatsApp Exclusivo</strong>
                        <span class="text-xs text-slate-500">+55 (11) 98888-7777</span>
                    </div>
                </div>
                <div class="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <i class="fa-solid fa-envelope text-blue-600 text-2xl"></i>
                    <div>
                        <strong class="block text-slate-900 text-xs">E-mail de Suporte</strong>
                        <span class="text-xs text-slate-500">suporte@aerosky.com.br</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center text-white"><i class="fa-solid fa-plane-departure"></i></div>
                    <span class="text-xl font-extrabold text-white">Aero<span class="text-blue-500">Sky</span></span>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">Sua agência de viagens digital completa para voar para mais de 50 países com segurança, conforto e os menores preços do mercado.</p>
            </div>
            <div>
                <h5 class="text-white text-xs font-bold uppercase tracking-wider mb-4">Destinos Populares</h5>
                <ul class="space-y-2 text-xs">
                    <li><a href="#destinos" class="hover:text-white transition-colors">Lisboa, Portugal</a></li>
                    <li><a href="#destinos" class="hover:text-white transition-colors">Miami, Estados Unidos</a></li>
                    <li><a href="#destinos" class="hover:text-white transition-colors">Buenos Aires, Argentina</a></li>
                    <li><a href="#destinos" class="hover:text-white transition-colors">Tóquio, Japão</a></li>
                </ul>
            </div>
            <div>
                <h5 class="text-white text-xs font-bold uppercase tracking-wider mb-4">Empresa</h5>
                <ul class="space-y-2 text-xs">
                    <li><a href="#" class="hover:text-white transition-colors">Sobre a AeroSky</a></li>
                    <li><a href="#" class="hover:text-white transition-colors">Trabalhe Conosco</a></li>
                    <li><a href="#" class="hover:text-white transition-colors">Termos de Uso</a></li>
                    <li><a href="#" class="hover:text-white transition-colors">Política de Privacidade</a></li>
                </ul>
            </div>
            <div>
                <h5 class="text-white text-xs font-bold uppercase tracking-wider mb-4">Receba Ofertas</h5>
                <p class="text-xs text-slate-400 mb-3">Cadastre seu e-mail para receber passagens promocionais em primeira mão.</p>
                <div class="flex gap-2">
                    <input type="email" placeholder="seu@email.com" class="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white w-full focus:outline-none focus:border-blue-500">
                    <button onclick="alertNewsletter()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all">OK</button>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            &copy; 2026 AeroSky Passagens Aéreas S.A. Todos os direitos reservados.
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const today = new Date();
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            const returnWeek = new Date(today);
            returnWeek.setDate(today.getDate() + 14);

            const depInput = document.getElementById('departureDate');
            const retInput = document.getElementById('returnDate');
            
            if (depInput) depInput.valueAsDate = nextWeek;
            if (retInput) retInput.valueAsDate = returnWeek;

            if (!localStorage.getItem('aerosky_trips')) {
                localStorage.setItem('aerosky_trips', JSON.stringify([]));
            }
        });

        let currentFlightsData = [];
        let selectedFlight = null;

        const airlines = [
            { name: "AeroSky Airlines", logo: "fa-plane-departure", color: "text-blue-600" },
            { name: "Global Wings", logo: "fa-feather", color: "text-indigo-600" },
            { name: "Atlantic Airways", logo: "fa-cloud", color: "text-sky-600" },
            { name: "Meridian Express", logo: "fa-globe-americas", color: "text-emerald-600" }
        ];

        function navigateHome() {
            const resultsContainer = document.getElementById('resultsContainer');
            if(resultsContainer) resultsContainer.classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function selectQuickDestination(countryName) {
            const destSelect = document.getElementById('destinationSelect');
            if(destSelect) {
                destSelect.value = countryName;
            }
            const searchForm = document.getElementById('flightSearchForm');
            if(searchForm) {
                searchForm.scrollIntoView({ behavior: 'smooth' });
                searchForm.dispatchEvent(new Event('submit'));
            }
        }

        function handleSearchFlights(e) {
            e.preventDefault();
            const origin = document.getElementById('originSelect').value;
            const destination = document.getElementById('destinationSelect').value;
            const passengers = document.getElementById('passengerSelect').value;

            const resultsContainer = document.getElementById('resultsContainer');
            const resultsTitle = document.getElementById('resultsTitle');

            if(resultsContainer) resultsContainer.classList.remove('hidden');
            if(resultsTitle) resultsTitle.innerText = `Voos de ${origin} para ${destination} (${passengers})`;

            generateSimulatedFlights(destination);

            if(resultsContainer) resultsContainer.scrollIntoView({ behavior: 'smooth' });
        }

        function generateSimulatedFlights(dest) {
            currentFlightsData = [];
            const count = 5;
            
            for(let i = 0; i < count; i++) {
                const airline = airlines[Math.floor(Math.random() * airlines.length)];
                const basePrice = Math.floor(Math.random() * 3500) + 1200;
                const hours = Math.floor(Math.random() * 10) + 2;
                const stops = Math.random() > 0.5 ? 'Direto' : '1 Escala';
                
                const depHour = `${String(Math.floor(Math.random() * 18) + 6).padStart(2,'0')}:${Math.random() > 0.5 ? '00' : '30'}`;
                const arrHour = `${String((parseInt(depHour.split(':')[0]) + hours) % 24).padStart(2,'0')}:${depHour.split(':')[1]}`;

                currentFlightsData.push({
                    id: `FL-${Math.floor(Math.random()*90000)+10000}`,
                    airline: airline.name,
                    airlineLogo: airline.logo,
                    airlineColor: airline.color,
                    origin: document.getElementById('originSelect').value,
                    destination: dest,
                    departureTime: depHour,
                    arrivalTime: arrHour,
                    duration: `${hours}h 15m`,
                    stops: stops,
                    price: basePrice
                });
            }

            renderFlights(currentFlightsData);
        }

        function renderFlights(flights) {
            const listEl = document.getElementById('flightList');
            if(!listEl) return;
            listEl.innerHTML = '';

            flights.forEach(flight => {
                const card = document.createElement('div');
                card.className = "bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-6";
                card.innerHTML = `
                    <div class="flex items-center gap-4 w-full md:w-auto">
                        <div class="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-xl ${flight.airlineColor}">
                            <i class="fa-solid ${flight.airlineLogo}"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-slate-900">${flight.airline}</h4>
                            <span class="text-xs font-semibold text-slate-400">Voo ${flight.id} • Classe Econômica</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-6 text-center w-full md:w-auto justify-between md:justify-center">
                        <div>
                            <span class="block text-lg font-extrabold text-slate-900">${flight.departureTime}</span>
                            <span class="text-xs text-slate-500">${flight.origin}</span>
                        </div>
                        <div class="flex flex-col items-center px-4">
                            <span class="text-xs text-slate-400 mb-1">${flight.duration}</span>
                            <div class="w-32 h-0.5 bg-slate-200 relative">
                                <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-white px-1 text-slate-400 text-[10px]">
                                    <i class="fa-solid fa-plane"></i>
                                </div>
                            </div>
                            <span class="text-[11px] font-semibold text-blue-600 mt-1">${flight.stops}</span>
                        </div>
                        <div>
                            <span class="block text-lg font-extrabold text-slate-900">${flight.arrivalTime}</span>
                            <span class="text-xs text-slate-500">${flight.destination}</span>
                        </div>
                    </div>

                    <div class="flex items-center justify-between w-full md:w-auto gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                        <div class="text-right">
                            <span class="text-xs text-slate-400 block">por passageiro</span>
                            <span class="text-2xl font-black text-blue-600">R$ ${flight.price.toLocaleString('pt-BR')}</span>
                        </div>
                        <button onclick='openCheckoutModal(${JSON.stringify(flight)})' class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer">
                            Selecionar Voo
                        </button>
                    </div>
                `;
                listEl.appendChild(card);
            });
        }

        function sortFlights() {
            const sortBy = document.getElementById('sortSelect').value;
            if(sortBy === 'price') {
                currentFlightsData.sort((a,b) => a.price - b.price);
            } else if(sortBy === 'duration') {
                currentFlightsData.sort((a,b) => parseInt(a.duration) - parseInt(b.duration));
            } else if(sortBy === 'departure') {
                currentFlightsData.sort((a,b) => a.departureTime.localeCompare(b.departureTime));
            }
            renderFlights(currentFlightsData);
        }

        function openCheckoutModal(flight) {
            selectedFlight = flight;
            const modal = document.getElementById('checkoutModal');
            if(modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex', 'modal-enter');
            }

            const summary = document.getElementById('checkoutFlightSummary');
            if(summary) {
                summary.innerHTML = `
                    <div class="flex items-center gap-3">
                        <i class="fa-solid fa-plane text-blue-600 text-xl"></i>
                        <div>
                            <strong class="block text-sm text-slate-900">${flight.airline} (${flight.origin} ➔ ${flight.destination})</strong>
                            <span class="text-xs text-slate-500">Saída às ${flight.departureTime} • ${flight.stops}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="text-xs text-slate-400 block">Total</span>
                        <span class="text-lg font-bold text-blue-600">R$ ${flight.price.toLocaleString('pt-BR')}</span>
                    </div>
                `;
            }

            goToStep1();
        }

        function closeCheckoutModal() {
            const modal = document.getElementById('checkoutModal');
            if(modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        }

        function goToStep1() {
            document.getElementById('step1Content').classList.remove('hidden');
            document.getElementById('step2Content').classList.add('hidden');
            document.getElementById('step3Content').classList.add('hidden');

            document.getElementById('stepIndicator1').className = "flex items-center gap-2 text-blue-600 font-bold";
            document.getElementById('stepIndicator2').className = "flex items-center gap-2 text-slate-400";
        }

        function goToStep2() {
            const name = document.getElementById('passengerName').value;
            const doc = document.getElementById('passengerDocument').value;
            const email = document.getElementById('passengerEmail').value;
            const phone = document.getElementById('passengerPhone').value;

            if(!name || !doc || !email || !phone) {
                alert("Por favor, preencha todos os campos obrigatórios de informações pessoais.");
                return;
            }

            document.getElementById('step1Content').classList.add('hidden');
            document.getElementById('step2Content').classList.remove('hidden');
            document.getElementById('step3Content').classList.add('hidden');

            document.getElementById('stepIndicator1').className = "flex items-center gap-2 text-slate-400";
            document.getElementById('stepIndicator2').className = "flex items-center gap-2 text-blue-600 font-bold";
        }

        function selectPaymentMethod(method) {
            const methods = ['credit', 'pix', 'boleto', 'paypal'];
            methods.forEach(m => {
                const btn = document.getElementById(`payBtn${m.charAt(0).toUpperCase() + m.slice(1)}`);
                const form = document.getElementById(`payment${m.charAt(0).toUpperCase() + m.slice(1)}Form`);
                if(btn) btn.className = "p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 text-slate-600 font-semibold text-xs flex flex-col items-center justify-center gap-2 transition-all cursor-pointer";
                if(form) form.classList.add('hidden');
            });

            const activeBtn = document.getElementById(`payBtn${method.charAt(0).toUpperCase() + method.slice(1)}`);
            const activeForm = document.getElementById(`payment${method.charAt(0).toUpperCase() + method.slice(1)}Form`);
            if(activeBtn) activeBtn.className = "p-4 rounded-2xl border-2 border-blue-600 bg-blue-50 text-blue-700 font-semibold text-xs flex flex-col items-center justify-center gap-2 transition-all cursor-pointer";
            if(activeForm) activeForm.classList.remove('hidden');
        }

        function handleCheckoutSubmit(e) {
            e.preventDefault();
            
            const name = document.getElementById('passengerName').value;
            const pnr = `SK${Math.floor(Math.random()*90000)+10000}`;

            const trips = JSON.parse(localStorage.getItem('aerosky_trips') || '[]');
            const newTrip = {
                pnr: pnr,
                passenger: name,
                route: `${selectedFlight.origin} ➔ ${selectedFlight.destination}`,
                airline: selectedFlight.airline,
                price: selectedFlight.price,
                date: new Date().toLocaleDateString('pt-BR')
            };
            trips.push(newTrip);
            localStorage.setItem('aerosky_trips', JSON.stringify(trips));

            document.getElementById('successPNR').innerText = pnr;
            document.getElementById('successPassenger').innerText = name;
            document.getElementById('successRoute').innerText = newTrip.route;
            document.getElementById('successAirline').innerText = newTrip.airline;

            document.getElementById('step2Content').classList.add('hidden');
            document.getElementById('step3Content').classList.remove('hidden');

            document.getElementById('stepIndicator2').className = "flex items-center gap-2 text-slate-400";
            document.getElementById('stepIndicator3').className = "flex items-center gap-2 text-emerald-600 font-bold";
        }

        function openMyTripsModal() {
            const trips = JSON.parse(localStorage.getItem('aerosky_trips') || '[]');
            const container = document.getElementById('tripsListContainer');
            if(!container) return;
            container.innerHTML = '';

            if(trips.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-8 text-slate-400">
                        <i class="fa-solid fa-ticket text-4xl mb-2"></i>
                        <p class="text-sm">Nenhuma viagem encontrada no seu histórico recente.</p>
                    </div>
                `;
            } else {
                trips.forEach(trip => {
                    const item = document.createElement('div');
                    item.className = "bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between";
                    item.innerHTML = `
                        <div>
                            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">PNR: ${trip.pnr}</span>
                            <h4 class="font-bold text-slate-900 mt-1">${trip.route}</h4>
                            <p class="text-xs text-slate-500">${trip.airline} • Passageiro: ${trip.passenger}</p>
                        </div>
                        <div class="text-right">
                            <span class="text-sm font-extrabold text-slate-900">R$ ${trip.price.toLocaleString('pt-BR')}</span>
                            <span class="block text-[10px] text-slate-400">Emitido em ${trip.date}</span>
                        </div>
                    `;
                    container.appendChild(item);
                });
            }

            const modal = document.getElementById('myTripsModal');
            if(modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex', 'modal-enter');
            }
        }

        function closeMyTripsModal() {
            const modal = document.getElementById('myTripsModal');
            if(modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        }

        function openSupportModal() {
            const modal = document.getElementById('supportModal');
            if(modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex', 'modal-enter');
            }
        }

        function closeSupportModal() {
            const modal = document.getElementById('supportModal');
            if(modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        }

        function alertNewsletter() {
            alert("E-mail cadastrado com sucesso! Você receberá nossas ofertas.");
        }
    </script>
</body>
</html>