<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TaskFlow | Gerencie seus projetos</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body class="bg-slate-50 text-slate-800">
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" class="text-2xl font-bold text-indigo-700" aria-label="TaskFlow início">TaskFlow</a>
        <button id="menuToggle" class="md:hidden text-2xl" aria-label="Abrir menu" aria-expanded="false">☰</button>
        <nav id="navMenu" class="hidden md:flex items-center">
          <a class="nav-link" href="#recursos">Recursos</a>
          <a class="nav-link" href="#planos">Planos</a>
          <a class="nav-link" href="#sobre">Sobre</a>
          <a href="#cta" class="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold transition">Começar agora</a>
        </nav>
      </div>
      <nav id="mobileMenu" class="hidden md:hidden px-6 pb-4 flex flex-col gap-3">
        <a href="#recursos" class="mobile-link">Recursos</a>
        <a href="#planos" class="mobile-link">Planos</a>
        <a href="#sobre" class="mobile-link">Sobre</a>
        <a href="#cta" class="mobile-link">Começar agora</a>
      </nav>
    </header>

    <!-- Hero -->
    <section id="sobre" class="hero-section">
      <div class="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div class="text-center md:text-left">
          <span class="inline-block bg-indigo-100 text-indigo-700 font-semibold rounded-full px-4 py-2 mb-5">Organização para sua equipe</span>
          <h1 class="max-w-2xl mx-auto md:mx-0 text-4xl md:text-5xl font-bold leading-tight text-slate-900">Gerencie seus projetos com simplicidade</h1>
          <p class="mt-6 max-w-xl mx-auto md:mx-0 text-lg text-slate-600">Planeje tarefas, acompanhe prazos e mantenha sua equipe alinhada em um só lugar.</p>
          <div class="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <a href="#planos" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-7 py-3 rounded-lg transition text-center">Conheça os planos</a>
            <button id="demoButton" class="border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50 font-bold tracking-wide px-7 py-3 rounded-lg transition">Ver demonstração</button>
          </div>
        </div>
        <div class="hero-art">
          <div class="dashboard-card">
            <div class="flex items-center justify-between mb-6"><div><p class="text-sm text-slate-500">Visão geral</p><h2 class="text-xl font-bold">Meu projeto</h2></div><span class="bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm">Em andamento</span></div>
            <div class="space-y-4">
              <div class="task-row"><span class="task-check">✓</span><div class="flex-1"><p class="font-semibold">Planejamento</p><div class="progress"><span style="width:100%"></span></div></div><span class="text-sm text-slate-500">100%</span></div>
              <div class="task-row"><span class="task-check">✓</span><div class="flex-1"><p class="font-semibold">Design</p><div class="progress"><span style="width:75%"></span></div></div><span class="text-sm text-slate-500">75%</span></div>
              <div class="task-row"><span class="task-check pending">•</span><div class="flex-1"><p class="font-semibold">Desenvolvimento</p><div class="progress"><span style="width:45%"></span></div></div><span class="text-sm text-slate-500">45%</span></div>
              <div class="task-row"><span class="task-check pending">•</span><div class="flex-1"><p class="font-semibold">Entrega</p><div class="progress"><span style="width:15%"></span></div></div><span class="text-sm text-slate-500">15%</span></div>
            </div>
          </div>
          <div class="decor decor-one"></div><div class="decor decor-two"></div>
        </div>
      </div>
    </section>

    <!-- Main / features -->
    <main id="recursos" class="flex-1">
      <section class="max-w-7xl mx-auto px-6 py-16">
        <div class="text-center max-w-2xl mx-auto">
          <p class="text-indigo-600 font-semibold">Recursos</p>
          <h2 class="text-3xl font-bold mt-2">Tudo que sua equipe precisa</h2>
          <p class="mt-4 text-slate-600">Ferramentas simples para organizar o trabalho e acompanhar os resultados.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-6 mt-12">
          <article class="feature-card"><div class="feature-icon">📋</div><h3 class="text-xl font-bold mt-4">Organize tarefas</h3><p class="mt-2 text-slate-600">Crie tarefas, defina responsáveis e mantenha as atividades organizadas.</p></article>
          <article class="feature-card"><div class="feature-icon">📈</div><h3 class="text-xl font-bold mt-4">Acompanhe o progresso</h3><p class="mt-2 text-slate-600">Visualize o andamento dos projetos e identifique o que precisa de atenção.</p></article>
          <article class="feature-card"><div class="feature-icon">🤝</div><h3 class="text-xl font-bold mt-4">Trabalhe em equipe</h3><p class="mt-2 text-slate-600">Compartilhe informações e mantenha todos alinhados com os objetivos.</p></article>
        </div>
      </section>

      <!-- Plans -->
      <section id="planos" class="bg-white py-16">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center max-w-2xl mx-auto">
            <p class="text-indigo-600 font-semibold">Planos</p><h2 class="text-3xl font-bold mt-2">Escolha o plano ideal</h2>
            <p class="mt-4 text-slate-600">Comece gratuitamente ou escolha mais recursos para sua equipe.</p>
          </div>
          <div class="grid md:grid-cols-3 gap-8 mt-12">
            <article class="plan-card">
              <h3 class="text-xl font-bold">Essencial</h3><p class="text-slate-600 mt-2">Para organizar seu trabalho individual.</p>
              <div class="price mt-6"><span class="old-price">R$ 19,90</span><div><span class="text-4xl font-bold">R$ 0</span><span class="text-slate-500">/mês</span></div></div>
              <ul class="plan-list"><li>✓ Até 3 projetos</li><li>✓ Organização de tarefas</li><li>✓ Acompanhamento básico</li></ul>
              <button class="plan-button" data-plan="Essencial">Selecionar plano</button>
            </article>
            <article class="plan-card featured-plan">
              <span class="plan-badge">Mais popular</span><h3 class="text-xl font-bold">Profissional</h3><p class="text-slate-600 mt-2">Para equipes que querem evoluir.</p>
              <div class="price mt-6"><span class="old-price">R$ 49,90</span><div><span class="text-4xl font-bold">R$ 29,90</span><span class="text-slate-500">/mês</span></div></div>
              <ul class="plan-list"><li>✓ Projetos ilimitados</li><li>✓ Relatórios de progresso</li><li>✓ Até 10 integrantes</li><li>✓ Suporte prioritário</li></ul>
              <button class="plan-button primary" data-plan="Profissional">Selecionar plano</button>
            </article>
            <article class="plan-card">
              <h3 class="text-xl font-bold">Equipe</h3><p class="text-slate-600 mt-2">Para equipes e empresas maiores.</p>
              <div class="price mt-6"><span class="old-price">R$ 99,90</span><div><span class="text-4xl font-bold">R$ 69,90</span><span class="text-slate-500">/mês</span></div></div>
              <ul class="plan-list"><li>✓ Tudo do Profissional</li><li>✓ Até 50 integrantes</li><li>✓ Painel avançado</li><li>✓ Gestão de permissões</li></ul>
              <button class="plan-button" data-plan="Equipe">Selecionar plano</button>
            </article>
          </div>
        </div>
      </section>
    </main>

    <!-- CTA -->
    <section id="cta" class="cta-section">
      <div class="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 class="text-3xl md:text-4xl font-bold">Seus projetos, mais organizados a partir de hoje.</h2>
        <p class="mt-4 text-indigo-100 text-lg">Experimente uma maneira mais simples de planejar e acompanhar suas atividades.</p>
        <button id="startButton" class="mt-8 bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-3 rounded-lg font-bold transition">Começar gratuitamente</button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-300">
      <div class="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div><p class="text-white font-bold text-xl">TaskFlow</p><p class="text-sm mt-1">Organize. Planeje. Realize.</p></div>
        <p class="text-sm">© <span id="year"></span> TaskFlow. Projeto demonstrativo.</p>
        <div class="flex gap-5"><a class="footer-link" href="#sobre">Sobre</a><a class="footer-link" href="#recursos">Recursos</a><a class="footer-link" href="#planos">Planos</a></div>
      </div>
    </footer>
  </div>

  <!-- Modal -->
  <div id="modal" class="modal hidden" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="modal-panel">
      <button id="closeModal" class="modal-close" aria-label="Fechar">×</button>
      <h2 id="modalTitle" class="text-2xl font-bold">Conheça o TaskFlow</h2>
      <p id="modalMessage" class="mt-3 text-slate-600">Veja como organizar seus projetos com mais facilidade.</p>
      <form id="demoForm" class="mt-6">
        <label for="userName" class="form-label">Seu nome</label><input id="userName" name="userName" required minlength="2" class="form-input" placeholder="Digite seu nome">
        <label for="userEmail" class="form-label mt-4">E-mail</label><input id="userEmail" name="userEmail" type="email" required class="form-input" placeholder="seu@email.com">
        <button class="plan-button primary mt-6" type="submit">Enviar solicitação</button>
      </form>
      <p id="formMessage" class="mt-4 text-sm" aria-live="polite"></p>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>