const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// get all
blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs)
})

// get one by id
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

// delete one by id
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

// update one by id
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  response.json(updatedBlog)

})

// create new blog
blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})



module.exports = blogsRouter
