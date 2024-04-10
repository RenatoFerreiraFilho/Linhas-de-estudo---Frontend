
//Exemplo proxy com reflect
let tradutor = {
    'Carro': 'Car',
    'Ano': 'Year'
}

let handlerTradutor = {
    get(target,property,receiver){
        if (property in target){
            return Reflect.get(target, property)
        }
        return property
    },
    set(target, property, value){
        if (typeof value == 'string'){
            return Reflect.set(target,property,value)
        }
        return false
    }
}
tradutor = new Proxy(tradutor, handlerTradutor);


console.log(tradutor['Carro'])
console.log(tradutor['Modelo'])


tradutor["Modelo"] = "Model";
tradutor["Marca"] = 12121;//não vai atribuir, porque eu condicionei a ser uma string

console.log(tradutor['Modelo'])
console.log(tradutor['Marca'])


