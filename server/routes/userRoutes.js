const router = require('express').Router()
const expressjwt = require('express-jwt')
const bcrypt = require('bcrypt')
const shortid = require('shortid')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')

const saltRounds = 10

const knex = require('knex')({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './db.sqlite'
  }
})

const jwtCheck = expressjwt({
  secret: 'mykey'
})

router.post('/api/signup-create',
  [
    check('user_name')
    .isLength({min: 3}, {max: 20})
    .withMessage('Username must be between 3 and 20 characters'),
    check('email')
      .isEmail()
      .withMessage('Email is invalid.'),
    check('password')
      .isLength({min: 5}, {max: 15})
      .withMessage('Password must be between 5 and 15 characters')
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
      household_id: uniqueId,
      time: 0,
      point: 0
    })

    return res.json({
      code: 1,
      response: `Profile for ${req.body.user_name} has been created.`,
      household_id: uniqueId
    })
})

router.post('/api/signup-join',
  [
    check('user_name')
    .isLength({min: 3}, {max: 20})
    .withMessage('Username must be between 3 and 20 characters'),
    check('email')
      .isEmail()
      .withMessage('Email is invalid.'),
    check('password')
      .isLength({min: 5}, {max: 15})
      .withMessage('Password must be between 5 and 15 characters'),
    check('household_id')
      .isLength({min: 1}, {max: 15})
      .withMessage('Household ID is missing')
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
      household_id: req.body.household_id,
      point: 0,
      time: 0
    })

    return res.json({
      code: 1,
      response: `Profile for ${req.body.user_name} has been created. Added to the household: ${req.body.household_id}`
    })
})

router.post('/api/signin',
  [
    check('email')
      .not()
      .isEmpty()
      .withMessage('Email is missing'),
    check('password')
      .not()
      .isEmpty()
      .withMessage('Password is missing')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({
        code: 0,
        error: errors.array()
      })
    }

    const userArrayFromDatabase = await knex('users').where('email', req.body.email)
    const user = userArrayFromDatabase[0]

    if (user) {
      bcrypt.compare(req.body.password, user.password, (error, response) => {
        if (error) {
          return res.json({
            code: 0,
            error: [{msg: 'Problem with password'}]})
        }
        if (response === true) {
          const token = jwt.sign({
            sub: user.user_id,
            username: user.user_name,
          }, 'mykey', {expiresIn: '7d'})
          res.json({
            code: 1,
            response: `${user.user_name} is authorized.`,
            user_data: user,
            access_token: token
          })
        } else {
          res.json({
            code: 0,
            error: [{msg: `${user.user_name} is not authorized`}]
          })
        }
      })
    } else {
      res.json({
        code: 0,
        error: [{msg: 'User does\'nt exist'}]
      })
    }
  }
)

// READ ALL USERS OF A HOUSEHOLD
router.get('/api/usersOfHousehold',
  jwtCheck,
  async (req, res) => {
    const usersOfHousehold = await knex('users').where('household_id', req.query.household_id)
    return res.json({
      code: 1,
      response: usersOfHousehold
    })
})

module.exports = router
