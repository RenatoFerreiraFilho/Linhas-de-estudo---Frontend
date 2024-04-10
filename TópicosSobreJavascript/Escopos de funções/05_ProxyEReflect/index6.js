
//EXEMPLO DE PROXY/REFLECT PARA OCULTAR PROPRIEDADES NO OBJETO
const hide = (target, prefix = '_') => new Proxy(target, {
    has:(target,property) => (!property.startsWith(prefix) && property in target),
    get: (target, property, receiver) => (property in receiver) ? target[property] : undefined,
    ownKeys: (target) => Reflect.ownKeys(target).filter(
        property => (!property.startsWith(prefix) || typeof property !== 'string')
    )
})

let Carro = hide ({
    Ano: 2020,
    Modelo: "Polo",
    _proprietario: "Joao"
})

console.log(Carro._proprietario)
console.log('_proprietario' in Carro)
console.log(Object.keys(Carro))