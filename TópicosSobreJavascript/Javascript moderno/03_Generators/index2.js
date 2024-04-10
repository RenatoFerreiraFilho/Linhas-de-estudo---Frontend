//Teste
const carModelAll = {
    allModel: {
        Fiat: ["Palio", "Cronos", "Toro"],
        Volks: ["Gol", "Up", "Nivus", "Tiguan"],
        Chevrolet: ["Onix", "Tracker", "Corsa"],
    },
};

function* funcaoGenerator() {
    for (const brand in carModelAll.allModel) {
        yield* carModelAll.allModel[brand];
    }
}

let testeReturn = funcaoGenerator();
// console.log(testeReturn)

// console.log(testeReturn.next())
// console.log(testeReturn.next())

for (const car of testeReturn) {
    console.log(car);
}
