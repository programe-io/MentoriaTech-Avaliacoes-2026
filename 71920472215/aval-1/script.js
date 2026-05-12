const senha = '123456';
let tentativas = 3;

do{
    let confirmaSenha = prompt('informe sua senha:');
    
    if(confirmaSenha === senha){
        console.log('acesso permitido!!!');
        break;
     }
     else{
         Tentativa--;
         console.log('senha incorreta. restam ${tentativa} tentativas.');
     }
}while(Tentativas > 0);