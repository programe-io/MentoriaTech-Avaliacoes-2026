 function mostrarSecao(idSecao) {
            document.getElementById('menu-principal').classList.add('oculto');
            
            const secoes = document.querySelectorAll('section.card');
            secoes.forEach(secao => secao.classList.add('oculto'));
            
            document.getElementById(idSecao).classList.remove('oculto');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function voltarAoMenu() {
            const secoes = document.querySelectorAll('section.card');
            secoes.forEach(secao => secao.classList.add('oculto'));
            
            document.getElementById('menu-principal').classList.remove('oculto');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }