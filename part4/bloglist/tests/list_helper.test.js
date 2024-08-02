const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

// helper variables. if you change anything in them the tests will likely break.

const empty = []

const singleton = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

const populated = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]


describe('totalLikes', () => {
  test('empty list returns zero', () => {
    assert.strictEqual(listHelper.totalLikes(empty), 0)
  })

  test('singleton list returns value of the entry', () => {
    assert.strictEqual(listHelper.totalLikes(singleton), 5)
  })

  test('populated list returns total value', () => {
    assert.strictEqual(listHelper.totalLikes(populated), 36)
  })
})

describe('favorteBlog', () => {
  test('empty list returns null', () => {
    assert.strictEqual(listHelper.favoriteBlog(empty), null)
  })

  const expected_singleton = {
    title: singleton[0].title,
    author: singleton[0].author,
    likes: singleton[0].likes
  }
  test('singleton returns the only value', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(singleton), expected_singleton)
  })

  const expected_populated = {
    title: populated[2].title,
    author: populated[2].author,
    likes: populated[2].likes,
  }
  test('singleton returns the only value', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(populated), expected_populated)
  })
})

describe('mostBlogs', () => {
  test('empty list returns null', () => {
    assert.strictEqual(listHelper.mostBlogs(empty), null)
  })

  const expected_singleton = {
    author: singleton[0].author,
    blogs: 1
  }
  test('singleton returns count of 1', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(singleton), expected_singleton)
  })

  const expected_populated = {
    author: "Robert C. Martin",
    blogs: 3
  }
  test('populated returns correct result', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(populated), expected_populated)
  })
})

describe('mostLikes', () => {
  test('empty list returns null', () => {
    assert.strictEqual(listHelper.mostLikes(empty), null)
  })


  const expected_singleton = {
    author: singleton[0].author,
    likes: 5
  }
  test('singleton returns correct result', () => {
    assert.deepStrictEqual(listHelper.mostLikes(singleton), expected_singleton)
  })

  const expected_populated = {
    author: "Edsger W. Dijkstra",
    likes: 17
  }
  test('populated returns correct result', () => {
    assert.deepStrictEqual(listHelper.mostLikes(populated), expected_populated)
  })
})

