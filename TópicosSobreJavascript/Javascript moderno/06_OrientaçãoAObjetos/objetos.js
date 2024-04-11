function Retangulo (altura, largura){
    this.altura = altura;
    this.largura = largura;
    this.area = calculaArea;
}

function calculaArea(){
    return this.altura * this.largura
}





var r1 = new Retangulo(4,7)
console.log("r1: ",r1.area())//LOG: 28
//observe que o this que o calculaArea usou foi o r1

var fn = r1.area//ao fazer isso, o this vira fn
console.log("fn: ",fn())//LOG: NaN
//porque o this aqui nao tem altura nem largura

var fn2 = calculaArea.bind(r1)//aqui estou falando que, em fn2, o this do calculaArea sempre será r1
console.log("fn2: ", fn2())//LOG: 28

var fn3 = r1.area.bind(r1)
console.log("fn3: ", fn3())//LOG: 28