// function getID(range){
//     let i=0
//     while(i < range){
//         i++
//         return i
//     }
// }

// Exemplo de função geradora
function* getID(range){
    let i=0
    while(i < range){
        i++
        yield i
    }
}


let it = getID(3)


console.log(it)
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())

//FOR OF:
let it2 = getID(3)
for (const item of it2){
    console.log(item)
}



