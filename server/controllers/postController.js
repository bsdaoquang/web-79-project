import PostModel from '../models/PostModel.js';

const getPosts = async(req, res) => {

  const {page, pageSize} = req.query

  try {
    const totalItems = await PostModel.countDocuments()
    const totalPages = Math.ceil(totalItems/pageSize)

    const skip = (page - 1) * pageSize

    const posts = await PostModel.find().skip(skip).limit(pageSize)

    res.status(200).json({
      message: 'Posts',
      data: {
        items: posts,
        totalPages: totalItems
      }
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
}
const searchPosts = async(req, res) => {

  
  const {title} = req.query

  try {
    const posts = await PostModel.find({slug: {$regex: title}})

    res.status(200).json({
      message: 'Posts',
      data:posts
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
}
const filterPrice = async(req, res) => {

  
  const {min, max, title} = req.query

  try {
    const posts = await PostModel.find({$and: [
      {price: {$gte: min}},
      {price: {$lt: max}},
      {title: {$regex: title}}
    ]})

    res.status(200).json({
      message: 'Posts',
      data:posts
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
}

export {
  getPosts,
  searchPosts,
  filterPrice
}