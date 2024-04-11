class Retangulo {
    constructor(altura, largura){
        this.altura = altura;
        this.largura = largura;
    }

    area(){
        return this.altura * this.largura
    }
}


var r1 = new Retangulo(3,4)
var r2 = new Retangulo(3,8)

console.log(r1.area === r2.area)//LOG: true
//ao usar a classe, é como se a função fora do constructor já estivesse no prototype (ver prototypeChain.js)

try{
    var fn = r1.area
    console.log(fn())//LOG: error
    //da mesma maneira que vimos em objetos.js, nesse caso o this vira o fn, e eu nao tenho as propriedades altura e largura nele
}catch(err){
    console.log("erro tratado para poder seguir o codigo")
}

class Quadrado extends Retangulo {//pega a herança de retangulo
    constructor(dimensao){
        super(dimensao, dimensao)//para usar como herança as propriedades da classe retangulo, preciso passar quais são os parâmetros altura e largura
        //o super apenas passa o altura e largura que a classe Retangulo precisa para ser criada
    }
    imprimeNome(){
        console.log("Quadrado")
    }
}

var r3 = new Quadrado(4)

console.log(r3.largura, r3.altura, r3.area())//loga condorme a dimensao
r3.imprimeNome()
