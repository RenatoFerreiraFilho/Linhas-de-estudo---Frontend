//1. Declarar variáveis com let e const:
let a = 1;
const b = 1;
a=2//ok
try{
    b=2//erro (constante)
}catch(err){
    console.log("Erro tratado para seguir código")
}


function teste(){
    for (var i = 0; i < 5; i++){
        //fazer algo
    }
    for (let j = 0; j < 5; j++){
        //fazer algo
    }
    console.log("i: ", i)
    console.log("j: ", j)//dá erro, dizendo que j nao está definido
    //o erro ocorre porque declarei o j com let (existe apenas dentro das chaves do for)
    //o const tem o mesmo comportamento
    //veja que o var (no caso i) estoura para fora das chaves do for
}
// teste()



//2. Usar atribuição de desestruturação:

let primos = [2,3,5,7,11,13];

let curso = {
    nome: "Bootcamp Front End",
    modulos: 4,
    presencial: false,
    turma: 1
};

let [p1, p2] = primos;//estou dando o nome de p1 e p2 para os dois primeiros itens do array primos
//ou seja, estou desestruturando o array primos
console.log(p1,p2)


let [n1, n2, ...resto] = primos;
console.log(resto)//resto é um vetor cujo ... são os elementos de primos, a partir do terceiro


// let {nome, turma, ...demaisCampos} = curso;
// console.log(nome, turma, demaisCampos)

let {nome: nomeCurso, turma, ...demaisCampos} = curso;
console.log(nomeCurso, turma, demaisCampos)


function imprime({b: nome}){
    console.log(nome)
}

let teste2 = {a: "testeA", b:"testeB"}
imprime(teste2)




// 3. Spread operator
primos.push(17)//insiro o 17 no primos

//também posso fazer pelo operador spread:
let primos2 = [1,...primos, 19]

console.log(primos2)

let curso2 = {
    ...curso,
    descricao: "Desc",
    ativo: true
}

console.log(curso2)

//4. Template literals
console.log(`Permite a concatenação entre javascript e string mais facilmente. 
Esses são os números primos: ${primos}`)

