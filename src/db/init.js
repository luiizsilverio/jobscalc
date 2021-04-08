const Database = require('./config')

const initDb = {
  async init() {   
    const db = await Database() // Open database

    await db.exec(`
      CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vacation_per_year INT,
        value_hour INT
      )
    `)

    await db.exec(`
      CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME
      )
    `)

    await db.run(`
      INSERT INTO profile (
        name ,
        avatar,
        monthly_budget,
        days_per_week,
        hours_per_day,
        vacation_per_year,
        value_hour
      ) VALUES (
        'Luiz S.',
        "https://github.com/luiizsilverio.png",
        3000, 5, 5, 4, 70
      )
    `)

    await db.run(`
      INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
      ) VALUES (
        "Pizzaria Guloso",
        2,
        1,
        ${ Date.now() }
      )
    `)    

    await db.run(`
      INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
      ) VALUES (
        "OneTwo Project",
        3,
        47,
        ${ Date.now() }
      )
    `)    

    await db.close()
  }
}

initDb.init()

// Para rodar a inicialização do banco, digite no terminal:

// npm run init-db

// vai criar o banco database.sqlite

