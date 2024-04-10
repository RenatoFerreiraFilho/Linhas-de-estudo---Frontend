let Carro = {
    proprietario: "Fernanda",
    ano: 2016
};

// const handler = {
//     get(target, property, receiver){
//         console.log(`GET ${property}`)
//         if (property in target){
//             return target[property]
//         }
//         return "Propriedade inexistente"
//     }
// }
// let carroProxy = new Proxy(Carro, handler)

// console.log(Carro.modelo)
// console.log(carroProxy.modelo)



//Exemplo proxy para tradutor:
let tradutor = {
    'Carro': 'Car',
    'Ano': 'Year'
}

let handler = {
    get(target,property,receiver){
        if (property in target){
            return target[property]
        }
        return property
    }
}
let tradutorProxy = new Proxy(tradutor, handler);

console.log(tradutorProxy['Carro'])
console.log(tradutorProxy['Modelo'])

