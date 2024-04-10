console.log("CONST DENTRO DO ESCOPO DE BLOCO:")
if (true){
    const message = "Essa variável foi criada dentro do escopo do bloco if, e funciona apenas aqui dentro. Está inacessível fora daqui"
    console.log(message)
}

for (const color of ['verde', 'vermelho', 'amarelo']){
    const message = "Olá"//também criada dentro do escopo de bloco. Não consigo pegar lá fora do for
    console.log(color)
    console.log(message)
}

console.log("VAR FORA DO ESCOPO DE BLOCO:")
//Exemplo de escopo de bloco com var:
if (true){
    var count = 0
    console.log(count)
}
console.log(count)//imprime o count da mesma forma. O var não fica preso no escopo do bloco


console.log("EXEMPLO DE ESCOPO LOCAL COM VAR")
function executar(){
    var text = "Escopo local com o var"
    console.log(text)
    //var não sai pra fora do escopo da função. 
}
executar()


console.log("EXEMPLO DE ESCOPO LOCAL COM LET E CONST")
function executar2(){
    let count = 0
    const test = 2

    function executar3(){

    }

    console.log(count)
    console.log(test)
    console.log(executar3)
    
}
executar2()


//EXEMPLO HOISTING: usar funções que ainda não foram declaradas. Estão declaradas na sequencia
let gName = "Renato"
printName()

function printName(){
    console.log("Nome: "+gName)
}