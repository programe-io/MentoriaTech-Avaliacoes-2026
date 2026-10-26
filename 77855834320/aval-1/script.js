
document.querySelectorAll('nav a').forEach(function(link) {
  link.addEventListener('click', function() {
    console.log('Navegação: ' + link.textContent);
  });
});

document.querySelectorAll('.post a').forEach(function(link) {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    alert('Você está aprendendo com o Meu Blog!');
  });
});