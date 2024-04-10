let variaveis = {
    nome: "Renato",
    idade: 27,
    caracteristicas: {
        peso: 69,
        altura: 170
    }
}

console.log(variaveis.teste?.peso || "Testado")
console.log(variaveis.teste?.peso ?? "Testado")