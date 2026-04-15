function changeContent(type) {
    const card = document.getElementById('mainCard');
    const title = document.getElementById('title');
    const desc = document.getElementById('description');

    if (type === 'html') {
        title.innerText = "HTML5";
        desc.innerText = "A estrutura e o significado. É o esqueleto de qualquer site.";
        card.style.borderColor = "#e34c26"; // Laranja HTML
    } 
    else if (type === 'css') {
        title.innerText = "CSS3";
        desc.innerText = "O design e a estética. É o que torna a experiência bonita e responsiva.";
        card.style.borderColor = "#264de4"; // Azul CSS
    } 
    else if (type === 'js') {
        title.innerText = "JavaScript";
        desc.innerText = "A lógica e interatividade. Transforma páginas estáticas em aplicações vivas.";
        card.style.borderColor = "#f7df1e"; // Amarelo JS
    }
}