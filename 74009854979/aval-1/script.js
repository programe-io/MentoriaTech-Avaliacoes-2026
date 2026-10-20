function changeTemp(status) {
    const ledRing = document.getElementById('ledRing');
    const tempText = document.getElementById('tempText');

    // Remove classes anteriores
    ledRing.className = 'led-ring';

    if (status === 'cold') {
        ledRing.classList.add('blue');
        tempText.textContent = '4°C - Gelado';
    } else if (status === 'warm') {
        ledRing.classList.add('green');
        tempText.textContent = '38°C - Morno';
    } else if (status === 'hot') {
        ledRing.classList.add('red');
        tempText.textContent = '85°C - Quente';
    }
}