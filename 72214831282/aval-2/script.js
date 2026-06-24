const seguirBtn = document.getElementById("seguirBtn");

let seguindo = false;

seguirBtn.addEventListener("click", () => {

    seguindo = !seguindo;

    if(seguindo){

        seguirBtn.textContent = "Seguindo";
        seguirBtn.style.background = "#22c55e";

    }else{

        seguirBtn.textContent = "Seguir";
        seguirBtn.style.background = "#2563eb";

    }

});