const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


// get all
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

// get one by id
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1, id: 1 })

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

// delete one by id
blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).end()
  }
  if (blog.user.toString() == user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(403).end()
  }
})

// update one by id
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  if (!request.token) {
    response.status(401).end()
  }

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }


  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  response.json(updatedBlog)
})

// create new blog
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = request.user

  if (!request.token) {
    response.status(201).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog
    .save()
    .catch(error => next(error))

  if (savedBlog) {
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } else {
    response.status(400)
  }
})



module.exports = blogsRouter
