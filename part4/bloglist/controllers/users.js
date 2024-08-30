const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (username.length < 4) {
    return response.status(400).json({ error: 'username must be at least 3 characters long' })
  }

  if (password.length < 4) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save().catch(error => next(error))
  if (savedUser) {
    response.status(201).json(savedUser)
  } else {
    response.status(400)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

module.exports = usersRouter
