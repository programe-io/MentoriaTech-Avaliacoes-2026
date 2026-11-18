
algoritmo "FoodExpress"

var
   nome, email, senha: caractere
   opcao, quantidade: inteiro
   saldo, preco, total: real
   cadastrado: logico

inicio

   saldo <- 0
   total <- 0
   cadastrado <- falso

   escreval("===== FOODEXPRESS =====")
   escreval("1 - Cadastrar")
   escreval("2 - Entrar")
   escreval("3 - Ver cardapio")
   escreval("4 - Ver carteira")
   escreval("0 - Sair")

   escreva("Escolha uma opcao: ")
   leia(opcao)

   enquanto opcao <> 0 faca

      escolha opcao

         caso 1:
            escreva("Digite seu nome: ")
            leia(nome)

            escreva("Digite seu email: ")
            leia(email)

            escreva("Digite sua senha: ")
            leia(senha)

            cadastrado <- verdadeiro
            saldo <- 100

            escreval("Cadastro realizado!")
            escreval("Voce ganhou R$ 100,00!")

         caso 2:
            se cadastrado = verdadeiro entao
               escreval("Login realizado!")
            senao
               escreval("Cadastre-se primeiro!")
            fimse

         caso 3:
            se cadastrado = verdadeiro entao

               escreval("===== CARDAPIO =====")
               escreval("1 - Hamburguer R$ 25")
               escreval("2 - Pizza R$ 40")
               escreval("3 - Batata R$ 15")
               escreval("4 - Refrigerante R$ 7")

               escreva("Escolha um produto: ")
               leia(opcao)

               escolha opcao
                  caso 1:
                     preco <- 25
                  caso 2:
                     preco <- 40
                  caso 3:
                     preco <- 15
                  caso 4:
                     preco <- 7
                  outrocaso
                     preco <- 0
               fimescolha

               se preco > 0 entao
                  escreva("Quantidade: ")
                  leia(quantidade)

                  se quantidade > 0 entao
                     total <- total + preco * quantidade
                     escreval("Produto adicionado!")
                  senao
                     escreval("Quantidade invalida!")
                  fimse
               fimse

            senao
               escreval("Entre na sua conta primeiro!")
            fimse

         caso 4:
            escreval("Saldo: R$ ", saldo)

         outrocaso:
            escreval("Opcao invalida!")

      fimescolha

      escreval("")
      escreval("1 - Cadastrar")
      escreval("2 - Entrar")
      escreval("3 - Cardapio")
      escreval("4 - Carteira")
      escreval("0 - Sair")
      leia(opcao)

   fimenquanto

   escreval("Total do pedido: R$ ", total)
   escreval("Obrigado por utilizar o FoodExpress!")

fimalgoritmo
