/* ============================================
   A CINCO PASSOS DE VOCÊ - Tribute Site
   JavaScript - Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  /* ---------- Botão "Voltar ao topo" ---------- */
  const btnTopo = document.getElementById('btnTopo')

  if (btnTopo) {
    btnTopo.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  /* ---------- Highlight dos cards de personagens ---------- */
  const characterCards = document.querySelectorAll('.character-card')

  characterCards.forEach(function (card) {
    card.addEventListener('click', function () {
      /* Remove destaque de todos os cards */
      characterCards.forEach(function (c) {
        c.style.outline = 'none'
      })
      /* Destaca o card clicado */
      card.style.outline = '4px solid #c0392b'
      card.style.outlineOffset = '-2px'
    })
  })

  /* ---------- Efeito de fade-in ao rolar ---------- */
  const revealElements = document.querySelectorAll(
    '.card, .character-card, .quote-card, .lesson-list li'
  )

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    revealElements.forEach(function (el) {
      el.classList.add('reveal-hidden')
      observer.observe(el)
    })
  } else {
    /* Fallback para browsers sem suporte: mostra tudo */
    revealElements.forEach(function (el) {
      el.classList.add('revealed')
    })
  }

  /* ---------- Frase aleatória no console ---------- */
  const quotes = [
    '"A vida é feita de momentos. Não os desperdice." - Stella Grant',
    '"Você não pode controlar quem você ama. Não importa o quanto tente." - Will Newman',
    '"O que é seis pés quando você quer ficar a cinco passos de alguém?" - Will Newman',
    '"Amar alguém é colocar a mão no fogo por ela. Mesmo que você se queime." - Stella Grant'
  ]

  console.log('=== A Cinco Passos de Você ===')
  console.log(quotes[Math.floor(Math.random() * quotes.length)])
  console.log('===============================')
})
