/* Scroll reveal */
document.addEventListener('DOMContentLoaded', function(){
  var els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    els.forEach(function(el){ el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var el = entry.target;
        var siblings = Array.from(el.parentElement.children).filter(function(c){
          return c.classList && c.classList.contains('reveal');
        });
        var idx = siblings.indexOf(el);
        setTimeout(function(){ el.classList.add('visible'); }, Math.min(idx * 90, 450));
        io.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  els.forEach(function(el){ io.observe(el); });

  /* FAQ toggle */
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click', function(){
      var item = q.parentElement;
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){ o.classList.remove('open'); });
      if(!wasOpen){ item.classList.add('open'); }
    });
  });
});

/* Interactive commit */
function commitAdvantage(){
  var input = document.getElementById('advantageInput');
  var val = input.value.trim();
  if(!val){ input.focus(); input.style.borderColor = '#a8432a'; return; }
  input.value = '';
  input.style.borderColor = '';
  alert('✅ Commitment saved:\n\n"' + val + '"\n\nNow go make it true.');
}

/* Contact form */
function handleSubmit(e){
  e.preventDefault();
  var name = document.getElementById('fname').value.trim();
  alert('Thank you, ' + (name || 'friend') + '.\n\nYour message has been received. I\'ll reply personally within two business days.');
  e.target.reset();
}