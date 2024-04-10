let Carro = {
    proprietario: "Fernanda",
    ano: 2016
};

let carroProxy = new Proxy(Carro, {})

console.log(Carro.ano)
console.log(carroProxy.ano)