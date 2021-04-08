
module.exports = {
  remainingDays(job) {
    const restaDias = (job["total-hours"] / job["daily-hours"]).toFixed()
    const dtCad = new Date(job.created_at)
    const dtVenc = dtCad.getDate() + Number(restaDias)
    const dtPrevInMs = dtCad.setDate(dtVenc)
    const timeDifInMs = dtPrevInMs - Date.now()
    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.ceil(timeDifInMs / dayInMs)      
    return dayDiff
  },

  calcBudget: (job, valueHour) => valueHour * job["total-hours"]
     
}
