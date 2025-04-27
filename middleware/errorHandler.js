const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.message === 'Only image files are allowed!') {
      return res.status(400).json({ message: err.message });
    }
  
    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(400).json({ message: 'Username already exists' });
    }
  
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  };
  
  module.exports = errorHandler;