const Database = require('../db/config')

  let dataFixed = [
    { 
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 1,
      created_at: Date.now()      
    },
    { 
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3,
      "total-hours": 47,
      created_at: Date.now()      
    },  
  ]

  module.exports = {
    async get() {
      const db = await Database()

      const data = await db.all(`SELECT * FROM jobs`)

      await db.close()

      return data.map(job => ({
        id: job.id,
        name: job.name,
        "daily-hours": job.daily_hours,
        "total-hours": job.total_hours,
        created_at: job.created_at
      }))
    },

    async update(newJob, id) {
      //data = newData
      const db = await Database()

      await db.run(`
        UPDATE jobs SET 
        name = "${newJob.name}",
        daily_hours = ${newJob["daily-hours"]},
        total_hours = ${newJob["total-hours"]}
        WHERE id = ${id}
      `)

      await db.close()
    },

    async create(newJob) {
      //data.push(newJob)
      const db = await Database()

      const data = await db.run(`
        INSERT INTO jobs (
          name, 
          daily_hours,
          total_hours,
          created_at
        ) VALUES (
          "${newJob.name}",
          ${newJob["daily-hours"]},
          ${newJob["total-hours"]},
          ${newJob.created_at}
        )`)

      await db.close()
    },

    async delete(id) {
      //data = data.filter(job => Number(job.id) !== Number(id))
      const db = await Database()

      await db.run(`DELETE FROM jobs WHERE id = ${id}`)

      await db.close()
    }
  }
