const router = require('express').Router()
const expressjwt = require("express-jwt")
const {check, validationResult} = require('express-validator')

const knex = require('knex')({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: "./db.sqlite"
  }
})

const jwtCheck = expressjwt({
  secret: "mykey"
})

const tasks = router.route('/api/tasks')

// CREATE A TASK FOR A HOUSEHOLD
tasks.post(
  jwtCheck,
  [
    check('task_name')
      .not()
      .isEmpty()
    .withMessage('Please give a valid name to the task'),
    check('household_id')
      .not()
      .isEmpty()
      .withMessage('Error'),
    check('point')
      .not()
      .isEmpty()
      .withMessage('Point estimate is missing'),
    check('category')
      .not()
      .isEmpty()
      .withMessage('Category is missing'),
    check('frequency')
      .not()
      .isEmpty()
      .withMessage('Frequency is missing')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({
        code: 0,
        error: errors.array()
      })
    }

    await knex('tasks').insert({
      task_name: req.body.task_name,
      household_id_fk: req.body.household_id,
      point: req.body.point,
      category: req.body.category,
      is_done: 0,
      assigned_to: req.body.assigned_to || 0,
      time_spent: 0,
      frequency: req.body.frequency
    })

    return res.json({
      code: 1,
      response: `Successfully added task: ${req.body.task_name}`
    })
})

// READ ALL TASKS OF A HOUSEHOLD
tasks.get(
  jwtCheck,
  async (req, res) => {
    const householdTasks = await knex('tasks').where('household_id_fk', req.query.household_id_fk)
    return res.json({
      code: 1,
      response: householdTasks
    })
})

// UPDATE A TASK OF A HOUSEHOLD
tasks.put(
  jwtCheck,
  [
    check('task_name')
      .not()
      .isEmpty()
    .withMessage('Please give a valid name to the task'),
    check('task_id')
      .not()
      .isEmpty()
      .withMessage('Error'),
    check('household_id')
      .not()
      .isEmpty()
      .withMessage('Error'),
    check('point')
      .not()
      .isEmpty()
      .withMessage('Point estimate is missing'),
    check('category')
      .not()
      .isEmpty()
      .withMessage('Category is missing'),
    check('frequency')
      .not()
      .isEmpty()
      .withMessage('Frequency is missing')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({
        code: 0,
        error: errors.array()
      })
    }

    await knex('tasks').where({'task_id': req.body.task_id}).update({
      task_name: req.body.task_name,
      household_id_fk: req.body.household_id,
      point: req.body.point,
      category: req.body.category,
      is_done: req.body.is_done,
      assigned_to: req.body.assigned_to,
      time_spent: req.body.time_spent,
      frequency: req.body.frequency
    })

    const updatedTask = await knex('tasks').where('task_id', req.body.task_id)

    return res.json({
      code: 1,
      response: updatedTask
    })
})

// DELETE A TASK OF A HOUSEHOLD
tasks.delete(
  jwtCheck,
  [
    check('task_id')
      .not()
      .isEmpty()
      .withMessage('Error'),
    check('household_id')
      .not()
      .isEmpty()
      .withMessage('Error')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({
        code: 0,
        error: errors.array()
      })
    }

    await knex('tasks').where({'task_id': req.body.task_id}).delete()

    const updatedTasks = await knex('tasks').where('household_id_fk', req.body.household_id)
    return res.json({
      code: 1,
      response: updatedTasks
    })
})

module.exports = router
