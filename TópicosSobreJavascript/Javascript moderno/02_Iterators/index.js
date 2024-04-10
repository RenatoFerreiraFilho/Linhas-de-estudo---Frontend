const carModel = [
    "Onix",
    "T-Cross", 
    "HB20",
    "Palio"
]


console.log("Iterando com FOR:")
for (let index = 0; index < carModel.length; index++){
    console.log(carModel[index])
}

console.log("Iterando com WHILE:")
let index = 0
while (index < carModel.length){
    console.log(carModel[index])
    index++
}

console.log("Iterando com FOR OF:")
for (const car of carModel){
    console.log(car)
}



console.log("Situação boa para usar um iterator:")
//se eu crio um Symbol.iterator, eu faço a regra para usar um iterator nele
const carModelAll = {
    allModel: {
        "Fiat": [
            "Palio",
            "Cronos",
            "Toro"
        ],
        "Volks": [
            "Gol",
            "Up",
            "Nivus",
            "Tiguan"
        ],
        "Chevrolet":[
            "Onix",
            "Tracker",
            "Corsa"
        ]
    },
    [Symbol.iterator](){
        const brands = Object.values(this.allModel)
        let currentModelIndex = 0;
        let currentBrandIndex = 0;

        return {
            next(){
                //Lista de todos os modelos da marca
                const models = brands[currentBrandIndex]

                //verifica se já navegou em todos os modelos da marca e passa para a próxima
                if (currentModelIndex >= models.length){
                    currentBrandIndex ++
                    currentModelIndex = 0
                }
                //verifica se já navegou em todas as marcas e encerra caso tenha navegado
                if (currentBrandIndex >= brands.length){
                    return {
                        value: undefined,
                        done: true
                    }
                }
                return {
                    value: brands[currentBrandIndex][currentModelIndex++],
                    done: false
                }
            }
        }
    }
}

for (car of carModelAll){
    console.log(car)
}