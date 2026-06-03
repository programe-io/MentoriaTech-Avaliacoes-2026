 window.onload = function () {
            alert("Bem-vindo ao site sobre espécies de animais!");
        };

        function mostrarCuriosidade() {

            const curiosidades = [
                "🦁 O rugido do leão pode ser ouvido até 8 km.",
                "🐬 Golfinhos dormem com metade do cérebro acordada.",
                "🦅 Águias enxergam até 8 vezes melhor que humanos.",
                "🐘 Elefantes conseguem reconhecer amigos após anos.",
                "🐢 Algumas tartarugas vivem mais de 100 anos."
            ];

            let numeroAleatorio =
                Math.floor(Math.random() * curiosidades.length);

            document.getElementById("mensagem")
                .innerHTML = curiosidades[numeroAleatorio];
        }

        function destacarAnimal(idAnimal) {

            let artigos =
                document.querySelectorAll("article");

            artigos.forEach(function(item) {
                item.classList.remove("animal-selecionado");
            });

            document.getElementById(idAnimal)
                .classList.add("animal-selecionado");
        }