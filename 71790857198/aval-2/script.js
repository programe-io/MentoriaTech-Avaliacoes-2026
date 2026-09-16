<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfólio | Lara Pereira Maia</title>
    <link rel="stylesheet" href="style.css">
    <!-- Ícones Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

    <!-- Cabeçalho e Navegação -->
    <header>
        <div class="logo">&lt;Lara Maia/&gt;</div>
        <nav>
            <ul>
                <li><a href="#sobre">Sobre Mim</a></li>
                <li><a href="#habilidades">Habilidades</a></li>
                <li><a href="#projetos">Projetos & Lógica</a></li>
                <li><a href="#futuro">Fisioterapia & Tech</a></li>
                <li><a href="#contato">Contato</a></li>
            </ul>
        </nav>
    </header>

    <!-- Seção Principal / Apresentação -->
    <section class="hero">
        <div class="hero-content">
            <span class="badge">Futura Fisioterapeuta & Dev</span>
            <h1>Olá, eu sou a <br><span class="destaque">Lara Pereira Maia</span></h1>
            <p class="subtitulo">17 anos | Aluna do CETI Paulo Freire | Técnica em Desenvolvimento de Sistemas</p>
            <p class="frase-motto">"Mapeando o futuro através da tecnologia, das linguagens e do cuidado com o ser humano."</p>
            <div class="hero-btns">
                <a href="#projetos" class="btn btn-primary">Ver Projetos</a>
                <a href="#contato" class="btn btn-secondary">Entre em Contato</a>
            </div>
        </div>
    </section>

    <!-- Seção Sobre Mim -->
    <section id="sobre" class="secao">
        <h2 class="titulo-secao">Sobre Mim</h2>
        <div class="sobre-container">
            <div class="sobre-card">
                <i class="fa-solid fa-graduation-cap icono"></i>
                <h3>Formação Técnica</h3>
                <p>Estudante do curso Técnico em Desenvolvimento de Sistemas no <strong>CETI Paulo Freire</strong>, desenvolvendo raciocínio lógico e habilidades computacionais.</p>
            </div>
            <div class="sobre-card">
                <i class="fa-solid fa-book-open-reader icono"></i>
                <h3>Gosto por Estudos</h3>
                <p>Meu principal hobby é <strong>estudar e aprender coisas novas</strong> todos os dias. Tenho grande facilidade com a área de Linguagens e comunicação.</p>
            </div>
            <div class="sobre-card">
                <i class="fa-solid fa-user-doctor icono"></i>
                <h3>Visão de Futuro</h3>
                <p>Aspirante à carreira de <strong>Fisioterapia</strong>, buscando unir a tecnologia e a ciência para transformar o cuidado com a saúde humana.</p>
            </div>
        </div>
    </section>

    <!-- Seção Habilidades -->
    <section id="habilidades" class="secao bg-alt">
        <h2 class="titulo-secao">Habilidades & Conhecimentos</h2>
        <div class="grid-habilidades">
            <div class="card-hab">
                <i class="fa-brands fa-html5"></i>
                <h4>HTML5</h4>
                <p>Estruturação web moderna e semântica.</p>
            </div>
            <div class="card-hab">
                <i class="fa-brands fa-css3-alt"></i>
                <h4>CSS3</h4>
                <p>Estilização responsiva, animações e layouts modernos.</p>
            </div>
            <div class="card-hab">
                <i class="fa-brands fa-java"></i>
                <h4>Java & Lógica</h4>
                <p>Estrutura de dados e lógica de programação orientada a objetos.</p>
            </div>
            <div class="card-hab">
                <i class="fa-solid fa-language"></i>
                <h4>Área de Linguagens</h4>
                <p>Comunicação clara, interpretação e facilidade com idiomas e escrita.</p>
            </div>
            <div class="card-hab">
                <i class="fa-solid fa-lightbulb"></i>
                <h4>Pensamento Crítico</h4>
                <p>Resolução de problemas de forma estruturada e analítica.</p>
            </div>
            <div class="card-hab">
                <i class="fa-solid fa-heart-pulse"></i>
                <h4>Tecnologia na Saúde</h4>
                <p>Interesse em biotecnologia, ergonomia e saúde do movimento.</p>
            </div>
        </div>
    </section>

    <!-- Seção Projetos Interativos -->
    <section id="projetos" class="secao">
        <h2 class="titulo-secao">Projetos & Aplicações Práticas</h2>
        <div class="grid-projetos">

            <!-- Projeto 1 -->
            <div class="card-projeto">
                <h3>1. Sistema de Agendamento Fisioterapêutico (Java)</h3>
                <p>Projeto conceitual em <strong>Java</strong> simulando o cadastro de pacientes e triagem para clínicas de fisioterapia.</p>
                <div class="tags">
                    <span>Java</span>
                    <span>Lógica de Programação</span>
                    <span>Saúde</span>
                </div>
            </div>

            <!-- Projeto 2 (Interativo com JS) -->
            <div class="card-projeto">
                <h3>2. Calculadora Ergonomia & Postura (JS Interativo)</h3>
                <p>Ferramenta em JavaScript para avaliar a pausa recomendada de estudantes/devs na frente da tela.</p>
                <div class="interacao-box">
                    <label>Horas estudando por dia:</label>
                    <input type="number" id="horasEstudo" placeholder="Ex: 5" min="1" max="24">
                    <button onclick="calcularPausa()">Calcular Pausa Recomendada</button>
                    <p id="resultadoPausa" class="resultado"></p>
                </div>
                <div class="tags">
                    <span>HTML</span>
                    <span>CSS</span>
                    <span>JavaScript</span>
                </div>
            </div>

            <!-- Projeto 3 -->
            <div class="card-projeto">
                <h3>3. Plataforma Educacional de Idiomas</h3>
                <p>Website desenvolvido para auxílio no aprendizado e estudo contínuo de linguagens e comunicação.</p>
                <div class="tags">
                    <span>HTML5</span>
                    <span>CSS3</span>
                    <span>Educação</span>
                </div>
            </div>

        </div>
    </section>

    <!-- Seção Visão do Futuro -->
    <section id="futuro" class="secao bg-alt">
        <h2 class="titulo-secao">Tecnologia + Fisioterapia</h2>
        <div class="futuro-box">
            <p>O futuro da saúde exige profissionais atualizados com a tecnologia. Pretendo aplicar meu conhecimento em desenvolvimento de sistemas para aperfeiçoar processos na <strong>Fisioterapia</strong>, utilizando:</p>
            <ul>
                <li><i class="fa-solid fa-check"></i> Análise de dados em recuperação física</li>
                <li><i class="fa-solid fa-check"></i> Softwares de acompanhamento de pacientes</li>
                <li><i class="fa-solid fa-check"></i> Dispositivos de tecnologia assistiva e ergonomia</li>
            </ul>
        </div>
    </section>

    <!-- Seção Contato -->
    <section id="contato" class="secao">
        <h2 class="titulo-secao">Vamos Conectar?</h2>
        <p>Sinta-se à vontade para entrar em contato ou trocar ideias sobre tecnologia e saúde!</p>
        <div class="contato-container">
            <button class="btn btn-primary" onclick="mostrarMensagem()">Clique para Enviar uma Mensagem</button>
            <p id="msgContato" class="mensagem-escondida">Obrigado pela visita! Você pode me encontrar no CETI Paulo Freire. 🚀</p>
        </div>
    </section>

    <!-- Rodapé -->
    <footer>
        <p>&copy; 2026 Lara Pereira Maia | Desenvolvido com HTML, CSS e JavaScript</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>