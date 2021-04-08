const Profile = require('../model/Profile')

module.exports = {
  async index(req, res) {
    return res.render('profile', { profile: await Profile.get() })
  },

  async update(req, res) {
    const data = req.body
    
    // definir quantas semanas tem em um ano: 52
    const weeksPerYear = 52

    // remover as semanas de férias do ano
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

    // total de horas trabalhadas na semana
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

    // horas trabalhadas no mês
    const monthTotalHours = weekTotalHours * weeksPerMonth

    // qual será o valor da hora?
    const valueHour = data["monthly-budget"] / monthTotalHours
    
    const profile = await Profile.get()
    
    await Profile.update({
      ...profile,
      ...req.body,
      "value-hour": valueHour
    })
     
    return res.redirect('/profile')
  }
}
