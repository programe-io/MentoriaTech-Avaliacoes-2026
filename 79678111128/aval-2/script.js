let anos = [1930,1931,1935,1942];
let indice = 0;
function mudarAno(){
  indice = (indice + 1) % anos.length;
    document.getElementById('ano').textContent = anos[indice];
    }