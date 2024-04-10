
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
    },
    set(target, property, value){
        if (typeof value == 'string'){
            target[property] = value
            return true
        }
        return false
    }
}
let tradutorProxy = new Proxy(tradutor, handler);

console.log(tradutorProxy['Carro'])
console.log(tradutorProxy['Modelo'])


tradutorProxy["Modelo"] = "Model";
tradutorProxy["Marca"] = 12121;//não vai atribuir, porque eu condicionei a ser uma string

console.log(tradutorProxy['Carro'])
console.log(tradutorProxy['Modelo'])
