let decolou = false;

document.getElementById('botao').addEventListener('click', function() {
  let texto = document.getElementById('texto');
    let botao = document.getElementById('botao');
      
        if(!decolou){
            texto.innerText = "3... 2... 1... DECOLOU! 🚀";
                botao.innerText = "POUSAR";
                    decolou = true;
                      } else {
                          texto.innerText = "Pronto para decolar?";
                              botao.innerText = "DECOLAR";
                                  decolou = false;
                                    }
                                    });