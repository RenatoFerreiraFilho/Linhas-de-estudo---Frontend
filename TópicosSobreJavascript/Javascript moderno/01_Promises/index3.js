
//EXEMPLO 4 - PROMISES COM O CATCH 

const p4 = new Promise((resolve, reject) => {
    if (Math.random() > 0.5){
        resolve("Sucesso P4")
    }else{
        reject("Falha P4")
    }
})

p4.then(function acao01 (res) {console.log(`${res} da ação 1`);return res})
.then(function acao02 (res) {console.log(`${res} da ação 2`);return res})
.then(function acao03 (res) {console.log(`${res} da ação 3`);return res})
.catch(function erro(rej){console.error(rej)})//esse catch funciona para todos os thens encadeados
