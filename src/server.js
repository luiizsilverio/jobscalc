const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

// definir o template engine padrão (EJS), arquivos .ejs na pasta Views
server.set('view engine', 'ejs')

// mudar a localização da pasta Views
server.set('views', path.join(__dirname, 'views'))

// habilitar arquivos estáticos
server.use(express.static('public'))

// habilita o uso do req.body
server.use(express.urlencoded({ extended: true }))


// routes
server.use(routes)

server.listen(3000, () => console.log('rodando na porta 3000'))
