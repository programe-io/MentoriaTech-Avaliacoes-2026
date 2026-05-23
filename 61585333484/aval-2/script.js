const links = document.querySelectorAll('.navbar a');

links.forEach(link => {

  link.addEventListener('click', () => {

    links.forEach(item => {
      item.classList.remove('active');
    });

    link.classList.add('active');

  });

});

const cards = document.querySelectorAll('.card');

cards.forEach(card => {

  card.addEventListener('mouseenter', () => {

    card.style.boxShadow =
    '0 0 25px rgba(0,229,255,0.4)';

  });

  card.addEventListener('mouseleave', () => {

    card.style.boxShadow = 'none';

  });

});

window.addEventListener('scroll', () => {

  const header = document.querySelector('.header');

  if(window.scrollY > 50){

    header.style.background =
    'rgba(5,8,22,0.95)';

  } else {

    header.style.background =
    'rgba(255,255,255,0.05)';

  }

});