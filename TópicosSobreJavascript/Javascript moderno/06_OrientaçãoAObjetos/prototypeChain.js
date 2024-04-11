//prototype chain = cadeia de prototype

function Retangulo(altura, largura) {
    this.altura = altura;
    this.largura = largura;
    this.area = function () {
        return this.altura * this.largura;
    };
}

var r1 = new Retangulo(4, 4);
var r2 = new Retangulo(4, 4);

console.log(r1.area === r2.area); //LOG: false
//por mais que eu deixe a altura e largura igual em r1 e r2, sempre dá diferente
//isso porque dessa maneira, cada retângulo possui sua própria função área.
//Como é a mesma função, o ideal seria compartilhar ela entre os retângulos

function RetanguloV2(altura, largura) {
    this.altura = altura;
    this.largura = largura;
}
RetanguloV2.prototype.area = function () {//o prototype será o mesmo para todos os objetos instanciados no construtor RetanguloV2
    return this.altura * this.largura;
};

var r3 = new RetanguloV2(4, 4);
var r4 = new RetanguloV2(4, 4);

console.log(r3.area === r4.area); //LOG: true
//quando o Javascript busca a propriedade area no RetanguloV2 e nao encontra, automaticamente ele entra no prototype e procura também
