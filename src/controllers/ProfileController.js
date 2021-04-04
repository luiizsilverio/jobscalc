const Profile = require('../model/Profile')

module.exports = {
  index(req, res) {
    return res.render('profile', { profile: Profile.get() })
  },

  update(req, res) {
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
    
    Profile.update({
      ...Profile.get(),
      ...req.body,
      "value-hour": valueHour
    })
     
    return res.redirect('/profile')
  }
}
