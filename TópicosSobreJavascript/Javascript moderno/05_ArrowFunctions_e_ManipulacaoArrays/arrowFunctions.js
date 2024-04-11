function soma (a, b){
    return a + b;
}

//código com arrow function:
//primeiro: arrows sempre são armazenadas dentro de uma variável
var somav2 = (a, b) => {
    return a + b;
}
//mas quando é bem curta, podemos fazer assim:
var somav3 = (a, b) => a + b;

function Retangulo(altura, largura){
    this.altura = altura;
    this.largura = largura;
    this.area = function () {
        return this.altura * this.largura;//aqui o this sempre será o this de onde a função foi chamada
    }
}

function RetanguloV2(altura, largura){
    this.altura = altura;
    this.largura = largura;
    this.area = () => this.altura * this.largura//aqui o this sempre será mais externo, ou seja, do objeto retangulov2
}

var r1 = new RetanguloV2(5,6)
console.log(r1.area())

var fn = r1.area//mesmo o this sendo fn, a função vai funcionar, por estar em arrow

console.log(fn())//para entender, ver o problema que chegamos na aula sobre classes e heranças



var imprimeMensagem = (m) => console.log(m)
var imprimeMensagemv2 = m => console.log(m)//quando tem apenas 1 parametro, posso ignorar os parenteses do parâmetro
//se nao tiver nenhum parametro, também preciso abrir e fechar parenteses

imprimeMensagem("Mensagem")
imprimeMensagemv2("Mensagemv2")

