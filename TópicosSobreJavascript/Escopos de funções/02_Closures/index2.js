//EXEMPLO CLOSURE ENCAPSULAMENTO
function Carro(){
    this.proprietario = "Marcos"
    let ano = 2020//essa variável ficou encapsulada
    this.getAno = function(){
        return ano
    }
    this.setAno = function(a){
        ano = a
    }

}

let carro = new Carro();

console.log(carro.proprietario)
console.log(carro.ano)//não tenho acesso
console.log(carro.getAno())//mas a função tem acesso