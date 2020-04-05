const router = require('express').Router()
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')

const saltRounds = 10

const knex = require('knex')({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: "./db.sqlite"
  }
})

router.post('/signup',
  [
    check('user_name')
    .isLength({min: 3}, {max: 20})
    .withMessage('Username must be between 3 and 20 characters.')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({error: errors.array()})
    }
    await knex('users').insert({
      user_name: req.body.user_name
    })
    return res.status(400).json({code: 1, response: `Profile for ${req.body.user_name} has been created.`})
})

module.exports = router
