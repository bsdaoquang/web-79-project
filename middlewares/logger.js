const logger = (req, res, next) => {
  const {id} = req.query
  if (id) {
    
    console.log('new request')
    next()
  }else{
    res.status(401).json({
      message: 'Unauthorization'
    })
  }
}

export default logger