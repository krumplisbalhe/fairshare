const express = require('express')
// const Cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')
const app = express()
const server = require('http').Server(app)

// app.use(Cors())

const knex = require('knex')({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: "./db.sqlite"
  }
})

knex.schema.hasTable('users').then( exists => {
  if (!exists) {
    knex.schema.createTable('users', table => {
      table.increments('user_id')
      table.string('user_name')
      table.string('email')
      table.string('password')
      table.string('household_id')
      table.integer('time')
      table.integer('point')
    }).then()
  }
})

knex.schema.hasTable('tasks').then( exists => {
  if (!exists) {
    knex.schema.createTable('tasks', table => {
      table.increments('task_id')
      table.string('task_name')
      table.string('household_id_fk').references('household_id').inTable('users').notNull().onDelete('cascade')
      table.integer('point')
      table.integer('category')
      table.integer('is_done')
      table.integer('assigned_to')
      table.string('frequency')
    }).then()
  }
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use(userRoutes)
app.use(taskRoutes)

// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

server.listen(3000, () => {
  console.log('listening on *:3000');
})
