const express = require('express')
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

routes.get('/', DashboardController.index)
routes.get('/job', JobController.createJob)
routes.post('/job', JobController.saveJob)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes

/* 
//Exemplo simples utilizando send e redirect:
routes.get('/', (request, response) => 
  response.send('<h1>Olá Mundo</h1>'))
routes.get('/index.html', (req, res) => 
  res.redirect('/'))

const basePath = __dirname + '/views'
routes.get('/', (req, res) =>res.sendFile(basePath + '/index.html'))
routes.get('/job', (req, res) => res.sendFile(basePath + '/job.html'))
routes.get('/job/edit', (req, res) => res.sendFile(basePath + '/job-edit.html'))
routes.get('/profile', (req, res) => res.sendFile(basePath + '/profile.html'))
*/
