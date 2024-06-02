const logger = (req, res, next) => {
  
  console.log('new request')
  next()
}

export default logger