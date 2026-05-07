const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  console.error('ERROR:', err.message);
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error'
  });
};

export default errorHandler;