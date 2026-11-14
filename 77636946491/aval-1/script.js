const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.article-card');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const selected = button.dataset.filter;
  cards.forEach(card => card.classList.toggle('hidden', selected !== 'all' && card.dataset.game !== selected));
}));
const overlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');
const results = document.getElementById('search-results');
function openSearch(){ overlay.classList.add('open'); overlay.setAttribute('aria-hidden','false'); setTimeout(()=>searchInput.focus(),50); }
function closeSearch(){ overlay.classList.remove('open'); overlay.setAttribute('aria-hidden','true'); }
document.getElementById('search-toggle').addEventListener('click',openSearch);
document.getElementById('search-close').addEventListener('click',closeSearch);
overlay.addEventListener('click',event=>{if(event.target===overlay)closeSearch();});
document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();openSearch();}if(event.key==='Escape')closeSearch();});
searchInput.addEventListener('input',()=>{
 const query=searchInput.value.trim().toLocaleLowerCase('pt-BR');
 if(!query){results.innerHTML='';return;}
 const matches=[...cards].filter(card=>card.innerText.toLocaleLowerCase('pt-BR').includes(query));
 results.innerHTML=matches.length?matches.map(card=>`<a class="search-result" href="${card.querySelector('.article-art').getAttribute('href')}"><small>${card.querySelector('.category').innerText}</small>${card.querySelector('h3').innerText}</a>`).join(''):'<p>Nenhum artigo encontrado. Tente outro termo.</p>';
});
document.getElementById('newsletter-form').addEventListener('submit',event=>{
 event.preventDefault();
 document.getElementById('form-note').textContent='Valeu por se inscrever! Em breve chegam novidades.';
 event.currentTarget.reset();
});
