const path = require('path')

//Path absoluto
console.log(path.resolve('teste.txt'))

//formar path 
const midFolder = "relatorios"
const filename = "marcio.txt"

const finalPath = path.join('/', 'arquivos', midFolder, filename)

console.log(finalPath)