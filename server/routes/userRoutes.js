const router = require('express').Router()
const bcrypt = require('bcrypt')
const shortid = require('shortid')
const {check, validationResult} = require('express-validator')

const saltRounds = 10

const knex = require('knex')({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: "./db.sqlite"
  }
})

router.post('/signup-create',
  [
    check('user_name')
    .isLength({min: 3}, {max: 20})
    .withMessage('Username must be between 3 and 20 characters.'),
    check('email')
      .isEmail()
      .withMessage('Email is invalid.'),
    check('password')
      .isLength({min: 5}, {max: 15})
      .withMessage('Password must be between 5 and 15 characters.')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({
        code: 0,
        error: errors.array()
      })
    }

    const existingUser = await knex('users').where('email', req.body.email)
    if (existingUser.length > 0 ) {
      return res.json({
        code: 0,
        error: [{msg: 'Email already exists.'}]
      })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    const uniqueId = shortid.generate()

    await knex('users').insert({
      user_name: req.body.user_name,
      email: req.body.email,
      password: hashedPassword,
      household_id: uniqueId
    })

    return res.json({
      code: 1,
      response: `Profile for ${req.body.user_name} has been created.`,
      household_id: uniqueId
    })
})

router.post('/signup-join',
  [
    check('user_name')
    .isLength({min: 3}, {max: 20})
    .withMessage('Username must be between 3 and 20 characters.'),
    check('email')
      .isEmail()
      .withMessage('Email is invalid.'),
    check('password')
      .isLength({min: 5}, {max: 15})
      .withMessage('Password must be between 5 and 15 characters.'),
    check('household_id')
      .isLength({min: 1}, {max: 15})
      .withMessage('Household ID is missing.')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({
        code: 0,
        error: errors.array()
      })
    }

    const existingUser = await knex('users').where('email', req.body.email)
    if (existingUser.length > 0 ) {
      return res.json({
        code: 0,
        error: [{msg: 'Email already exists.'}]
      })
    }

    const validHouseholdId = await knex('users').where('household_id', req.body.household_id)
    if (validHouseholdId.length === 0 ) {
      return res.json({
        code: 0,
        error: [{msg: 'This household doesn\'t exist.'}]
      })
    }
    if (validHouseholdId.length > 1 ) {
      return res.json({
        code: 0,
        error: [{msg: 'Household already has 2 users, it\'s not possible to add more.'}]
      })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    await knex('users').insert({
      user_name: req.body.user_name,
      email: req.body.email,
      password: hashedPassword,
      household_id: req.body.household_id
    })

    return res.json({
      code: 1,
      response: `Profile for ${req.body.user_name} has been created. Added to the household: ${req.body.household_id}`
    })
})

router.post('/signin',
  [
    check('email')
      .not()
      .isEmpty()
      .withMessage('Email is missing.'),
    check('password')
      .not()
      .isEmpty()
      .withMessage('Password is missing.')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({
        code: 0,
        error: errors.array()
      })
    }

    const user = await knex('users').where('email', req.body.email)

    if (user) {
      bcrypt.compare(req.body.password, user[0].password, (error, response) => {
        if (error) {
          return res.json({
            code: 0,
            error: [{msg: 'Problem with password.'}]})
        }
        if (response === true) {
          res.json({
            code: 1,
            response: `${user[0].user_name} is authorized.`,
            user_data: user
          })
        } else {
          res.json({
            code: 0,
            error: [{msg: `${user[0].user_name} is not authorized.`}]
          })
        }
      })
    } else {
      res.json({
        code: 0,
        error: [{msg: 'User does\'nt exist.'}]
      })
    }
  }
)







module.exports = router
