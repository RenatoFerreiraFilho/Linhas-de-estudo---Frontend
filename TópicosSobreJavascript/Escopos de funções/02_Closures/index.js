//closures = encapsulamento
//EXEMPLO CLOSURE
function IMC(){
    let altura = 1.8
    function calcula(){
        let peso = 70;
        console.log("IMC: "+ peso/(altura * altura))
    }
    return calcula;
}
let imc = IMC();

imc();

