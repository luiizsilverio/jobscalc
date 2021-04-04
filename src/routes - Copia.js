const express = require('express')
const routes = express.Router()

/* Exemplo simples utilizando send e redirect:
routes.get('/', (request, response) => 
  response.send('<h1>Olá Mundo</h1>'))
routes.get('/index.html', (req, res) => 
  res.redirect('/'))
*/

/* Renderizando arquivos html normais (sendFile):
const basePath = __dirname + '/views'

routes.get('/', (req, res) =>res.sendFile(basePath + '/index.html'))
routes.get('/job', (req, res) => res.sendFile(basePath + '/job.html'))
routes.get('/job/edit', (req, res) => res.sendFile(basePath + '/job-edit.html'))
routes.get('/profile', (req, res) => res.sendFile(basePath + '/profile.html'))
*/

// Renderizando páginas pelo template engine EJS (render)
const views = __dirname +'/views/'

const profile = {
  name: 'Luiz S.',
  avatar: "https://github.com/luiizsilverio.png",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4,
  "value-hour": 75
}

const Job = {
  data: [
    { 
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 1,
      createdAt: Date.now()    
    },
    { 
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3,
      "total-hours": 47,
      createdAt: Date.now()    
    },  
  ],
  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map(job => {
        const restaDias = Job.services.remainingDays(job)
        const status = restaDias <= 0 ? 'done' : 'progress'
        const budget = profile["value-hour"] * job["total-hours"]
      
        return { 
          ...job, 
          remaining: restaDias, 
          status, 
          budget
        }
      })
  
      return res.render(views + 'index', { jobs: updatedJobs })
    }
  },
  services: {
    remainingDays(job) {
      const restaDias = (job["total-hours"] / job["daily-hours"]).toFixed()
      const dtCad = new Date(job.createdAt)
      const dtVenc = dtCad.getDate() + Number(restaDias)
      const dtPrevInMs = dtCad.setDate(dtVenc)
      const timeDifInMs = dtPrevInMs - Date.now()
      const dayInMs = 1000 * 60 * 60 * 24
      const dayDiff = Math.floor(timeDifInMs / dayInMs)  
      return dayDiff
    }
  }
}

routes.get('/', (req, res) => Job.controllers.index)
routes.get('/job', (req, res) => res.render(views + 'job'))
routes.get('/job/edit', (req, res) => res.render(views + 'job-edit'))
routes.get('/profile', (req, res) => res.render(views + 'profile', { profile }))

routes.post('/job', (req, res) => {
  const job = req.body
  const jobId = jobs[jobs.length -1]?.id || 0;  

  jobs.push({
    ...req.body,
    id: jobId + 1,
    createdAt: Date.now()
  })
  return res.redirect('/')
})

module.exports = routes
