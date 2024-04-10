//EXEMPLO 1 - criação de promise e execução

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("sucesso"), 2000)
})

p1.then((res) => {console.log(res)}, (rej)=>{})//o segundo parametro (rej) é opcional, pouco usado na pratica. Na pratica usamos o catch


new Promise((resolve, reject) => {
    setTimeout(() => resolve("sucesso"), 2000)
}).then((res) => {console.log(res)}, (rej) => {})

//EXEMPLO 2 - Criaçao  de promise e uso do catch

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("sucesso"), 2000)
}).then((res) => {console.log(res)}, (rej) => {})

//Primeira forma:
p2.then((res) => {console.log(res)})
p2.catch((rej) => {})

//Segunda forma:
p2.then((res) => {console.log(res)}).catch((rej) => {})

