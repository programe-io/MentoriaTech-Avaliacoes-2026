/* script.js */
function curtirPost(button) {
    const countSpan = button.querySelector('.likes-count');
    let currentLikes = countSpan.innerText;
    
    let numericValue;
    if (currentLikes.includes('k')) {
        numericValue = parseFloat(currentLikes.replace('k', '')) * 1000;
    } else {
        numericValue = parseInt(currentLikes);
    }

    if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        numericValue -= 1;
    } else {
        button.classList.add('liked');
        numericValue += 1;
    }

    if (numericValue >= 1000) {
        countSpan.innerText = (numericValue / 1000).toFixed(1) + 'k';
    } else {
        countSpan.innerText = numericValue;
    }
}