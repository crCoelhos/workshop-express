const express = require('express')
const app = express()
const port = 3000

// define o metodo(GET), o endereço(endpoint representado por ('/')) e resposta(res)
app.get('/', (req, res) => {
    // compõe a resposta
  res.send('Hello world!')
})

// escuta a execução do app
app.listen(port, () => {
  console.log(`app rodando no endereço: http://localhost:${port}`)
})