// Dicionário de Idiomas para Tradução Dinâmica
const i18nData = {
    pt: {
        nav_features: "Recursos",
        nav_plans: "Planos",
        nav_community: "Comunidade",
        nav_contact: "Contato",
        btn_free_trial: "Teste Grátis",
        hero_badge: "Nova versão 3.0 disponível!",
        hero_title_1: "Gerencie seus projetos com",
        hero_title_2: "simplicidade e hipervelocidade.",
        hero_subtitle: "A plataforma tudo-em-um perfeita para organizar demandas, acompanhar métricas em tempo real e evoluir a produtividade da sua equipe.",
        btn_hero_primary: "Começar 14 Dias Grátis",
        btn_hero_secondary: "Ver Demonstração",
        features_title: "Recursos projetados para encantar",
        features_subtitle: "Descubra os módulos que tornam nosso app único. Curta os seus favoritos!",
        card1_title: "Analytics Avançado",
        card1_desc: "Acompanhe métricas detalhadas em gráficos dinâmicos e exporte relatórios em segundos.",
        card2_title: "Colaboração em Tempo Real",
        card2_desc: "Trabalhe com múltiplos membros na mesma tela com suporte a cursores ao vivo.",
        card3_title: "Segurança Ponta a Ponta",
        card3_desc: "Dados protegidos por criptografia de ponta a ponta e backups automáticos na nuvem.",
        plans_title: "Escolha o seu plano",
        plans_subtitle: "Transparência total. Sem taxas escondidas. Cancele quando quiser.",
        plan_free_name: "Gratuito",
        plan_free_desc: "Para projetos pessoais rápidos.",
        plan_pro_name: "Pró",
        plan_pro_desc: "Ideal para pequenas equipes.",
        plan_master_name: "Master",
        plan_master_desc: "Para grandes empresas e escala.",
        per_month: "/ mês",
        btn_contract: "Contratar",
        cta_title: "Pronto para começar?",
        cta_subtitle: "Crie sua conta em menos de 2 minutos e transforme a forma como sua equipe trabalha hoje mesmo.",
        btn_cta: "Criar Conta Grátis"
    },
    en: {
        nav_features: "Features",
        nav_plans: "Pricing",
        nav_community: "Community",
        nav_contact: "Contact",
        btn_free_trial: "Free Trial",
        hero_badge: "New Version 3.0 Available!",
        hero_title_1: "Manage your projects with",
        hero_title_2: "simplicity and hyper-speed.",
        hero_subtitle: "The perfect all-in-one platform to organize tasks, track real-time metrics, and boost team productivity.",
        btn_hero_primary: "Start 14-Day Free Trial",
        btn_hero_secondary: "Watch Demo",
        features_title: "Features Designed to Delight",
        features_subtitle: "Discover modules that make our app unique. Like your favorites!",
        card1_title: "Advanced Analytics",
        card1_desc: "Track detailed metrics in dynamic charts and export reports in seconds.",
        card2_title: "Real-time Collaboration",
        card2_desc: "Work with multiple team members on the same screen with live cursors.",
        card3_title: "End-to-End Security",
        card3_desc: "Data protected with end-to-end encryption and automatic cloud backups.",
        plans_title: "Choose Your Plan",
        plans_subtitle: "Full transparency. No hidden fees. Cancel anytime.",
        plan_free_name: "Free",
        plan_free_desc: "For quick personal projects.",
        plan_pro_name: "Pro",
        plan_pro_desc: "Ideal for small teams.",
        plan_master_name: "Master",
        plan_master_desc: "For large companies & scaling.",
        per_month: "/ month",
        btn_contract: "Subscribe",
        cta_title: "Ready to Get Started?",
        cta_subtitle: "Create your account in under 2 minutes and transform how your team works today.",
        btn_cta: "Create Free Account"
    },
    es: {
        nav_features: "Funciones",
        nav_plans: "Planes",
        nav_community: "Comunidad",
        nav_contact: "Contacto",
        btn_free_trial: "Prueba Gratis",
        hero_badge: "¡Nueva versión 3.0 disponible!",
        hero_title_1: "Gestiona tus proyectos con",
        hero_title_2: "simplicidad e hipervelocidad.",
        hero_subtitle: "La plataforma todo-en-uno perfecta para organizar tareas, rastrear métricas y mejorar la productividad.",
        btn_hero_primary: "Prueba Gratis de 14 Días",
        btn_hero_secondary: "Ver Demostración",
        features_title: "Características Diseñadas para Encantar",
        features_subtitle: "Descubre los módulos que hacen única a nuestra app. ¡Dale me gusta a tus favoritos!",
        card1_title: "Analítica Avanzada",
        card1_desc: "Sigue métricas detalladas en gráficos dinámicos y exporta informes en segundos.",
        card2_title: "Colaboración en Tiempo Real",
        card2_desc: "Trabaja con varios miembros en la misma pantalla con cursores en vivo.",
        card3_title: "Seguridad de Extremo a Extremo",
        card3_desc: "Datos protegidos con encriptación de extremo a extremo y respaldos automáticos.",
        plans_title: "Elige tu Plan",
        plans_subtitle: "Transparência total. Sin tarifas ocultas. Cancela cuando quieras.",
        plan_free_name: "Gratis",
        plan_free_desc: "Para proyectos personales rápidos.",
        plan_pro_name: "Pro",
        plan_pro_desc: "Ideal para equipos pequeños.",
        plan_master_name: "Master",
        plan_master_desc: "Para grandes empresas y escala.",
        per_month: "/ mes",
        btn_contract: "Contratar",
        cta_title: "¿Listo para empezar?",
        cta_subtitle: "Crea tu cuenta en menos de 2 minutos y transforma la forma en que trabaja tu equipo hoy.",
        btn_cta: "Crear Cuenta Gratis"
    }
};

// Evento ao carregar o documento totalmente
document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica do Seletor de Idioma
    const langSelect = document.getElementById('langSelect');
    
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            changeLanguage(selectedLang);
        });
    }

    function changeLanguage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18nData[lang] && i18nData[lang][key]) {
                el.textContent = i18nData[lang][key];
            }
        });
    }

    // 2. Lógica do Sistema de Curtidas/Reações
    const likeButtons = document.querySelectorAll('.btn-like');

    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const icon = button.querySelector('i');
            const countSpan = button.querySelector('.like-count');
            let currentLikes = parseInt(countSpan.textContent);

            if (!button.classList.contains('liked')) {
                // Ativar Curtida
                button.classList.add('liked');
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid', 'animate-heart');
                countSpan.textContent = currentLikes + 1;
            } else {
                // Desativar Curtida
                button.classList.remove('liked');
                icon.classList.remove('fa-solid', 'animate-heart');
                icon.classList.add('fa-regular');
                countSpan.textContent = currentLikes - 1;
            }

            // Remove classe de animação temporária
            setTimeout(() => {
                icon.classList.remove('animate-heart');
            }, 400);
        });
    });
});