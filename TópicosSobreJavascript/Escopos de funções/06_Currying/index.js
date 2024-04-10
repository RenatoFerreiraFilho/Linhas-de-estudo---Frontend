//EXEMPLO DE CURRYING

function log(date, type, message){
    console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] [${type}] ${message}`)
}

log(new Date(), "DEBUG", "Exemplo de chamada normal")


const logCurrying = date => type => message => console.log(`[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] [${type}] ${message}`)

logCurrying(new Date())("DEBUG")("Exemplo de currying")

let logNow = logCurrying(new Date())

logNow("DEBUG")("Exemplo de currying com parâmetro fixo")

let logDebugNow = logNow("DEBUG")
logDebugNow("Exemplo de currying com 2 parâmetros fixos")