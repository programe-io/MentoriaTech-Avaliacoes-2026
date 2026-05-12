
const senha = '123456';
let tentativas = 3;

do{
     let confirmaSenha = prompt('Informe sua senha: ');
     
     if(confirmaSenha === senha){
         console.log('Acesso Permitido!!!');
         break;
     }
     else{
         tentativas--;
         console.log(`Senha Incorreta, Restam ${tentativas} tentativas.`); 
     }
}while(tentativas > 0);