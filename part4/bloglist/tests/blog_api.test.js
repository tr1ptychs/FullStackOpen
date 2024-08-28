const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[3])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[4])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[5])
  await blogObject.save()
})

describe('get all blog', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('the first blog is about react patterns', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(e => e.title)
    assert(contents.includes('React patterns'))
  })
})

describe('add a blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "async/await simplifies making async calls",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD809.html",
      likes: 20
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    assert(contents.includes('async/await simplifies making async calls'))
  })

  test('a blog without a title is not added', async () => {
    const newBlog = {
      title: "",
      author: "Empty A. Title",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD809.html",
      likes: 6
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('blogs added without title are rejected with 400', async () => {
    const noUrl = {
      author: "Empty A. Title",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD809.html",
      likes: 6
    }
    await api
      .post('/api/blogs')
      .send(noUrl)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('blogs added without url are rejected with 400', async () => {
    const noUrl = {
      title: "Empty ass url moment",
      author: "Empty A. Title",
      likes: 6
    }
    await api
      .post('/api/blogs')
      .send(noUrl)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

describe('get one blog by id', () => {
  test('blog asked for is blog gotten', async () => {
    const response = await api.get('/api/blogs/5a422a851b54a676234d17f7')
    assert.strictEqual(response.body.id, helper.initialBlogs[0]._id)

  })
})

describe('attributes of blogs', () => {
  test('unique identifier property is named "id"', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body[0]._id, undefined)
    assert.strictEqual(response.body[0].id, helper.initialBlogs[0]._id)
  })

  test('likes defaults to 0 when empty', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body[4].likes, 0)
  })
})

describe('delete by id', () => {
  test('delete works', async () => {
    const id = '5a422a851b54a676234d17f7'
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(r => r.id)

    assert(!contents.includes(id))
  })
})

describe('update blog', () => {
  test('update likes', async () => {
    const id = '5a422a851b54a676234d17f7'
    const updatedLikes = {
      likes: 500
    }

    const response = await api.put(`/api/blogs/${id}`).send(updatedLikes)
    assert.strictEqual(response.body.likes, 500)
  })
})

after(async () => {
  await mongoose.connection.close()
})
