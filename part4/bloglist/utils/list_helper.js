const lodash = require('lodash')

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0,)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) { return null }

  let most_liked = lodash.maxBy(blogs, blog => blog.likes)

  return {
    title: most_liked.title,
    author: most_liked.author,
    likes: most_liked.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) { return null }
  return lodash.maxBy(
    lodash.map(
      lodash.toPairs(
        lodash.countBy(blogs, blog => blog.author)
      ),
      pair => lodash.zipObject(['author', 'blogs'], pair)
    ),
    count => count.blogs
  )
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) { return null }

  return lodash.maxBy(
    lodash.map(
      lodash.toPairs(
        lodash.reduce(blogs, function(result, blog) {
          result[blog.author] = (result[blog.author] || (result[blog.author] = 0)) + blog.likes;
          return result;
        }, {})
      ),
      pair => lodash.zipObject(['author', 'likes'], pair)
    ),
    count => count.likes
  )
}


module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
