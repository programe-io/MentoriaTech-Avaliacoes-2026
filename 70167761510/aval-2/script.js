console.log("Galinheiro iniciado!");

const galinhas = document.querySelectorAll(".galinha");

galinhas.forEach((galinha, i) => {

    galinha.addEventListener("click", () => {

        galinha.style.transform =
            "translateY(-30px)";

        setTimeout(() => {
            galinha.style.transform =
                "translateY(0)";
        }, 300);

        console.log(`Galinha ${i + 1} clicada`);
    });

});