const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = { 
  saveJob(req, res) {
    const jobs = Job.get()
    const jobId = jobs[jobs.length -1]?.id || 0;  

    jobs.push({
      ...req.body,
      id: jobId + 1,
      createdAt: Date.now()
    })

    return res.redirect('/')
  },

  createJob(req, res) {
    return res.render('job')
  },

  show(req, res) {
    const jobId = req.params.id
    const jobs = Job.get()
    const job = jobs.find(job => job.id == jobId)      
    const profile = Profile.get()
    
    if (!job) {
      return res.send('Job not found')
    }

    job.budget = JobUtils.calcBudget(job, profile["value-hour"])

    return res.render('job-edit', { job })
  },

  update(req, res) {
    const jobId = req.params.id
    const jobs = Job.get()
    const job = jobs.find(job => job.id == jobId)      
    
    if (!job) {
      return res.send('Job not found')
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"]
    }

    const newJobs = jobs.map(job => {
      if(job.id == jobId) {
        job = updatedJob
      }
      return job
    })

    Job.update(newJobs)
    res.redirect('/job/'+ jobId)
  },

  delete(req, res) {
    const jobId = req.params.id       
    
    Job.delete(jobId)
    return res.redirect('/')
  }
}
