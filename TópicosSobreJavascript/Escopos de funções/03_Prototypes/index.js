function Pessoa(nome){
    if (!nome){
        this.nome = "Fulano"
    }else{
        this.nome = nome
    }
    this.dizerOla = function (){
        console.log("Olá, " + this.nome)
    }
}
let pessoaA = new Pessoa("Alberto")

Pessoa.digaOla = function() {console.log("Olá, meu nome é: " + this.nome)}

let pessoaB = new Pessoa("Maria")


console.log("___________________________________")
try {
    pessoaA.digaOla()
}catch(e){
    console.log("Falha no pessoaA.digaOla")
}
try {
    pessoaB.digaOla()
}catch(e){
    console.log("Falha no pessoaB.digaOla")
}

console.log("___________________________________")
pessoaB.digaOla = function() {console.log("Oi, meu nome é: " + this.nome)}
try {
    pessoaA.digaOla()
}catch(e){
    console.log("Falha no pessoaA.digaOla")
}
try {
    pessoaB.digaOla()
}catch(e){
    console.log("Falha no pessoaB.digaOla")
}


Pessoa.prototype.digaOla = function() { console.log("Olá, eu sou o: " + this.nome)}

let pessoaC = new Pessoa("Ana")

console.log("___________________________________")
try {
    pessoaA.digaOla()
}catch(e){
    console.log("Falha no pessoaA.digaOla")
}
try {
    pessoaB.digaOla()
}catch(e){
    console.log("Falha no pessoaB.digaOla")
}
try {
    pessoaC.digaOla()
}catch(e){
    console.log("Falha no pessoaC.digaOla")
}
