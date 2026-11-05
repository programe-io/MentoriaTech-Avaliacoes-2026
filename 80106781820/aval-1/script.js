function f() {
  const b = document.getElementById('box');
  const btn = b.querySelector('button');
  
  b.classList.toggle('max');
  btn.textContent = b.classList.contains('max') ? 'Restaurar' : 'Maximizar';
}