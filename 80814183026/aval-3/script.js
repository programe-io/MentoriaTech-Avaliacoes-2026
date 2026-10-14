const btn = document.getElementById('menuBtn');
const links = document.getElementById('navLinks');
btn.onclick = () => links.classList.toggle('open');

document.querySelectorAll('.nav-links a').forEach(a=>{
  a.onclick = (e)=>{
    e.preventDefault();
    document.querySelectorAll('.nav-links a').forEach(x=>x.classList.remove('active'));
    a.classList.add('active');
    document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});
    links.classList.remove('open');
  }
});

document.getElementById('form').onsubmit = (e)=>{
  e.preventDefault();
  alert('Mensagem enviada!');
  e.target.reset();
}
