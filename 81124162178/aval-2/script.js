function filterDoramas() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('dorama-card');

    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getAttribute('data-title');
        
        if (title.includes(input)) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}