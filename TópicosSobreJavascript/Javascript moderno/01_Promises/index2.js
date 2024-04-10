
//EXEMPLO 3 - PROMISES COM O CATCH 

const p3 = new Promise((resolve, reject) => {
    if (Math.random() > 0.5){
        resolve("Sucesso P3")
    }else{
        reject("Falha P3")
    }
})

p3.then(console.log).catch(console.error)